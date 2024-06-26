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
  let getRecipesList = async (name)=>{
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: {
            name: name,
          }
        });
      setRecipesList(response.data.data);
      console.log(response);
    }
    catch(error){
      console.log(error);
    }
  }

  const getNameValue = (input) => {
    getRecipesList(input.target.value);
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
          <div className='col-md-6 mb-3'>
            <div>
              <h4>
                Recipes Table Details
              </h4>
              <span>You can check all details</span>    
            </div>
          </div>
          <div className='col-md-6 d-flex justify-content-center justify-content-md-end'>
            <div>
              <button onClick={goToRecipeData} className='btn btn-success py-2'>Add new recipe</button>
            </div>
          </div>
        </div>
        <div className="filteration mt-3 mb-4">
          <div className="row">

            {/* SEARCH BY NAME <================ */}
            <div className="col-md-6">
              <input
                type="text"
                className='form-control bg-info-subtle'
                placeholder='Search by recipe name..'
                onChange={getNameValue}
              />

            </div>

            {/* SEARCH BY  */}
            <div className="col-md-3">
              <div>
                <select className='form-control bg-info-subtle'>
                  <option value="">Test</option>
                </select>
              </div>
            </div>

            {/* SEARCH BY  */}
            <div className="col-md-3">
              <div>
                <select className='form-control bg-info-subtle'>
                  <option value="">Test</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        <ul className="list-group mt-3 rounded-4">
          <li className="list-group-item fw-semibold bg-secondary-subtle py-3 text-white d-flex justify-content-between align-items-center">
            <div className="row w-100 justify-content-md-around justify-content-lg-between">
              <div className="col-md-1 bg-primar pt-lg-3 text-black">#</div>
              <div className="col-md-1 bg-primar pt-lg-3 text-black">Recipe Name</div>
              <div className="col-md-1 bg-primar pt-lg-3 text-black">Image</div>
              <div className="col-md-1 bg-primar pt-lg-3 text-black">Price</div>
              <div className="col-md-1 bg-primar pt-lg-3 text-black">Description</div>
              <div className="col-md-1 bg-primar pt-lg-3 text-black">Category</div>
              <div className="col-md-1 bg-primar pt-lg-3 text-black">Tag</div>
              <div className="col-md-1 bg-primar pt-lg-3 text-black">Actions</div>
            </div>
          </li>
          {recipesList.length > 0 ? (recipesList.map((recipe,index) =>(
            <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="row w-100 justify-content-md-around justify-content-lg-between ">
                <div className='col-md-1'>{index +1}</div>
                <div className='col-md-1'>{recipe.name}</div>
                <div className='col-md-1'>
                  {recipe.imagePath ? 
                    <img className='recipe-img bg-dange text-start rounded-3' src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} alt={recipe.name} />
                    :
                    <img src={NoDataImg} className='recipe-img p-3 bg-primar rounded-3' alt="No Image" />
                  }
                </div>
                <div className='col-md-1'>{recipe.price}</div>
                <div className='col-md-1'>{recipe.description}</div>
                <div className='col-md-1'>
                  {recipe.category && recipe.category.length > 0 && recipe.category[0].name ? recipe.category[0].name : 'No Category'}
                </div>
                <div className='col-md-1'>{recipe.tag.name}</div>
                <div className='col-md-1 bg-primar'>
                    <i onClick={() => handleUpdateClick(category)} className='update btn p-0 fa-solid fa-edit fs-5 text-warning me-3'></i>
                    <i onClick={() => handleShow(recipe.id) } className='btn p-0 fa-solid fa-trash fs-5 text-danger'></i>
                </div>

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
