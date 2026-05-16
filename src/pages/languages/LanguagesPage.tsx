import { useState } from "react";
import { Button } from "../../components/Buttons/SubmitBtn";
import { AddLangModal } from "../../components/modals/AddLangModal";
import { useGetLanguagesQuery } from "../../services/languages/languageService";

export const LanguagesPage = () => {

  const [openModal, setOpenModal] = useState(false);
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
           <div className="border-l-4   border-(var--main-color) ml-3 mb-2 shadow-2xl rounded-lg p-3 flex flex-col gap-1">
  <h3 className="font-semibold">
    {lang.name}
  </h3>

  <p className="text-gray-500">
    {lang.description}
  </p>
  <p className="text-gray-500">
    <p>{formatDate(lang.createdAt)}</p>
  </p>
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

    </div>
  );
};