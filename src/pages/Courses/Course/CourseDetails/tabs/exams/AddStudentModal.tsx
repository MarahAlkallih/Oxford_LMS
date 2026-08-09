import React, { useState } from "react";
import { Modal } from "../../../../../../components/global/Modals";
import { Button } from "../../../../../../components/Buttons/SubmitBtn";
import { CancelBtn } from "../../../../../../components/Buttons/CancelBtn";
import { useGetAcceptedRegistrationsQuery } from "../../../../../../services/courses/Admin-courses/course-registration/courseRegisterQuery";
import { useAssignmentTraineesMutation } from "../../../../../../services/exams/assignment/assignmentMutation";
import { ErrorHandler } from "../../../../../../utils/ErrorHandler";
import { toast } from "react-toastify";

// MUI Components for Multi-Select
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface UserToAssignmentProps {
  open: boolean;
  onClose: () => void;
  examEventId: number;
  courseId: number;
}

export const AddUserToAssignment: React.FC<UserToAssignmentProps> = ({
  open,
  onClose,
  examEventId,
  courseId,
}) => {
  // 1️⃣ جلب الطلاب المقبولين في الكورس
  const { data: accepted, isLoading: isLoadAccept } =
    useGetAcceptedRegistrationsQuery({ courseId });
  console.log("accepted",accepted)
  // 2️⃣ Mutation لإسناد الطلاب
  const [assign, { isLoading: isLoadAdd }] = useAssignmentTraineesMutation();

  // 3️⃣ حالة الاحتفاظ بالطلاب المحددين (مصفوفة من العناصر)
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);

  // 4️⃣ دالة الإرسال
  const handleAdd = async () => {
    if (selectedStudents.length === 0) {
      toast.warning(" Choose one at least ");
      return;
    }

    // استخراج مصفوفة الـ IDs فقط
    // ملاحظة: تأكد من اسم الحقل الذي يمثل ID الطالب من الـ API (مثلاً s.id أو s.traineeId أو s.studentId)
    const traineeIds = selectedStudents.map(
      (student) => student.id || student.traineeId || student.studentId
    );

    const payload = {
      examEventId,
      traineeIds,
    };

    try {
        console.log("p",payload)
        console.log("selectedStudents:", selectedStudents);
console.log("traineeIds:", traineeIds);
console.log("examEventId:", examEventId);
console.log("payload:", payload);
      await assign(payload).unwrap();
      toast.success("  Trainees Added Successfully !");
      setSelectedStudents([]); // إعادة ضبط التحديد
      onClose();
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  // إغلاق المودال مع إعادة ضبط الحالة
  const handleClose = () => {
    setSelectedStudents([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="p-2 space-y-4">
        <h1 className="text-xl font-bold text-gray-800">
        Assign Trainees
        </h1>

        {/* Multi-Select Dropdown */}
        <div className="w-md">
          <Autocomplete
            multiple
            disableCloseOnSelect
            loading={isLoadAccept}
            options={accepted || []}
            value={selectedStudents}
            onChange={(_, newValue) => setSelectedStudents(newValue)}
            getOptionLabel={(option) =>
              option.studentName || option.name 
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.id}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <span className="text-sm font-medium">{option.studentName}</span>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  selectedStudents.length === 0
                    ? "choose trainees..."
                    : ""
                }
                label="Trainees"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "1rem",
                    borderColor:"black"
                  },
                }}
              />
            )}
          />
        </div>

        {/* عرض عدد الطلاب المحددين */}
        <div className="text-xs text-gray-500 font-semibold px-1">
           Count : {selectedStudents.length}
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            name={isLoadAdd ? "Adding ..." : "Assign"}
            onClick={handleAdd}
          />
          <CancelBtn name="Cancel" onClick={handleClose} />
        </div>
      </div>
    </Modal>
  );
};