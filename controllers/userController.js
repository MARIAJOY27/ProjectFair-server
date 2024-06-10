//logic to resolve register request

const users = require("../model/userSchema");
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  console.log('Inside register controller');
  const { username, email, password } = req.body
  console.log(username, email, password);

  try {
    const existingUser = await users.findOne({ mailId: email })

    if (existingUser) {
      res.status(406).json('Account already exists')
    }
    else {
      //create an object for the model
      const newUser = new users({
        username,
        mailId: email,
        password,
        github: "",
        linkedIn: "",
        profile: ""
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

exports.login = async (req, res) => {
  console.log('inside login function');
  const { email, password } = req.body
  console.log(email, password);

  try {
    const existingUser = await users.findOne({ mailId: email, password })
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, 'supersecretkey')
      res.status(200).json({
        existingUser,
        token
      })

    }
    else {
      res.status(401).json('Invalid Email ID or password')
    }

  } catch (error) {
    res.status(401).json(`Request failed due to ${error}`)
  }
}

exports.updateProfileController = async(req,res)=>{
  const userId = req.payload

  const {username,email,password,github,linkedin,profile} = req.body

  ProfileImage = req.file?req.file.filename:profile

  try {
  
    const existingUser = await users.findByIdAndUpdate({_id:userId},{username,mailId:email,password,github,linkedIn:linkedin,profile:ProfileImage},{new:true})
    await existingUser.save()
    res.status(200).json(existingUser)
    
  } catch (error) {
    res.status(401).json(`Request failed due to ${error}`)
  }
}