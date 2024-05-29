//logic to resolve register request

const users = require("../db/model/userSchema");
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
  console.log('Inside register controller');
  const {username, email, password} = req.body
  console.log(username,email,password);
  
  try {
    const existingUser = await users.findOne({mailId:email})

    if(existingUser){
      res.status(406).json('Account already exists')
    }
    else{
      //create an object for the model
      const newUser = new users({
        username,
        mailId:email,
        password,
        github:"",
        linkedIn:"",
        profile:""
      })
      //to save the data in mongodb
      await newUser.save()
      //response
      res.status(200).json(newUser)
    }

  } catch (error) {
    res.status(401).json(error)
  }
}


//login controller

exports.login = async(req,res)=>{
  console.log('inside login function');
  const {email, password} = req.body
  console.log(email, password);

  try {
    const existingUser = await users.findOne({mailId:email, password})
    if(existingUser){
      const token = jwt.sign({userId:existingUser._id},'supersecretkey')
      res.status(200).json({
        existingUser,
        token
      })

    }
    else{
      res.status(401).json('Invalid Email ID or password')
    }
    
  } catch (error) {
    res.status(401).json(`Request failed due to ${error}`)
  }
}