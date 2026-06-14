import { useState } from "react";
import { Button } from "../Buttons/SubmitBtn";
import { InputField } from "../Fields/InputField";
import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import { useCreateLanguageMutation } from "../../services/languages/languageService";
interface AddLangModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddLangModal = ({ open, onClose }: AddLangModalProps) => {
 const [lang, setLang] = useState({
    Type:"",
    description:""
 });
  const [createLanguage, { isLoading ,isSuccess}] =
    useCreateLanguageMutation();

  const handleAddLang = async () => {

    try {

      const res = await createLanguage({
        name: lang.name,
        description: lang.description,
      }).unwrap();

      console.log(res);
      console.log(lang)
      if(isSuccess){
       onClose();

    setLang({ Type: "", description: "" });
      }
     
      

    } catch (err) {
      console.log(err);
    }
  };
  

    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-[350px]">

    <h2 className="text-xl font-semibold text-center">
      Add New Language
    </h2>

    <InputField
      label="Name"
      value={lang.name}
      onChange={(e) =>
        setLang({ ...lang, Type: e.target.value })
      }
    />

    <InputField
      label="Description"
      value={lang.description}
      onChange={(e) =>
        setLang({
          ...lang,
          description: e.target.value,
        })
      }
    />

    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={isLoading ? "Adding..." : "Add Language"}
          onClick={handleAddLang}
        />
      </div>

      <div className="flex-1">
        <CancelBtn
          name="Cancel"
          onClick={onClose}
        />
      </div>

    </div>

  </div>
</Modal>
    );
}
