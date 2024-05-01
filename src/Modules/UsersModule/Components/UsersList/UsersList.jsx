import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import headerImg from '../../../../assets/Images/home-avatar.svg'

export default function UsersList() {
  return (
    <>
      <Header 
      title='Hello Users !' 
      description='This is a welcoming screen for the entry of the application , you can now see the options'
      imgUrl={headerImg}
      />
      <div className='bg-danger-subtle fw-semibold fs-3'>UsersList</div>
    </>
  )
}
