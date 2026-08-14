import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";

import { Button } from "../../../components/Buttons/SubmitBtn";
import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import {
  useDeleteTrainingPlanMutation,
  useGetTrainingPlansQuery,
} from "../../../services/traininigPlan/getTrainingplan";
import { ErrorHandler } from "../../../utils/ErrorHandler";

export const TrainingPlanPage = () => {
  const { data, isLoading, isError } = useGetTrainingPlansQuery();
  const [deleteTrainingPlan] =
    useDeleteTrainingPlanMutation();

  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteTrainingPlan(selectedId).unwrap();

      toast.success(
        "Training plan deleted successfully"
      );

      setOpenDeleteModal(false);
      setSelectedId(null);
    } catch (error) {
     ErrorHandler.show(error)
    }
  };

  if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Failed to load data</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Training Plans
        </h1>
       <div>
         <Button
          name="Add Training Plan"
          onClick={() => navigate("add-files")}
        />
       </div>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
          >
            {/* IMAGE */}
            <div className="flex justify-center">
              <img
                src={plan.imageUrl}
                className="w-20 h-20 rounded-full object-cover border"
              />
            </div>

            <p className="text-center text-sm">
              {plan.account.firstName}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`${plan.id}`)}
                className="flex-1 bg-[#4B5945] text-white py-2 rounded-md hover:opacity-90"
              >
                View Details
              </button>

              <button
                onClick={() =>
                  handleDeleteClick(plan.id)
                }
                className="bg-red-500 text-white px-3 rounded-md hover:bg-red-600"
              >
                <Delete />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedId(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};