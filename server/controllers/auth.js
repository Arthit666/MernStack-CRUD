const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//@route  POST http://localhost:8000/api/register
//@desc route register
//@access public
exports.createRegister = async (req,res)=>{
  const {name, password} = req.body;  //req.body.name
  try {
      //Check user
      let user = await User.findOne({name});
      if(user){
        return res.status(400).json({msg:'User already exists'})
      }
      //create
      user = new User ({
        name,
        password
      });
      //encryt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password,salt);
      //save on database
      await user.save();

      //patload return jsonwebtoken
      const payload = {
          user:{
            name: user.name,
            role: user.role
          }
      }
      jwt.sign(payload,'jwtSecret',
      {expiresIn : 3600}, // 3600minute
      (err,token) => {
        if (err) throw err;
        res.json({ token })
      });
  }catch (err){
    console.log(err.message);
    res.status.send('Server Error');
  }
}

//@route  POST http://localhost:8000/api/login
//@desc route login
//@access public
exports.login = async (req,res)=>{
  const {name, password} = req.body;  //req.body.name
  try {
      //Check user
      let user = await User.findOneAndUpdate({name},{new:true});
      if(!user){
        return res.status(400).json({msg:'Username Invalid Credentials'})
      }
      
      //Conpare Encryt password
      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch){
        return res.status(400).json({msg:'Password Invalid Credentials'});
      }

      //patload return jsonwebtoken
      const payload = {
          user:{
            id: user._id,
            name: user.name,
            role: user.role
          }
      }
      jwt.sign(payload,'jwtSecret',
      {expiresIn : 3600}, // 3600minute
      (err,token) => {
        if (err) throw err;
        res.json({ token , payload})
      });

  }catch (err){
    console.log(err.message);
    res.status.send('Server Error');
  }
}


//@route  POST http://localhost:8000/api/current-user
//@desc route current
//@access private
exports.currentUser = async (req,res)=>{
  User.findOne({name: req.user.name}).select('-password').exec((err,user)=>{
      if (err) throw new Error(err);
      res.json(user);
  });

}
