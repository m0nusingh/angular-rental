import {Injectable} from '@angular/core';


import {Observable} from 'rxjs';  

import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
// import * as jwtDecode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
import * as moment from 'moment';
@Injectable()

class DecodedToken{
     exp:number = 0 ;
     username:string = "";
}
export class AuthService{
       
   private decodedToken; 


  constructor(private http: HttpClient){

    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  private setToken(token:string):string{
    
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('bwm_auth',token);
    localStorage.setItem('bwm_meta',JSON.stringify(this.decodedToken));
    return token;
  }

   private getExpiration(){
     return moment.unix (this.decodedToken.exp);
   }
    
    public register(userData:any):Observable<any>{
        return this.http.post("api/v1/users/register",userData);
    }

    public login(userData:any):Observable<any>{
      return this.http.post("api/v1/users/auth",userData).map(
        (token)=> this.setToken(token.toString())
      );
  }
     public isAuthenticated():boolean{
        return  moment().isBefore( this.getExpiration());
     }

     public logout(){
       localStorage.removeItem('bwm_auth');
       localStorage.removeItem('bwm_meta');
       this.decodedToken  = new DecodedToken();
     }

     public getUsername(){
       return this.decodedToken.username;
     }
     public getToken():string{
       return localStorage.getItem('bwm_auth');

     }
 

}