//only file that runs in the backend 

//1) import dotenv
require('dotenv').config() //environment variable will be added to process.env file

//2) import express
const express = require('express')

//3) import cors
const cors = require('cors')

//import router
const router = require('./router')
//import mongodb
require('./db/connection')

//import  app middleware
//const appMiddleware = require('./middleware/appMiddleware')

//4) create server
const projectFairServer = express()

//5) use cors to connect with frontend
projectFairServer.use(cors())

//6) json() - middleware - to convert json format to normal (js) format
projectFairServer.use(express.json())

//use middleware
//  projectFairServer.use(appMiddleware)

//server use router
projectFairServer.use(router)

//7)customize port
const PORT = 3000 || process.env.PORT

//8) run the server
projectFairServer.listen(PORT,()=>{
    console.log(`Project fair server running successfully at port ${PORT}`);
})

//get request
projectFairServer.get('/',(req,res)=>{
    res.send('GET request received')
})

//post request
// projectFairServer.post('/',(req,res)=>{
//     res.send('POST request received')
// })

//put request
// projectFairServer.put('/',(req,res)=>{
// res.send('PUT request received')
// })