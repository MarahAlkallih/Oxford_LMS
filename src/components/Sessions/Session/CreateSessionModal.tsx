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
import { useGetLocationsQuery } from "../../../services/courses/location/locationQuery";

interface CreateSessionModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

// دالة مساعدة لتحويل التاريخ المحلي إلى UTC ISO string
const toUTC = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "" : date.toISOString();
};

export const CreateSessionModal = ({
  open,
  onClose,
  id,
}: CreateSessionModalProps) => {
  const { data } = useGetCourseTrainersQuery({ id: id });
  const { data: prio } = useGetSessionPrioQuery({});
  const { data: allTypes } = useGetSessionTypesQuery({});
  const { data: locations } = useGetLocationsQuery();
  const [createSession, { isLoading }] = useCreateSessionMutation();

  const [session, setSession] = useState<{
    courseId: number;
    trainerId: number | null;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    sessionNumber: number;
    sessionTypeId: number;
    sessionPriorityId: number;
    locationId: number | null;
  }>({
    courseId: id,
    trainerId: null,
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    sessionNumber: 0,
    sessionTypeId: 0,
    sessionPriorityId: 0,
    locationId: null,
  });

  const handelCreateSession = async () => {
    try {
      // تحويل جميع التواريخ للتوقيت العالمي (UTC) قبل الإرسال
      const payload = {
        ...session,
        date: toUTC(session.date),
        startTime: toUTC(session.startTime),
        endTime: toUTC(session.endTime),
      };
console.log("payloood",payload)
      await createSession(payload).unwrap();
      toast.success("Session Created Successfully");

      setSession({
        courseId: id,
        trainerId: null,
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        sessionNumber: 0,
        sessionTypeId: 0,
        sessionPriorityId: 0,
        locationId: null,
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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
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
            value={session.date}
            onChange={(e) =>
              setSession({
                ...session,
                date: e.target.value,
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
            value={session.startTime}
            onChange={(e) =>
              setSession({
                ...session,
                startTime: e.target.value,
              })
            }
          />

          {/* End Time */}
          <InputField
            label="End Time"
            type="datetime-local"
            value={session.endTime}
            onChange={(e) =>
              setSession({
                ...session,
                endTime: e.target.value,
              })
            }
          />

          {/* Select Session Type & Location */}
          <div className="flex gap-2 md:col-span-2">
            <CustomDropdown
              options={allTypes?.map((t) => t.name) || []}
              placeholder="Select Session Type"
              onSelect={(value) => {
                const selected = allTypes?.find((t) => t.name === value);
                setSession({
                  ...session,
                  sessionTypeId: selected?.id || 0,
                });
              }}
            />
            <CustomDropdown
              options={locations?.map((l) => l.cityName) || []}
              placeholder="Select Location (for onsite)"
              onSelect={(value) => {
                const selected = locations?.find((l) => l.cityName === value);
                setSession({
                  ...session,
                  locationId: selected?.id ?? 0,
                });
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 md:col-span-2 mt-4 pt-4 border-t border-gray-100">
            <Button
              name={isLoading ? "Creating..." : "Create"}
              onClick={handelCreateSession}
            />
            <CancelBtn
              name="Cancel"
              onClick={() => {
                onClose();
                setSession({
                  courseId: id,
                  trainerId: null,
                  title: "",
                  date: "",
                  startTime: "",
                  endTime: "",
                  sessionNumber: 0,
                  sessionTypeId: 0,
                  sessionPriorityId: 0,
                  locationId: null,
                });
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};