import { Component, OnInit, ElementRef  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountSettingsService} from './account-settings.service';
import  { GetInfoService} from '../shared/get-info.service'
import * as config from './config/multi_en_config.json';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  providers:[AccountSettingsService,GetInfoService]
})
export class AccountSettingsComponent implements OnInit {

  constructor(private accSettings:AccountSettingsService, private el: ElementRef, private domSanitizer: DomSanitizer) { }
  userData:any
  ngOnInit() {
  	this.accSettings.fetchUserInfo("sakshamb2@gmail.com").subscribe((res)=>{
  		this.userData=res.result;
      console.log(res.result)
  		this.fetchProfilePhoto();
  	})
  }
  newPassword:string;
  oldPassword:string;
  newContact:number;
  newStatus:string;
  public word= (<any>config).accountSettings;
  updatePassword(newPassword:any, oldPassword:any){
  	this.accSettings.updatePassword({"email":this.userData.email, "newPassword":newPassword,"oldPassword":oldPassword})
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }
  updateContact(contact:any){
    console.log(this.userData.contact)
  	this.accSettings.updateContact({"email":this.userData.email, "contact":this.userData.contact})
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }
  updateStatus(){
  	console.log(status)
  	this.accSettings.updateStatus({"email":this.userData.email, "status":this.userData.status})
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }
  isOnline(toggleOnOff:any){
  	this.accSettings.isOnline({"email":this.userData.email})
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }
  isOffline(toggleOnOff:any){
  	this.accSettings.isOffline({"email":this.userData.email})
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }
  /*updateProfilePhoto(profilePicture:any){
  	this.accSettings.updateProfilePhoto({"email":this.userData.email})  //MULTER
  	.subscribe((res)=>{
  		console.log(res)
  	})
  }*/

  //this will get the upload the selected file
  userUpload() {
    
      //locate the file element meant for the file upload.
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
      //get the total amount of files attached to the file input.
      let fileCount: number = inputEl.files.length;
      //create a new fromdata instance
      let formData = new FormData();
      //check if the filecount is greater than zero, to be sure a file was selected.
      if(fileCount > 0)
      {
        // a file was selected
        //append the key name 'file' with the first file in the element
        formData.append('file', inputEl.files.item(0));
        this.accSettings.updateProfilePhoto(formData, this.userData.email).subscribe((response) => {

        });
      } 
      this.fetchProfilePhoto()
    }

 profilePhoto : string;
 myReader:any;
 fetchProfilePhoto(){
   //;fetchProfilePhoto()
   /*this.base64Image= this.domSanitizer.bypassSecurityTrustUrl("http://localhost:3333/");
     console.log(this.base64Image);*/
   this.accSettings.getProfilePhoto(this.userData.email).subscribe((res)=>{
     if(res._body!=this.word.responseNoFile){

       this.profilePhoto = res.image;
       //console.log(res.image)
     }else{
       console.log(this.word.notSetPP)
     }
    //this.profilePhoto = res._body;
    
     
   })
 }   


}
