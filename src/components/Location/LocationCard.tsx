
import type { Location } from "../../types/Location";
import { DeleteIcon, EditIcon } from "../Icons";

interface LocationCardProps {
  location: Location;
  onEdit: (location: Location) => void;
  onDelete: (id: number) => void;
}

export const LocationCard = ({
  location,
  onEdit,
  onDelete,
}: LocationCardProps) => {
  return (
    <div className="bg-white border border-[var(--main-color)] rounded-xl shadow-sm p-4">

      <div className="flex justify-between items-start gap-4">

        <div>
          <h3 className="font-semibold text-lg text-[var(--main-color)]">
            {location.cityName}
          </h3>

          <p className="text-gray-600">
            {location.areaName}
          </p>
        </div>

        <div className="flex gap-2">

          {/* Edit */}
          <button
            onClick={() => onEdit(location)}
            className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
          >
           <EditIcon size={24}  color="#ff4d1c" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(location.id)}
            className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
          >
            <DeleteIcon size={24}  color="#ff4d1c" />
          </button>

        </div>

      </div>

    </div>
  );
};