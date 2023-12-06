import React from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PatternLock from 'react-pattern-lock';
import { useAdminLoginMutation } from 'src/redux/services/adminAPI';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Invalid email format"
    )
    .trim(),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Minimum eight characters, at least one uppercase, one lowercase, one number and one special character'
    )
    .required('Password is required'),
});

const Login = () => {
  const [handleAdminLogin] = useAdminLoginMutation();
  const [path, setPath] = useState([]);
  const [show, setshow] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  const onSubmit = async (data) => {
    console.log(data,"datag");
    try {
      const response = await handleAdminLogin (data);
      console.log(response);

      // if(path.length > 0){
      //   let pattern = path.join("");
      //   data["pattern"]=pattern;
      //   console.log(data);
      //   resetField();
      const getuserId = response.data.id;
      localStorage.setItem("adminuserId",getuserId);  
      const successMsg = response.data.message
      console.log(successMsg);
        toast.success(successMsg,{
          autoClose:1000
        })
    // }else toast.error("Pattern in required.")
} catch (error) {
  
      // toast.error("Invalid username or password");
      console.error("Login failed", error);
    }
    resetField("email");
    resetField("password");
  };
  const onChange = path => {
    setPath([...path]);
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-5">
                <CCardBody>
                  <CForm className="text-center">
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        {...register('email')}
                      />
                    </CInputGroup>
                    <div className="text-danger">{errors.email?.message}</div>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <input
                        type="text"
                        className="form-control"
                        name="password"
                        {...register('password')}
                      />
                    </CInputGroup>
                    <div className="text-danger">{errors.password?.message}</div>
                    <CRow className="justify-content-center">
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleSubmit(onSubmit)}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="mt-2 justify-content-center">
                      <CCol>
                        <Link to="/forgotpassword">Forgot Password?</Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
                <CRow className="mt-2 justify-content-center">
                      <CCol>
                        <Link to="/register">Create Your Account?</Link>
                      </CCol>
                    </CRow>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <div className="my-2">
                      <label>Pattern</label>
                      <div className="d-flex justify-content-center">
                        <PatternLock
                          width={300}
                          pointSize={15}
                          size={3}
                          path={path}
                          onChange={onChange}
                          style={{
                            background: '#0b80f2',
                            borderRadius: '16px',
                          }}
                        />
                      </div>
                    </div>
                    <Link to="/forgetpattern">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Forgot Pattern!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;