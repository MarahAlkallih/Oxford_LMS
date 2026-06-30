import { useState, useEffect } from "react";
import { useGetStatusesQuery } from "../../services/courses/Admin-courses/coursesQuery";
import { useGetLocationsQuery } from "../../services/courses/location/locationQuery";
import { useGetCategoryQuery } from "../../services/courses/catygory/getCategories";
import { useGetLanguagesQuery } from "../../services/languages/languageService";
import { useGetVenuesQuery } from "../../services/courses/veneus/getVenues";
import { InputField } from "../../components/Fields/InputField";
import CustomDropdown from "../../components/Fields/DropDown";
import { Button } from "../../components/Buttons/SubmitBtn";

// 1. تعريف واجهة البيانات
export interface CourseData {
  status: string; locationId: number; categoryId: number; languageId: number; venueId: number;
  code: string; title: string; fee: number; hours: number; subTitle: string; description: string;
  startDate: Date | null; endDate: Date | null; registrationDeadline: Date | null; paymentDeadline: Date | null;
  isAdd: boolean;
  img: File | null; // أضفنا الصورة هون لسهولة النقل
}

// 2. تعريف الـ Props اللي بيستقبلها الفورم
interface CourseFormProps {
  initialData?: CourseData; // بيانات الكورس في حال التعديل
  onSubmit: (data: CourseData) => void;
  isLoading: boolean;
  submitBtnText: string;
}

export const CourseForm = ({ initialData, onSubmit, isLoading, submitBtnText }: CourseFormProps) => {
  // جلب البيانات للدروب داون (خليناها هون ليكون الفورم مستقل)
  const { data: status } = useGetStatusesQuery();
  const { data: locations } = useGetLocationsQuery();
  const { data: category } = useGetCategoryQuery();
  const { data: languages } = useGetLanguagesQuery();
  const { data: venues } = useGetVenuesQuery();

  // القيم الافتراضية
  const defaultState: CourseData = {
    status: "", locationId: 0, categoryId: 0, languageId: 0, venueId: 0,
    code: "", title: "", fee: 0, hours: 0, startDate: null, endDate: null,
    subTitle: "", registrationDeadline: null, paymentDeadline: null, description: "",
    isAdd: false, img: null
  };


  const [course, setCourse] = useState<CourseData>(initialData || defaultState);

  // تحديث الـ State إذا تغيرت initialData (مهمة جداً لعملية التعديل)
  useEffect(() => {
    if (initialData) setCourse(initialData);
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit(course); // تمرير البيانات المجمعة للأب
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-5 border-b pb-2">Basic Information</h2>
        <div className="space-y-4">
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
          {/* ... (ضعي بقية حقول الـ InputField الأساسية هنا كما هي بالكود تبعك) ... */}
          
          <div>
            <label className="block text-sm font-medium mb-2">Course Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-2"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setCourse({ ...course, img: e.target.files[0] });
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Course Details (Dropdowns) */}
      <div className="bg-white rounded-xl shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-5 border-b pb-2">Course Details</h2>
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
                locationId: selected?.id || 0,
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
                venueId: selected?.id || 0,
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
      <div className="bg-white rounded-xl shadow-md border p-6 lg:col-span-2">
        <h2 className="text-xl font-semibold mb-5 border-b pb-2">Dates & Registration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Start Date"
            type="datetime-local"
            value={course.startDate ? new Date(course.startDate).toISOString().slice(0, 16) : ""}
            onChange={(e) => setCourse({ ...course, startDate: e.target.value ? new Date(e.target.value) : null })}
          />
          {/* ... (ضعي بقية تواريخ النهاية والـ deadlines هنا) ... */}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8 lg:col-span-2">
        <Button name={isLoading ? "Loading..." : submitBtnText} onClick={handleSubmit} />
      </div>
    </div>
  );
};