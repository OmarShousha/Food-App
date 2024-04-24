import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function SideBar() {

  let navigate = useNavigate();

  let logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
    toast.success('Logged out succeccfully');
  }

  return (
    <div className='d-flex flex-column gap-3 bg-dark text-white p-3'>
      <Link to=''>Home</Link>
      <Link to='users'>Users</Link>
      <Link to='recipes'>Recipes</Link>
      <Link to='categories'>Categories</Link>
      <button onClick={logout} className='btn btn-danger'>Logout</button>
    </div>
  )
}
