import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { InputField } from "../../Fields/InputField";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { Priority } from "../../Const/Priority";
import { useRequestTypeMutation } from "../../../services/conversation/SuperAdmin/requestsMutation";
interface AddReqTypeModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddReqTypeModal = ({ open, onClose }: AddReqTypeModalProps) => {
    const [request, setRequest] = useState({
        name: "",
        priority: ""
    })
    const [addReq, { isLoading }] = useRequestTypeMutation()
    const handleAddReq = async () => {
        try {
            await addReq(request)
            toast.success("Added Successfully");
            setRequest({
        name: "",
        priority: ""
            })
            onClose();
        } catch (err) {
            ErrorHandler.show(err)
        }
    }
    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex flex-col gap-4 p-4 min-w-87.5">

                <h2 className="text-xl font-semibold text-center">
                    Add New Request Type
                </h2>
                <div className=" flex flex-col align-center ">
                    <div>


                    </div>
                    <div className=" p-8 flex-col">

                        <InputField
                            label="Name"

                            value={request.name}
                            onChange={(e) => setRequest({ ...request, name: e.target.value })}
                        />
                        <div  className="p-2">
                            <Priority onSelect={(value) => {
                                setRequest({ ...request, priority: value });
                            }} />
                        </div>
                    </div>

                    <div className="flex  pt-2">

                        <div className="flex-1">
                            <Button
                                name={isLoading ? "Adding..." : "Add Request"}
                                onClick={handleAddReq}
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
            </div>
        </Modal>
    );
}
