/*===================== load all the files we need ========================================*/
const express = require('express');
let getUserInfo = require('./getUserInfo');
let getUserPhoto = require('./getUserPhoto');

//import passport from 'passport';

let router=express.Router();
/*=====================     providing routers    ========================================*/
router.get('/:email',getUserInfo);
router.get('/photo/:email',getUserPhoto);

module.exports=router;
