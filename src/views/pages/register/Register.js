import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'


const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Name should be in alphabets")
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name should not exceed 20 characters")
    .trim(),
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Invalid email format"
    )
    .trim(),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum eight characters, at least one uppercase, one lowercase, one number and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});


const Register = () => {
  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [userAdd] = useAddUserMutation()
  const navigate = useNavigate();
  // const [deleteUserMutation] = useDeleteUserMutation();
  // const { data: getusers, isLoading, isError } = useGetUsersQuery();

  const usersFromDB = users.data;
  console.log(usersFromDB);

  const {
    register,
    handleSubmit,
    trigger,
     formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const handleuserAdd = async (data) => {
    try {
         const response = await(data)
        if (response.error) {
            const errorMessage = response.error.data.message
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER
            })
        } else {
            const successMsg = response.data.data.otp.code
            const getUserID = response.data.data._id
            localStorage.setItem('userId', getUserID)
            toast.info(`Your OTP ${successMsg}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 10000,
                closeOnClick: true

            });
            // navigate('/RegisterOtp')
            // navigate("/Register");
        }
    } catch (err) {
        console.log(err.message)
        toast.error('SomeThing Went Wrong', {
            position: toast.POSITION.TOP_CENTER
        })
    }

}

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit(handleuserAdd)} encType= 'multipart/form-data'>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <input
                    name="firstName"
                    type="text"
                    placeholder='firstName'
                    {...register("firstName")}
                    className={`form-control ${errors.firstName ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.firstName?.message}
                  </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                   <input
                    name="email"
                    type="text"
                    placeholder='email'
                    {...register("email")}
                    className={`form-control ${errors.email ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <input
                    name="password"
                    type="password"
                    placeholder='password'
                    {...register("password")}
                    className={`form-control ${errors.password ? "is-invalid" : ""
                      }`}
                    onBlur={() => trigger("confirmPassword")}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <input
                    name="confirmPassword"
                    type="password"
                    placeholder='Confirmpassword'
                    {...register("confirmPassword")}
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                      }`}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register



