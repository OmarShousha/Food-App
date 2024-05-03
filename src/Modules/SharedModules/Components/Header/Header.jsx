import React from 'react'
import headerImg from '../../../../assets/Images/home-avatar.svg'


export default function Header(props) {
  return (
    <div className="container-fluid my-3 header-container bg-main text-white rounded-4 py-4  p-md-4 p-lg-0 px-lg-5">
      <div className="row align-items-center justify-content-between">

        <div className="col-md-8 bg-warnin">
          <h1 className='ms-lg-4 fw-semibold mb-2'>{props.title}</h1>
          <p className='ms-lg-4'>{props.description}</p>
        </div>

        <div className="col-md-4 bg-primar w-fit">
          <div className='header-img '>
            <img src={props.imgUrl} className='' alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
