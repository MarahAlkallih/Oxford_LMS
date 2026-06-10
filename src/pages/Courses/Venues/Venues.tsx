import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { AddVenueModal } from "../../../components/VenueComponents/AddVenue";
import { EditTitleModal } from "../../../components/VenueComponents/EditTitle";
import { VenueCard } from "../../../components/VenueComponents/VenueCard";
import { useGetVenuesQuery, useGetUnActiveVenuesQuery } from "../../../services/courses/veneus/getVenues";
import {
  useUpdateVenueMutation,
  useDeleteVenueMutation,
  useInActiveVenueMutation,
} from "../../../services/courses/veneus/mutationVenues";
import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import type { Venue } from "../../../types/Venues";

export const VenuesPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditTitle, setOpenEditTitle] = useState(false);
  const [updatingImageId, setUpdatingImageId] =
    useState<number | null>(null);
  const [selectedVenueId, setSelectedVenueId] =
    useState<number | null>(null);

  const [selectedTitle, setSelectedTitle] = useState("");

  const [deleteVenue] = useDeleteVenueMutation();
  const [updateVenue] = useUpdateVenueMutation();
  const [toggleVenue] = useInActiveVenueMutation();

  const { data, isLoading } = useGetVenuesQuery();
  const { data: inActive } = useGetUnActiveVenuesQuery();

  const handleDelete = async (id: number) => {
    try {
      await deleteVenue({ id }).unwrap();

      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };
  const handleOpenDelete = (id: number) => {
    setSelectedVenueId(id);
    setOpenDeleteModal(true);
  };
  const confirmDelete = async () => {
    if (!selectedVenueId) return;

    try {
      await deleteVenue({
        id: selectedVenueId,
      }).unwrap();

      toast.success("Deleted successfully");

      setOpenDeleteModal(false);
      setSelectedVenueId(null);
    } catch {
      toast.error("Delete failed");
    }
  };
  const handleEditTitle = (venue: Venue) => {
    setSelectedVenueId(venue.id);
    setSelectedTitle(venue.venueTitle);
    setOpenEditTitle(true);
  };

  const handleEditImage = async (
    venue: Venue,
    file?: File
  ) => {
    if (!file) return;

    setUpdatingImageId(venue.id);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await updateVenue({
        id: venue.id,
        formData,
      }).unwrap();

      toast.success("Image updated successfully");
    } catch {
      toast.error("Update failed");
    } finally {
      setUpdatingImageId(null);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleVenue({ id }).unwrap();

      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-semibold">
          Venues
        </h1>
        <div>
          <Button
            name="Add Venue"
            onClick={() => setOpenAddModal(true)}
          />
        </div>

      </div>
<div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onDelete={handleOpenDelete}
            onEditTitle={handleEditTitle}
            onEditImage={handleEditImage}
            onToggleActive={handleToggle}
            isUpdatingImage={updatingImageId === venue.id}
          />

    
        ))}
      </div>
</div>
      <AddVenueModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />

      <EditTitleModal
        open={openEditTitle}
        onClose={() => setOpenEditTitle(false)}
        venueId={selectedVenueId}
        currentTitle={selectedTitle}
      />
      <ConfirmModal
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedVenueId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};