import type { Venue } from "../../types/Venues";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

interface Props {
  venue: Venue;
  onDelete: (id: number) => void;
  onEditTitle: (venue: Venue) => void;
  onEditImage: (venue: Venue, file?: File) => void;
  onToggleActive: (id: number) => void;
  isUpdatingImage?: boolean;
  isActivating?: boolean;
  inactiveMode?: boolean;
}

export const VenueCard = ({
  venue,
  onDelete,
  onEditTitle,
  onEditImage,
  onToggleActive,
  isUpdatingImage,
}: Props) => {
  return (
    <div
      className={`rounded-xl shadow-md p-4 bg-white border transition-all duration-300 h-full ${
        venue.isActive
          ? "border-(--main-color)"
          : "border-gray-300 opacity-75"
      }`}
    >
      <div className="flex flex-col items-center text-center gap-4 h-full">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={`http://153.92.210.41:3000/${venue.imagePath}`}
            alt={venue.venueTitle}
            className={`w-24 h-24 rounded-full object-cover border-2 border-(--main-color)
            ${isUpdatingImage ? "opacity-50" : ""}`}
          />

          {isUpdatingImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-7 h-7 border-4 border-gray-300 border-t-(--main-color) rounded-full animate-spin" />
            </div>
          )}

          {/* EDIT IMAGE */}
          <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
            <EditIcon fontSize="small" />

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                onEditImage(venue, file);
              }}
            />
          </label>
        </div>

        {/* TITLE */}
        <div className="w-full">
          <h3
            className="font-semibold text-lg break-words whitespace-normal"
            title={venue.venueTitle}
          >
            {venue.venueTitle}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {venue.isActive ? "Active" : "Inactive"}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap justify-center gap-2 mt-auto w-full">

          {/* EDIT TITLE */}
          <button
            onClick={() => onEditTitle(venue)}
            className="bg-yellow-500 text-white px-3 py-2 cursor-pointer rounded-md hover:opacity-90 transition"
            title="Edit Title"
          >
            <EditIcon fontSize="small" />
          </button>

          {/* DELETE */}
          <button
            onClick={() => onDelete(venue.id)}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer hover:opacity-90 transition"
            title="Delete Venue"
          >
            <DeleteIcon fontSize="small" />
          </button>

          {/* TOGGLE ACTIVE */}
          <button
            onClick={() => onToggleActive(venue.id)}
            className="bg-green-500 text-white px-3 py-2 rounded-md cursor-pointer hover:opacity-90 transition flex items-center gap-1"
            title={
              venue.isActive
                ? "Make Inactive"
                : "Make Active"
            }
          >
            {venue.isActive ? (
              <>
                <ToggleOffIcon fontSize="small" />
                <span className="text-xs">Inactive</span>
              </>
            ) : (
              <>
                <ToggleOnIcon fontSize="small" />
                <span className="text-xs">Active</span>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};