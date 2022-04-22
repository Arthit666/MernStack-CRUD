
import React, {useState} from 'react';
import {registerHandler} from '../../function/auth';
import { toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [fromData,setFormData] = useState({
      name: '',
      password: '',
      password2:''
  });
  
  const {name , password, password2 } = fromData;
  const [loading,setLoading] = useState(false);
  const onChange = (event) =>{
      setFormData({...fromData,[event.target.name]: event.target.value});
    }
  const onSubmit = (event) => {
      setLoading(true);
      event.preventDefault();
      if (password !== password2){
          console.log('no Match');
          toast.error('password not match');
      }else {
        const newUser ={
          name,
          password
        }
        // console.log(newUser);
        registerHandler(newUser)
        .then(res =>{
          setLoading(false);
          console.log(res);
          toast.success('Register Complete');
          navigate('/');
        }).catch(err => {
          setLoading(false);
          console.log(err.response); 
          toast.error(err.response.data.msg);
        });
      }
    }
    // console.log(name ,password,password2);
    // console.log(process.env.REACT_APP_API);
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {!loading ? <h1>Register</h1> : <h1>Loading...</h1>}
          <form onSubmit={onSubmit}>
            <div className='form-group'>
            <input 
            className='form-control'
            name='name'
            autoFocus
            placeholder='Username'
            type="text" 
            onChange={onChange}/>
            </div>
            <div className='form-group'>
            <input 
            className='form-control'
            name='password'
            autoFocus
            placeholder='password'
            type="password" 
            onChange={onChange}/>
            </div>
            <div className='form-group'>
            <input 
            className='form-control'
            name='password2'
            autoFocus
            placeholder='password2'
            type="password" 
            onChange={onChange}/>
            </div>
            <button className='btn btn-success' 
            type='submit'
            disabled={password.length < 6}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register