const express = require("express");
let getUsers=require('./getUsers');
let router=express.Router();
router.get('/',getUsers);
let setFlag=require('./setFlag');
router.get('/',getUsers);
router.post('/',setFlag);
module.exports=router;