import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'

export default function MasterLayout() {
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <SideBar/>
        </div>
        <div className="col-md-9">
          <div>
            <Navbar/>
            <Header/>
            <Outlet/>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}
