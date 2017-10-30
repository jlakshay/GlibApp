import { Component, OnInit , OnDestroy, AfterViewInit} from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';

import { SocketService } from './../../socket.service';
import { HttpService } from './../../http.service';
import { ChatService } from './../../chat.service';

import {GetInfoService} from './../../shared/get-info.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
  
})
export class ChatsComponent implements OnInit, AfterViewInit{
/*
	* Chat and message related variables starts
	*/
	private userData:any;
	private userName:any;
	private userId:any;
	private socketId:any;
	private selectedSocketId:any;
	private status:any='online';
	private selectedUserId: any
	private chatListUsers:any =[];
	private message:any;
	private messages:any = [];
	url:any;
	scrapingData:any={};
	sendData:any={};

	/*
	* Chat and message related variables ends
	*/
  constructor(private route: ActivatedRoute,
  	private chatService : ChatService,
		private socketService : SocketService,
		private router :Router,private genService:GetInfoService) { }


  player: YT.Player;
    savePlayer (player) {
    this.player = player;
    }


  ngOnInit() {

  	// 	let socket = this.socketService.getSocket();
  	// 	socket.on('add-message-response', (data) => {
			// 	this.messages.push(data);
			// });
  	  this.route.queryParams.subscribe(params => {
      this.selectedUserId=params["selectedUserId"];
      this.userName=params["selectedUserName"];
       this.userId=params["userId"];
       this.selectedSocketId=params["selectedSocketId"];
<<<<<<< HEAD
       console.log("@@@@@@@@",params["status"]);
=======
       localStorage.setItem("sid",this.selectedUserId);
       localStorage.setItem("id",this.userId);
>>>>>>> c1c43bb6e21daf6a337833c97c741bf8bf79ab1b
       if(params["status"]!=undefined){
       	console.log("inside stauts params")
       this.status=params["status"];
   }
       console.log("status!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1",this.status);
<<<<<<< HEAD
       localStorage.setItem("sid",this.selectedUserId);
       localStorage.setItem("id",this.userId);

       //this.socketService.connectSocket(this.userId);
  	let counter=0;
=======

       //this.socketService.connectSocket(this.userId);
  	
>>>>>>> c1c43bb6e21daf6a337833c97c741bf8bf79ab1b
  	this.chatService.getMessages({ userId : this.userId,toUserId :this.selectedUserId} , ( error , response)=>{
			if(!response.error) {
				console.log("get message response",response.messages)
				let  aa=response.messages.map((i)=>{
<<<<<<< HEAD
					if(i.msg_status=='offline')
					{
						counter++;
					}
=======
>>>>>>> c1c43bb6e21daf6a337833c97c741bf8bf79ab1b
					i.timestamp=new Date(i.timestamp*1000).toLocaleString();
					console.log(i, 'check message');
					if(i.message.includes('https://youtu.be/')==true){
    						i.id=i.message.substr(17);
    						console.log(i.id, 'check id');
    					}else{
    						i.id=null;
    					}
    					return i;    				
    			});
<<<<<<< HEAD
    			//this.genService.setFlag(counter);
    			this.socketService.setFlag(counter);

=======
>>>>>>> c1c43bb6e21daf6a337833c97c741bf8bf79ab1b
    				this.messages = response.messages;
    				console.log('check messages', this.messages)    
    				}			
    		
		});



  });

  	  
  	}

  	ngAfterViewInit()
  	{

  		this.socketService.receiveMessages().subscribe(response => {
<<<<<<< HEAD
  			console.log("Recieverd messages @@@@@@@@@@@@@@@@@@@",response);
=======
>>>>>>> c1c43bb6e21daf6a337833c97c741bf8bf79ab1b
			    		
			    		var date = new Date((response.timestamp*1000));
			    		var newDate=date.toLocaleString();
							
							response.timestamp=newDate;
							console.log("date",newDate);
			    		if(this.selectedUserId && this.selectedUserId == response.fromUserId) {
<<<<<<< HEAD
			    			this.messages.push(response);
			    			//setTimeout( () =>{
			    			//		document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
			    			//},100);
=======
					console.log(response, 'hellooooo');
					this.sendData=response;
					console.log(this.sendData);
					if(this.sendData.message.includes('https://youtu.be/')==true){
    						this.sendData.id=this.sendData.message.substr(17);
    						console.log(response.id, 'check id');
    					}else{
    						this.sendData.id=null;
    					}
    				this.messages.push(this.sendData);
    				console.log('check messages', this.messages) ;  
>>>>>>> c1c43bb6e21daf6a337833c97c741bf8bf79ab1b
			    		}
			    	});
  	}




