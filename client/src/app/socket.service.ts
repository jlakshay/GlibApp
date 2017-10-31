import { Injectable } from '@angular/core';
 
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
 
import * as io from 'socket.io-client';
 
@Injectable()
export class SocketService {
 
	/* 
	* specifying Base URL.
	*/
	private BASE_URL = 'http://localhost:4000/';
	// private BASE_URL = 'http://192.168.252.186:4000/'; 
  	private socket;
  	socketFlag;
  	getSocket() {
  		return this.socket;
  	}
 
  	constructor(private http:Http) {}
 
  	/* 
	* Method to connect the users to socket
	*/
  	connectSocket(userId:string){
  		this.socket = io(this.BASE_URL,{ query: `userId=${userId}`});
  		return true;
  	}
 
 	/* 
	* Method to emit the add-messages event.
	*/
	sendMessage(message:any):void{
		console.log("inside socket service111111111111111111111111111111");
		this.socket.emit('add-message', message);
		console.log("inside send message");
	 this.http.post('http://localhost:4000/users',{"fromId":message.fromUserId,"toId":message.toUserId})        //Calling the http request
    .map((response:Response)=>response.json()).subscribe((res)=>console.log("response of flag###################################",res));
	}
 
	/* 
	* Method to emit the logout event.
	*/
	logout(userId):any{
 
		this.socket.emit('logout', userId);
 
		let observable = new Observable(observer => {
			this.socket.on('logout-response', (data) => {
				observer.next(data); 
			});
 
			return () => {
				
				this.socket.disconnect();
			}; 
		}) 
		return observable;
	}
 
	/* 
	* Method to receive add-message-response event.
	*/
	receiveMessages():any{ 
		let observable = new Observable(observer => {
			this.socket.on('add-message-response', (data) => {
				console.log("message came on emmit*********", data);
				observer.next(data); 
			});
 
			return () => {
				this.socket.disconnect();
			}; 
		}); 
		return observable;
	}
 
	/* 
	* Method to receive chat-list-response event.
	*/
	getChatList(userId:string):any {
		console.log("Socket in get online",this.socket);
 
		this.socket.emit('chat-list' , { userId : userId });
 
		let observable = new Observable(observer => {
			this.socket.on('chat-list-response', (data) => {
				observer.next(data); 
			});
 
			return () => {
				this.socket.disconnect();
			}; 
		}) 
		return observable;
	} 



	getUserList(userId:string):any {
 console.log("this is socket for get all users",userId);
 console.log("Socket in get all",this.socket);
		this.socket.emit('user-list' , { userId : userId });
 
		let observable = new Observable(observer => {
			this.socket.on('user-list-response', (data) => {
				observer.next(data); 
			});
 
			return () => {
				this.socket.disconnect();
			}; 
		}) 
		return observable;
	} 


	
 
}