/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');
let bodyParser = require('body-parser');
let multer = require('multer');
var fs = require('fs');  
let variablefilename;


module.exports = (request,response)=>{
  
	try{

		
    const userId = request.params.id;
    
		let storage = multer.diskStorage({ //multers disk storage settings
  		destination: function (req, file, cb) {

     cb(null, './uploads/');
    },
    filename: function (req, file, cb) {  
      
      let datetimestamp = Date.now();
      let filename = file.fieldname + '-'+ userId + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
      this.variablefilename=filename
      //cb(null, file.fieldname + '-'+ userId + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
      
      cb(null, filename);
    }

  });

		let upload = multer({ //multer settings
      storage: storage,
      fileFilter : function(req, file, callback) { //file filter
      if (['png','jpg'/*,'mp3','mp4'*/].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
        return callback(new Error("wrong"));
      }

        callback(null, true);
      }
  }).single('file');


		upload(request,response,function(err){
      //console.log("inside upload")
    if(err)
      {
        response.json({error_code:1,err_desc:err, message: "Error encountered"});
      }
      //console.log(response.req.file.path)
     let updateProfilePhotoResponse = {}
    
    let data ={$set:{"profilePhoto":response.req.file.path}}
    let params = {"id": response.req.params.id}
    helper.updateUserData( params, data, (error,result)=>{

                if (error || result === null) {

                  updateProfilePhotoResponse.error = true;
                  updateProfilePhotoResponse.message = `Server error.`;
                  response.status(404).json(updateProfilePhotoResponse);
                }else{
                  //console.log(result.result)
                  updateProfilePhotoResponse.error = false;
                  updateProfilePhotoResponse.response = result;
                  updateProfilePhotoResponse.message = `User Profile Picture Updated`;
                  response.status(200).json(updateProfilePhotoResponse);
                }
        });


})

}catch(error){
  response.json({status:false, message: "Server Error",data: error })
}
}