	  	sendMessageButton(){
	  		console.log(2);
	  		let data:any={};
<<<<<<< HEAD
	  		console.log("inside send button",this.status)
=======
>>>>>>> c1c43bb6e21daf6a337833c97c741bf8bf79ab1b
	  		data = {
	  			fromUserId : this.userId,
	  			message : (this.message).trim(),
	  			toUserId : this.selectedUserId,
	  			toSocketId : this.selectedSocketId,
	  			fromSocketId : this.socketId,
	  			msg_status:this.status
	  		}
console.log(1, data);
<<<<<<< HEAD
	  		if(data.message.indexOf('https://youtu.be/')!=-1){
=======
	  		if(data.message.includes('https://youtu.be/')==true){
	  			console.log(1);
	  			data.id=data.message.substr(17);
>>>>>>> c1c43bb6e21daf6a337833c97c741bf8bf79ab1b
	  			this.messages.push(data);
	  			this.message = null;

	  			this.socketService.sendMessage(data);
	  		}else if(data.message.includes('https:')==true || data.message.includes('http:')==true){
	  			this.url=data.message.substring(data.message.indexOf('http'));
	  			this.chatService.scraping(this.url, ( error , response)=>{
	  				console.log('at response', 5);
	  				if(!response.error) {
	  					this.scrapingData=response;
	  					data.title=this.scrapingData.other.title;
	  					data.description=this.scrapingData.other.description;
	  					if(this.scrapingData.ogp==undefined){
	  						this.messages.push(data);
	  						console.log(this.messages, "check array");
	  						this.message = null;
	  						this.socketService.sendMessage(data);
	  					}else{
	  						if(this.scrapingData.ogp.ogImage[0].url==undefined){
	  							data.image=this.scrapingData.twitter.twitterImage[0].url;
	  						}else{
	  							data.image=this.scrapingData.ogp.ogImage[0].url;
	  						}
	  						this.messages.push(data);
	  						console.log(this.messages, "check array");
	  						this.message = null;
	  						this.socketService.sendMessage(data);
	  					}
	  				}
	  			})
	  		}else{
	  			console.log(data, 'in else');
	  			this.messages.push(data);
	  			this.message = null;

	  			this.socketService.sendMessage(data);
	  		}
	  	}





/*	sendMessageButton(){
		const data = {
						fromUserId : this.userId,
						message : (this.message).trim(),
						toUserId : this.selectedUserId,
						toSocketId : this.selectedSocketId,
						fromSocketId : this.socketId
					}
					this.messages.push(data);
					setTimeout( () =>{
	    					document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
	    			},100);
					this.message = null;
			
					this.socketService.sendMessage(data);
				
	}
*/

	sendMessage(event){
		if(event.keyCode === 13) {
			if(this.message === '' || this.message === null) {
				alert(`Message can't be empty.`);
			}else{

				if (this.message === '') {
					alert(`Message can't be empty.`);
				}else if(this.userId === ''){
					this.router.navigate(['/']);					
				}else if(this.selectedUserId === ''){
					alert(`Select a user to chat.`);
				}else{

					let data:any = {
						fromUserId : this.userId,
						message : (this.message).trim(),
						toUserId : this.selectedUserId,
						toSocketId : this.selectedSocketId,
						fromSocketId : this.socketId,
<<<<<<< HEAD
						status:this.status
=======
						msg_status:this.status
>>>>>>> c1c43bb6e21daf6a337833c97c741bf8bf79ab1b
					}
					if(data.message.includes('https://youtu.be/')==true){
	  			this.messages.push(data);
	  			this.message = null;

	  			this.socketService.sendMessage(data);
	  		}else if(data.message.includes('https:')==true || data.message.includes('http:')==true){
	  			this.url=data.message.substring(data.message.indexOf('http'));
	  			this.chatService.scraping(this.url, ( error , response)=>{
	  				console.log('at response', 5);
	  				if(!response.error) {
	  					this.scrapingData=response;
	  					data.title=this.scrapingData.other.title;
	  					data.description=this.scrapingData.other.description;
	  					if(this.scrapingData.ogp==undefined){
	  						this.messages.push(data);
	  						console.log(this.messages, "check array");
	  						this.message = null;
	  						this.socketService.sendMessage(data);
	  					}else{
	  						if(this.scrapingData.ogp.ogImage[0].url==undefined){
	  							data.image=this.scrapingData.twitter.twitterImage[0].url;
	  						}else{
	  							data.image=this.scrapingData.ogp.ogImage[0].url;
	  						}
	  						this.messages.push(data);
	  						console.log(this.messages, "check array");
	  						this.message = null;
	  						this.socketService.sendMessage(data);
	  					}
	  				}
	  			})
	  		}else{
	  			console.log(data, 'in else');
	  			this.messages.push(data);
	  			this.message = null;

	  			this.socketService.sendMessage(data);
	  		}
				}
			}
		}
	}

	alignMessage(userId){
		return this.userId ===  userId ? false : true;
	}

}
