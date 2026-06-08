import { useState } from "react";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { AddLoacationModal } from "../../../components/Location/AddLocationModal";
import { useGetLocationsQuery } from "../../../services/courses/location/locationQuery";
import { LocationCard } from "../../../components/Location/LocationCard";
import { EditLoacationModal  } from "../../../components/Location/EditLocationModal";
import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import { useDeleteLocationMutation } from "../../../services/courses/location/locatonMutation";
import { toast } from "react-toastify";
export const LocationPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
   const [openEditModal,setOpenEditModal]=useState(false);
   const [openDeleteModal,setOpenDeleteModal]=useState(false);
   const [selectedId,setSelectedId]=useState(0);
  const { data, isLoading } = useGetLocationsQuery();
 const [
  deleteLocattion,
  {
    isLoading: isDeleting,
  },
] = useDeleteLocationMutation();
    const confirmDelete = async () => {
      if (!selectedId) return;
    
      try {
        await deleteLocattion({
          id: selectedId,
        }).unwrap();
       toast.success("Deleted successfully");
       
    
        setOpenDeleteModal(false);
        setSelectedId(0);
      } catch {
        toast.error("Delete failed");
      }
    };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Locations
        </h1>
      <div>
         <Button
          name="Add Location"
          onClick={() => setOpenAddModal(true)}
        />
      </div>
       
      </div>
       {isLoading ?<p>Loading</p> :
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.map((location) => (
        <LocationCard
  key={location.id}
  location={location}
  onEdit={(location) => {
    setSelectedId(location.id);
    setOpenEditModal(true);
  }}
  onDelete={(id) => {
    setSelectedId(id);
    setOpenDeleteModal(true);
  }}
/>
        ))}
      </div>

       }
      
      <AddLoacationModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
      <EditLoacationModal
      open={openEditModal}
      id={selectedId}
      onClose={()=>setOpenEditModal(false)}
      />
      <ConfirmModal
  open={openDeleteModal}
  onClose={() => {
    setOpenDeleteModal(false);
    setSelectedId(0);
  }}
  onConfirm={confirmDelete}
  isLoading={isDeleting}
/>
    </div>
  );
};