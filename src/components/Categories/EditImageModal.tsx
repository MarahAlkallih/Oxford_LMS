import { useState } from "react";
import { Modal } from "../global/Modals";
import { Button } from "../Buttons/SubmitBtn";
import { CancelBtn } from "../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { useUpdateCategoryMutation } from "../../services/courses/catygory/catygoryMutations";

interface Props {
  open: boolean;
  onClose: () => void;
  categoryId: number | null;
}

export const EditImageModal = ({
  open,
  onClose,
  categoryId,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const [updateCategory, { isLoading }] =
    useUpdateCategoryMutation();

  const handleUpdate = async () => {
    if (!categoryId || !file) return;

    try {
      const formData = new FormData();

      formData.append("image", file);

      await updateCategory({
        id: categoryId,
        formData,
      }).unwrap();

      toast.success("Image Updated Successfully");

      setFile(null);
      onClose();
    } catch {
      toast.error("Update Failed");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 p-4">

        <h2 className="text-xl font-semibold text-center">
          Update Image
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <div className="flex gap-2">

          <div className="flex-1">
            <Button
              name={isLoading ? "Updating..." : "Update"}
              onClick={handleUpdate}
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
};