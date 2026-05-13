import { useState } from "react";
import { Button } from "../../components/Buttons/SubmitBtn";
import { AddLangModal } from "../../components/modals/AddLangModal";

export const LanguagesPage = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
            <div className="flex w-fit justify-end">
                 <Button
                name="Add Language"
                onClick={() => setOpenModal(true)}
            />
            </div>
           

            <AddLangModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

        </div>
    );
};