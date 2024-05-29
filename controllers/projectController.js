


exports.addProject = (req,res)=>{
    console.log('inside add request');
    console.log(req.payload);
    console.log(req.file);
    console.log(req.body);
    //logic to add project
    res.status(200).json('request received')
}