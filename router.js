//1)import express
const express = require('express')
//import userController
const userController = require('./controllers/userController')
const projectController = require('./controllers/projectController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')

//2)to create router - use class 'Router' in the express library
const router = new express.Router()

//path to resolve register request
router.post('/user/register',userController.register)

//path to resolve login request
router.post('/user/login',userController.login)

//path to add a project
router.post('/projects', jwtMiddleware, multerConfig.single('projectImage') , projectController.addProject)


//export router so that only it can be used in index.js
module.exports = router
