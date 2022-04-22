import React, { useState ,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNav from '../../layout/AdminNav';
import { useSelector }from 'react-redux';
import { toast } from 'react-toastify'
import { getOnePerson, updatePerson} from '../../function/person';


const AdminUpdatePerson = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state=>({...state}))
  const [name,setName] = useState('');
  const [loading,setLoading] = useState(false);

  const [file,setFile] = useState('');
  const [fileold,setFileold] = useState('');
  const [filename,setFilename] = useState('');
  ////

  useEffect(()=>{
       loadPerson(params.id,user.token);
  },[])
  /////
  
  const loadPerson =(id,authtoken)=>{
    getOnePerson(id,authtoken)
    .then(res=>{
        setName(res.data.name);
        setFilename(res.data.pic);
        setFileold(res.data.pic);
    }).catch(err =>{
      toast.error(err);
      console.log(err);
    })
  }

  const onSubmit = (event) =>{
    event.preventDefault();
    setLoading(true);
    /////
    const formData = new FormData();
    formData.append('file',file);
    formData.append('filename',filename);
    formData.append('data',name);
    formData.append('fileold',fileold);
    /////
    updatePerson(formData,params.id,user.token)
    .then(res=>{
      console.log(res);
      setLoading(false);
      toast.success('Update '+res.data.name + ' Success');
      navigate('/admin/create-person');
    }).catch(err=>{
      console.log(err);
      setLoading(false);
      toast.error(err.response);
    });
  }
  

  ///
  
  

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav/>
        </div>
        <div className='col'>
        {!loading ? <h3>Create Person</h3> : <h3>Loading...</h3>}    
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label>Name:</label>
              <input type='text' 
              className='form-control' 
              autoFocus
              required
              onChange={(event)=>setName(event.target.value)}
              value={name}
             />
            </div>
            <div className='custom-file mb-4'>
              <input type="file" className='custom-file-input'
              onChange={(event)=>{
                setFile(event.target.files[0]);
                setFilename(event.target.files[0].name)
              }}
              />
              <label className='custom-file-label'
              htmlFor='customfile'>
                {filename}
              </label>
            </div>
            <button className='btn btn-outline-primary'>Update</button>
          </form>
          <hr/>
        </div>
      </div>
    </div>
  )
}

export default AdminUpdatePerson