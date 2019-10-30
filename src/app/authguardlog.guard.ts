import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyserviceService } from './myservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardlogGuard implements CanActivate {
  anupam_user:any=[];
  constructor(public service:MyserviceService, private router:Router)
  {
    
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {
      this.service.get_session()
      .subscribe((resp)=>
      {
        this.anupam_user=resp;
        console.log(this.anupam_user);
        console.log(state.url);
        console.log(this.anupam_user.anupam_login);
      },
      error=>
      {
        console.log("error");      
      })
      
      if(this.anupam_user.anupam_login)
      {
        console.log(this.anupam_user);
        if(state.url !='/')
        {
          
        }
        else
        {
          this.router.navigate(['/dashboard']);
        }
        this.service.can_active='1';
        return false;
      }
      else
      {
        this.service.can_active='';
        return true;
      }
    }
  }
  