import { Delete } from "@mui/icons-material";;
import {Modal} from "../global/Modals";
import type {ConfirmModalProps} from "../../types/ConfirmModalProps ";
export const ConfirmModal = (props: ConfirmModalProps) => {
  const { open, onClose,isLoading=false } = props;
  // const handleCancel = () => {
  //   onClose();
  // };

  // const handleDelete = () => {
  //   props.onConfirm();
  // };

   return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center">

        <Delete
          sx={{ fontSize: 56 }}
          className="mx-auto text-red-500"
        />

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
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-700 text-white rounded py-2 disabled:opacity-50 cursor-pointer"
            onClick={props.onConfirm}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>

          <button
            disabled={isLoading}
            className="w-full bg-gray-300 hover:bg-gray-400 rounded py-2 disabled:opacity-50"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>
      </div>
    </Modal>
  );
};