import { useState } from "react";
import { Button } from "../Buttons/SubmitBtn";
import { InputField } from "../Fields/InputField";
import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
interface AddLangModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddLangModal = ({ open, onClose }: AddLangModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleAddLang = () => {
        console.log({ name, description });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex  flex-col gap-1">
                <h2 className=" text-xl">Add New Language</h2>
                <InputField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex gap-3 ">

                    <div className="flex-1">
                        <Button
                            name="Add Language"
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
