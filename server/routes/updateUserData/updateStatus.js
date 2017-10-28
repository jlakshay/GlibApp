
/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');

module.exports = (request,response)=>{
	try{

		let updateStatusResponse = {}
		let data ={$set:{"status":request.body.status}}

		helper.updateUserData( request.body.email, data, (error,result)=>{

	           		if (error || result === null) {

	           			updateStatusResponse.error = true;
	            		updateStatusResponse.message = `Server error.`;
	           			response.status(404).json(updateStatusResponse);
	           		}else{
	           			//console.log(result)
	           			updateStatusResponse.error = false;
	           			updateStatusResponse.userId = result;
	            		updateStatusResponse.message = `User Status Updated`;
	           			response.status(200).json(updateStatusResponse);
	           		}
				});
		
}catch(error){
  response.json({status:false, message: "Server Error",data: error })
}
}

