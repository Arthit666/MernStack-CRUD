import React,{useState, useEffect} from 'react';
//CSS
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Notify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Component
import  Navbar from './component/layout/Navbar';
//Router
import { Routes, Route} from 'react-router-dom';
import UserRoute from './component/routes/UserRoute';
import AdminRoute from './component/routes/AdminRoute';
import AdminCreatePersonRoute from './component/routes/AdminCreatePersonRoute';
import AdminUpdateRoute from './component/routes/AdminUpdateRoute';
//Page
import Login from './component/pages/auth/Login';
import Register from './component/pages/auth/Register';
import Home from './component/pages/Home';
import AdminCreatePerson from './component/pages/admin/AdminCreatePerson';
import {useDispatch} from 'react-redux'

//function
import { currentUser } from './component/function/auth'


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
      const idTokenResuilt = localStorage.token;
      
      if(idTokenResuilt){
        currentUser(idTokenResuilt)
        .then(res => {
          dispatch({
            type:'LOGGED_IN_USER',
            payload:{
              name: res.data.name,
              token:idTokenResuilt,
              role: res.data.role,
              id: res.data._id, 
            }
          })
        }).catch(err =>{
          console.log(err)
        })
      }
  },[dispatch]);
  return (
    <div className="App">
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/admin/dashboard' element={<AdminRoute/>} />
        <Route path='/admin/create-person' element={<AdminCreatePersonRoute/>} />
        <Route path='/admin/update-person/:id' element={<AdminUpdateRoute/>} />
        <Route path='/user/dashboard' element={<UserRoute/>} />
      </Routes>
    </div>
  );
}

export default App;
