import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import expressUrls from './config/url';
import 'rxjs/add/operator/map';
@Injectable()
export class GetInfoService {
	flag:any=0;
  constructor(private http: Http) { }
public fetchInfo(email:string): Observable<any>{
	//let d = localStorage.getItem('tempuser.Email')
	
	//const url="http://localhost:3000/getUserInfo/"+email;
	return this.http
	.get(expressUrls.getUserInfo+email)
	.map((res:Response)=><any>res.json());
}

public fetchProfilePicture(email):Observable<any>{
	//let d = localStorage.getItem('tempuser.Email')
	
	//const url="http://localhost:3333/";
	return this.http
	.get(expressUrls.getUserInfoPhoto+email)
	//.map((res:Response)=><any>res.json());
}

public setFlag(flag){
this.flag=flag;
}
public getFlag(){
	return this.flag;
}

}
