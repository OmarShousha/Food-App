import React from 'react'
import deleteImg from '../../../../assets/Images/no-data.png'

export const DeleteData = (props) => {
  return (
    <>
    <div className='bg-primar text-center my-3'>
      <img src={deleteImg} className='w-25'  alt="" />
      <h4 className='mt-4 mb-2 '>{props.title}</h4>
      <p className='text-muted'>Are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
    </>
  )
}
