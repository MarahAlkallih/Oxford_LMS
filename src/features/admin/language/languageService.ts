import { baseApi } from "../../../api/baseApi";
 interface Language{
    name:string,
    description:string
 }
 export const languageService=baseApi.injectEndpoints({
    endpoints:(biulder)=>({
         createLanguage: biulder.mutation<any, Language>({
             query: (data) => ({
               url:"/language",
               method:"POST",
               body:data
             })
         })
     })
 })
