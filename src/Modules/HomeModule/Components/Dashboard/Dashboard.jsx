import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import headerImg from '../../../../assets/Images/home-avatar.svg'


export default function Dashboard() {


  return (
    <>
      <Header 
      title='Hello Dashboard !' 
      description='This is a welcoming screen for the entry of the application , you can now see the options'
      imgUrl={headerImg}
      />
      <div className='bg-warning-subtle fw-semibold fs-3'>Dashboard</div>
    </>
  )
}
