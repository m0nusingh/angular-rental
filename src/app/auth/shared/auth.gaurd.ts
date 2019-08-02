import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
   private url:string;
  constructor(private auth: AuthService,
              private router: Router) {}
   private handleAuthState(url):boolean{
         if(this.isLogoinOrRegister(url)){
            this.router.navigate(['/rentals']);
            return false;
            }
            return true;
   }
   private handleNotAuthState(url):boolean{
       if(this.isLogoinOrRegister(url)){
           return true;
           }
           this.router.navigate(['/login']);
           return false;

}

   private isLogoinOrRegister(url):boolean{
            if(url.includes('login') || url.includes('register')){
                return true;
            }
            return false;
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var url: string = state.url;
      
    if(this.auth.isAuthenticated()){
          return  this.handleAuthState(url);
    }
    else{
         return  this.handleNotAuthState(url);
    }


  }
}
