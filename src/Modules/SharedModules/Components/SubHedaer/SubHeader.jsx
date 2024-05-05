import React from 'react'
import { useNavigate } from 'react-router-dom'


export const SubHeader = (props) => {


  const navigate = useNavigate('');
  let goToRecipes = () =>{
    navigate('/dashboard/recipes')
  }

  return (
    <>
      <header className='d-flex justify-content-between align-items-center p-5'>
        <div className='bg-dange'>
          <h3 className='mb-2'>{props.title}</h3>
          <p className='w-75'>{props.text}</p>
        </div>
        <div>
          <button onClick={goToRecipes} className='btn btn-success d-flex justify-content-center align-items-center gap-2 px-4 fw-semibold'>
            <p className='py-1 me-1'>All Recipes</p>
            <i className='fa-solid fa-arrow-right mt-1'></i>
          </button>
        </div>
      </header>
    </>
  )
}
