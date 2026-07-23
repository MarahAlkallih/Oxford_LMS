import { baseApi } from "../../../../api/baseApi";

// {my courses}
export interface MyCourses {
    id:           number;
    courseId:     number;
    trainerId:    number;
    assignedAt:   Date;
    assignedById: number;
    courseName: string;
}
// {my trainees}
  export interface Trainees{
        id: number,
        userId: number,
        courseId: number,
        courseRegistrationId: number,
        studentName: string,
        courseName: string
    }
const GetMyCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getMyCourse: builder.query<MyCourses[],any>({
      query: () => `/course-trainer/my-courses`,

      providesTags: ["Courses-trainers"],
    }),
    })
})

export const {useGetMyCourseQuery}=GetMyCourseApi;
/////////////////////////////////////////////////////////////////////
const GetStudentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getStudent: builder.query<Trainees[],{courseId: number}>({
      query: ({courseId}) => `/course-registration/course/${courseId}/accepted`,

     
    }),
    })
})

export const {useGetStudentQuery}=GetStudentApi;