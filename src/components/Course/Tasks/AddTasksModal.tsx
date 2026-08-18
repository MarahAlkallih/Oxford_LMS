import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { AttachmentUpload } from "../../Exam/Question/AttachmentUpload";
import { useAddTaskMutation } from "../../../services/courses/tasks/taskMutations";
import { ErrorHandler } from "../../../utils/ErrorHandler";
interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  courseId: number;
}

export const AddTaskModal = ({ open, onClose, courseId }: AddTaskModalProps) => {
  // 1️⃣ Local States
  const [task, setTask] = useState({
    title: "",
    description: "",
    maxScore: 0,
    dueDate: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [addTask,{isLoading}]=useAddTaskMutation()
  // 2️⃣ Handle Form Submission
  const handleAddTask = async () => {
    if (!task.title.trim()) {
      toast.warning("Please enter a task title");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create FormData to send file & text inputs
      const formData = new FormData();
      formData.append("title", task.title);
      formData.append("description", task.description);
      formData.append("maxScore", String(task.maxScore));
      formData.append("dueDate", task.dueDate);
    //   formData.append("courseId", String(courseId));

      if (file) {
        formData.append("file", file);
      }

     
    await addTask({id:courseId,formData}).unwrap();

      toast.success("Task Added Successfully");
      handleClose();
    } catch (err) {
    ErrorHandler.show(err)
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3️⃣ Reset form state on close
  const handleClose = () => {
    setTask({
      title: "",
      description: "",
      maxScore: 0,
      dueDate: "",
    });
    setFile(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {/* Scrollable Container with Maximum Height */}
      <div className="p-4 sm:p-6 w-full max-w-2xl max-h-[85vh]  space-y-4">
        <h2 className="text-xl font-bold text-center text-gray-800 border-b border-gray-100 pb-2">
          Add New Task
        </h2>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Task Title (Full Width) */}
          <div className="md:col-span-2">
            <InputField
              label="Task Title"
              value={task.title}
              onChange={(e) =>
                setTask((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>

          {/* Task Description (Full Width) */}
          <div className="md:col-span-2">
            <InputField
              label="Description"
              value={task.description}
              onChange={(e) =>
                setTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          {/* Max Score (Half Width) */}
          <div>
            <InputField
              label="Max Score"
              type="number"
              value={String(task.maxScore)}
              onChange={(e) =>
                setTask((prev) => ({
                  ...prev,
                  maxScore: Number(e.target.value),
                }))
              }
            />
          </div>

          {/* Due Date (Half Width) */}
          <div>
            <InputField
              label="Due Date"
              type="date"
              value={task.dueDate}
              onChange={(e) =>
                setTask((prev) => ({
                  ...prev,
                  dueDate: e.target.value,
                }))
              }
            />
          </div>

          {/* File Attachment Upload (Full Width) */}
          <div className="md:col-span-2">
            <AttachmentUpload file={file} setFile={setFile} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-3 border-t border-gray-100">
          <div className="flex-1">
            <Button
              name={isSubmitting ? "Adding..." : "Add Task"}
              onClick={handleAddTask}
            />
          </div>

          <div className="flex-1">
            <CancelBtn name="Cancel" onClick={handleClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
};