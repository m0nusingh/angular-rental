
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from "./shared/auth.service";
import {AuthComponent} from './auth.component';
import {AuthGuard}  from './shared/auth.gaurd';
import {TokenInterceptor} from './shared/token.interceptor';
const routes : Routes=  [
    {path:'login', component: LoginComponent , canActivate:[AuthGuard]},
        {path:'register', component: RegisterComponent,  canActivate:[AuthGuard]}
] 
 

@NgModule({
  declarations: [  
    LoginComponent,
    RegisterComponent,
    AuthComponent

  
   
  ],
  imports: [ 
   RouterModule.forChild(routes),
   FormsModule,
   CommonModule,
   ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard ,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true

    }  
  ],
  bootstrap: []
})
export class AuthModule { }
