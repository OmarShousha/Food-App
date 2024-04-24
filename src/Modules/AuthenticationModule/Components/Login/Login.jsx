import React from 'react'
import logo from '../../../../assets/Images/4.svg'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({saveLoginData}) {

  const navigate = useNavigate();

  let {register, handleSubmit, formState:{errors}} = useForm();

  const mySubmit = async (data) => {

    // *==============> if it is good <==============
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data);
      console.log(response);

      localStorage.setItem('token',response.data.token)
      
      toast.success('Logged in successfully');
      navigate('/dashboard');
    }

    // &===========> if it found an error <===========
    catch(errors){
      toast.error(errors.response.data.message);
    }
  }


  return (
    <>
    <section className='auth-layout'>
      <div className="container">
        <div className="row vh-100 justify-content-center align-items-center p-3 p-md-0">
          <div className="col-md-9 col-lg-6 bg-white p-4 p-md-5 rounded-4 border border-3">
            <div className='px-lg-2'>
              {/* ============> Image <============== */}
              <div className='text-center bg-dange mb-3'>
                <img src={logo} className='' alt="" />
              </div>

              {/* ============> Form <============== */}
              <div>
                <h3 className='fw-bold mb-1'>Log in</h3>
                <p className='text-muted mb-4'>Welcome back! please enter your details</p>
                
                <form onSubmit={handleSubmit(mySubmit)}>
                  <div className="input-group mb-3 pt-2">
                    <span className="input-group-text" id="basic-addon1">
                      <i className='fa fa-envelope text-muted'></i>
                    </span>
                    <input 
                    type="text" 
                    className="form-control bg-body-secondary" 
                    placeholder="Enter your Email" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    {...register('email',{
                      required:'Email is required',
                      pattern: {
                        value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
                        message:'Invalid mail'
                      }
                    })} />
                  </div>
                  {errors.email && <p className='alert alert-danger'>{errors.email.message}</p>}

                  <div className="input-group mb-3">
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
                      required:'Password is required',
                      pattern:{
                        value:/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
                        message:'Invaild password'
                      }
                    }
                    )} />
                  </div>
                  {errors.password && <p className='alert alert-danger'>{errors.password.message}</p> }

                  <div className='d-flex justify-content-between mb-4 pb-2'>
                    <Link to='/register' className='btn-register text-muted fw-semibold'>Regiter Now?</Link>
                    <Link to='/forgetpass' className='btn-forget fw-semibold text-main'>Forget Password?</Link>
                  </div>

                  <button type='submit' className="btn btn-success w-100 fs-5 fw-bold">Login</button>
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
