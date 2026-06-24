import { baseApi } from "../../../api/baseApi";
import type { Question, QuestionsResponse } from "../../../types/Question";
 const GetQuestsWithFilterInstIDApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
     getQuestions: builder.query<
       QuestionsResponse,
       { examInstanceId:number }
     >({
       query: ({ examInstanceId }) => ({
         url: `/questions/questionsWithFields`,
         params: {
         examInstanceId
         },
       }),
       providesTags: ["Questions"],
     }),
   }),
 });
 export const {useGetQuestionsQuery}=GetQuestsWithFilterInstIDApi

  const GetOneQuestApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
     getOneQuestion: builder.query<
       Question,
       { id:number }
     >({
       query: ({ id }) => ({
         url: `/questions/${id}`,
         params: {
         id
         },
       }),
       providesTags: ["Questions"],
     }),
   }),
 });
 export const {useGetOneQuestionQuery}=GetOneQuestApi
