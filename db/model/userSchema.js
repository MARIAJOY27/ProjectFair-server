//model for users collection
const mongoose = require('mongoose')

//schema
const userSchema = mongoose.Schema({
    username:{
        require:true,
        type:String
    },
    mailId:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    },
    github:{
        type:String
    },
    linkedIn:{
        type:String
    },
    profile:{
        type:String
    }
})

const users = mongoose.model('users',userSchema) //the model name must be same as collection name (here users)

module.exports = users