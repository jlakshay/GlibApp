import { ModuleWithProviders } from '@angular/core';
 
import { Routes , RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import  {MailverificationComponent} from './mailverification/mailverification.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { ChatsComponent } from './dashboard/chats/chats.component'; 
import {VideoCallComponent} from './dashboard/chats/video-call/video-call.component';
import { GeneralComponent } from './dashboard/general/general.component';
import {WelcomeComponent} from './welcome/welcome.component';
const appRoutes :Routes = [
	{ path : '' ,redirectTo:'welcome',pathMatch:'full'},
	{ path : 'welcome' , component : WelcomeComponent},
	{ path : 'login' , component : LoginComponent},
	{ path : 'home' , component : HomeComponent},
	{ path : 'dashboard/:userid' , component : DashboardComponent,
		children:
			[	{path:'general/:userid',component:GeneralComponent},
			{path:'video',component:VideoCallComponent},
				{path:'chats',component:ChatsComponent,
					children:
						[ {path:'video',component:VideoCallComponent}]}		
			]},
	{ path : 'home/:userid' , component : HomeComponent},
	{ path:'register' , component : RegisterComponent},
	{path:'verify',component:MailverificationComponent},
	{ path : '**' , component : NotFoundComponent},
];
 
export const appRouting :ModuleWithProviders = RouterModule.forRoot(appRoutes); 