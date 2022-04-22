const jwt = require('jsonwebtoken')
const User = require('../models/User');
exports.auth = (req,res, next) => {  //if pass next();
  const token = req.headers['authtoken'];
  // console.log('middleware ',req.body)
  if(!token){
    return res.status(401).json({msg: 'No token'});
  }

  //verify token
  try{
    const decode = jwt.verify(token,'jwtSecret'); //decaode to data
    req.user = decode.user
    
    next();
  }catch{
    res.status(401).json({msg: 'Token not valid'})
  }
}

exports.adminCheck = async (req,res,next)=>{
  const { name } = req.user;
  const adminUser = await User.findOne({name}).exec();
  if(adminUser.role !== 'admin'){
    res.status(403).json({err:'Admin access denied'})
  }else {
    next();
  }

}