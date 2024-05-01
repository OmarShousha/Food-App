import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import headerImg from '../../../../assets/Images/home-avatar.svg'
import categoryImg from '../../../../assets/Images/header.png'
import categoriesStyle from './CategoriesList.module.css'
import axios from 'axios'
import { NoData } from '../../../SharedModules/Components/NoData/NoData'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { DeleteData } from '../../../SharedModules/Components/deleteData/DeleteData'


export default function CategoriesList() {

  let [catId, seCatId] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    seCatId(id);
    setShowDelete(true);
  };
  
  let [ categoriesList, setGategoriesList ] = useState([]);
  let {register, handleSubmit, formState:{errors}} = useForm();
  
  

  // ^====================> Getting Data <=================^
  const getGategoriesList = async () =>{
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
      {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}});
      setGategoriesList(response.data.data);
    }
    
    catch(error){
      console.log(error);
    }
  };
  
  
  // *====================> setting Data <=================^
  const onSubmit = async (data)=>{
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/',
      data, {
        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
      });
      getGategoriesList();
      handleClose();
      console.log(response);
    }
    catch(error){
      console.log(error);
    }
  }

  // !====================> Deleting Data <=================^
  const onDeleteSubmit = async () =>{
    try{
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
      );
      console.log(response);
      handleCloseDelete();
      getGategoriesList();
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getGategoriesList();
  }, [])
  
  return (
    <>
    <section>
      <Header 
      title='Hello Categories !' 
      description='You can now add your items that any user can order it from the Application and you can edit'
      imgUrl={headerImg}
      />
      <div className={`${categoriesStyle.font} bg-info-subtle p-3 container-fluid rounded-4`}>
        <div className="row justify-content-center align-items-center">
          <div className='col-md-6'>
            <div>
              <h4>
                Categories Table Details
              </h4>
              <span>You can check all details</span>    
            </div>
          </div>
          <div className='col-md-6 d-flex justify-content-end'>
            <div>
              <button onClick={handleShow} className='btn btn-success py-2'>Add new category</button>
            </div>
          </div>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.length>0 ?categoriesList.map((category, index)=>
            <tr key={category.id}>
              <th scope="row">{index+1}</th>
              <td>{category.name}</td>
              <td>{category.creationDate}</td>
              <td>
                <i className='btn p-0 fa-solid fa-edit  fs-5 text-warning me-3'></i>
                <i onClick={()=>handleShowDelete(category.id)} className='btn p-0 fa-solid fa-remove fs-5 text-danger'></i>
              </td>
            </tr>):(
                <tr>
                  <td colSpan="4" >
                    <NoData />
                  </td>
                </tr>
              )}
          </tbody>
        </table>


      {/*=======================> Add Modal<======================== */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='d-flex justify-content-between'>
          <Modal.Title>Add Category</Modal.Title>
          <div className={categoriesStyle.btnClose} onClick={handleClose}>
            <i className={`${categoriesStyle.iClose} fa-solid fa-xmark`}></i>
          </div>
        </Modal.Header>
        <Modal.Body className='mt-5 mb-1'>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input type="text"
             className="form-control border-0 py-2 mb-3 bg-body-tertiary" 
             placeholder='Category Name'
             {...register('name', {
              required:'Category Name is required!',
              pattern:{
                value:/^[a-zA-Z\s-]+$/,
                message:'Invalid Category Name'
              }
             })}
             />
             {errors.name && <p className='alert alert-danger py-2'>{errors.name.message}</p>}
            <hr />
            <div className='d-flex justify-content-end'>
              <button type='submit' className='btn btn-success px-4'>Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/*=======================> Delete Modal <======================== */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header className='d-flex justify-content-end'>
        <div className={categoriesStyle.btnClose} onClick={handleCloseDelete}>
            <i className={`${categoriesStyle.iClose} fa-solid fa-xmark`}></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <DeleteData title="Delete this Category?"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='px-3' onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      </div>
    </section>
    </>
  )
}
