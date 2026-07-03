import { useState } from "react";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { AddExamModal } from "../../../components/Exam/Exams/AddExamModal";
import { useGetExamsQuery, useGetByCodeQuery } from "../../../services/exams/exams/examQuery";
import { useGetLanguagesQuery } from "../../../services/languages/languageService";
import { useGetCategoryQuery } from "../../../services/courses/catygory/getCategories";
import { useGetAllTypesQuery } from "../../../services/exams/exam-types/typeQuery";
import { CustomPagination } from "../../../components/global/CustomPagination";
import CustomDropdown from "../../../components/Fields/DropDown";
import { ExamCard } from "../../../components/Exam/Exams/ExamCard";
import { AddExamFileModal } from "../../../components/Exam/Exams/AddFileModal";
import { EditExamModal } from "../../../components/Exam/Exams/EditExamModal";
import { DeleteExamModal } from "../../../components/Exam/Exams/DeleteExam";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../components/Fields/InputField";

export const ExamPage = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  
  const [code, setCode] = useState(""); // يمثل ما يكتبه المستخدم حالياً في الإدخال
  const [activeCodeSearch, setActiveCodeSearch] = useState(""); // يمثل الكود الفعلي المستهدف بعد ضغط Search

  const [selectedId, setSelectedId] = useState(0);
 
  const statusList = ["Inactive", "Active"];
  const navigate = useNavigate();

  const { data: languages } = useGetLanguagesQuery();
  const { data: Caty } = useGetCategoryQuery();
  const { data: types } = useGetAllTypesQuery({ page: 1, limit: 100 });

  const [draftFilters, setDraftFilters] = useState({
    page: 1,
    limit: 10,
    languageId: undefined as number | undefined,
    categoryId: undefined as number | undefined,
    examTypeId: undefined as number | undefined,
    status: undefined as string | undefined,
  });

  const [filters, setFilters] = useState(draftFilters);

  // 1. جلب البيانات العادية (يتم إيقافها مؤقتاً إذا كان البحث بالـ Code فعالاً لتوفير الأداء)
  const { data, isLoading } = useGetExamsQuery(filters, { skip: !!activeCodeSearch });

  // 2. جلب البيانات بالـ Code (لا يعمل إلا إذا امتلأ الـ activeCodeSearch)
  const { data: codeData, isLoading: isLoadCode ,isError,error} = useGetByCodeQuery(
    { code: activeCodeSearch }, 
    { skip: !activeCodeSearch }
  );

  // 3. 🧠 دمج الحالات الذكي (تحديد من أين نأخذ البيانات والـ Loading)
  const isCodeSearchActive = !!activeCodeSearch;
  const currentLoading = isCodeSearchActive ? isLoadCode : isLoading;
  
  // استخراج المصفوفة بشكل دفاعي آمن من كلا الراوتين
  let examsList: any[] = [];
  if (isCodeSearchActive) {
    const rawData = codeData ;
    // إذا كان الباك إند يعيد كائن واحد (Object) عند البحث بالـ Code، نقوم بتحويله لمصفوفة لتفادي كراش الـ map
    if (rawData) {
      examsList = Array.isArray(rawData) ? rawData : [rawData];
    }
  } else {
    examsList = data?.data || [];
  }

  // حساب إجمالي الصفحات للـ Pagination
  const totalPages = isCodeSearchActive ? 1 : (data?.meta?.totalPages ?? 1);

  return (
    <div>
      <div className="flex justify-between items-center align-middle">
        <h1 className="text-2xl font-bold">Exams</h1>
        <div>
          <Button name="Add Exam" onClick={() => setIsOpenAdd(true)} />
        </div>
      </div>

      {/* قسم الفلاتر */}
      <div className="flex flex-wrap items-end gap-2">
        <div className="p-4">
          <CustomDropdown
            options={languages?.map((l) => l.name) || []}
            placeholder="Select Language"
            onSelect={(value) => {
              const lang = languages?.find((l) => l.name === value);
              setDraftFilters((prev) => ({ ...prev, languageId: lang?.id, page: 1 }));
            }}
          />
        </div>
        
        <div className="p-4">
          <CustomDropdown
            options={Caty?.map((c) => c.title) || []}
            placeholder="Select Category"
            onSelect={(value) => {
              const cat = Caty?.find((c) => c.title === value);
              setDraftFilters((prev) => ({ ...prev, categoryId: cat?.id, page: 1 }));
            }}
          />
        </div>

        <div className="p-4">
          <CustomDropdown
            options={types?.data.map((t) => t.name) || []}
            placeholder="Select Exam Type"
            onSelect={(value) => {
              const type = types?.data.find((t) => t.name === value);
              setDraftFilters((prev) => ({ ...prev, examTypeId: type?.id, page: 1 }));
            }}
          />
        </div>

        <div className="p-4">
          <CustomDropdown
            options={statusList}
            placeholder="Select Status"
            onSelect={(value) => {
              setDraftFilters((prev) => ({ ...prev, status: value, page: 1 }));
            }}
          />
        </div>
      <div className="flex flex-row align-middle items-center">
         <div className="p-4">
          <InputField label="Code" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>

        <div className="flex p-4 gap-2">
          <Button
            name={currentLoading ? "Loading..." : "Search"}
            onClick={() => {
              // عند الضغط على كبسة البحث:
              if (code.trim() !== "") {
                setActiveCodeSearch(code.trim()); // تفعيل راوت الكود
              } else {
                setActiveCodeSearch(""); // تفعيل الراوت العام
                setFilters(draftFilters);
              }
            }}
          />
          <Button
            name="Reset"
            onClick={() => {
              const reset = {
                page: 1,
                limit: 10,
                languageId: undefined,
                categoryId: undefined,
                examTypeId: undefined,
                status: undefined,
              };
              setCode("");
              setActiveCodeSearch("");
              setDraftFilters(reset);
              setFilters(reset);
            }}
          />
        </div>
      </div>
       
      </div>

      {/* قسم عرض النتائج وحالات التحميل */}
      {currentLoading ? (
        <p className="text-center p-10 text-gray-500 font-bold">Loading Exams...</p>
      ) : isError ? (
        <p className="text-center p-10 text-red-500 font-bold">{
          // normalize error to a string for rendering
          typeof error === 'string'
            ? error
            : error && typeof error === 'object' && 'data' in error
            ? JSON.stringify((error as any).data)
            : 'An error occurred'
        }</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {examsList.map((e) => (
            <div className="p-2" key={e.id}>
              <ExamCard
                exam={e}
                onUpload={() => { setSelectedId(e.id); setIsOpenUpload(true); }}
                onEdit={() => { setSelectedId(e.id); setIsOpenEdit(true); }}
                onDelete={() => { setSelectedId(e.id); setIsOpenDelete(true); }}
                onShow={() => navigate(`${e.id}`)}
              />
            </div>
          ))}
        </div>
      )}

      {/* الـ Pagination يختفي أو يثبت على 1 عند البحث بكود معين */}
      {!isCodeSearchActive && (
        <CustomPagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => {
            setFilters((prev) => ({ ...prev, page }));
          }}
        />
      )}

      {/* المودالات الـ Modals */}
      <AddExamModal open={isOpenAdd} onClose={() => setIsOpenAdd(false)} />
      <AddExamFileModal open={isOpenUpload} onClose={() => setIsOpenUpload(false)} examId={selectedId} />
      <EditExamModal open={isOpenEdit} onClose={() => setIsOpenEdit(false)} id={selectedId} />
      <DeleteExamModal open={isOpenDelete} onClose={() => setIsOpenDelete(false)} id={selectedId} />
    </div>
  );
};