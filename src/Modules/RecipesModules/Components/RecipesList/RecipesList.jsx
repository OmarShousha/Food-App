import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import headerImg from '../../../../assets/Images/home-avatar.svg'
import categoryImg from '../../../../assets/Images/header.png'
import axios from 'axios';
import  NoDataImg  from '../../../../assets/Images/no-data.png';
import categoriesStyle from '../../../CategoriesModule/Components/CategoriesList/CategoriesList.module.css'
import { Button, Modal } from 'react-bootstrap';
import { NoData } from '../../../SharedModules/Components/NoData/NoData';
import { useNavigate } from 'react-router-dom';
import { DeleteData } from '../../../SharedModules/Components/deleteData/DeleteData';
import { Bounce, toast } from 'react-toastify';


export default function RecipesList() {

  let [recipesList, setRecipesList] = useState([]);
  let [recId , setRecId] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log(id);
    setRecId(id);
    setShow(true);
  }


  const navigate = useNavigate('')
  //*=============>get<=============>
  let getRecipesList = async ()=>{
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',{headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}});
      setRecipesList(response.data.data);
      console.log(response);
    }
    catch(error){
      console.log(error);
    }
  }

  let goToRecipeData = () =>{
    navigate('/dashboard/recipesdata')
  }
  //!=============>delete<=============>
  let deleteRecipe = async () =>{
    try{
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recId}`,
      {
        headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}
      });
      getRecipesList();
      handleClose();
      toast.error('Recipe Deleted Successfully ✅',{
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
    }
  
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getRecipesList();
  }, [])

  return (
    <>
      <Header 
      title='Hello Recipes !' 
      description='This is a welcoming screen for the entry of the application , you can now see the options'
      imgUrl={categoryImg}
      />
      <div className={`${categoriesStyle.font} bg-info-subtl p-3 container-fluid rounded-4`}>
        <div className="row justify-content-center align-items-center">
          <div className='col-md-6'>
            <div>
              <h4>
                Recipes Table Details
              </h4>
              <span>You can check all details</span>    
            </div>
          </div>
          <div className='col-md-6 d-flex justify-content-end'>
            <div>
              <button onClick={goToRecipeData} className='btn btn-success py-2'>Add new recipe</button>
            </div>
          </div>
        </div>

        <ul className="list-group mt-3 rounded-4">
          <li className="list-group-item fw-semibold bg-secondary-subtle py-3 text-white d-flex justify-content-between align-items-center">
            <div className="col-1 text-black">#</div>
            <div className="col text-black">Recipe Name</div>
            <div className="col text-black">Image</div>
            <div className="col text-black">Price</div>
            <div className="col text-black">Description</div>
            <div className="col text-black">Category</div>
            <div className="col text-black">Tag</div>
            <div className="col text-black">Actions</div>
          </li>
          {recipesList.length > 0 ? (recipesList.map((recipe,index) =>(
            <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className='col-1'>{index +1}</div>
              <div className='col'>{recipe.name}</div>

              {/* <div className='col'>{recipe.imagePath ? 
              <img className='w-50 rounded-3' src={'https://upskilling-egypt.com:3006/'+recipe.imagePath}  ></img>:<img src={NoData}></img>}</div> */}
              <div className='col'>
                {recipe.imagePath ? 
                  <img className='w-50 rounded-3' src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} alt={recipe.name} />
                  :
                  <img src={NoDataImg} className='w-50 p-3' alt="No Image" />
                }
              </div>

              <div className='col'>{recipe.price}</div>
              <div className='col'>{recipe.description}</div>
              <div className='col'>{recipe.category && recipe.category.length > 0 && recipe.category[0].name ? recipe.category[0].name : 'No Category'}</div>
              <div className='col'>{recipe.tag.name}</div>
              <div className='col'>
                  <i onClick={() => handleUpdateClick(category)} className='update btn p-0 fa-solid fa-edit fs-5 text-warning me-3'></i>
                  <i onClick={() => handleShow(recipe.id) } className='btn p-0 fa-solid fa-trash fs-5 text-danger'></i>
                </div>
            </li>
          ))):(
            <li className="list-group-item">
              <NoData />
            </li>
          )}
        </ul>
        {/*=======================> Delete Modal <======================== */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='d-flex justify-content-end'>
        <div className={categoriesStyle.btnClose} onClick={handleClose}>
            <i className={`${categoriesStyle.iClose} fa-solid fa-xmark`}></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <DeleteData title="Delete this recipe?"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='px-3' onClick={deleteRecipe} >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      </div>
    </>
  )
}
