import { Component, OnInit } from '@angular/core';
import { GeneralChatService } from '../../shared/general-chat.service';
import { ChatService } from './../../chat.service';
import { HttpService } from './../../http.service';
import {GeneralService}from './general.service';
import { ActivatedRoute ,Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers:[GeneralChatService,ChatService,HttpService,GeneralService]
})
export class GeneralComponent implements OnInit {

 allGeneralMessages:any=[];
 private username = null;
 private userId = null; 
 socketmessage:any;
 socketcode: any;
 message: string;
 messages: string[] = [];
 user:any;
 userfinal:any;
 serveruser:any;
 chatroom:string;
 currentUser:string;
 Java:any="java";
 C:any="C";
 Python:any="Python";
 Javascript:any="Javascript";
 language:string;
 data:any={};
 dbmessage:any;
 c:any="c";

 constructor(private generalChatService: GeneralChatService,private generalService:GeneralService,
   private chatService : ChatService,
   private route :ActivatedRoute,
   private router :Router)   
 {

   this.generalChatService.getMessageObservable.subscribe((message)=>{
     console.log("Message is here", message);
     this.socketmessage=message; 
     this.allGeneralMessages.push(this.socketmessage);
     console.log("mes",this.allGeneralMessages);
   })

   this.generalChatService.getCodeObservable.subscribe((code)=>{
     console.log("code is here", code);
     var codemodified={
      "username":code.username,
       "code":{
       "code":code.code,
       "language":code.language,
       "title":code.title
        }

     }
     console.log("modified code object",codemodified);
     this.socketcode=codemodified; 

console.log("this is socket code to be pushed",this.socketcode);

     this.allGeneralMessages.push(this.socketcode);

     console.log("message code",this.allGeneralMessages);
   })
 }



//---------------------------------------------- callback in messages start--------------------------------------------//

 sendMessage(callback=()=>{
    if(this.message!='')
    {
    this.dbmessage=this.message;
    this.message='';
    }


    console.log("*****************");
    
//------------------------------------------------saves the message to db--------------------------------------------//

    this.generalService.saveMessage(this.username,this.dbmessage)
    .subscribe((current: string) => {
  this.socketSave();
    });

    console.log("This is after serveice call through compoentr*****************");
    

 })

 {


callback();
// callback2();


 }

 socketSave=()=>{

let data={

  "username":this.username,
  "message":this.dbmessage,
  // "time":moment().format('hh:mm:ss a')
}

//------------------------------------------------------sends and gets the message to the socket.io start-------------//

   // let currentTime = moment().format('hh:mm:ss a');
   this.generalChatService.sendMessage(data);

   this.generalChatService.getCurrent()
    .subscribe((current: string) => {
      if(current){
        // this.allGeneralMessages.push(this.socketmessage);
      }
    console.log("component",current);
    this.currentUser=current;
    });

//---------------------------------------------sends and gets the message to the socket.io end----------------------//

 }
 



 //---------------------------------------------- callback in messages end --------------------------------------------//




// get room name from dropdown and the service
room(room):any{
 this.chatroom=room;
 console.log(this.chatroom);
 this.generalChatService.chatRoom();
 this.generalChatService.getChatRoom();
}

 sendUserName(){
   console.log(this.username);
   this.generalChatService.sendUser(this.username);
   this.userfinal=this.username;
   // this.user='';
 }

 disconnectUser(){
   this.generalChatService.disconnectUsers();
 }


//getting all the general channel saved messages from the db
retreive(){

this.generalService.retrieveMessage().subscribe((generalmessage: string) => {
console.log("received general messages",generalmessage);

this.allGeneralMessages=generalmessage;
    // this.currentUser=current;
    });
}

//get the language from dropdown in html
languageSelect(lang){

this.data.language=lang;
this.data.username=this.username;
console.log("Language is = ",this.data.language);
console.log("This is language select",this.data.username);
}


//-------------------------------------------- callback for code start----------------------------------------------------//

 sendCodeData(callbackcode=()=>{



//-------------------------- saving the data to db start-------------------------------------------------------------//

    console.log("*****************");
   this.generalService.saveCode(this.data)
   .subscribe((code: string) => {
     this.callbackCodeData();
       console.log("@@@@@@@@@@@save code callback1",code);
     });

    console.log("This is after serveice call through compoentr*****************");

       this.generalChatService.getCurrent()
    .subscribe((current: string) => {
      if(current){
        // this.allGeneralMessages.push(this.socketmessage);
      }
    console.log("component",current);
    this.currentUser=current;
    });

//-----------------------saving data to db end-----------------------------------------------------------------------//

 })


 {
callbackcode();
// callbackCode2();
  
 }



callbackCodeData=()=>{

//----------------------------------saving ang getting data from socket start----------------------------------------//

 this.generalChatService.sendCode(this.data);
  this.generalChatService.getCode()
      .subscribe((code: string) => {
        this.getCodeData();
       console.log("@@@@@@@@@@@ socket code component callback2",code);


     });

//---------------------------------saving and getting data from the socket end--------------------------------------//


 }


//----------------------------------------- callback for code data end -----------------------------------------------//

//get the code from html and send it using socket io
// codeData(data){
//   this.generalChatService.sendCode(data);
//   this.generalChatService.getCode()
//       .subscribe((code: string) => {
//        console.log("@@@@@@@@@@@",code);
//      });
//       this.saveCodeData(data);
// }

// saveCodeData(data){
//   console.log("savecoddat",data);
//   this.generalService.saveCode(data)
//    .subscribe((code: string) => {
//        console.log("@@@@@@@@@@@save code",code);
//      });
// }

getCodeData(){
   this.generalService.getCodeDatas()
      .subscribe((code: string) => {
       console.log("getting code from mongo",code);
     });
}






 ngOnInit() {

this.retreive();

// this.getCurrentUser()
  
  this.userId = this.route.snapshot.params['userid'];
  if(this.userId === '' || typeof this.userId == 'undefined') {
      this.router.navigate(['/']);
    }else{

      /*
      * function to check if user is logged in or not starts
      */  
      this.chatService.userSessionCheck(this.userId,( error, response )=>{
          if(error) {
            this.router.navigate(['/']); /* Home page redirection */
          }else{
            
            this.username = response.username;
            console.log("##############",this.username);
            this.sendUserName();
          }
        }
        )}

// getting message through sockrt io
   this.generalChatService
     .getMessages()
     .subscribe((message: string) => {
       if(message){
         this.retreive();
       }
       
       // let currentTime = moment().format('hh:mm:ss a');
       // let messageWithTimestamp = `${currentTime}: ${message}`;
       // this.messages.push(messageWithTimestamp);


     });

     this.generalChatService.getUserName()
      .subscribe((message: string) => {
       let currentTime = moment().format('hh:mm:ss a');
       let messageWithTimestamp =  `${currentTime}: ${message}`;
       this.serveruser=message;
       console.log("@@@@@@@@@@@@",this.serveruser);
     });

   

 }


}
