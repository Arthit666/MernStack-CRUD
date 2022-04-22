import React, { useState } from 'react';
import { Menu } from 'antd';

import { DownOutlined,UserOutlined,AppstoreOutlined , HomeOutlined, LoginOutlined ,UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const { SubMenu } = Menu;
const Navbar = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state=>({...state})); //data from redux
  //  console.log('Navbar',user);
  const navigate = useNavigate();

  const logout =()=>{
    dispatch({
      type: 'LOGOUT',
      payload: null
    });
    navigate('/');
  }
  return (
    <Menu  mode="horizontal" >
        <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key="person" icon={<AppstoreOutlined />}>
              Person
        </Menu.Item>

        {!user && (
        <Menu.Item className='ml-auto' key="register" icon={<UserAddOutlined />}>
            <Link to='/register'>Register</Link>
        </Menu.Item>
        )}
        {!user && (
        <Menu.Item  key="login" icon={<UserOutlined />}>
            <Link to='/login'>Login</Link>
        </Menu.Item>
        )}
        {user && (
        <SubMenu className='ml-auto' icon={<DownOutlined />} key="SubMenu" title={user.name}>
        <Menu.Item onClick={logout}  key="logout" icon={<LoginOutlined />}>
            logout
        </Menu.Item>
        </SubMenu>
        )}
    </Menu>
  )
}

export default Navbar;
