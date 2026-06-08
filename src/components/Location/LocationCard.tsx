import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Location } from "../../types/Location";

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
            className="bg-yellow-500 text-white p-2 rounded-md hover:opacity-90"
          >
            <EditIcon fontSize="small" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(location.id)}
            className="bg-red-500 text-white p-2 rounded-md hover:opacity-90"
          >
            <DeleteIcon fontSize="small" />
          </button>

        </div>

      </div>

    </div>
  );
};