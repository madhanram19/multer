import React, { Fragment, useState } from
 
"react";
import { useForm } from
 
'react-hook-form';
import { yupResolver } from
 
'@hookform/resolvers/yup';
import * as Yup from
 
'yup';
import {
  useForgotPasswordMutation
} from "../../../redux/services/adminAPI";
// import OtpInput from 'react-otp-input';
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = (props) => {

  const [forgotPwd] = useForgotPasswordMutation();
  // const [modal, setModal] = useState(false);
  // const [otp, setOtp] = useState("");
  const navigate= useNavigate();
 

  const { register, handleSubmit, formState: { errors },
  reset, } = useForm({
    resolver: yupResolver(schema),
  });

  const handleVerifyOtp = async (data) => {
    console.log(data);
    try {
        const response = await forgotPwd(data).unwrap();
        console.log(response);
        if (response.error) {
            return toast.error(response.error.data.message)
        }
    //     const otpCode = response.data.otp.code
    //     const getUserID = response.data._id
    //     localStorage.setItem('userId', getUserID)
       
    //     toast.info(`Your OTP ${otpCode}`, {
    //         position: toast.POSITION.TOP_CENTER,
    //         autoClose: 10000,
    //         closeOnClick: true
    //     });
        reset();
        navigate('/ForgotPasswordOtp')
        } catch (error) {
        console.log(error.message);
    }
}
  // const onSubmit = async (data) => {
  //   try {
  //     await forgotPwd(data);
  //     // setModal(true);
  //   } catch (error) {
  //     console.error("Forgot password failed", error);
  //     toast.error("An unexpected error occurred.");
  //   }
  // };

  // const toggle = () => {
  //   setModal(!modal);
  //   setOtp("");
  // };
  

  return (
    <Fragment>
      
      <div className="Main-section cmsSec" style={{ paddingTop: '80px' }}>
        <div className="container container-1200">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="LgnPg">
                {/* <img src={logo} className="img-fluid d-block mx-auto" /> */}
                <h3>FORGOT PASSWORD</h3>
                <form className="p-5 rounded h-100 mb-5" onSubmit={handleSubmit(handleVerifyOtp)}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Enter your Email Id"
                    {...register('email')}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}
                    </div>
                  )}
                </div>
                <button className="btn LGn-btn">Send</button>
                <p>Didn’t receive the OTP ?<a href="#" className="ml-2">Resend OTP</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    
   
    </Fragment>
  );

}

export default ForgotPassword;
       