import { useState } from "react";
import CustomDropdown from "../../../../../../components/Fields/DropDown";
import { Modal } from "../../../../../../components/global/Modals";

import { useGetReqsQuery } from "../../../../../../services/conversation/SuperAdmin/requestsMutation";
import { useGetAcceptedRegistrationsQuery } from "../../../../../../services/courses/Admin-courses/course-registration/courseRegisterQuery";
import { useGetCourseTrainersQuery } from "../../../../../../services/courses/Admin-courses/Course-Trainers/courseTrainersQuery";
import { useGetSupervisorsForSessionQuery } from "../../../../../../services/sessions/supervisor/admin/supervisorQuery";
import { InputField } from "../../../../../../components/Fields/InputField";
import {useCreateGroupChatMutation} from "../../../../../../services/conversation/chats/chatsMutations"
import { CancelBtn } from "../../../../../../components/Buttons/CancelBtn";
import { Button } from "../../../../../../components/Buttons/SubmitBtn";
interface GroupProps {
  sessionId: number;
  courseId: number;
  open: boolean;
  onClose: () => void;
}

const TARGET_ROLES = [
  "TRAINER",
  "SUPERVISOR",
  "TRAINEE",
  "CREATOR",
];

export const GroupChat = ({
  sessionId,
  courseId,
  open,
  onClose,
}: GroupProps) => {

  // =========================
  // APIs
  // =========================

  const { data: reqs, isLoading } = useGetReqsQuery({});

  const { data: supervisorsData } =
    useGetSupervisorsForSessionQuery(
      { id: sessionId },
      { skip: !sessionId }
    );

  const { data: acceptedData } =
    useGetAcceptedRegistrationsQuery(
      { courseId },
      { skip: !courseId }
    );

  const { data: trainersData } =
    useGetCourseTrainersQuery(
      { id: courseId },
      { skip: !courseId }
    );


  // =========================
  // Form State
  // =========================

  const [subject, setSubject] = useState("");

  const [selectedRequestType, setSelectedRequestType] =
    useState<number | null>(null);

const [selectedRoles, setSelectedRoles] =
  useState<string[]>([]);

  const [selectedUsers, setSelectedUsers] = useState<
    { id: number; name: string }[]
  >([]);


  // =========================
  // People
  // =========================

  const people = [
    ...(supervisorsData ?? []).map((item) => ({
      id: item.adminId,
      name: `${item.firstName} ${item.lastName}`,
    })),

    ...(acceptedData ?? []).map((item) => ({
      id: item.userId,
      name: item.studentName,
    })),

    ...(trainersData ?? []).map((item) => ({
      id: item.id,
      name: item.trainerName ?? "",
    })),
  ];


  // =========================
  // Select User
  // =========================

  const handleSelectUser = (value: string) => {

    const selected = people.find(
      (p) => p.name === value
    );

    if (!selected) return;

    // منع التكرار
    if (
      selectedUsers.some(
        (user) => user.id === selected.id
      )
    ) {
      return;
    }

    setSelectedUsers((prev) => [
      ...prev,
      selected,
    ]);
  };


  // =========================
  // Remove User
  // =========================

  const removeUser = (id: number) => {

    setSelectedUsers((prev) =>
      prev.filter(
        (user) => user.id !== id
      )
    );
  };


  // =========================
  // Final Body
  // =========================

  const body = {
    subject: subject,

    requestTypeId: selectedRequestType,

    courseId: courseId,

courseTargetRoles: selectedRoles,

    participantAccountIds:
      selectedUsers.map(
        (user) => user.id
      ),
  };


  // =========================
  // Print Body
  // =========================
  const [createGroupChat, {isLoading:isLoadCreate}] = useCreateGroupChatMutation();
  const handlePrintBody = async() => {
    await createGroupChat(body);
    console.log(
      "BODY TO SEND:",
      body
    );

    console.log(
      JSON.stringify(body, null, 2)
    );
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
    >

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >

        {/* ================= Subject ================= */}

        <InputField
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
        />


        {/* ================= Request Type ================= */}

        <CustomDropdown
          placeholder={
            isLoading
              ? "Loading ..."
              : "Select request type"
          }

          options={
            reqs?.map(
              (t) => t.name
            ) ?? []
          }

          onSelect={(value) => {

            const selected =
              reqs?.find(
                (t) =>
                  t.name === value
              );

            if (selected) {
              setSelectedRequestType(
                selected.id
              );
            }
          }}
        />


        {/* ================= Target Role ================= */}

      <CustomDropdown
  placeholder="Select target roles"
  options={TARGET_ROLES}
  onSelect={(value) => {

    if (!selectedRoles.includes(value)) {
      setSelectedRoles((prev) => [
        ...prev,
        value,
      ]);
    }

  }}
/>


        {/* ================= Users ================= */}

        <CustomDropdown
          placeholder="Select users"

          options={
            people.map(
              (p) => p.name
            )
          }

          onSelect={handleSelectUser}
        />


        {/* ================= Selected Users ================= */}

        <div
          style={{
            marginTop: "10px",
          }}
        >

          {selectedUsers.map(
            (user) => (

              <div
                key={user.id}
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  marginBottom: "5px",
                }}
              >

                <span>
                  {user.name}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    removeUser(
                      user.id
                    )
                  }
                >
                  ×
                </button>

              </div>
            )
          )}

        </div>


        {/* ================= Print ================= */}
    
           <div className="flex  pt-2">
    
                            <div className="flex-1">
                                <Button
                                    name={isLoadCreate ? "Adding..." : "Add Request"}
                                    onClick={handlePrintBody}
                                />
                            </div>
    
                            <div className="flex-1">
                                <CancelBtn
                                    name="Cancel"
                                    onClick={onClose}
                                />
                            </div>
    
    
                        </div>

      </div>

    </Modal>
  );
};