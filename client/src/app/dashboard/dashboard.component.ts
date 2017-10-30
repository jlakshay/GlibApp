import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';


/* Importing services starts*/
import { SocketService } from './../socket.service';
import { HttpService } from './../http.service';
import { ChatService } from './../chat.service';
import {GetInfoService} from './../shared/get-info.service';

/* Importing services ends*/
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

/*
* UI related variables starts
*/
private editflag=false;
private overlayDisplay = false;
private selectedUserId = null;
private selectedSocketId = null;
private selectedUserName = null;
private offlineUsers:any=[];	
/* 
* UI related variables ends
*/

/*
* Chat and message related variables starts
*/
private username = null;
private userId = null;
private socketId = null;
private currentRoute=null;
private chatListUsers = [];
isSocketConnected:boolean = false;
userData:any;
flag:any;
/*
* Chat and message related variables ends
*/
constructor(private chatService : ChatService,
	private socketService : SocketService,
	private route :ActivatedRoute,
	private router :Router,private httpService:HttpService,private genService:GetInfoService) { }
	
ngOnInit() {

//this.flag=this.genService.getFlag();
console.log("URL",this.router.url);
/*
* getting userID from URL using 'route.snapshot'
*/		
this.currentRoute=this.router.url;
console.log("#########",this.currentRoute);
this.userId = this.route.snapshot.params['userid'];
console.log("snapshot of id",this.userId);
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
		this.overlayDisplay = true;

/*
* making socket connection by passing UserId.
*/	
 this.isSocketConnected = this.socketService.connectSocket(this.userId);
 this.socketService.getFlag().subscribe((result)=>{
		console.log("kjnxkjncik",result);
	});


/*
* calling method of service to get the chat list.
*/	
this.socketService.getChatList(this.userId).subscribe(response => {

	if(!response.error) {

		if(response.singleUser) 
		{

			if(this.router.url.includes('?'))
			{
				console.log("inside url if block");
				this.route.queryParams.subscribe(params => {
					console.log("inside subscribe!!!!!!!!!!!!!!!!!!!!!");
					let selectedUserId = params["selectedUserId"];
					let selectedUserName = params["selectedUserName"];
					console.log("selectedUserId**********",selectedUserId);
					console.log("response.chatList._id@@@@@@@@@@@@@@@@@@@@@",response.chatList._id);
					if(selectedUserId === response.chatList._id)
					{
						console.log("inside if ^^^^^^^^^^^^^^^^",response.chatList.socketId);
						this.userData = {
						_id: selectedUserId,
						socketId: response.chatList.socketId,
						username: selectedUserName
						}
						this.selectedUser(this.userData);
					}

				})
				
				
			}

			

			

/* 
* Removing duplicate user from chat list array.
*/
if(this.chatListUsers.length > 0) {
	this.chatListUsers = this.chatListUsers.filter(function( obj ) {
		return obj._id !== response.chatList._id;
	});
}

/* 
* Adding new online user into chat list array
*/
this.chatListUsers.push(response.chatList);

}else if(response.userDisconnected){
	this.chatListUsers = this.chatListUsers.filter(function( obj ) {
		return obj.socketId !== response.socketId;
	});
}else{
/* 
* Updating entire chatlist if user logs in.
*/
this.chatListUsers = response.chatList;
}
}else{
	alert(`Chat list failure.`);
}
});


}

});
}
this.getAllUsers();
}

isUserSelected(userId:string):boolean{
		if(!this.selectedUserId) {
			return false;
		}
		return this.selectedUserId ===  userId ? true : false;
	}
	selectedUser(user):void{
		console.log("$$$$$$$$$$$$$",user);
		this.userData={
		userId: this.userId,
		selectedUserId :user._id,
		selectedSocketId :user.socketId,
		selectedUserName :user.username
	};
	this.router.navigate(['chats'],{relativeTo: this.route, queryParams: this.userData});

		//this.router.navigate([this.currentRoute+'/chats'],{ queryParams: user, skipLocationChange: true});


	}
	getAllUsers(){
		console.log("inside getallusers");
		this.httpService.getAllUsers().subscribe((result)=>{
			console.log("all users",result);
			this.offlineUsers = result.filter(function(user){
  		return user.online=='N';
  	});
			console.log(this.offlineUsers);

		});
	}
	logout(){
		console.log("logout method");
		this.socketService.logout({userId : this.userId}).subscribe(response => {
			this.router.navigate(['/login']); /* Home page redirection */
		});
	}
	selectOfflineUsers(user):void{
		console.log("$$$$$$$$$$$$$",user);
		this.userData={
		userId: this.userId,
		selectedUserId :user._id,
		selectedSocketId :user.socketId,
		selectedUserName :user.username,
		status:'offline'
	};
	this.router.navigate(['chats'],{relativeTo: this.route, queryParams: this.userData});

		//this.router.navigate([this.currentRoute+'/chats'],{ queryParams: user, skipLocationChange: true});


	}

}
