import { useState } from "react"
import { Button } from "../../../components/Buttons/SubmitBtn"
import { AddExamModal } from "../../../components/Exam/Exams/AddExamModal";
import { useGetExamsQuery } from "../../../services/exams/exams/examQuery";
import { useGetLanguagesQuery } from "../../../services/languages/languageService";
import { useGetCategoryQuery } from "../../../services/courses/catygory/getCategories";
import { useGetAllTypesQuery } from "../../../services/exams/exam-types/typeQuery";
import { CustomPagination } from "../../../components/global/CustomPagination";
import CustomDropdown from "../../../components/Fields/DropDown";
import { ExamCard } from "../../../components/Exam/Exams/ExamCard";
import { AddExamFileModal } from "../../../components/Exam/Exams/AddFileModal";
import { EditExamModal } from "../../../components/Exam/Exams/EditExamModal";
import { DeleteExamModal } from "../../../components/Exam/Exams/DeleteExam";
export const ExamPage=()=>{
  const [isOpenAdd,setIsOpenAdd]=useState(false);
  const [isOpenEdit,setIsOpenEdit]=useState(false);
  const [isOpenDelete,setIsOpenDelete]=useState(false);
  const [isOpenUpload,setIsOpenUpload]=useState(false);
  const [selectedId,setSelectedId]=useState(0)
  const [startPage] = useState(1);
  const statusList=["Inactive","Active"]
  const {data:languages}=useGetLanguagesQuery()
  const {data:Caty}=useGetCategoryQuery()
  const {data:types}=useGetAllTypesQuery(
   { 
     page: startPage,
     limit: 100,}
  )
  const [draftFilters, setDraftFilters] = useState({
  page: 1,
  limit: 10,
  languageId: undefined as number | undefined,
  categoryId: undefined as number | undefined,
  examTypeId: undefined as number | undefined,
  status: undefined as string | undefined,
});

const [filters, setFilters] = useState(draftFilters);
 const { data, isLoading } = useGetExamsQuery(filters);
 
console.log("Exam",data)
    return(
        <div>
          <div className="flex justify-between items-center align-middle">
            <h1 className="text-2xl">Exams</h1>
            <div>
                <Button  name="Add Exam"  onClick={()=>setIsOpenAdd(true)}/>
            </div>
          </div>
          <div className="flex">
                <div className="p-4 ">
     <CustomDropdown
  options={languages?.map((l) => l.name) || []}
  placeholder="Select Language"
 onSelect={(value) => {
  const lang = languages?.find(l => l.name === value);

  setFilters(prev => ({
    ...prev,
    languageId: lang?.id,
    page: 1,
  }));
}}
/>
 </div>
 <div className="p-4">
<CustomDropdown
  options={Caty?.map((c) => c.title) || []}
  placeholder="Select Catygory"
onSelect={(value) => {
  const cat = Caty?.find(c => c.title === value);

  setDraftFilters(prev => ({
    ...prev,
    categoryId: cat?.id,
    page: 1,
  }));
}}
/>
 </div>
<div className="p-4 ">
<CustomDropdown
  options={types?.data.map((t) => t.name) || []}
  placeholder="Select Exam Type"
onSelect={(value) => {
  const type = types?.data.find(t => t.name === value);

  setDraftFilters(prev => ({
    ...prev,
    examTypeId: type?.id,
    page: 1,
  }));
}}
/>
</div>
<div className="p-4">
<CustomDropdown
  options={statusList.map((s) =>s) || []}
  placeholder="Select Status"
  onSelect={(value) => {
 const selected=value

  setDraftFilters(prev => ({
    ...prev,
    status: selected,
    page: 1,
  }));
}}
/>

</div>
<div className="flex p-4">
    <Button
    name={isLoading? "Loading" :"Search" }
    onClick={() =>{console.log(filters.status) ,setFilters(draftFilters)}}
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

        setDraftFilters(reset);
        setFilters(reset);
    }}
/>
</div>

          </div>
          {isLoading ? <p>Loaad...</p> : null}
       
            {data?.data.length === 0 ? <p>No Data yet!</p> :
(
    
    data?.data.map((e)=>
           <div className="p-2" key={e.id}>
    <ExamCard
    exam={e}
    onUpload={()=>{setSelectedId(e.id),setIsOpenUpload(true)}}
    onEdit={()=>{setSelectedId(e.id),setIsOpenEdit(true)}}
    onDelete={()=>{setSelectedId(e.id),setIsOpenDelete(true)}}
    />
     </div>
    )

)

}
         

<CustomPagination
    currentPage={filters.page}
    totalPages={data?.meta.totalPages ?? 1}
    onPageChange={(page) => {
        setFilters(prev => ({
            ...prev,
            page,
        }));
    }}
/>
          <AddExamModal
          open={isOpenAdd}
          onClose={()=>setIsOpenAdd(false)}
          />
          <AddExamFileModal
          open={isOpenUpload}
          onClose={()=>setIsOpenUpload(false)}
          examId={selectedId}
          />
          <EditExamModal
          open={isOpenEdit}
          onClose={()=>setIsOpenEdit(false)}
          id={selectedId}
          />
          <DeleteExamModal
          open={isOpenDelete}
            onClose={()=>setIsOpenDelete(false)}
          id={selectedId}
          />
        </div>
    )
}