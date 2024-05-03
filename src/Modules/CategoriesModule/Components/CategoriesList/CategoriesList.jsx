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
  //&& ========================================================== &&
  const [updateCategory, setUpdateCategory] = useState(null);

  const handleUpdateClick = (category) => {
    setUpdateCategory(category);
    handleShow(); // Open the modal for updating
  };

  //&& ========================================================== &&

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
  
  // *====================> Adding Category <=================^
  const onSubmit = async (data)=>{
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/',
      data, {
        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
      });
      getGategoriesList();
      handleClose();
      toast.success('Item Added ✅',{
        position:'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.log(response);
    }
    catch(error){
      // toast.error(error.response.data.message);
      console.log(error);
    }
  }

  // !====================> Deleting Category <=================^
  const onDeleteSubmit = async () =>{
    try{
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
      );
      toast.success('Item Deleted ✅',{
        position:'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
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

  // ?====================> Updating Category <=================^
  // Update Operation
  const onUpdate = async (data) => {
    try {
      let response = await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${updateCategory.id}`,
        data,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
      );
      toast.success('Category Updated ✅',{
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
      
      handleClose(); 
      getGategoriesList(); 
    } catch(error) {
      console.log(error);
    }
  };

  let toggleMenu = ()=> {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
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
        
        <ul className="list-group mt-3 rounded-4">
          <li className="list-group-item fw-semibold bg-secondary-subtle py-3 text-white d-flex justify-content-between align-items-center">
            <div className="col-2 text-black">#</div>
            <div className="col-2 text-black">Category Name</div>
            <div className="col-2 text-black">Creation Date</div>
            <div className="col-2 text-black">Actions</div>
          </li>
          {categoriesList.length > 0 ? (
            categoriesList.map((category, index) => (
              <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="col-2 py-2">{index + 1}</div>
                <div className="col-2">{category.name}</div>
                <div className="col-2">{category.creationDate}</div>
                <div className='col-2'>
                  <i onClick={() => handleUpdateClick(category)} className='update btn p-0 fa-solid fa-edit fs-5 text-warning me-3'></i>
                  <i onClick={() => handleShowDelete(category.id)} className='btn p-0 fa-solid fa-trash fs-5 text-danger'></i>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">
              <NoData />
            </li>
          )}
        </ul>


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

      {/*=======================> Delete Modal <======================== */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='d-flex justify-content-between'>
          <Modal.Title>{updateCategory ? 'Update Category' : 'Add Category'}</Modal.Title>
          <div className={categoriesStyle.btnClose} onClick={handleClose}>
            <i className={`${categoriesStyle.iClose} fa-solid fa-xmark`}></i>
          </div>
        </Modal.Header>
        <Modal.Body className='mt-5 mb-1'>
          <form action="" onSubmit={handleSubmit(updateCategory ? onUpdate : onSubmit)}>
            <input type="text"
            className="form-control border-0 py-2 mb-3 bg-body-tertiary" 
            placeholder='Category Name'
            {...register('name', {
              required: 'Category Name is required!',
              pattern: {
                value: /^[a-zA-Z\s-]+$/,
                message: 'Invalid Category Name'
              }
            })}
            defaultValue={updateCategory ? updateCategory.name : ''}
            />
            {errors.name && <p className='alert alert-danger py-2'>{errors.name.message}</p>}
            <hr />
            <div className='d-flex justify-content-end'>
              <button type='submit' className='btn btn-success px-4'>{updateCategory ? 'Update' : 'Save'}</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      </div>
    </section>
    </>
  )
}
