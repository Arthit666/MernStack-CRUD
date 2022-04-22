const express = require('express');
const mongooose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { readdirSync } = require('fs');

//import routes
// const authRoutes = require('./routes/auth');
// const personRoutes = require('./routes/person');


//app
const app = express();

app.use(express.static(__dirname + '/public'));

//conect DB
mongooose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log('DB Connected'))
.catch((err)=> console.log('DB Connect error',err))


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'2mb'}));
app.use(cors());

//routes
// app.use('/api',authRoutes)
// app.use('/api',personRoutes)
readdirSync('./routes')
.map((r)=> app.use('/api',require('./routes/' + r)));  // r is file name


// app.get('/api',(req,res)=>{
//     res.send('hello world')
// });

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('server is running on port ',port)
});
