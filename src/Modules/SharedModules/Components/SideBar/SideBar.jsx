import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import toggleLogo from '../../../../assets/Images/3.png'

export default function SideBar() {

  let navigate = useNavigate();

  let logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
    toast.success('Logged out succeccfully');
  }

  let [isCollapse , setIsCollapse] = useState(true);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  }
  

  return (
    <>
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapse} className='border-0' >
        <Menu className='bg-inf py-5'>

          {/* <MenuItem 
          onClick={handleCollapse} 
          icon={<img src={toggleLogo} 
          className={`  mt-3 menu-img ${isCollapse ? 'collapsed' : ''}`} ></img>}></MenuItem> */}
          <MenuItem 
          onClick={handleCollapse} icon={<i className='fa fa-list fs-4'></i>}></MenuItem>

          <MenuItem icon={<i className="fa-solid fa-house"></i>} className='mt-5' component={<Link to="" />}> Home</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-user-group"></i>} component={<Link to="users" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-list"></i>} component={<Link to="recipes" />}> Recipes</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-layer-group"></i>} component={<Link to="categories" />}> Categories</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-unlock-keyhole"></i>}> Change Password</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-circle-left"></i>}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
    </>
  )
}
