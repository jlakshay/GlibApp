const helper = require('../../utils/helper');
module.exports= function (request, response) {

        var data={
            "message":request.body.message,
            "userName":request.body.userName,
            "userImageUrl":request.body.url,
            "timestamp":Date.now()
             }
        helper.insertMessagesToGeneral(data,function(error,result){
                if(error){

                        response.status(200).json(error);
                }
                else {
                       
                       response.status(200).json(result);
                   }

            })
        }