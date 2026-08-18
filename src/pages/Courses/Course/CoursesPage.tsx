import { useState } from "react";
import {
  useGetActiveUncompingCourseQuery,
  useGetOnlineCourseQuery,
  useGetUnActiveCourseQuery,
  useGetOnSiteCourseQuery,
  useGetByCatIdCourseQuery,
  useGetByVenueIdCourseQuery
} from "../../../services/courses/Admin-courses/coursesQuery";

import { useGetCategoryQuery } from "../../../services/courses/catygory/getCategories";
import { CourseCard } from "../../../components/Course/CourseCard";
import CustomDropdown from "../../../components/Fields/DropDown";
import { useGetVenuesQuery } from "../../../services/courses/veneus/getVenues";

type FilterType =
  | "active"
  | "online"
  | "onsite"
  | "inactive"
  |"venue"
  | "category";

export const CoursesPage = () => {
  const [filter, setFilter] = useState<FilterType>("active");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [venueId,setVenueId]=useState<number>(0);
  const { data: categories } = useGetCategoryQuery();
  const {data:venue}=useGetVenuesQuery();
  const activeQuery = useGetActiveUncompingCourseQuery(undefined, {
    skip: filter !== "active",
  });

  const onlineQuery = useGetOnlineCourseQuery(undefined, {
    skip: filter !== "online",
  });

  const onSiteQuery = useGetOnSiteCourseQuery(undefined, {
    skip: filter !== "onsite",
  });

  const inactiveQuery = useGetUnActiveCourseQuery(undefined, {
    skip: filter !== "inactive",
  });

  const categoryQuery = useGetByCatIdCourseQuery(
    { id: categoryId },
    {
      skip: filter !== "category" || !categoryId,
    }
  );
   const venueQuery = useGetByVenueIdCourseQuery(
    { id: venueId },
    {
      skip: filter !== "venue" || !venueId,
    }
  );

  const courses =
    filter === "active"
      ? activeQuery.data
      : filter === "online"
      ? onlineQuery.data
      : filter === "onsite"
      ? onSiteQuery.data
      : filter === "inactive"
      ? inactiveQuery.data
      : filter === "venue"
      ? venueQuery.data
      : categoryQuery.data;

  const isLoading =
    activeQuery.isLoading ||
    onlineQuery.isLoading ||
    onSiteQuery.isLoading ||
    inactiveQuery.isLoading ||
    categoryQuery.isLoading ||
    venueQuery.isLoading;
   console.log("courses",courses)
  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg ${
            filter === "active"
              ? "bg-[#4B5945] text-white"
              : "bg-gray-200"
          }`}
        >
          Active Upcoming
        </button>

        <button
          onClick={() => setFilter("online")}
          className={`px-4 py-2 rounded-lg ${
            filter === "online"
              ? "bg-[#4B5945] text-white"
              : "bg-gray-200"
          }`}
        >
          Online
        </button>

        <button
          onClick={() => setFilter("onsite")}
          className={`px-4 py-2 rounded-lg ${
            filter === "onsite"
              ? "bg-[#4B5945] text-white"
              : "bg-gray-200"
          }`}
        >
          On Site
        </button>

        <button
          onClick={() => setFilter("inactive")}
          className={`px-4 py-2 rounded-lg ${
            filter === "inactive"
              ? "bg-[#4B5945] text-white"
              : "bg-gray-200"
          }`}
        >
          Inactive
        </button>

        <button
          onClick={() => setFilter("category")}
          className={`px-4 py-2 rounded-lg ${
            filter === "category"
              ? "bg-[#4B5945] text-white"
              : "bg-gray-200"
          }`}
        >
          By Category
        </button>
          <button
          onClick={() => setFilter("venue")}
          className={`px-4 py-2 rounded-lg ${
            filter === "venue"
              ? "bg-[#4B5945] text-white"
              : "bg-gray-200"
          }`}
        >
          By Venue
        </button>
      </div>

      {/* Category Dropdown */}
      {filter === "category" && (
        <div className="mb-6 max-w-sm">
          <CustomDropdown
            options={categories?.map((c) => c.title) || []}
            placeholder="Choose Category"
            onSelect={(value) => {
              const selected = categories?.find(
                (c) => c.title === value
              );

              setCategoryId(selected?.id || 0);
            }}
          />
        </div>
      )}
       {filter === "venue" && (
        <div className="mb-6 max-w-sm">
          <CustomDropdown
            options={venue?.map((v) => v.venueTitle) || []}
            placeholder="Choose Venue"
            onSelect={(value) => {
              const selected = venue?.find(
                (v) => v.venueTitle === value
              );

              setVenueId(selected?.id || 0);
            }}
          />
        </div>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      )}
    </div>
  );
};