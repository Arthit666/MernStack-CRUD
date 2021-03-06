const Person = require("../models/Person")
const fs = require('fs')


exports.create = async (req,res) =>{
  try {
      const { data } = req.body;
      const newData ={
        name: data,
        pic: req.file.filename
      }
      // console.log('file',req.file);
      res.json(await new Person(newData).save());

  }catch (err) {
      console.log(err);
      res.status(400).send('Create person faill')
  }
}
exports.list = async(req,res) =>{
  res.json(await Person.find({}).sort({createdAt: -1}).exec())

}
exports.read = async (req,res) =>{
  const persons = await Person.findOne({_id: req.params.id}).exec()
  res.json(persons);
}
exports.update = async (req,res) =>{
  try {
    const { fileold , data } = req.body;
    var newData = {
      name:data,
      pic: fileold
    }
    if(typeof req.file != 'undefined'){
      newData.pic = req.file.filename;
      await fs.unlink(`./public/uploads/${fileold}`,(err)=>{
        if(err){
          console.log(err)
        }else{
          console.log('remove success')
        }
    });
    }
    const updated = await Person.findOneAndUpdate({_id: req.params.id},
      newData,
      {new: true}
    );
    res.json(updated);
  }catch (err) {
   console.log(err);
   res.status(400).send('update person faill')
  }
}
exports.remove = async (req,res) =>{
  // console.log('param',req.params.id)
  try {
    const deleted = await Person.findOneAndDelete({_id: req.params.id});
    await fs.unlink(`./public/uploads/${deleted.pic}`,(err)=>{
        if(err){
          console.log(err)
        }else{
          console.log('remove success')
        }
    })
    res.json(deleted);
  }catch (err) {
   console.log(err);
   res.status(400).send('Remove person faill')
  }
}