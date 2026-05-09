import { Delete } from "@mui/icons-material";;
import {Modal} from "../global/Modals";
import type {ConfirmModalProps} from "../../types/ConfirmModalProps ";
export const ConfirmModal = (props: ConfirmModalProps) => {
  const { open, onClose } = props;
  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    props.onConfirm();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center w-56">
        <Delete sx={{ fontSize: 56 }} className="mx-auto text-red-500" />

        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">
            Confirm Delete
          </h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this item?
          </p>
        </div>

        <div className="flex gap-4">
            <button
            className="btn btn-danger w-full bg-red-500 hover:bg-red-700 cursor-pointer rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="btn btn-light w-full bg-gray-300 hover:bg-gray-400 cursor-pointer rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>

          
        </div>
      </div>
    </Modal>
  );
};