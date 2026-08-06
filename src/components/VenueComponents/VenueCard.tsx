import type { Venue } from "../../types/Venues";
import {DeleteIcon} from "../Icons/index"
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { EditIcon } from "../Icons";
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
      className={`   rounded-xl shadow-md p-4 bg-white border transition-all duration-300 h-full ${
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
            <EditIcon size={16} />

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
             className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400 transition"
            title="Edit Title"
          >
           <EditIcon size={24}  color="#ff4d1c" />
          </button>

          {/* DELETE */}
          <button
            onClick={() => onDelete(venue.id)}
            className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400 transition"
            title="Delete Venue"
          >
            <DeleteIcon  size={24}  color="#ff4d1c"  />
          </button>

          {/* 💡 التعديل هنا: يظهر الزر فقط إذا كان العنصر غير نشط (Inactive) */}
          {!venue.isActive && (
            <button
              onClick={() => onToggleActive(venue.id)}
              className="bg-green-500 text-white px-3 py-2 rounded-md cursor-pointer 
              hover:opacity-90 transition flex items-center gap-1"
              title="Activate Venue"
            >
              <ToggleOnIcon fontSize="small" />
              <span className="text-xs">Activate</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
};