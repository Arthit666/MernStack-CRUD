import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import AdminCreatePerson from '../pages/admin/AdminCreatePerson';
import { currentAdmin } from '../function/auth';

const AdminRoute = () => {
  const { user } = useSelector(state => ({...state}));
  const [ok,setOk] = useState(false);

  useEffect(()=>{
      if(user && user.token){
          currentAdmin(user.token)
          .then(res=>{
            console.log('token admin ',res);
            setOk(true);
          }).catch(err=>{
            console.log('admin route error',err);
            setOk(false);
          });
      }
  },[user])
  return ok 
  ? < AdminCreatePerson />
  :< LoadingToRedirect/>
}

export default AdminRoute