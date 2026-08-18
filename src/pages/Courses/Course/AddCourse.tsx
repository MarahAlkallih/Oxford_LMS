import { useEffect, useState } from "react";
import { useGetStatusesQuery, useGetOneCourseQuery } from "../../../services/courses/Admin-courses/coursesQuery";
import { useGetLocationsQuery } from "../../../services/courses/location/locationQuery";
import { useGetCategoryQuery } from "../../../services/courses/catygory/getCategories";
import { useGetLanguagesQuery } from "../../../services/languages/languageService";
import { useGetVenuesQuery } from "../../../services/courses/veneus/getVenues";
import { useAddCourseMutation, useEditCourseMutation } from "../../../services/courses/Admin-courses/coursesMutation";
import { InputField } from "../../../components/Fields/InputField";
import CustomDropdown from "../../../components/Fields/DropDown";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorHandler } from "../../../utils/ErrorHandler";

type CourseType = {
  // Required Fields
  status: string;
  categoryId: number;
  languageId: number;
  code: string;
  title: string;
  fee: number;
  hours: number;

  // Optional Fields
  locationId: number | null;
  venueId: number | null;
  subTitle: string | null;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  registrationDeadline: Date | null;
  paymentDeadline: Date | null;
  expectedSessions: number | null;
  tasksPercentage: number | null;
  
  // Booleans
  isAdd: boolean;
  hasTasks: boolean;
  isTasksGraded: boolean;
};

const initialCourse: CourseType = {
  status: "",
  categoryId: 0,
  languageId: 0,
  code: "",
  title: "",
  fee: 0,
  hours: 0,
  locationId: null,
  venueId: null,
  subTitle: null,
  description: null,
  startDate: null,
  endDate: null,
  registrationDeadline: null,
  paymentDeadline: null,
  expectedSessions: null,
  tasksPercentage: null,
  isAdd: false,
  hasTasks: false,
  isTasksGraded: false,
};

