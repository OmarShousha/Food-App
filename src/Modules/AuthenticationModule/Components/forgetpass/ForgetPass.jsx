import React from 'react'
import logo from '../../../../assets/Images/4.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


export default function ForgetPass() {

  const navigate = useNavigate();

  let {register, handleSubmit, formState:{errors}, watch} = useForm();

  const mySubmit = async (data) => {

    // *==============> if it is good <===============
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data);
      console.log(response);
      toast.success(response.data.message);
      navigate('/resetpass');
    }
    
    // &===========> if it found an error <===========
    catch(error){
      toast.error(error.response.data.message);
    }
  }



  return (
    <>
    <section className='auth-layout'>
      <div className="container">
        <div className="row vh-100 justify-content-center align-items-center p-3 p-md-0">
          <div className="col-md-9 col-lg-6 bg-white p-4 p-md-5 rounded-4 border border-3">
            <div>
              {/* ============> Image <============== */}
              <div className='text-center bg-dange mb-5'>
                <img src={logo} className='' alt="" />
              </div>

              <div>
                <h3 className='fw-bold mb-1'>Forgot Your Password?</h3>
                <p className='text-muted mb-4'>
                No worries!  Just give us your email for a password reset link. 
                </p>
                
              {/*============> Form <============== */}
                <form onSubmit={handleSubmit(mySubmit)}>
                  <div className="input-group mb-2 pt-2">
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
                      pattern:{
                        value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:'Invalid mail'
                      }
                    })}
                    />
                  </div>
                  {errors.email && <p className='alert alert-danger'>{errors.email.message}</p>}

                  <button type='submit' className="btn btn-success w-100 fs-5 fw-bold mt-5">Submit</button>
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
