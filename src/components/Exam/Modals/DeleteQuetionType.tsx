import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteQuestionTypeMutation } from "../../../services/exams/quest-types/typeMutation";

import { toast } from "react-toastify";
interface DeleteProps{
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    id?: number;
}

export const DeleteQuestionTypeModal = ({ open, onClose, onConfirm, id }: DeleteProps) => {
    const [deleteExamType, { isSuccess}] = useDeleteQuestionTypeMutation();

    const handleDelete = async () => {
        try {
            if (id !== undefined) await deleteExamType({ id }).unwrap?.();
            toast.success("Question type deleted");
             onClose();
        } catch {
            // ignore
        }
    };

    return (
        <div>
            <ConfirmModal open={open} onClose={onClose} onConfirm={handleDelete} />
        </div>
    );
};