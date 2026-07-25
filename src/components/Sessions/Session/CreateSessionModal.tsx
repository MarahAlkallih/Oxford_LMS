import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { toast } from "react-toastify";
import { useCreateSessionMutation } from "../../../services/sessions/admin/sessionMutation";
import { useGetCourseTrainersQuery } from "../../../services/courses/Admin-courses/Course-Trainers/courseTrainersQuery";
import CustomDropdown from "../../Fields/DropDown";
import { useGetSessionTypesQuery } from "../../../services/sessions/type/typeQuery";
import { useGetSessionPrioQuery } from "../../../services/sessions/priorities/prioritiesQuery";

interface CreateSessionModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export const CreateSessionModal = ({
  open,
  onClose,
  id,
}: CreateSessionModalProps) => {
  const { data } = useGetCourseTrainersQuery({ id: id });
  const { data: prio } = useGetSessionPrioQuery({});
  const { data: types } = useGetSessionTypesQuery({});
  const [createSession, { isLoading }] = useCreateSessionMutation();

  const [session, setSession] = useState({
    courseId: id,
    trainerId: 0,
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    sessionNumber: 0,
    sessionTypeId: 0,
    sessionPriorityId: 0,
  });

  const handelCreateSession = async () => {
    try {
      await createSession(session).unwrap();
      toast.success("Session Created Successfully");
      setSession({
        courseId: id,
        trainerId: 0,
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        sessionNumber: 0,
        sessionTypeId: 0,
        sessionPriorityId: 0,
      });
      onClose();
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 max-w-2xl w-full mx-auto bg-white rounded-2xl">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
          Create New Session
        </h2>

        {/* 💡 تحويل الحاوية لشبكة (Grid) ثنائية الأعمدة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Title - يأخذ العرض الكامل */}
          <div className="md:col-span-2">
            <InputField
              label="Title"
              value={session.title}
              onChange={(e) =>
                setSession({ ...session, title: e.target.value })
              }
            />
          </div>

          {/* Session Number */}
          <InputField
            label="Number"
            type="number"
            value={String(session.sessionNumber)}
            onChange={(e) =>
              setSession({
                ...session,
                sessionNumber: Number(e.target.value),
              })
            }
          />

          {/* Select Trainer */}
          <CustomDropdown
            options={data?.map((t) => t.trainerName) || []}
            placeholder="Select Trainer"
            onSelect={(value) => {
              const selected = data?.find((t) => t.trainerName === value);
              setSession({
                ...session,
                trainerId: selected?.trainerId || 0,
              });
            }}
          />

          {/* Date */}
          <InputField
            label="Date"
            type="datetime-local"
            value={session.date ? session.date.slice(0, 16) : ""}
            onChange={(e) =>
              setSession({
                ...session,
                date: e.target.value
                  ? new Date(e.target.value).toISOString()
                  : "",
              })
            }
          />

          {/* Select Priority */}
          <CustomDropdown
            options={prio?.map((p) => p.name) || []}
            placeholder="Select Priority"
            onSelect={(value) => {
              const selected = prio?.find((p) => p.name === value);
              setSession({
                ...session,
                sessionPriorityId: selected?.id || 0,
              });
            }}
          />

          {/* Start Time */}
          <InputField
            label="Start Time"
            type="datetime-local"
            value={session.startTime ? session.startTime.slice(0, 16) : ""}
            onChange={(e) =>
              setSession({
                ...session,
                startTime: e.target.value
                  ? new Date(e.target.value).toISOString()
                  : "",
              })
            }
          />

          {/* End Time (تم تصحيح القراءة من session.endTime) */}
          <InputField
            label="End Time"
            type="datetime-local"
            value={session.endTime ? session.endTime.slice(0, 16) : ""}
            onChange={(e) =>
              setSession({
                ...session,
                endTime: e.target.value
                  ? new Date(e.target.value).toISOString()
                  : "",
              })
            }
          />

          {/* Select Session Type - يأخذ العرض الكامل */}
          <div className="md:col-span-2">
            <CustomDropdown
              options={types?.map((t) => t.name) || []}
              placeholder="Select Session Type"
              onSelect={(value) => {
                const selected = types?.find((t) => t.name === value);
                setSession({
                  ...session,
                  sessionTypeId: selected?.id || 0,
                });
              }}
            />
          </div>

          {/* الأزرار السفليّة - محاذاة لليمين بعرض كامل */}
          <div className="flex justify-end gap-3 md:col-span-2 mt-4 pt-4 border-t border-gray-100">
              <Button
              name={isLoading ? "Creating..." : "Create"}
              onClick={handelCreateSession}
              
            />
            <CancelBtn name="Cancel" onClick={()=>{onClose(),

                 setSession({
        courseId: id,
        trainerId: 0,
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        sessionNumber: 0,
        sessionTypeId: 0,
        sessionPriorityId: 0,
      });
            }} />
          
          </div>

        </div>
      </div>
    </Modal>
  );
};