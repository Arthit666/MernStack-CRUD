import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import AdminUpdatePerson from '../pages/admin/AdminUpdatePerson';
import { currentAdmin } from '../function/auth';

const AdminRoute = () => {
  const { user } = useSelector(state => ({...state}));
  const [ok,setOk] = useState(false);

  useEffect(()=>{
      if(user && user.token){
          currentAdmin(user.token)
          .then(res=>{
          
            setOk(true);
          }).catch(err=>{
            console.log('admin route error',err);
            setOk(false);
          });
      }
  },[user])
  return ok 
  ? < AdminUpdatePerson />
  :< LoadingToRedirect/>
}

export default AdminRoute