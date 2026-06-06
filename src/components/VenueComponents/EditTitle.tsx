import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "../Buttons/SubmitBtn";
import { CancelBtn } from "../Buttons/CancelBtn";
import { InputField } from "../Fields/InputField";
import { Modal } from "../global/Modals";

import { useUpdateVenueMutation } from "../../services/courses/veneus/mutationVenues";

interface EditTitleModalProps {
  open: boolean;
  onClose: () => void;
  venueId: number | null;
  currentTitle: string;
}

export const EditTitleModal = ({
  open,
  onClose,
  venueId,
  currentTitle,
}: EditTitleModalProps) => {
  const [venueTitle, setVenueTitle] = useState("");

  const [updateVenue, { isLoading }] =
    useUpdateVenueMutation();

  useEffect(() => {
    setVenueTitle(currentTitle);
  }, [currentTitle]);

  const handleEditVenue = async () => {
    if (!venueId) return;

    try {
      const formData = new FormData();

      formData.append("venueTitle", venueTitle);

      await updateVenue({
        id: venueId,
        formData,
      }).unwrap();

      toast.success("Venue updated successfully");

      handleClose();
    } catch (err) {
      console.log(err);

      toast.error("Update failed");
    }
  };

  const handleClose = () => {
    setVenueTitle("");

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
          value={venueTitle}
          onChange={(e) =>
            setVenueTitle(e.target.value)
          }
        />

        <div className="flex">
          <div className="flex-1">
            <Button
              name={
                isLoading
                  ? "Updating..."
                  : "Update Venue"
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