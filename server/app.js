var express =require("express");
var http = require('http');
var socketio = require('socket.io');
var peer=require('peer');
var bodyParser = require('body-parser');
var cors = require('cors');
var socketEvents = require('./utils/socket');
var routes = require('./utils/routes');
var config = require('./utils/config');
var register = require('./routes/registerUser');
var userSessionCheck = require('./routes/userSessionCheck');
var userNameCheck = require('./routes/userNameCheck');
var login = require('./routes/login');
var generalChats = require('./routes/generalChat');
var scraping = require('./routes/scraping');
var messages = require('./routes/messages');
var verification=require('./routes/otp/verification');

var users = require('./routes/users');

let app=express();
let server = http.Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use('/registerUser', register);
app.use('/userSessionCheck', userSessionCheck);
app.use('/usernameCheck', userNameCheck);
app.use('/login', login);
app.use('/generalChats', generalChats);
app.use('/getMessages', messages);
app.use('/users', users);
app.use('/otpVerify',verification);
app.use('/unfurl',scraping);

var serverInstance=server.listen(4000);
app.use('/peerjs',peer.ExpressPeerServer(serverInstance,{debug:true}));
socket = socketio(server);
new socketEvents(socket).socketConfig();
