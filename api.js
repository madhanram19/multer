import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const getToken = () => {
    return localStorage.getItem('token');
};

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
            providesTags: ['User'],
        }),
        getUser: builder.query({
            query: (id) => `users/fetchuser/${id}`,
            providesTags: ['User'],
        }),
        getallUser: builder.query({
            query: () => `users/fetchuser`,
            invalidatesTags: ['User'],
        }),

        getSingleUser: builder.query({
            query: () => ({
                url: 'users/getSingle',
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/deleteuser/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: 'users/register',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        getSingleData: builder.mutation({
            query: (id) => ({
                url: `/update/update${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        createRegister: builder.mutation({
            query: (body) => ({
                url: `users/create`,
                method: "POST",
                body
            })
        }),
        verifyOtp: builder.mutation({
            query: (body) => ({
                url: `users/verifyOtp`,
                method: "POST",
                body
            })
        }),
        loginverifyOtp: builder.mutation({
            query: (body) => ({
                url: `users/loginverifyOtp`,
                method: "POST",
                body
            })
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `users/update/${id}`,
                method: 'PUT',
                body: { data },
            }),
            invalidatesTags: ['User'],
        }),
        forgotPassword: builder.mutation({
            query: (user) => ({
                url: "users/forgetPassword",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
        ForgetPasswordOtpVerify: builder.mutation({
            query: (body) => ({
                url: 'users/forgetpasswordverifyOtp',
                method: 'POST',
                body
            })
        }),
        setNewPassword: builder.mutation({
            query: (body) => ({
                url: 'users/setNewPassword',
                method: 'POST',
                body
            })
        }),
        logInUser: builder.mutation({
            query: (data) => ({
                url: 'users/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        handleTwofactorAuth: builder.mutation({
            query: (body) => ({
                url: 'users/handleTwoFactorAuthentication',
                method: 'POST',
                body
            })
        }),
        twoFactorverifySecretCode: builder.mutation({
            query: (body) => ({
                url: 'users/verifyTwoFactorAuthentication',
                method: 'POST',
                body
            })
        }),
        twoFactorDisable: builder.mutation({
            query: (body) => ({
                url: 'users/twoFactorAuth/disableAuthCode',
                method: 'POST',
                body
            })
        }),
        kycsubmitData: builder.mutation({
            query: (body) => ({
              url: 'users/submitkyc', 
              method: "POST",
              body
            }),
            invalidatesTags: ['User'], 
          }),
        
      getContents: builder.query({
      query: () => "admin/getcontents",
    providesTags: ["Admin"],
    }),  
    }),



});


export const { useCreateRegisterMutation, useGetContentsQuery, useVerifyOtpMutation, useLoginverifyOtpMutation, useGetallUserQuery, useGetSingleUserQuery, useGetUsersQuery, useGetUserQuery, useAddUserMutation, useDeleteUserMutation, useGetSingleDataMutation, useLogInUserMutation, useUpdateUserMutation, useForgotPasswordMutation, useForgetPasswordOtpVerifyMutation, useSetNewPasswordMutation, useHandleTwofactorAuthMutation, useTwoFactorverifySecretCodeMutation, useTwoFactorDisableMutation,useKycsubmitDataMutation } = usersApi;