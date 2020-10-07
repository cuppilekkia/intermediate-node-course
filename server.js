const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const port=8000;
const app= express();

const sendResponse = (err, data, res) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: err,
      })
    } else if (!data) {
      res.status(404).json({
        success: false,
        message: "Not found",
      })
    } else {
      res.status(200).json({
        success: true,
        data: data,
      })
    }
  }

const {User} = require('./models/User');
mongoose.connect('mongodb://root:example@localhost/competition?authSource=admin&w=1',{ useNewUrlParser: true });

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users',(req,res)=>{
  User.create(
    {
      name: req.body.newData.name,
      email: req.body.newData.email,
      password: req.body.newData.password,
    },
    (err, data)=>sendResponse(err,data,res)
  )
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id, (err, data)=>sendResponse(err,data,res))
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.newData.name,
      email: req.body.newData.email,
      password: req.body.newData.password,
    },
    {
      new: true,
    },
    (err, data)=>sendResponse(err,data,res)
  )
})
// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err, data)=>sendResponse(err,data,res)  
  )
})