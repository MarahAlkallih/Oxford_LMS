import { useState } from "react";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { AddEventModal } from "../../../components/Exam/Events/AddEvent";
import { useGetExamEventsQuery } from "../../../services/exams/events/examEventQuery"; // الراوت الموحد للفلترة
import { useGetExamsQuery } from "../../../services/exams/exams/examQuery"; // لجلب لستة الامتحانات لـ Dropdown الفلترة
import { EventCard } from "../../../components/Exam/Events/EventCard";
import { EditEventModal } from "../../../components/Exam/Events/EditEvent";
import { DeleteEventModal } from "../../../components/Exam/Events/DeleteEvent";
import CustomDropdown from "../../../components/Fields/DropDown";
import { CustomPagination } from "../../../components/global/CustomPagination";
import { useGetActiveUncompingCourseQuery } from "../../../services/courses/Admin-courses/coursesQuery";
export const EventsPage = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  
  // جلب خيارات الامتحانات لتعبئة قائمة الـ Dropdown لـ examId
  const { data: examsData } = useGetExamsQuery({ page: 1, limit: 100 });
  const examsList = examsData?.data || [];
   const {data:courses}=useGetActiveUncompingCourseQuery()
  const statusOptions = [ "Open", "Closed"];

  // 1. الفلاتر المؤقتة (Draft) - تتحدث فوراً عند التغيير في الواجهة
  const [draftFilters, setDraftFilters] = useState({
    page: 1,
    limit: 10,
    courseId:undefined as number | undefined,
    examId: undefined as number | undefined,
    open: undefined as boolean | undefined,
  });

  // 2. الفلاتر الفعلية - التي يتم إرسالها للباك إند عند الضغط على Search
  const [filters, setFilters] = useState({
    ...draftFilters,
    
  });

  // 3. استدعاء الراوت الموحد المذكور في image_3aa025.png وتمرير الفلاتر له
  const { data: events, isLoading } = useGetExamEventsQuery(filters);
   console.log("events",events)
  return (
    <div>
      {/* الهيدر العلوي */}
      <div className="flex justify-between align-middle items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <div>
          <Button name={"Add Events"} onClick={() => { setIsOpenAdd(true); }} />
        </div>
      </div>

      {/* 🛠️ بار الفلترة الموحد للـ Events */}
      <div className="flex flex-wrap items-end gap-4 mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
        
        {/* فلتر الامتحان (examId) */}
        <div className="p-4">
          <CustomDropdown
            options={examsList.map((e: any) => e.title) || []}
            placeholder="Filter by Exam"
            onSelect={(value) => {
              const selectedExam = examsList.find((e: any) => e.title === value);
              setDraftFilters((prev) => ({ ...prev, examId: selectedExam?.id, page: 1 }));
            }}
          />
        </div>

        {/* فلتر الكورس (courseId) عبر حقل إدخال رقمي */}
          <div className="p-4">
          <CustomDropdown
            options={courses?.map((e)=>e.categoryName) || []}
            placeholder="Category"
            onSelect={(value) => {
            const selectedCourse = courses?.find((c) => c.categoryName === value);
              setDraftFilters((prev) => ({ ...prev, courseId: selectedCourse?.id, page: 1 }));
            }}
          />
        </div>
        {/* فلتر الحالة (open: true / false) */}
        <div className="p-4">
          <CustomDropdown
            options={statusOptions}
            placeholder="Status (Open/Closed)"
            onSelect={(value) => {
              let openValue: boolean | undefined = undefined;
              if (value === "Open") openValue = true;
              if (value === "Closed") openValue = false;

              setDraftFilters((prev) => ({ ...prev, open: openValue, page: 1 }));
            }}
          />
        </div>

        {/* أزرار البحث والتصفير */}
        <div className="flex gap-2 pb-1 ml-auto">
          <Button
            name={isLoading ? "Loading..." : "Search"}
            onClick={() => {
              // دمج خيارات الـ Draft مع الـ courseId المكتوب وإرسالهم سويةً
              setFilters({
                ...draftFilters,
             
              });
            }}
          />
          <Button
            name="Reset"
           
            onClick={() => {
              const resetValues = {
                page: 1,
                limit: 10,
                examId: undefined,
                courseId:undefined,
                open: undefined,
              };
             
              setDraftFilters(resetValues);
              setFilters({ ...resetValues, courseId: undefined });
            }}
          />
        </div>
      </div>

      {/* 📦 قسم عرض كروت الـ Events وحالات التحميل */}
     {isLoading ? (
  <p className="text-center p-10 font-bold text-gray-400 animate-pulse">
    Loading Events...
  </p>
) : events?.data?.length === 0 ? (
  <p className="text-center p-10 font-bold text-red-400">
    No Events found!
  </p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {events?.data?.map((event: any) => (
      <EventCard
        key={event.id}
        event={event}
        onEdit={() => {
          setIsOpenEdit(true);
          setSelectedId(event.id);
        }}
        onDelete={() => {
          setIsOpenDelete(true);
          setSelectedId(event.id);
        }}
      />
    ))}
  </div>
)}

      {/* الـ Pagination أسفل الصفحة */}
      <CustomPagination
        currentPage={filters.page}
        totalPages={ 1}
        onPageChange={(page) => {
          setDraftFilters((prev) => ({ ...prev, page }));
          setFilters((prev) => ({ ...prev, page }));
        }}
      />

      {/* المودالات الخاصة بالصفحة */}
      <AddEventModal open={isOpenAdd} onClose={() => setIsOpenAdd(false)} />
      
      <EditEventModal
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        id={selectedId}
      />
      
      <DeleteEventModal
        open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        id={selectedId}
      />
    </div>
  );
};