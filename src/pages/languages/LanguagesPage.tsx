import { useState } from "react";
import { Button } from "../../components/Buttons/SubmitBtn";
import { AddLangModal } from "../../components/Language/AddLangModal";
import { useGetLanguagesQuery } from "../../services/languages/languageService";
import { EditLangModal } from "../../components/Language/EditLangModal";
import { DeleteLangModal } from "../../components/Language/DeleteLang";
import { DeleteIcon, EditIcon } from "../../components/Icons";

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
           hover:shadow-md bg-(--light2-color) rounded-xl p-2.5 flex flex-col gap-0.5 text-sm transition-all">
  

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
        className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
        title="Edit"
      >
       <EditIcon size={16}  color="#ff4d1c" />
      </button>

      {/* زر الحذف */}
      <button 
        onClick={() => {
         setOpenDeleteModal(true)
          ,setSelectedId(lang.id || 0)
        }
        } 
        className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
        title="Delete"
      >
       <DeleteIcon  size={16}  color="#ff4d1c"  />
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