'use strict';
/*===================== load all the files we need ========================================*/
const helper = require('../../utils/helper');
let fs =require('fs');  
let path =require('path');

module.exports = (request,response)=>{
    try{








        let getUserInfoResponse = {};
    helper.getUserInfo( request.body.id, (error,result)=>{

                    if (error || result === null) {

                        getUserInfoResponse.error = true;
                        getUserInfoResponse.message = `Server error.`;
                        response.status(404).json(getUserInfoResponse);
                    }else{
                        
                        var file = result.profilePhoto
                        var dirname = path.resolve(".")+'/';
                        fs.readFile(dirname  + file, function (err,data){
                        //console.log(dirname+file)
                        if(err){
                            
                            getUserInfoResponse.error = false;
                            getUserInfoResponse.result = result;
                            getUserInfoResponse.message = `File Doesnt exist`;
                            response.status(200).json(getUserInfoResponse);
                //resp.send("File Doesn't Exist")

                    

                         }else{

                

                            //getUserInfoResponse.writeHead(200, {'Content-Type': 'image/png' });
                            //res.end(img, 'binary');
                            var convImg = Buffer.from(data).toString('base64')
                            getUserInfoResponse.image = convImg;
                            getUserInfoResponse.message = `Profile Photo`;
                            response.status(200).json(getUserInfoResponse);


                            /*getUserInfoResponse.error = false;
                                getUserInfoResponse.result = result;
                                getUserInfoResponse.message = `Query Complete`;
                                response.status(200).json(getUserInfoResponse);*/
                }
            });





                        
                    }
                });


}catch(error){
  response.json({status:false, message: "Server Error",data: error })
}
}


