import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetTrainingPlanByIdQuery,

  useUpdateTrainingPlanMutation,
} from "../../../services/traininigPlan/getTrainingplan";



import EditIcon from "@mui/icons-material/Edit";


export const TrainingPlanDetails = () => {
  const { id } = useParams();
 

  const planId = Number(id);

  const { data, isLoading } = useGetTrainingPlanByIdQuery(planId);
 
  const [updatePlan] = useUpdateTrainingPlanMutation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingFile, setIsUpdatingFile] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Not found</p>;

  
const handleImageUpdate = async (file: File) => {
  setIsUpdating(true);

  const formData = new FormData();
  formData.append("image", file);

  try {
    await updatePlan({ id: planId, formData }).unwrap();

    toast.success("Image updated successfully");
  } catch (err) {
    toast.error("Update failed");
  } finally {
    setIsUpdating(false);
  }
};

const handleFileUpdate = async (file: File) => {
  setIsUpdatingFile(true);

  const formData = new FormData();
  formData.append("file", file);

  try {
    await updatePlan({ id: planId, formData }).unwrap();

    toast.success("File updated successfully");
  } catch (err) {
    toast.error("Update failed");
  } finally {
    setIsUpdatingFile(false);
  }
};
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">

    

      {/* TITLE + DELETE */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Training Plan Details</h1>

        
      </div>

      {/* IMAGE + EDIT */}
      <div className="relative flex justify-center mt-6">
  <img
    src={data.imageUrl}
    className={`w-40 h-40 rounded-full object-cover border ${
      isUpdating ? "opacity-50" : ""
    }`}
  />

  {isUpdating && (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-[#4B5945] rounded-full animate-spin" />
    </div>
  )}


        <label className="absolute bottom-2 right-[40%] bg-white p-2 rounded-full shadow cursor-pointer">
          <EditIcon className="text-gray-700" />

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleImageUpdate(e.target.files[0])
            }
          />
        </label>
      </div>

      {/* INFO */}
      <div className="mt-6 space-y-2 text-gray-700">
        <p><b>ID:</b> {data.id}</p>
        <p><b>Added By:</b> {data.account.firstName}</p>
        <p><b>Email:</b> {data.account.email}</p>
        <p><b>Date:</b> {new Date(data.addDate).toLocaleString()}</p>
      </div>

      {/* FILE + EDIT */}
    <div className="mt-6 flex gap-3 items-center">
  <a
    href={data.fileUrl}
    target="_blank"
    className="flex-1 text-center bg-[#4B5945] text-white py-2 rounded-md"
  >
    Open File
  </a>

  <label className="bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
    <EditIcon />

    <input
      type="file"
      hidden
      accept=".pdf,.doc,.docx"
      onChange={(e) =>
        e.target.files?.[0] && handleFileUpdate(e.target.files[0])
      }
    />
  </label>
</div>
    </div>
  );
};