import React from 'react'
import vectorImg from '../../../../assets/Images/Vector.png'
import logoImg from '../../../../assets/Images/a2.png'
import notfoundImg from '../../../../assets/Images/a3.png'
import NotfoundCSS from './Notfound.module.css'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <>
    <section className={NotfoundCSS.bg}>
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dange">
        <div className="container">
          <Link className="navbar-brand ms-lg-5 ps-lg-0 pt-3 pt-md-4" to="">
            <img src={logoImg} className='w-75' alt="" />
          </Link>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
          </div>
        </div>
      </nav>

      <div className="container bg-blac">
        <div className="row vh-100 bg-dange justify-content-end align-items-md-center align-items-lg-end position-relative">

          <div className="col-md-6 align-self-md-center ">

              <div className='pt-5 pt-md-0 ms-lg-5 ps-lg-5 mt-lg-5 d-flex flex-column align-items-center align-items-md-start bg-blac'>


                  <h1 className='display-4 fw-bold pt-5 pt-md-0 m-0 ms-md-2 mt-4 mt-md-0'>Oops.</h1>
                  <h2 className={`fw-semibold mb-4 display-5 ms-md-2 ${NotfoundCSS.header}`}>Page not found</h2>
                  <p className='mb-4 mb-lg-5 ms-md-2'>
                    This Page doesn’t exist or was removed! <br /> We suggest you  back to home.
                  </p>
                  <Link to='' className="btn btn-success w-50 ms-md-2">Back to <br /> Home</Link>
              </div>
          </div>

          <div className="col-md-6 bg-inf m-0 p-0 d-flex" >
              <div className='bg-dange align-self-end'>
                <img src={notfoundImg} className='w-100' alt="" />
              </div>
          </div>
        </div>
      </div>

    </section>
    </>
  )
}
