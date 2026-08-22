import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { InputField } from "../../Fields/InputField";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import {useCreateDirectChatMutation} from "../../../services/conversation/chats/chatsMutations"
import { useGetReqsQuery } from "../../../services/conversation/SuperAdmin/requestsMutation";
import CustomDropdown from "../../Fields/DropDown";
interface CreateDirectChatModalProps {
    open: boolean;
    onClose: () => void;
    recipientAccountId:number
}

export const CreateDirectChatModal = ({ open, onClose, recipientAccountId }: CreateDirectChatModalProps) => {
        const [request, setRequest] = useState<{
            recipientAccountId: number;
            requestTypeId: number | null;
            subject: string;
        }>({
      recipientAccountId: recipientAccountId,
    requestTypeId: null,
    subject: ""
    })
   const { data: reqs, isLoading } = useGetReqsQuery({});
   const [createDirectChat,{isLoading:isLoadCreate}]=useCreateDirectChatMutation()
    const handleAddReq = async () => {
        try {
          await createDirectChat(request).unwrap()
          toast.success("Direct chat created successfully")

            onClose();
        } catch (err) {
            ErrorHandler.show(err)
        }
    }
    return (
        <Modal open={open} onClose={onClose}>
            <div className="flex flex-col gap-4 p-4 min-w-87.5">

                <h2 className="text-xl font-semibold text-center">
                    Create Direct Chat
                </h2>
                <div className=" flex flex-col align-center ">
                    <div>


                    </div>
                    <div className=" p-8 flex-col">
                                <div  className="p-2">
                              
 <CustomDropdown
      placeholder={isLoading ? "Loading ..." : "Select type"}
      options={reqs?.map((t) => t.name) ?? []}
      onSelect={(value) => {
                const selected = reqs?.find((t) => t.name === value);
               setRequest({...request, requestTypeId: selected?.id || null})
              }}
    />
      
                        </div>
                        <InputField
                            label="Subject"

                            value={request.subject}
                            onChange={(e) => setRequest({ ...request, subject: e.target.value })}
                        />
                    
                    </div>

                    <div className="flex  pt-2">

                        <div className="flex-1">
                            <Button
                                name={isLoadCreate ? "Adding..." : "Add Request"}
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
