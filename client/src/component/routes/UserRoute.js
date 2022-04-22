import React from 'react';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import UserDashboard from '../pages/user/UserDashboard';

const UserRoute = () => {
  const { user } = useSelector(state=>({ ...state }));
  
  return user && user.token
    ? <UserDashboard/>
    : <LoadingToRedirect/>

    // user && user.token
    // ? <Route  />
    // : <LoadingToRedirect/>
}

export default UserRoute