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
import { Bounce, toast } from 'react-toastify'
import Dropdown from 'react-bootstrap/Dropdown';


export default function CategoriesList() {

  
  let [ categoriesList, setGategoriesList ] = useState([]);
  let { register, handleSubmit, formState: { errors } } = useForm();
  
  const [catId, setCatId] = useState();
  
  
  const modalTitle = catId ? 'Update' : 'Add';
  const buttonText = catId ? 'Update' : 'Add';
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (category) => {
    setShow(true);
    setCatId(category ? category.id : null);
  };
  
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setCatId(id);
    console.log(id);
    setShowDelete(true);
  };
  

  // &====================> Getting Data <=======================^
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

  //*===========================> Adding <========================^
  const addCategory = async (data) => {
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/',
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      console.log(data);
      getGategoriesList();
      handleClose();
      toast.success(response.statusText, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      }
      catch(error) {
      toast.error('Somthing went wrong', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
  }

  // ^====================> Updating Category <======================^
  const updateCategory = async (data) => {
    try {
      let response = await axios.put(`https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      getGategoriesList();
      handleClose();
      toast.success('Updated', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      console.log(data);
      console.log(response);
    }
    catch(error){
      
      console.log('msh tmam');
    }
  }
  

  // !====================> Deleting Category <======================^
  const onDeleteSubmit = async () =>{
    try{
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
      );
      toast.success('Item Deleted',{
        position:'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
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
      imgUrl={categoryImg}
      />
      <div className={`${categoriesStyle.font} bg-info-subtl p-3 container-fluid rounded-4`}>
        <div className="row justify-content-center align-items-center">
          <div className='col-md-6 bg-dange mb-3'>
            <div className='bg-warnin'>
              <h4>
                Categories Table Details
              </h4>
              <span>You can check all details</span>    
            </div>
          </div>
          <div className='col-md-6 d-flex justify-content-center justify-content-md-end'>
            <div>
              <button onClick={handleShow} className='btn btn-success py-2'>Add new category</button>
            </div>
          </div>
        </div>
        
        <ul className="list-group mt-3 rounded-4">
            <li className="list-group-item bg-dange fw-semibold bg-secondary-subtle py-3 text-white d-flex justify-content-between align-items-center">
              <div className="row w-100">
                <div className="col-md-3 bg-dange text-black">#</div>
                <div className="col-md-3 bg-dange text-black">Category Name</div>
                <div className="col-md-3 bg-dange text-black">Creation Date</div>
                <div className="col-md-3 bg-dange text-black">Actions</div>
              </div>
          </li>
          {categoriesList.length > 0 ? (
            categoriesList.map((category, index) => (
              <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="row w-100">
                  <div className="col-md-3 py-2">{index + 1}</div>
                  <div className="col-md-3">{category.name}</div>
                  <div className="col-md-3">{category.creationDate}</div>
                  <div className='col-md-3 bg-body-secondar bg-info-subtl w-fit p-md-0 px-md-3 px-lg- rounded-3 d-flex justify-content-center align-items-center'>
                    <i onClick={() => handleShow(category)} className='update btn p-0 fa-solid fa-edit fs-5 text-warning me-3'></i>
                    <i onClick={() => handleShowDelete(category.id)} className='btn p-0 fa-solid fa-trash fs-5 text-danger'></i>
                  </div>

                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">
              <NoData />
            </li>
          )}
        </ul>


      {/*=======================> Add Modal <======================== */}
      <Modal className='bg-dange px-3' show={show} onHide={handleClose}>
        <Modal.Header className='d-flex justify-content-between'>
          <Modal.Title>{modalTitle}</Modal.Title>
          <div className={categoriesStyle.btnClose} onClick={handleClose}>
            <i className={`${categoriesStyle.iClose} fa-solid fa-xmark`}></i>
          </div>
        </Modal.Header>
        <Modal.Body className='mt-5 mb-1'>
          <form action="" onSubmit={handleSubmit(catId ? updateCategory : addCategory)}>
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
              <button type='submit' className='btn btn-success px-4'>{buttonText}</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/*=======================> Delete Modal <======================== */}
      <Modal className='d-flex flex-column justify-content-center px-3' show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header className='d-flex justify-content-end'>
        <div className={categoriesStyle.btnClose} onClick={handleCloseDelete}>
            <i className={`${categoriesStyle.iClose} fa-solid fa-xmark`}></i>
          </div>
        </Modal.Header>
        <Modal.Body className='p-4'>
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