export const AddCoursePage = () => {
  const { id } = useParams();
  const courseId = Number(id);
  const navigate = useNavigate();

  const { data: status } = useGetStatusesQuery();
  const { data: locations } = useGetLocationsQuery();
  const { data: category } = useGetCategoryQuery();
  const { data: languages } = useGetLanguagesQuery();
  const { data: venues } = useGetVenuesQuery();
  const { data: courseData } = useGetOneCourseQuery({ id: courseId }, { skip: !id });

  const [addCourse, { isLoading }] = useAddCourseMutation();
  const [editCourse, { isLoading: isEditing }] = useEditCourseMutation();
  const [img, setImage] = useState<File | null>(null);

  const [course, setCourse] = useState<CourseType>(initialCourse);

  useEffect(() => {
    if (courseData) {
      setCourse({
        status: courseData.status ?? "",
        categoryId: courseData.categoryId ?? null,
        languageId: courseData.languageId ?? null,
        code: courseData.code ?? "",
        title: courseData.title ?? "",
        fee: courseData.fee ?? 0,
        hours: courseData.hours ?? 0,
        locationId: courseData.locationId ?? null,
        venueId: courseData.venueId ?? null,
        subTitle: courseData.subTitle ?? null,
        description: courseData.description ?? null,
        startDate: courseData.startDate ? new Date(courseData.startDate) : null,
        endDate: courseData.endDate ? new Date(courseData.endDate) : null,
        registrationDeadline: courseData.registrationDeadline ? new Date(courseData.registrationDeadline) : null,
        paymentDeadline: courseData.paymentDeadline ? new Date(courseData.paymentDeadline) : null,
        expectedSessions: courseData.expectedSessions ?? null,
        tasksPercentage: courseData.tasksPercentage ?? null,
        isAdd: Boolean(courseData.isAdd),
        hasTasks: Boolean(courseData.hasTasks),
        isTasksGraded: Boolean(courseData.isTasksGraded),
      });
    }
  }, [courseData]);

  const handleSubmit = async () => {
    const formData = new FormData();

    // 1. الحقول الإلزامية (تُرسل دائماً)
    formData.append("status", course.status);
    formData.append("categoryId", course.categoryId.toString());
    formData.append("languageId", course.languageId.toString());
    formData.append("code", course.code);
    formData.append("title", course.title);
    formData.append("fee", course.fee.toString());
    formData.append("hours", course.hours.toString());

    // 2. دالة مساعدة لإضافة الحقول الاختيارية فقط إذا كانت تفيد بقيمة غير فارغة
    const appendOptional = (key: string, value: any) => {
      if (value !== null && value !== undefined && value !== "") {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value.toString());
        }
      }
    };

    // إلحاق الحقول الاختيارية
    appendOptional("locationId", course.locationId);
    appendOptional("venueId", course.venueId);
    appendOptional("subTitle", course.subTitle);
    appendOptional("description", course.description);
    appendOptional("startDate", course.startDate);
    appendOptional("endDate", course.endDate);
    appendOptional("registrationDeadline", course.registrationDeadline);
    appendOptional("paymentDeadline", course.paymentDeadline);
    appendOptional("expectedSessions", course.expectedSessions);
    appendOptional("tasksPercentage", course.tasksPercentage);

    // Booleans
    formData.append("isAdd", course.isAdd.toString());
    formData.append("hasTasks", course.hasTasks.toString());
    formData.append("isTasksGraded", course.isTasksGraded.toString());

    if (img) {
      formData.append("img", img);
    }

    try {
      if (id) {
        await editCourse({ id: courseId, data: formData }).unwrap();
        toast.success("Course Updated Successfully");
        navigate(-1);
      } else {
        await addCourse(formData).unwrap();
        toast.success("Course Added Successfully");
        setCourse(initialCourse);
        setImage(null);
      }
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit Course" : "Create Course"}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-(--light2-color) rounded-xl shadow-md border p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-5 border-b pb-2">Basic Information</h2>

          <InputField
            label="Code"
            value={course.code}
            type="text"
            onChange={(e) => setCourse({ ...course, code: e.target.value })}
          />

          <InputField
            label="Title"
            value={course.title}
            type="text"
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
          />

          <InputField
            label="Subtitle"
            value={course.subTitle ?? ""}
            type="text"
            onChange={(e) => setCourse({ ...course, subTitle: e.target.value || null })}
          />

          <InputField
            label="Description"
            value={course.description ?? ""}
            type="text"
            onChange={(e) => setCourse({ ...course, description: e.target.value || null })}
          />

          <InputField
            label="Expected Sessions"
            value={course.expectedSessions !== null ? String(course.expectedSessions) : ""}
            type="number"
            onChange={(e) =>
              setCourse({
                ...course,
                expectedSessions: e.target.value !== "" ? Number(e.target.value) : null,
              })
            }
          />

          <InputField
            label="Tasks Percentage"
            value={course.tasksPercentage !== null ? String(course.tasksPercentage) : ""}
            type="number"
            onChange={(e) =>
              setCourse({
                ...course,
                tasksPercentage: e.target.value !== "" ? Number(e.target.value) : null,
              })
            }
          />

          <div>
            <label className="block text-sm font-medium mb-2">Course Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-2"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        {/* Course Details */}
        <div className="bg-(--light2-color) rounded-xl shadow-md border p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-5 border-b pb-2">Course Details</h2>

          <CustomDropdown
            options={status ?? []}
            placeholder="Select Status"
            onSelect={(value) => setCourse({ ...course, status: value })}
          />

          <CustomDropdown
            options={locations?.map((l) => l.cityName) || []}
            placeholder="Select Location"
            onSelect={(value) => {
              const selected = locations?.find((l) => l.cityName === value);
              setCourse({ ...course, locationId: selected?.id ?? null });
            }}
          />

          <CustomDropdown
            options={category?.map((c) => c.title) || []}
            placeholder="Select Category"
            onSelect={(value) => {
              const selected = category?.find((c) => c.title === value);
              setCourse({ ...course, categoryId: selected?.id ?? 0 });
            }}
          />

          <CustomDropdown
            options={languages?.map((l) => l.name) || []}
            placeholder="Select Language"
            onSelect={(value) => {
              const selected = languages?.find((l) => l.name === value);
              setCourse({ ...course, languageId: selected?.id ?? 0 });
            }}
          />

          <CustomDropdown
            options={venues?.map((v) => v.venueTitle) || []}
            placeholder="Select Venue"
            onSelect={(value) => {
              const selected = venues?.find((v) => v.venueTitle === value);
              setCourse({ ...course, venueId: selected?.id ?? null });
            }}
          />

          <InputField
            label="Fee"
            value={course.fee.toString()}
            type="number"
            onChange={(e) => setCourse({ ...course, fee: Number(e.target.value) })}
          />

          <InputField
            label="Hours"
            value={course.hours.toString()}
            type="number"
            onChange={(e) => setCourse({ ...course, hours: Number(e.target.value) })}
          />
        </div>

        {/* Dates & Options */}
        <div className="bg-(--light2-color) rounded-xl shadow-md border p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-5 border-b pb-2">Dates & Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Start Date"
              type="datetime-local"
              value={course.startDate ? course.startDate.toISOString().slice(0, 16) : ""}
              onChange={(e) =>
                setCourse({ ...course, startDate: e.target.value ? new Date(e.target.value) : null })
              }
            />

            <InputField
              label="End Date"
              type="datetime-local"
              value={course.endDate ? course.endDate.toISOString().slice(0, 16) : ""}
              onChange={(e) =>
                setCourse({ ...course, endDate: e.target.value ? new Date(e.target.value) : null })
              }
            />

            <InputField
              label="Registration Deadline"
              type="datetime-local"
              value={
                course.registrationDeadline ? course.registrationDeadline.toISOString().slice(0, 16) : ""
              }
              onChange={(e) =>
                setCourse({
                  ...course,
                  registrationDeadline: e.target.value ? new Date(e.target.value) : null,
                })
              }
            />

            <InputField
              label="Payment Deadline"
              type="datetime-local"
              value={course.paymentDeadline ? course.paymentDeadline.toISOString().slice(0, 16) : ""}
              onChange={(e) =>
                setCourse({
                  ...course,
                  paymentDeadline: e.target.value ? new Date(e.target.value) : null,
                })
              }
            />
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={course.isAdd}
                onChange={(e) => setCourse({ ...course, isAdd: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="font-medium">Featured Course (Is Add)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={course.hasTasks}
                onChange={(e) => setCourse({ ...course, hasTasks: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="font-medium">Has Tasks</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={course.isTasksGraded}
                onChange={(e) => setCourse({ ...course, isTasksGraded: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="font-medium">Is Tasks Graded</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex w-fit mt-8">
        <Button
          name={
            id
              ? isEditing
                ? "Saving..."
                : "Save Changes"
              : isLoading
              ? "Creating..."
              : "Create Course"
          }
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};