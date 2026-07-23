import { useState } from "react";
import { Button } from "../../components/Buttons/SubmitBtn";
import { AddLangModal } from "../../components/Language/AddLangModal";
import { useGetLanguagesQuery } from "../../services/languages/languageService";
import { EditLangModal } from "../../components/Language/EditLangModal";
import { DeleteLangModal } from "../../components/Language/DeleteLang";

export const LanguagesPage = () => {

  const [openModal, setOpenModal] = useState(false);
   const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
   const [selectedId,setSelectedId]=useState(0)
   const formatDate = (date: string | Date | undefined) => {
  return date ? new Date(date).toLocaleDateString("en-GB") : "";
};
  const {
    data,
    isLoading,
    error,
  } = useGetLanguagesQuery();

  console.log(data);

  return (
    <div>

      <div className="w-fit mb-4">
        <Button
          name="Add Language"
          onClick={() => setOpenModal(true)}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : data?.length === 0 ? (
        <p>No Language Found</p>
      ) : (
        <div className="flex flex-col gap-2">
          {data?.map((lang) => (
          <div className="border-l-4 border-(--main-color) ml-3 mb-2 shadow-sm w-1/2
           hover:shadow-md bg-white rounded-xl p-2.5 flex flex-col gap-0.5 text-sm transition-all">
  

  <div className="flex justify-between items-center gap-2">
    <h3 className="font-bold text-gray-800 text-sm truncate">
      {lang.name}
    </h3>
    
    {/* أزرار التعديل والحذف */}
    <div className="flex items-center gap-1 shrink-0">
      {/* زر التعديل */}
      <button 
        onClick={() => {
          setOpenEditModal(true)
          ,setSelectedId(lang.id || 0)}} 
        className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Edit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
      </button>

      {/* زر الحذف */}
      <button 
        onClick={() => {
         setOpenDeleteModal(true)
          ,setSelectedId(lang.id || 0)
        }
        } 
        className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  </div>

  {/* الوصف المفرود */}
  <p className="text-gray-500 text-xs line-clamp-2 mt-0.5">
    {lang.description}
  </p>

  {/* التاريخ الأسفل */}
  <span className="text-gray-400 text-[10px] mt-1 block font-mono">
    {formatDate(lang.createdAt)}
  </span>
</div>
          ))}
        </div>
      )}

      {error && (
        <p>Error loading languages</p>
      )}

      <AddLangModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
          < EditLangModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        id={selectedId}
      />
         < DeleteLangModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        id={selectedId}
      />

    </div>
  );
};