import { useEffect, useState } from "react";
import { useGetStatusesQuery } from "../../../services/courses/Admin-courses/coursesQuery"
import { useGetLocationsQuery } from "../../../services/courses/location/locationQuery";
import { useGetCategoryQuery } from "../../../services/courses/catygory/getCategories";
import { useGetLanguagesQuery } from "../../../services/languages/languageService";
import { useGetVenuesQuery } from "../../../services/courses/veneus/getVenues";
import {useGetOneCourseQuery} from "../../../services/courses/Admin-courses/coursesQuery"
import { useAddCourseMutation, useEditCourseMutation } from "../../../services/courses/Admin-courses/coursesMutation";
import { InputField } from "../../../components/Fields/InputField";
import CustomDropdown from "../../../components/Fields/DropDown";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorHandler } from "../../../utils/ErrorHandler";
export const AddCoursePage = () => {
    const {id}=useParams()
    const courseId=Number(id)
    const { data: status } = useGetStatusesQuery();
    const { data: locations } = useGetLocationsQuery()
    const { data: category } = useGetCategoryQuery()
    const { data: languages } = useGetLanguagesQuery()
    const { data: venues } = useGetVenuesQuery()
    const {data:courseData}=useGetOneCourseQuery({id:courseId})
    const [addCourse,{isLoading,isSuccess}] = useAddCourseMutation();
    const [editCourse, { isLoading: isEditing }] = useEditCourseMutation();
    const [img, setImage] = useState<File | null>(null);
    const navigate=useNavigate()
type CourseType = {
  status: string;
  locationId: number | null;
  categoryId: number;
  languageId: number;
  venueId: number | null;
  code: string;
  title: string;
  fee: number;
  hours: number;
  startDate: Date | null;
  endDate: Date | null;
  subTitle: string;
  registrationDeadline: Date | null;
  paymentDeadline: Date | null;
  description: string;
  isAdd: boolean;
  expectedSessions:number | null;
  hasTasks:boolean;
  isTasksGraded:boolean;
  tasksPercentage:number | null;
};

const initialCourse: CourseType = {
  status: "",
  locationId: null,
  categoryId: 0,
  languageId: 0,
  venueId: null,
  code: "",
  title: "",
  fee: 0,
  hours: 0,
  startDate: null,
  endDate: null,
  subTitle: "",
  registrationDeadline: null,
  paymentDeadline: null,
  description: "",
  isAdd: false,
  expectedSessions:null,
  isTasksGraded:false,
  hasTasks:false,
  tasksPercentage:null
};

const [course, setCourse] = useState<CourseType>(initialCourse);
   
    useEffect(() => {
  if (courseData) {
    setCourse({
      status: courseData.status,
      locationId: courseData.locationId ?? null,
      categoryId: courseData.categoryId,
      languageId: courseData.languageId,
      venueId: courseData.venueId ?? null,

      code: courseData.code,
      title: courseData.title,
      subTitle: courseData.subTitle ?? "",

      fee: courseData.fee,
      hours: courseData.hours,

      description: courseData.description ?? "",

      startDate: courseData.startDate
        ? new Date(courseData.startDate)
        : null,

      endDate: courseData.endDate
        ? new Date(courseData.endDate)
        : null,

      registrationDeadline: courseData.registrationDeadline
        ? new Date(courseData.registrationDeadline)
        : null,

      paymentDeadline: courseData.paymentDeadline
        ? new Date(courseData.paymentDeadline)
        : null,

      isAdd: courseData.isAdd,
      expectedSessions :courseData.expectedSessions ?? null,
      isTasksGraded:courseData.isTasksGraded ?? false,
      hasTasks:courseData.hasTasks,
      tasksPercentage:courseData.tasksPercentage
 });
  }
}, [courseData]);
const handleSubmit = async () => {
  const formData = new FormData();

  formData.append("status", course.status);
  formData.append("locationId", course.locationId?.toString() || "" );
  formData.append("categoryId", course.categoryId.toString());
  formData.append("languageId", course.languageId.toString());
  formData.append("venueId", course.venueId?.toString() || "");

  formData.append("code", course.code);
  formData.append("title", course.title);
  formData.append("subTitle", course.subTitle);
  formData.append("description", course.description);

  formData.append("fee", course.fee.toString());
  formData.append("hours", course.hours.toString());

  formData.append("startDate", course.startDate?.toISOString() || "");
  formData.append("endDate", course.endDate?.toISOString() || "");
  formData.append(
    "registrationDeadline",
    course.registrationDeadline?.toISOString() || ""
  );
  formData.append(
    "paymentDeadline",
    course.paymentDeadline?.toISOString() || ""
  );

  formData.append("isAdd", course.isAdd.toString());
  formData.append("hasTasks", course.hasTasks.toString());
    // tasksPercentage can be null, send empty string when null
    formData.append(
      "tasksPercentage",
      course.tasksPercentage != null ? course.tasksPercentage.toString() : ""
    );
     formData.append(
      "isTasksGraded",
      course.tasksPercentage != null ? course.isTasksGraded.toString() : ""
    );
      formData.append(
      "expectedSessions", course.expectedSessions != null ? course.expectedSessions.toString() : "" );
    

  if (img) {
    formData.append("img", img);
  }
   if(!course.venueId){
    // formData.append("loactaionId",course.locationId.toString() === "" )
   }
  try {
    console.log(Array.from(formData))
    if (id) {
      await editCourse({
        id: courseId,
        data: formData,
      }).unwrap();

      toast.success("Course Updated Successfully");
      navigate(-1)
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
   <h1>{id ? "Edit Course" : "Create Course"}</h1>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

   
      <div className="bg-(--light2-color) rounded-xl shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-5 border-b pb-2">
          Basic Information
        </h2>

        <div className="space-y-4">

          <InputField
            label="Code"
            value={course.code}
            type="text"
            onChange={(e) =>
              setCourse({
                ...course,
                code: e.target.value,
              })
            }
          />

          <InputField
            label="Title"
            value={course.title}
            type="text"
            onChange={(e) =>
              setCourse({
                ...course,
                title: e.target.value,
              })
            }
          />

          <InputField
            label="Subtitle"
            value={course.subTitle}
            type="text"
            onChange={(e) =>
              setCourse({
                ...course,
                subTitle: e.target.value,
              })
            }
          />

          <InputField
            label="Description"
            value={course.description}
            type="text"
            onChange={(e) =>
              setCourse({
                ...course,
                description: e.target.value,
              })
            }
          />
              <InputField
            label="Expected Sessions"
            value={String(course.expectedSessions)}
            type="number"
            onChange={(e) =>
              setCourse({
                ...course,
                expectedSessions: Number(e.target.value),
              })
            }
          />
                <InputField
            label="Tasks Percentage"
            value={String(course.tasksPercentage)}
            type="number"
            onChange={(e) =>
              setCourse({
                ...course,
                tasksPercentage: Number(e.target.value),
              })
            }
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Course Image
            </label>

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
      </div>

      {/* Course Details */}
      <div className="bg-(--light2-color) rounded-xl shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-5 border-b pb-2">
          Course Details
        </h2>

        <div className="grid grid-cols-1 gap-4">

          <CustomDropdown
            options={status ?? []}
            placeholder="Select Status"
            onSelect={(value) => {
              setCourse({
                ...course,
                status: value,
              });
            }}
          />

          <CustomDropdown
            options={locations?.map((l) => l.cityName) || []}
            placeholder="Select Location"
            onSelect={(value) => {
              const selected = locations?.find(
                (l) => l.cityName === value
              );

              setCourse({
                ...course,
                locationId: selected?.id || null,
              });
            }}
          />

          <CustomDropdown
            options={category?.map((c) => c.title) || []}
            placeholder="Select Category"
            onSelect={(value) => {
              const selected = category?.find(
                (c) => c.title === value
              );

              setCourse({
                ...course,
                categoryId: selected?.id || 0,
              });
            }}
          />

          <CustomDropdown
            options={languages?.map((l) => l.name) || []}
            placeholder="Select Language"
            onSelect={(value) => {
              const selected = languages?.find(
                (l) => l.name === value
              );

              setCourse({
                ...course,
                languageId: selected?.id || 0,
              });
            }}
          />

          <CustomDropdown
            options={venues?.map((v) => v.venueTitle) || []}
            placeholder="Select Venue"
            onSelect={(value) => {
              const selected = venues?.find(
                (v) => v.venueTitle === value
              );

              setCourse({
                ...course,
                venueId: selected?.id || null,
              });
            }}
          />

          <InputField
            label="Fee"
            value={course.fee.toString()}
            type="number"
            onChange={(e) =>
              setCourse({
                ...course,
                fee: e.target.valueAsNumber,
              })
            }
          />

          <InputField
            label="Hours"
            value={course.hours.toString()}
            type="number"
            onChange={(e) =>
              setCourse({
                ...course,
                hours: e.target.valueAsNumber,
              })
            }
          />
        </div>
      </div>

      {/* Dates & Registration */}
      <div className="bg-(--light2-color) rounded-xl shadow-md border p-6 lg:col-span-2">
        <h2 className="text-xl font-semibold mb-5 border-b pb-2">
          Dates & Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <InputField
            label="Start Date"
            type="datetime-local"
            value={
              course.startDate
                ? new Date(course.startDate)
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) =>
              setCourse({
                ...course,
                startDate: e.target.value
                  ? new Date(e.target.value)
                  : null,
              })
            }
          />

          <InputField
            label="End Date"
            type="datetime-local"
            value={
              course.endDate
                ? new Date(course.endDate)
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) =>
              setCourse({
                ...course,
                endDate: e.target.value
                  ? new Date(e.target.value)
                  : null,
              })
            }
          />

          <InputField
            label="Registration Deadline"
            type="datetime-local"
            value={ course.registrationDeadline
                ? new Date(course.registrationDeadline)
                    .toISOString()
                    .slice(0, 16)
                : ""}
            onChange={(e) =>   setCourse({
                ...course,
                registrationDeadline: e.target.value
                  ? new Date(e.target.value)
                  : null,
              })}
          />

          <InputField
            label="Payment Deadline"
            type="datetime-local"
            value={ course.paymentDeadline
                ? new Date(course.paymentDeadline)
                    .toISOString()
                    .slice(0, 16)
                : ""}
            onChange={(e) =>   setCourse({
                ...course,
                paymentDeadline: e.target.value
                  ? new Date(e.target.value)
                  : null,
              })}
          />
        </div>

        <div className="mt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={course.isAdd}
              onChange={(e) =>
                setCourse({
                  ...course,
                  isAdd: e.target.checked,
                })
              }
              className="w-5 h-5"
            />

            <span className="font-medium">
              Featured Course (Is Add)
            </span>
          </label>
        </div>
         <div className="mt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={course.hasTasks}
              onChange={(e) =>
                setCourse({
                  ...course,
                  hasTasks: e.target.checked,
                })
              }
              className="w-5 h-5"
            />

            <span className="font-medium">
              Has Tasks
            </span>
          </label>
        </div>
      </div>
       <div className="mt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={course.isTasksGraded}
              onChange={(e) =>
                setCourse({
                  ...course,
                  isTasksGraded: e.target.checked,
                })
              }
              className="w-5 h-5"
            />

            <span className="font-medium">
              Featured Course (Is Add)
            </span>
          </label>
        </div>
    </div>
    

    <div className="flex w-fit  mt-8">
<Button
  name={
    id
      ? (isEditing ? "Saving..." : "Save Changes")
      : (isLoading ? "Creating..." : "Create Course")
  }
  onClick={handleSubmit}
/>
    </div>
  </div>
);
}