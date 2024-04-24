import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './Modules/SharedModules/Components/AuthLayout/AuthLayout'
import MasterLayout from './Modules/SharedModules/Components/MasterLayout/MasterLayout'
import Dashboard from './Modules/HomeModule/Components/Dashboard/Dashboard'
import RecipesList from './Modules/RecipesModules/Components/RecipesList/RecipesList'
import CategoriesList from './Modules/CategoriesModule/Components/CategoriesList/CategoriesList'
import UsersList from './Modules/UsersModule/Components/UsersList/UsersList'
import Login from './Modules/AuthenticationModule/Components/Login/Login'
import Register from './Modules/AuthenticationModule/Components/register/Register'
import ForgetPass from './Modules/AuthenticationModule/Components/forgetpass/ForgetPass'
import ResetPass from './Modules/AuthenticationModule/Components/resetpass/ResetPass'
import Notfound from './Modules/SharedModules/Components/Notfound/Notfound'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'


function App() {

  let {loginData , setLoginData} = useState(null);
  let saveLoginData = () =>{
    let encodedToken = localStorage.getItem('token');
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      saveLoginData();
    }
  }, [])
  

  let routes = createBrowserRouter([
    {
      path: '/dashboard',
      element: <MasterLayout/>,
      children:[
        {path:'',element: <Dashboard/>},
        {path:'recipes',element: <RecipesList/>},
        {path:'categories',element: <CategoriesList/>},
        {path:'users',element: <UsersList/>}
    ]
    },
    {
      path: '/',
      element: <AuthLayout/>,
      children:[
        {path:'',element: <Login/>},
        {path:'login',element: <Login/>},
        {path:'register',element: <Register/>},
        {path:'forgetpass',element: <ForgetPass/>},
        {path:'resetpass',element: <ResetPass/>}
      ] 
    },
    {
      path:'*',
      element: <Notfound/>
    }
  ])

  return (
    <>
    <ToastContainer />
    <RouterProvider router={routes}/>
    </>
  )
}

export default App
