import React from 'react'
import avatar from '../../../../assets/Images/avatar.png'

export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-sm rounded-4 navbar-light bg-body-secondary
    ">
      <div className="container-fluid">
        <button className="navbar-toggler d-lg-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        
        <div className="collapse navbar-collapse" id="collapsibleNavId">

          <form className="my-2 my-lg-0 ms-lg-3 w-5">
            <input className="form-control border-0 rounded-4 w-100 py-1" type="text" placeholder="Search" />
          </form>

          <ul className="navbar-nav mt-2 mt-lg-0 bg-dange">

            <li className="nav-item d-flex justify-content-center align-items-center bg-inf">
              <div>
                <img src={avatar} className='w-75' alt="" />
              </div>
              <a className="nav-link" href="#" aria-current="page">
                Upskilling
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            
            <li className="nav-item dropdown bg-warnin d-flex justify-content-center">
              <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <a className="dropdown-item" href="#">Action 1</a>
                <a className="dropdown-item" href="#">Action 2</a>
              </div>
            </li>
            <li className="nav-item bg-succes d-flex justify-content-center">
              <a className="nav-link" href="#">
                <i className='fa-solid fa-bell'></i>
              </a>
            </li>
          </ul>

        </div>
      </div>
    </nav>

    
    </>
  )
}
