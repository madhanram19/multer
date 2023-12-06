import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
    endpoints: (builder) => ({

      getUsers: builder.query({
        query: () => "users",
        providesTags: ["Admin"],
      }),  
      addContent: builder.mutation({
        query: (contentData) => ({
          url:'admin/contents',
          method:'POST',
          body: contentData,
        }),
        invalidatesTags: ["Admin"],
      }),  
      
      getContent: builder.query ({
        query :() => "admin/getContents",
        providesTags : ["Admin"], 
      }),

      getContentByID: builder.query({
      query: (id) => `admin/getcontent/${id}`,
      invalidatesTags: ["Admin"],
    }),

       registerSingledata:builder.query({
        query:(id)=> `admin/registerSingledata/${id}`,
          invalidatesTags: ['Admin'],
        }),

        adminLogin: builder.mutation({
          query: (data) => ({
            url:'loginUser/loginUser',
            method:'POST',
            body: data,
          }),
          invalidatesTags: ["Admin"],
        }), 

        forgotPassword: builder.mutation({
          query: (data) => ({
              url: "admin/test/test",
              method: "POST",
              body: data,
          }),
          invalidatesTags: ["Admin"],
         
      }),

      // ForgetPasswordOtpVerify: builder.mutation({
      //     query: (body) => ({
      //         url: 'forgetPassword/forgetpasswordverifyOtp',
      //         method: 'POST',
      //         body
      //     })
      // }),
      // setNewPassword: builder.mutation({
      //     query: (body) => ({
      //         url: 'forgetPassword/setNewPassword',
      //         method: 'POST',
      //         body
      //     })
      // }), 

      updateContentById: builder.mutation({
        query: ({id, updatedData}) => ({
          url: `admin/updatecontent/${id}`,
          method: 'POST',
          body: {updatedData},
        }),
        invalidatesTags: ['Admin'],
      }),
       
    }),
  
    })
        
   
 
 
  export const {
    useGetUsersQuery, useAddContentMutation, useAdminLoginMutation, useGetContentQuery, useGetContentByIDQuery, useRegisterSingledataQuery, useForgotPasswordMutation, 
    useUpdateContentByIdMutation
  } = adminApi;
