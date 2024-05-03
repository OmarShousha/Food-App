import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
          <div>
            <SideBar/>
          </div>
          <div className='w-100 vh-100 p-2 p-md-3 overflow-y-auto'>
            <Navbar/>
            {/* <Header/> */}
            <Outlet/>
          </div>
      </div>

    </>
  )
}
