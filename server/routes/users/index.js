const express = require("express");
let getUsers=require('./getUsers');
let router=express.Router();
router.get('/',getUsers);
module.exports=router;