import { useEffect, useState } from "react";
import { Button } from "../Buttons/SubmitBtn";
import { InputField } from "../Fields/InputField";
import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { useGetLocationByIdQuery } from "../../services/courses/location/locationQuery";
import { useEditLocationMutation } from "../../services/courses/location/locatonMutation";

interface EditLocationModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export const EditLoacationModal = ({
  open,
  onClose,
  id,
}: EditLocationModalProps) => {
const { data, isLoading:useGet, isFetching } =
  useGetLocationByIdQuery(
    { id },
    {
      skip: !open,
      refetchOnMountOrArgChange: true,
    }
  );
   console.log(data)
  const [edit, { isLoading }] = useEditLocationMutation();

  const [location, setLocation] = useState({
    cityName: "",
    areaName: "",
  });

useEffect(() => {
  if (open && data) {
    setLocation({
      cityName: data.cityName,
      areaName: data.areaName,
    });
  }
}, [data, open]);

  const handleEditVenue = async () => {
    try {
     await edit({
  id,
  data: {
    cityName: location.cityName,
    areaName: location.areaName,
  },
}).unwrap();

      toast.success("Location Updated Successfully");

      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Failed To Update Location");
    }
  };

 const handleClose = () => {
  setLocation({
    cityName: "",
    areaName: "",
  });

  onClose();
};

if ( isFetching) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 text-center">
        Loading...
      </div>
    </Modal>
  );
}
  return (
    <Modal open={open} onClose={handleClose}>
      
      <div className="flex flex-col gap-4 p-4">

        <h2 className="text-xl font-semibold text-center">
          Edit Location
        </h2>

        <div className="flex flex-col items-center gap-4">

          <div className="w-full max-w-[300px]">
            <InputField
              label="City Name"
              value={location.cityName}
              onChange={(e) =>
                setLocation({
                  ...location,
                  cityName: e.target.value,
                })
              }
            />
          </div>

          <div className="w-full max-w-[300px]">
            <InputField
              label="Area Name"
              value={location.areaName}
              onChange={(e) =>
                setLocation({
                  ...location,
                  areaName: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="flex gap-2">

          <div className="flex-1">
            <Button
              name={isLoading ? "Updating..." : "Update"}
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