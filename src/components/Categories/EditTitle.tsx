import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "../Buttons/SubmitBtn";
import { CancelBtn } from "../Buttons/CancelBtn";
import { InputField } from "../Fields/InputField";
import { Modal } from "../global/Modals";
import { useUpdateCategoryMutation } from "../../services/courses/catygory/catygoryMutations";

interface EditTitleModalProps {
  open: boolean;
  onClose: () => void;
  cateId: number | null;
  currentTitle: string;
}

export const EditTitleModal = ({
  open,
  onClose,
  cateId: venueId,
  currentTitle,
}: EditTitleModalProps) => {
  const [title, setCateTitle] = useState("");

  const [updateVenue, { isLoading }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    setCateTitle(currentTitle);
  }, [currentTitle]);

  const handleEditVenue = async () => {
    if (!venueId) return;

    try {
      const formData = new FormData();

      formData.append("title", title);

      await updateVenue({
        id: venueId,
        formData,
      }).unwrap();

      toast.success("Category updated successfully");

      handleClose();
    } catch (err) {
      console.log(err);

      toast.error("Update failed");
    }
  };

  const handleClose = () => {
    setCateTitle("");

    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-semibold text-center">
          Edit Venue Title
        </h2>

        <InputField
          label="Venue Name"
          value={title}
          onChange={(e) =>
            setCateTitle(e.target.value)
          }
        />

        <div className="flex">
          <div className="flex-1">
            <Button
              name={
                isLoading
                  ? "Updating..."
                  : "Update Category"
              }
              onClick={handleEditVenue}
            />
          </div>

          <div className="flex-1">
            <CancelBtn
              name="Cancel"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};