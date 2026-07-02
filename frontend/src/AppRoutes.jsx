import React from 'react'
import {Route, Routes} from 'react-router';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Notfound from './pages/pulic/Notfound';
import Home from './pages/pulic/Home';
import Navbar from './components/Navbar';


import MenuDetails from './pages/pulic/MenuDetails';
import Menu from './pages/pulic/Menu';
import Cart from './pages/cart/Cart';
import Payment from './pages/cart/payment/Payment';
import Success from './pages/cart/payment/Success';
import Dashboard from './admin/Dashboard';
import UserManagement from './admin/UserManagement';
import OrderManagement from './admin/OrderManagement';
import FoodManagement from './admin/FoodManagement';
import AddFood from './admin/AddFood';
import EditFood from './admin/EditFood';
import { useSelector } from 'react-redux';


const AppRoutes = () => {
  const userState = useSelector(state=>state.auth);
  console.log(userState);
  const {user, isAuthenticated} = useSelector(state=>state.auth);

  return (

    <div>
      <Navbar/> 
      <Routes>
        {/* <Route path = 'path' element = {<component to render />} /> */}
        <Route path = '/' element = {<Home/>} />
        <Route path = '/sign-up' element = {<SignUp/>} />
        <Route path = '/login' element = {<Login/>} />
        <Route path = '*' element = {<Notfound/>} />

        <Route path = '/menu' element = {<Menu/>} />
        <Route path = '/menu/:id' element = {<MenuDetails/>} />
        <Route path = '/cart' element = {<Cart/>} />
        <Route path = '/payment' element = {<Payment/>} />
        <Route path = '/success' element = {<Success/>} />

    {/* placing token validation and authenticating admin functions by checking if user role is admin */}
        {user?.role == "admin" && isAuthenticated &&(
        <Route path = '/admin' element = {<Dashboard/>} >
         <Route path = 'user-management' element = {<UserManagement/>}/>
         <Route path = 'order-management' element = {<OrderManagement/>}/>
         <Route path = 'food-management' element = {<FoodManagement/>}/>
         <Route path = 'add-food' element = {<AddFood/>}/>
         <Route path = 'edit-food' element = {<EditFood/>}/>
        </Route>)}
      </Routes>
      
    </div>
  )
}

export default AppRoutes
