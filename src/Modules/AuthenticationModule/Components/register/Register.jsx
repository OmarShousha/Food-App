import React from 'react'
import logo from '../../../../assets/Images/4.svg'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  

  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors }, watch } = useForm();
  
  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('country', data.country)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('profileImage', data.profileImage)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)
    return formData;

  }

  const mySubmit = async (data) => {

    try{
      console.log(data);
      let registerFormData = appendToFormData(data);
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Register',
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
      )
      console.log(response);
      toast.success('Logged in successfully');
      navigate('/verifyaccount');
    }
    
    catch(error){
      console.log(error);
      // console.log(error.response.data.message);
      // toast.error(errors.response.data.message);
    }
  }






  return (
    <>
    <section className='auth-layout'>
      <div className="container">
        <div className="row vh-100 justify-content-center align-items-center p-3 p-md-0">
          <div className="col-md-12 col-lg-9 bg-white py-5 p-4 rounded-4 border border-3">
            <div className='px-lg-2'>
              {/* ============> Image <============== */}
              <div className='text-center bg-dange mb-3'>
                <img src={logo} className='w-25' alt="" />
              </div>

              {/* ============> Form <============== */}
              <div>
                <h3 className='fw-bold mb-1'>Register</h3>
                <p className='text-muted mb-4'>Welcome back! please enter your details</p>
                
                <form className='container' onSubmit={handleSubmit(mySubmit)}>
                  <div className="row gap-">
                    <div className="col-md-6 d-flex flex-column">

                      <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addon1">
                          <i className='fa fa-envelope text-muted'></i>
                        </span>
                        <input 
                        type="text" 
                        className="form-control bg-body-secondary" 
                        placeholder="Username" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        {...register('userName',{
                          required:'*Username is required',
                          pattern: {
                            value:/^[a-zA-Z][a-zA-Z0-9._]{2,19}$/ ,
                            message:'Invalid username'
                          }
                        })} />
                      </div>
                      {errors.userName && <p className='text-danger bg-warnin mb-2'>{errors.userName.message}</p>}

                      <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addon1">
                          <i className='fa fa-key text-muted'></i>
                        </span>
                        <input 
                        type="text" 
                        className="form-control bg-body-secondary" 
                        placeholder="Country" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        {...register('country',{
                          required:'*Country is required',
                          pattern:{
                            value:/^[a-zA-Z]{2,50}$/,
                            message:'*Invaild country'
                          }
                        }
                        )} />
                      </div>
                      {errors.country && <p className='text-danger mb-2'>{errors.country.message}</p> }

                      <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addon1">
                          <i className='fa fa-key text-muted'></i>
                        </span>
                        <input 
                        type="text" 
                        className="form-control bg-body-secondary" 
                        placeholder="Password" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        {...register('password',{
                          required:'*Password is required',
                          pattern:{
                            value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,20}$/,
                            message:'Invaild password'
                          }
                        }
                        )} />
                      </div>
                      {errors.password && <p className='text-danger mb-2'>{errors.password.message}</p> }

                    </div>
                          
                    <div className="col-md-6 d-flex flex-column">
                      <div className="input-group mb-2">
                    <span className="input-group-text" id="basic-addon1">
                      <i className='fa fa-envelope text-muted'></i>
                    </span>
                    <input 
                    type="text" 
                    className="form-control bg-body-secondary" 
                    placeholder="Enter your E-mail" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    {...register('email',{
                      required:'*Email is required',
                      pattern: {
                        value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,
                        message:'Invalid mail'
                      }
                    })} />
                      </div>
                    {errors.email && <p className='text-danger mb-2'>{errors.email.message}</p>}

                    <div className="input-group mb-2">
                      <span className="input-group-text" id="basic-addon1">
                        <i className='fa fa-key text-muted'></i>
                      </span>
                      <input 
                      type="text" 
                      className="form-control bg-body-secondary" 
                      placeholder="Phone Number" 
                      aria-label="Username" 
                      aria-describedby="basic-addon1"
                      {...register('phoneNumber',{
                        required:'*Phone Number is required',
                        pattern:{
                          value:/^\+?\d{1,3}?[- .]?\(?\d{3}\)?[- .]?\d{3}[- .]?\d{4}$/,
                          message:'Invaild Phone Number'
                        }
                      }
                      )} />
                    </div>
                    {errors.phoneNumber && <p className='text-danger mb-2'>{errors.phoneNumber.message}</p> }

                    <div className="input-group mb-2">
                      <span className="input-group-text" id="basic-addon1">
                        <i className='fa fa-key text-muted'></i>
                      </span>
                      <input 
                      type="text" 
                      className="form-control bg-body-secondary" 
                      placeholder="Confirm-password" 
                      aria-label="Username" 
                      aria-describedby="basic-addon1"
                      {...register('confirmPassword',{
                        required:'*Confirm-Password is required',
                        validate: (value) =>
                          value === watch('password') ||
                          "Password isn't a match"
                      }
                      )} />
                    </div>
                    {errors.confirmPassword && <p className='text-danger mb-2'>{errors.confirmPassword.message}</p> }
                    </div>  

                    <div className="col-md-12">
                      <div>
                        <div className="input-group mb-2">
                          <input 
                          type="file" 
                          className="form-control w-100 rounded- py-1 bg-body-secondary"
                          {...register('profileImage',{
                            required:'*Image is required',
                            pattern: {
                              value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,
                              message:'Invalid mail'
                            }
                          })} />
                          </div>
                          {errors.profileImage && <p className='text-danger mb-2'>{errors.profileImage.message}</p>}
                      </div>
                    </div>  

                  </div>
                    
                  

                  <div className='d-flex justify-content-end mb-4 pb-2'>
                    <Link to='/login' className='btn-forget fw-semibold text-main'>Login Now?</Link>
                  </div>

                  <div className='bg-warnin d-flex justify-content-center'>
                    <button type='submit' className="btn btn-success py-2 w-50 fw-bold">Register</button>  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
