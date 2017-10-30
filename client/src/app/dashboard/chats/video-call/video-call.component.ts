//------------------------------Importing Module-------------------------------------------------//
import { Component, OnInit,ViewChild  } from '@angular/core';
import {ActivatedRoute,Router} from'@angular/router';
//-----------------------------------------------------------------------------------------------//
@Component({
	selector: 'app-video-call',
	templateUrl: './video-call.component.html',
	styleUrls: ['./video-call.component.css']
})
//-------------------------Exporting VideoCallComponent class-------------------------------------//
export class VideoCallComponent implements OnInit {


	@ViewChild('myvideo') myVideo: any;
	peer;
	anotherid;
	mypeerid;
	callStream:any;
//---------------------------Injecting the dependency---------------------------------------------//
	constructor(private router:Router,private route:ActivatedRoute) {

	}
	userId:any;
    //On Initialization
	ngOnInit() {
		this.userId=localStorage.getItem('id');
		this.anotherid=localStorage.getItem('sid');

		// this.email=this.route.snapshot.params['email'];
		// console.log("email",this.email);
		let video = this.myVideo.nativeElement;
		this.peer = new Peer(this.userId,{host:'192.168.252.186',
			port:4000,
			path:'/peerjs'
		});
		setTimeout(() => {
			this.mypeerid = this.peer.id;
		},1000);

		this.peer.on('connection', function(conn) {
			conn.on('data', function(data){
				console.log(data);
			});
		});

		var n = <any>navigator;

		n.getUserMedia =  ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia );

		this.peer.on('call', function(call) {
			this.callStream = call;
			console.log("this is call object before answere",call);
			//if(call.open)
			n.getUserMedia({video: true, audio: true}, function(stream) {
				call.answer(stream);
				// if(call.open==true)
				// 	alert("call is comming");
				console.log("after answer",call);

				call.on('stream', function(remotestream){
					video.src = URL.createObjectURL(remotestream);
					video.play();

				})
				call.on('close', function(remotestream){
					console.log("Hello closed is called");

				})
			}, function(err) {
				console.log('Failed to get stream', err);
			})
		}.bind(this))
	}
    /*connect method*/
	connect(){
		var conn = this.peer.connect(this.anotherid);
		conn.on('open', function(){
			conn.send("Message from that id");
		});
	}
    /*videconnect method*/
	videoconnect(){

		let video = this.myVideo.nativeElement;
		var localvar = this.peer;
		var fname = this.anotherid;
		var call =  this.callStream;

		var n = <any>navigator;

		n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

		n.getUserMedia({video: {frameRate:{ideal:10,max:15}}, audio: true}, function(stream) {
			call = localvar.call(fname, stream);
			this.callStream  = call;
			// alert("calling..."+call.peer);
			call.on('stream', function(remotestream) {
				console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@",call)
				// if(call.open!=true)
				// alert("calling..."+call.peer);
				video.src = URL.createObjectURL(remotestream);
				video.play();
			})
		}.bind(this), function(err){
			console.log('Failed to get stream', err);
		})
	}
	/*videodisconnect method*/
	videoDisconnect()
	{
		var call =  this.callStream;
		call.close();

	}
}
