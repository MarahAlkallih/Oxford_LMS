import { useState } from "react";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { AddReqTypeModal } from "../../../components/Conversation/Requests/AddRequestModal";
import { useGetReqsQuery } from "../../../services/conversation/SuperAdmin/requestsMutation";
import { DeleteIcon, EditIcon } from "../../../components/Icons";
import { EditRequestTypeModal } from "../../../components/Conversation/Requests/EditRequestModal";

export const RequestsType = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const { data: reqs, isLoading } = useGetReqsQuery({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [id, setId] = useState<number>(0);

  const handleEdit = (id: number | string) => {
    setId(Number(id));
    setIsEditOpen(true);
  };

  const handleDelete = (id: number | string) => {
    // يمكنك استدعاء mutation الحذف هنا
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Request Types</h1>
          <p className="text-xs text-gray-500 mt-1">
        Manage Requests Types
          </p>
        </div>
        <div>
          <Button name={"Add Type"} onClick={() => setIsOpenAdd(true)} />
        </div>
      </div>

      {/* Loading & Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500 font-medium text-sm">Loading data...</p>
        </div>
      ) : reqs?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-500 text-sm">
          No request types found.
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reqs?.map((r: any) => (
            <div
              key={r.id}
              className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between gap-3 group"
            >
              {/* Request Type Name & Badge */}
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-(--main-color) flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100">
                  #{r.id}
                </span>
                <span className="font-semibold text-gray-800 text-sm truncate">
                  {r.name}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => handleEdit(r.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-(--main-color) hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AddReqTypeModal
        open={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
      />
      <EditRequestTypeModal
              open={isEditOpen}
              onClose={() => setIsEditOpen(false)} requestId={id}      
      />
    </div>
  );
};