import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyserviceService } from './myservice.service';
import { Location } from '@angular/common';
import * as jwt_decode from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  anupam_user:any=[];
constructor(public location: Location, public service:MyserviceService, private router:Router)
{

}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {

      this.service.get_session().subscribe((resp)=>
      {
        this.anupam_user=resp;
        let tokenInfo = this.getDecodedAccessToken(this.anupam_user.token); // decode token
        let expireDate = tokenInfo.exp; // get token expiration dateTime
        // console.log(expireDate); // undefined
        console.log(tokenInfo); // show decoded token object in console
        this.service.tokenInfo = tokenInfo;
        console.log(this.service.tokenInfo);
        console.log(state.url);
      },
      error=>
      {
        console.log("error");
        
      });

      if(this.anupam_user.anupam_login)
      {
        console.log(location);
        console.log(this.anupam_user);
        this.service.can_active = '1';
        return true;
      }
      else
      {
        this.service.can_active='';
        this.router.navigate([''], {queryParams:{returnUrl:state.url}});
        return false;
      }

      
    
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
