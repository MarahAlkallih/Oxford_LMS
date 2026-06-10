
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import type { Category } from "../../types/Category";

interface Props {
    category: Category;
    onDelete: (id: number) => void;
    onEditTitle: (category: Category) => void;
    onEditImage: (category: Category, file?: File) => void;
    onToggleActive: (id: number) => void;
    isUpdatingImage?: boolean;
    inactiveMode?: boolean;
    isActivating?: boolean;
}

export const CategoryCard = ({
    category,
    onDelete,
    onEditTitle,
    onEditImage,
    onToggleActive,
    isUpdatingImage,
    inactiveMode,
    isActivating
}: Props) => {
    return (
        <div
            className={`rounded-xl shadow-md p-4 bg-white border transition-all duration-300 w-full h-full ${category.isActive
                    ? "border-(--main-color)"
                    : "border-gray-300 opacity-75"
                }`}
        >
            <div className="flex  items-center text-center gap-4 h-full">

                {/* IMAGE */}
                <div className="relative">
                    <img
                        src={category.imageUrl}
                        alt={category.title}
                        className={`w-24 h-24 rounded-full object-cover border-2 border-(--main-color)
            ${isUpdatingImage ? "opacity-50" : ""}`}
                    />

                    {isUpdatingImage && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-7 h-7 border-4 border-gray-300 border-t-(--main-color) rounded-full animate-spin" />
                        </div>
                    )}

                    {/* EDIT IMAGE */}
                    {!inactiveMode ?  <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
                        <EditIcon fontSize="small" />

                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                onEditImage(category, file);
                            }}
                        />
                    </label>
                : null }
                   </div>

                {/* TITLE */}
                <div className="p-2">
                    <h3
                        className="font-semibold text-lg wrap-break-word whitespace-normal"
                        title={category.title}
                    >
                        {category.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 ">
                        {category.isActive ? "Active" : "Inactive"}
                    </p>
                </div>

                {/* ACTIONS */}
                {!inactiveMode ? 
                 <div className="flex flex-wrap justify-end gap-2 mt-auto w-full">

                    {/* EDIT TITLE */}
                  
                    <button
                        onClick={() => onEditTitle(category)}
                        className="bg-blue-900 text-white px-3 py-2 cursor-pointer rounded-md hover:opacity-90 transition"
                        title="Edit Title"
                    >
                        <EditIcon fontSize="small" />
                    </button>

                    {/* DELETE */}
                    <button
                        onClick={() => onDelete(category.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer hover:opacity-90 transition"
                        title="Delete Category"
                    >
                        <DeleteIcon fontSize="small" />
                    </button> 
                    </div>:
                    null
            
            }
               

                    {/* TOGGLE ACTIVE */}
                    {
                        inactiveMode ? (
                          <button
  disabled={isActivating}
  onClick={() => onToggleActive(category.id)}
  className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
>
  {isActivating ? (
    <>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <span className="text-xs">
        Activating...
      </span>
    </>
  ) : (
    <>
      <ToggleOnIcon fontSize="small" />
      <span className="text-xs">
        Activate
      </span>
    </>
  )}
</button>
                        ) : (
                            null
                            // <button
                            //     onClick={() => onToggleActive(category.id)}
                            //     className="bg-orange-500 text-white px-3 py-2 rounded-md flex items-center gap-1"
                            // >
                            //     <ToggleOffIcon fontSize="small" />
                            //     <span className="text-xs">Deactivate</span>
                            // </button>
                        )
                    }
                </div>
            </div>
        
    );
};