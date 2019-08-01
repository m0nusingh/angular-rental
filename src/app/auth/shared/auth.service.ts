import {Injectable} from '@angular/core';


import {Observable} from 'rxjs';  

import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()


export class AuthService{
    
  constructor(private http: HttpClient){}
    
    public register(userData:any):Observable<any>{
        return this.http.post("api/v1/users/register",userData);
    }

    public login(userData:any):Observable<any>{
      return this.http.post("api/v1/users/auth",userData).map(
        (token)=> this.setToken(token.toString()) 
      );
  }

  private setToken(token:string):string{
    localStorage.setItem('bwm_auth',token);
    return token;
  }

}