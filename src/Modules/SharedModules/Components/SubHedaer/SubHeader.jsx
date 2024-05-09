import React from 'react'
import { useNavigate } from 'react-router-dom'


export const SubHeader = (props) => {


  const navigate = useNavigate('');
  let goToRecipes = () =>{
    navigate('/dashboard/recipes')
  }

  return (
    <>
    <div className="container">
        <div className="row p-3 p-lg-5">
          
        <div className="col-md-6 bg-warnin mb-3 mb-md-0">
          <div>
            <h3 className='mb-2'>{props.title}</h3>
            <p className=''>{props.text}</p>
          </div>
          </div>
          
        <div className="col-md-6 bg-inf d-flex align-items-center">
            <div className='bg-warnin w-100 d-flex justify-content-center justify-content-md-end'>
              <button onClick={goToRecipes} className='btn btn-success d-flex justify-content-center align-items-center gap-2 px-lg-4 fw-semibold'>
                <p className='py- me-2'>All Recipes</p>
                <i className='fa-solid fa-arrow-right mt-1'></i>
              </button>
            </div>
          </div>
          
      </div>
    </div>
    </>
  )
}
