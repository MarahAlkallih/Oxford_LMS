import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddTaskModal } from "../../../../../../components/Course/Tasks/AddTasksModal";
import { Button } from "../../../../../../components/Buttons/SubmitBtn";
import { useGetTasksQuery } from "../../../../../../services/courses/tasks/taskQuery";
import { EditIcon, DeleteIcon, VisibilityIcon } from "../../../../../../components/Icons";
import { DeleteTaskModal } from "../../../../../../components/Course/Tasks/DeleteTask";

interface TasksProps {
  courseId: number;
}

export const TasksPage = ({ courseId }: TasksProps) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const navigate = useNavigate();
const [isOpenDelete,setIsOpenDelete]=useState(false)
const [Id,setId]=useState(0)
  const { data, isLoading: isLoadData } = useGetTasksQuery({ id: courseId });
  const tasksList = Array.isArray(data) ? data : data|| [];
   
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-gray-150 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Tasks</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage and publish tasks for students
          </p>
        </div>
        <div>
             <Button name="Add Task" onClick={() => setIsOpenAdd(true)} />
        </div>
       
      </div>

      {/* Cards List Grid */}
      {isLoadData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-52 bg-gray-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : tasksList.length === 0 ? (
        <div className="p-12 text-center bg-white border border-gray-150 rounded-3xl space-y-2">
          <p className="text-sm font-bold text-gray-700">No Records Found</p>
          <p className="text-xs text-gray-400">
            There are currently no tasks recorded for this course.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasksList.map((item: any) => (
            <div
              key={item.id}
              className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
            >
              {/* Header & Action Icons */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-xl uppercase tracking-wider">
                    Task #{item.id}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-2 capitalize">
                    {item.title}
                  </h3>
                </div>

                {/* Top Action Icons */}
                <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-150">
                  <button
                    onClick={() => navigate(`tasks/${item.id}`)}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 rounded-xl hover:bg-white transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <VisibilityIcon />
                  </button>
                  <button
                    onClick={() => navigate(`/tasks/edit/${item.id}`)}
                    className="p-1.5 text-gray-500 hover:text-amber-600 rounded-xl hover:bg-white transition-colors cursor-pointer"
                    title="Edit Task"
                  >
                    <EditIcon />
                  </button>
                  <button
                  onClick={()=>{setIsOpenDelete(true),setId(item.id)}}
                    className="p-1.5 text-gray-500 hover:text-red-600 rounded-xl hover:bg-white transition-colors cursor-pointer"
                    title="Delete Task"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>

              {/* Task Details Section */}
              <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
                <p className="text-gray-500 line-clamp-2 text-xs leading-relaxed">
                  {item.description || "No description provided."}
                </p>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-400 font-semibold">Max Score</span>
                  <span className="font-extrabold text-indigo-600">
                    {item.maxScore} pts
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Due Date</span>
                  <span className="font-bold text-gray-800">
                    {formatDate(item.dueDate)}
                  </span>
                </div>
              </div>

              {/* Attachment Section */}
              {item.filePath && (
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-semibold">Attachment</span>
                  <a
                    href={`/${item.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline font-bold truncate max-w-[170px]"
                  >
                    {item.filePath.split("/").pop()}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        open={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        courseId={courseId}
      />
      <DeleteTaskModal
      open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        id={Id}
      />
    </div>
  );
};