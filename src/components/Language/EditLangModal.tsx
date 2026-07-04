import { useEffect, useState } from "react";
import { Button } from "../Buttons/SubmitBtn";
import { InputField } from "../Fields/InputField";
import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import { useGetOLanguageQuery } from "../../services/languages/languageService";
import { useEditLanguageMutation } from "../../services/languages/languageService";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { toast } from "react-toastify";
interface EditLangModalProps {
    open: boolean;
    onClose: () => void;
    id:number
}

export const EditLangModal = ({ open, onClose,id }: EditLangModalProps) => {
    const {data:language}=useGetOLanguageQuery({id:id})
    const [editLang,{isLoading}]=useEditLanguageMutation()
  const [lang, setLang] = useState({
  name: "",
  description: "",
});
 useEffect(() => {
  if (language) {
    setLang({
      name: language.name,
      description: language.description,
    });
  }
}, [language]);
 console.log(language)


  const handleAddLang = async () => {

    try {
     await editLang({
    id,
    data: lang,
}).unwrap();

toast.success("Edited Successfully");
onClose();
     
      

    } catch (err) {
      ErrorHandler.show(err)
    }
  };
  

    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-[350px]">

    <h2 className="text-xl font-semibold text-center">
      Edit Language
    </h2>

    <InputField
      label="Name"
      value={lang.name}
      onChange={(e) =>
        setLang(prev=>
            
           ( { ...prev, name: e.target.value })
        )
      }
    />

    <InputField
      label="Description"
      value={lang.description}
      onChange={(e) =>
        setLang(prev=>
            
           ( { ...prev, description: e.target.value })
        )
      }
    />

    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={isLoading ? "Editing..." : "Edit Language"}
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
