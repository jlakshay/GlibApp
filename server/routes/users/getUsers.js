const helper = require('../../utils/helper');
module.exports=(request,response) =>{
	 helper.getUsers(function(error,result){
                if(error){

                        response.status(200).json(error);
                }
                else {
                       
                       response.status(200).json(result);
                   }

            })



}