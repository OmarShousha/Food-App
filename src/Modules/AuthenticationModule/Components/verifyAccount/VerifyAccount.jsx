import React from 'react'
import logo from '../../../../assets/Images/4.svg'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';

export const VerifyAccount = () => {

  const navigate = useNavigate();

  let {register, handleSubmit, formState:{errors}} = useForm();

  const mySubmit = async (data) => {

    try{
      let response = await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/verify',data);

      console.log(data);
      toast.success('Account Verified', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      
      navigate('/login');
    }

    catch(error){
      toast.error('Account Verification failed', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      console.log(error.response.data.message);
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
                <h3 className='fw-bold mb-1'>Verify Account</h3>
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
                    placeholder="Enter the code" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    {...register('code',{
                      required:'code is required',
                      pattern:{
                        value:/^[A-Z0-9a-z]{4}$/,
                        message:'Invaild code'
                      }
                    }
                    )} />
                  </div>
                  {errors.code && <p className='alert alert-danger'>{errors.code.message}</p> }


                  <button type='submit' className="btn btn-success w-100 mt-3 py-2 fw-semibold">Verify</button>
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
