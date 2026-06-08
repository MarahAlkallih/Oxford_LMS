import { useState,useEffect } from "react";
import { Button } from "../Buttons/SubmitBtn";
import { InputField } from "../Fields/InputField";
import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { useAddLocationMutation } from "../../services/courses/location/locatonMutation";
interface AddLocationModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddLoacationModal = ({ open, onClose }: AddLocationModalProps) => {
    const [location, setLocation] = useState({
        cityName: "",
        areaName: "",
    });
    const [add,{isLoading,isSuccess}]=useAddLocationMutation();
    
    const handleAddVenue = async () => {
  try {
   if(location.cityName ==="" || location.areaName===""){
    return toast.error("Please fill all the fields")

   }
   console.log(location)
    const res = await add({
        "cityName":location.cityName,
        "areaName":location.areaName
    }).unwrap();

    console.log(res);
   
    onClose();

    setLocation({
      cityName: "",
      areaName: "",
    });

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  if (isSuccess) {
    toast.success("Location Added Successfully");
  }
}, [isSuccess]);
     const handleClose = () => {
  setLocation({
    cityName: "",
    areaName: "",
  });



  onClose();
};

    return (
        <Modal open={open} onClose={handleClose}>
            <div className="flex  flex-col gap-4 p-4 ">

                <h2 className="text-xl font-semibold text-center">
                    Add New Venue
                </h2>
               <div className="flex flex-col items-center gap-4">
  <div className="w-full max-w-[300px]">
    <InputField
      label="City Name"
      value={location.cityName}
      onChange={(e) =>
        setLocation({ ...location, cityName: e.target.value })
      }
    />
  </div>

  <div className="w-full max-w-[300px]">
    <InputField
      label="Area Name"
      value={location.areaName}
      onChange={(e) =>
        setLocation({ ...location, areaName: e.target.value })
      }
    />
  </div>
</div>
                <div className="flex">

                    <div className="flex-1">
                        <Button
                            name={isLoading ? "Adding..." : "Add Location"}
                            onClick={handleAddVenue}
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
}
