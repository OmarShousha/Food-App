import React from 'react'
import noDataImg from '../../../../assets/Images/no-data.png'

export const NoData = () => {
  return (
    <>
    <div className='bg-dange text-center'>
      <img src={noDataImg} alt="" />
      <h3>No Data !</h3>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
    </>
  )
}
