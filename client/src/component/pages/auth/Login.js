import React, {useState} from 'react';
import { loginHandler } from '../../function/auth';
import { toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fromData,setFormData] = useState({
      name: '',
      password: '',
  });
  
  const {name , password } = fromData;
  const [loading,setLoading] = useState(false);

  const roleBasedRedirect = (res) => {
    if(res === 'admin'){
      navigate('/admin/dashboard');
    }else {
      navigate('/user/dashboard');
    }
  }
  const onChange = (event) =>{
      setFormData({...fromData,[event.target.name]: event.target.value});
    };

  const onSubmit = (event) => {
      setLoading(true);
      event.preventDefault();
        const newUser ={
          name,
          password
        }
        // console.log(newUser);
        loginHandler(newUser)
        .then(res =>{
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
                token: res.data.token,
                name: res.data.payload.user.name,
                role: res.data.payload.user.role,
            }
          });
          // save on local store
          localStorage.setItem('token',res.data.token)
          
          setLoading(false);
          // console.log(res.data.token);
          toast.success('Login Complete');
          roleBasedRedirect(res.data.payload.user.role);  //redirect
        }).catch(err => {
          setLoading(false);
          console.log(err.response); 
          toast.error(err.response.data.msg);
        });
      
    }
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {!loading ? <h1>Login</h1> : <h1>Loading...</h1>}
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
            <button className='btn btn-success' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login