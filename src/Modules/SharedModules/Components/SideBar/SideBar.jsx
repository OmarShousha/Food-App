import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import toggleLogo from '../../../../assets/Images/3.png'
import { Button, Modal } from 'react-bootstrap';
import logo from '../../../../assets/Images/4.svg'
import { useForm } from 'react-hook-form';
import axios from 'axios';


export default function SideBar() {

  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPassword, setShowPassword] = useState(true)
  let togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  

  let logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
    toast.success('Logged out successfully 🧑‍💻', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  }

  let [isCollapse , setIsCollapse] = useState(true);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  }

  let { register, handleSubmit, formState: { errors }, watch  } = useForm();

  //*==============>>Submitting to change password<<================//
  const onSubmit = async (data) => {
    try {
      let response = await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword', data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        toast.success(response.data.message,{
          position:'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        logout();
        handleClose();
      }
      
      catch (error) {
      toast.success(error.response.data.message,{
        position:'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log(error);
    }
  }
  

  return (
    <>
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapse} className='border-0' >
        
        <Menu className='bg-inf py-5'>
          <MenuItem 
          onClick={handleCollapse} icon={<i className='fa fa-list fs-4'></i>}></MenuItem>

          <MenuItem icon={<i className="fa-solid fa-house"></i>} className='mt-5' component={<Link to="" />}> Home</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-user-group"></i>} component={<Link to="users" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-list"></i>} component={<Link to="recipes" />}> Recipes</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-layer-group"></i>} component={<Link to="categories" />}> Categories</MenuItem>
          <MenuItem onClick={handleShow} icon={<i className="fa-solid fa-unlock-keyhole"></i>}> Change Password</MenuItem>
          <MenuItem onClick={logout} icon={<i className="fa-solid fa-sign-out"></i>}> Logout</MenuItem>
        </Menu>
        </Sidebar>


        <Modal className='rounded-4 pt-4 bg-dange' show={show} onHide={handleClose}>
          <div className="container bg-blac">
            <div className="row p-4 py-lg-5 px-lg-3 justify-content-center">
              <div className="col-md-12 bg-warnin">

                <div className='bg-dange text-center'>
                  <img src={logo} className='w-60' alt="" />
                </div>


                <Modal.Body className='d-flex bg-warnin flex-column gap-3 mt-3 px-2'>
                  <div className='font-montserrat'>
                    <h5 className='fw-semibold'>Change your password</h5>  
                    <p className='text-muted'>Enter your details below</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className='d-flex bg-inf flex-column'>

                    <div className="input-group mt-2 font-montserrat">
                      <span className="input-group-text border-0" id="basic-addon1">@</span>
                      <input
                        {...register('oldPassword', {
                          required: '*Old password is required',
                          pattern: {
                            value: /.{3,}/,
                            message:'*Invalid password'
                          }
                        })}
                        type={showPassword? 'text' : 'password'}
                        className="form-control p-form mb-0 bg-body-secondary border-0"
                        placeholder="Old Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                      {<span
                        onClick={togglePasswordVisibility}
                        className='input-group-text bg-body-secondary border-0'>
                        {showPassword ?
                          <i className="fa-regular fa-eye text-muted me-1"></i> :
                          <i className="fa-regular fa-eye-slash text-muted me-1"></i>}</span>
                      }
                    </div>
                    {errors.oldPassword && <div className='ms-2 mt-0 text-danger'>{errors.oldPassword.message}</div>}


                    <div className="input-group mt-3 font-montserrat">
                      <span className="input-group-text border-0" id="basic-addon1">@</span>
                      <input {...register('newPassword', {
                        required: '*New password is required',
                        pattern: {
                          value: /.{3,}/,
                          message:'*Invalid password'
                        }
                      }
                      )} 
                        type={showPassword? 'text' : 'password'} className="form-control border-0 p-form bg-body-secondary" placeholder="New Password" aria-label="Username" aria-describedby="basic-addon1" />
                      {<span
                        onClick={togglePasswordVisibility}
                        className='input-group-text bg-body-secondary border-0'>
                        {showPassword ?
                          <i className="fa-regular fa-eye text-muted me-1"></i> :
                          <i className="fa-regular fa-eye-slash text-muted me-1"></i>}</span>
                      }
                    </div>
                    {errors.newPassword && <div className='ms-2 mt- text-danger'>{errors.newPassword.message}</div>}


                    <div className="input-group mt-3 font-montserrat">
                      <span className="input-group-text border-0" id="basic-addon1">@</span>
                      <input {...register('confirmNewPassword', {
                        required: '*Please confirm your password',
                        validate: (value) =>
                          value === watch('newPassword') ||
                          "Password isn't a match"
                      })} 
                        type={showPassword? 'text' : 'password'} className="form-control border-0 p-form bg-body-secondary" placeholder="Confirm New Password" aria-label="Username" aria-describedby="basic-addon1" />
                        {<span
                        onClick={togglePasswordVisibility}
                        className='input-group-text bg-body-secondary border-0'>
                        {showPassword ?
                          <i className="fa-regular fa-eye text-muted me-1"></i> :
                          <i className="fa-regular fa-eye-slash text-muted me-1"></i>}</span>
                      }
                    </div>
                    {errors.confirmNewPassword && <div className=' ms-2 mt- text-danger '>{errors.confirmNewPassword.message}</div>}

                    <button type='submit' className='btn mt-5 btn-success border-0 p-form fw-semibold'>
                      Change Password
                    </button>

                  </form>

                </Modal.Body>
                
                
              </div>
            </div>
          </div>
      </Modal>
    </div>
    </>
  )
}
