import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteExamTypeMutation } from "../../../services/exams/exam-types/typeMutation";
import { useEffect } from "react";
import { toast } from "react-toastify";
interface DeleteProps{
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    id?: number;
}

export const DeleteExamTypeModal = ({ open, onClose, onConfirm, id }: DeleteProps) => {
    const [deleteExamType, { isSuccess}] = useDeleteExamTypeMutation();

    const handleDelete = async () => {
        try {
            if (id !== undefined) await deleteExamType({ id }).unwrap?.();
            toast.success("Exam type deleted");
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