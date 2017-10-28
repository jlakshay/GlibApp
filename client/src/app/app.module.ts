import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SocketService } from './socket.service';
import { HttpService } from './http.service';
import { ChatService } from './chat.service';
import {GeneralComponent} from './general/general.component';
 
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
 
import { appRouting } from './app.routing';
 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatsComponent } from './dashboard/chats/chats.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterService} from './shared/register.service';
import { MailotpService} from './shared/mailotp.service';
import { ForgetPassComponent} from './forget-pass/forget-pass.component';
import { SetPasswordComponent} from './set-password/set-password.component';
import { MailverificationComponent} from './mailverification/mailverification.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GetInfoService} from './shared/get-info.service';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    NotFoundComponent,
    GeneralComponent,
    ChatsComponent,
    MailverificationComponent,
    AccountSettingsComponent,
    ForgetPassComponent,
    SetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouting
   // NgbModule.forRoot()
  ],
  providers: [RegisterService,MailotpService,SocketService,HttpService,ChatService,GetInfoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
