import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { SubHeader } from '../../../SharedModules/Components/SubHedaer/SubHeader';




export const RecipesData = () => {

  let {register, handleSubmit, formState:{errors}} = useForm();
  let [ categoriesList, setGategoriesList ] = useState([]);
  let [ tagList, setTagList ] = useState([]);
  const navigate = useNavigate('')

  const appendToFormData = (data)=>{
    const formData = new FormData();
    formData.append('name',data.name);
    formData.append('price',data.price);
    formData.append('description',data.description);
    formData.append('categoriesIds',data.categoriesIds);
    formData.append('tagId',data.tagId);
    formData.append('recipeImage',data.recipeImage[0]);
    return formData;
  }

  //*=======================>> Add <<=========================
  const addRecipe = async (data) => {
    let recipeFormData = appendToFormData(data);

    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Recipe',
      recipeFormData,
      {
        headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}
      }
    );
    navigate('/dashboard/recipes')
    toast.success('Recipe added successfully ✅', {
      position: "top-right",
      autoClose: 5000,
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
      toast.error('Failed ❌', {
        position: "top-right",
        autoClose: 5000,
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

  const getGategoriesList = async () =>{
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
      {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}});
      // console.log(response.data.data);
      setGategoriesList(response.data.data);
    }
    
    catch(error){
      console.log(error);
    }
  }

  const getTagList = async () =>{
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/tag/',
      {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}} );
      // console.log(response.data);
      setTagList(response.data);
    }

    catch(error){
      console.log(error);
    }
  }

  let goToRecipes = () =>{
    navigate('/dashboard/recipes')
  }

  

  useEffect(() => {
    getGategoriesList();
    getTagList();
  }, [])


  return (
    <>
    <div className="container-fluid mt-3">
      <div className="row flex-column justify-content-center align-items-center justify-content-center">
        <div className="col-md-12 bg-subheader rounded-4">
          <div>
            <SubHeader
              title={<span>Fill the <span className="text-success">Recipes!</span></span>}
              text='you can now fill the meals easily using the table and form , click here and sill it with the table !'/>
          </div>
        </div>
        <div className="col-md-10 col-lg-7 bg-blac">
          <div className='p-3'>
            <form onSubmit={handleSubmit(addRecipe)} action="" className='bg-info-subtl d-flex flex-column gap-3 rounded-4 p-lg-3 my-3'>


                <div>
              <input {...register('name',{
                required:'*Name is Required',
                pattern:{
                  value:/^[a-zA-Z' -]+$/,
                  message:'Invalid Name'
                }
              })} type="text" className="form-control border-0 bg-body-secondary" placeholder='Recipe Name' />
              {errors.name && <span className='ms-2 text-danger'>{errors.name.message}</span>}
                  
              </div>

              
              <div>
                <select className='my-form border-0 bg-body-secondary' {...register('tagId',{
                  required:'*Tag is required'
                })}>
                  <option value="">
                    Tags
                  </option>
                  {tagList.map((tag)=><option key={tag.id} value={tag.id}>{tag.name}</option>)}
                </select>
                {errors.tagId && <span className='ms-2 text-danger'>{errors.tagId.message}</span>}
              </div>

                <div>   
              <input {...register('price',{
                required:'*Price is required',
                pattern:{
                  value:/^\d{1,8}$/,
                  message:'Invalid Price' 
                }
              })} type="number" className="form-control border-0 bg-body-secondary" placeholder='Price' />
              {errors.price && <span className='ms-2 text-danger'>{errors.price.message}</span>}
              </div>


            <div>
              <select className='my-form border-0 bg-body-secondary' {...register('categoriesIds',{
                required:'*CategoriesIds is required'
              })}>
                <option value="">
                      Catgeories 
                </option>
                {categoriesList.map((cat)=><option key={cat.id} className='px-' value={cat.id}>{cat.name}</option>)}
              </select>
                  {errors.categoriesIds && <span className='ms-2 text-danger'>{errors.categoriesIds.message}</span>}
              </div>
                
            
               

            <div>
            <textarea {...register('description',{
              required:'*Description is required'
            }
            )} className='form-control border-0 bg-body-secondary' placeholder='Description'></textarea>
            {errors.description && <span className='ms-2 text-danger'>{errors.description.message}</span>}
            </div>

            <div>  
              <input {...register('recipeImage',{
                  required:'*Image is required',
                  // pattern:{
                  //   value:/^\d{1,8}$/,
                  //   message:'Invalid Price' 
                  // }
                })} type="file" className="form-control border-0 bg-body-secondary" placeholder='recipeImage' />
                {errors.recipeImage && <span className='ms-2 text-danger'>{errors.recipeImage.message}</span>}
            </div>
              
            <div className='bg-blac d-flex justify-content-end gap-4'>
              {/* <button className='btn btn-danger mt-4 w-25'>Cancel</button> */}
              <button onClick={addRecipe} className='btn btn-success mt-2 w-25'>Add</button>
            </div>


            </form>

          </div>
        </div>
      </div>
    </div>
    </>
  )
}
