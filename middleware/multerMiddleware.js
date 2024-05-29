//1) import multer 
const multer = require('multer')

//2) create a storage space in server
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
       callback(null, './uploads') /* where the file should be stored */
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`  //Date.now() - return milliseconds from date class
        callback(null,filename)/* name by which the file should be stored */
    }
})

//3) providing file filter
const fileFilter = (req,file,callback)=>{
    if(file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('Only png,jpg or jpeg files are accepted'))
    }

}

//4) call multer
const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig