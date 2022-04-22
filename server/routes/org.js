const express = require('express');
const router = express.Router();

// http://localhost:8000/api/create-org
router.get('/create-org',(req,res)=>{
    res.send('create-org endpoint')
});

// http://localhost:8000/api/update-org
router.get('/update-org',(req,res)=>{
  res.send('update org endpoint')
});

module.exports = router;