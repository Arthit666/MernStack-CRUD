import React, { useState ,useEffect } from 'react';
import { Table, Progress ,Avatar, Image } from 'antd';
import AdminNav from '../../layout/AdminNav';
import { useSelector }from 'react-redux';
import { toast } from 'react-toastify'
import { createPerson, getPerson ,removePerson} from '../../function/person';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment/min/moment-with-locales'


const AdminCreatePerson = () => {

  const { user } = useSelector(state=>({...state}))
  const [name,setName] = useState('');
  const [loading,setLoading] = useState(false);
  const [person,setPerson] = useState([]);
  const [file,setFile]=useState('');
  const [filename,setFilename]=useState('Choose File');
  const [uploadPerscentage,setUploadPerscenTage] = useState(0);

  ////
  
  useEffect(()=>{
       loadPerson(user.token);
  },[])
  /////

  const loadPerson =(authtoken)=>{
    getPerson(authtoken)
    .then(res=>{
        setPerson(res.data);
    }).catch(err =>{
      toast.error(err);
      console.log(err);
    })
  }

  const onSubmit = (event) =>{
    event.preventDefault();
    setLoading(true);
    ///
    const formData = new FormData();
    formData.append('file',file);
    formData.append('data',name);
    // console.log(formData.get('data'));
    createPerson(formData,user.token, setUploadPerscenTage)
    .then(res=>{
      console.log(res);
      setLoading(false);
      setUploadPerscenTage(0);
      setFilename('Choose File')
      loadPerson(user.token);
      toast.success('Create '+res.data.name + ' Success');
      setName('');
    }).catch(err=>{
      console.log(err);
      setLoading(false);
      toast.error(err.response);
    });
  }
  const handleRemove =(id)=>{
    if(window.confirm('Are you Delete ?')){
        setLoading(true);
        removePerson(id,user.token)
        .then(res=>{
        console.log(res);
        setLoading(false);
        loadPerson(user.token);
        toast.success('Remove '+res.data.name + ' Success');
    }).catch(err=>{
        console.log(err);
        setLoading(false);
        toast.error(err.response);
    });
    }
  }

  ///
  const columns = [
   { 
     key: 'name',
     title: 'Name:',
    dataIndex : 'name',

    },
    { 
      key: 'time',
      title: 'Time',
      render: (record)=>(
        <>
           {moment(record.date).locale('th').format('DD/MM/YYYY')}
        </>
      )
    },
    { 
      key: 'file',
      title: 'File',
      render: (record)=>(
        <>
           <Avatar
              src={ <Image
                      src={`http://localhost:8000/uploads/${record.pic}`}
                      style={{width: 32,}} />
                  }
                />
        </>
      )
    },
    { 
      key: 'action',
      title: 'Action',
      render: (record)=>(
        <>
        <span className='btn btn-sm float-right'
        onClick={()=>handleRemove(record._id)} >
          <DeleteOutlined className='text-danger'/>
        </span>
        <Link to={'/admin/update-person/'+ record._id} >
        <span className='btn btn-sm float-right'>
          <EditOutlined className='text-warning'/>
        </span>
        </Link>
        </>
      )
    }
  ]
  

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav/>
        </div>
        <div className='col'>
        {!loading ? <h3>Create Person</h3> : <h3>Loading...</h3>}  

          <form onSubmit={onSubmit} >
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
              <Progress
              strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                  }}
              percent={uploadPerscentage}
               />
            </div>
            <button className='btn btn-outline-primary'>Submit</button>
          </form>

          <hr/>
          <Table columns={columns} dataSource={person} rowKey='_id' />
        </div>
      </div>
    </div>
  )
}

export default AdminCreatePerson