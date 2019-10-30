import { Component, OnInit } from '@angular/core';
import { slideToRight } from '../router-animation/router-animation.component';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { DialogBoxService } from 'src/app/dialog-box.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [slideToRight()]
})
export class LoginComponent implements OnInit {
  data:any={};
  anupam_user:any={};
  NextUrl:any = '';
  submitted = false; //for login button

  constructor(public route: ActivatedRoute,public service : MyserviceService, public router:Router,public dialog:DialogBoxService) 
  { 
    
  }
  ngOnInit() 
  {
    this.anupam_user.anupam_login = false;
    console.log(this.anupam_user);
    
  }

  submit()
  {
    console.log(this.data);
    this.submitted = true; 

    this.NextUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    this.service.get_data(this.data,'login/login_user').subscribe((resp:any)=>
    {
      console.log(resp);
      
      if(resp.token)
      {
        this.anupam_user=resp;
        this.anupam_user.anupam_login = true;
        this.service.can_active='1';
        localStorage.setItem('anupam_user',JSON.stringify(this.anupam_user));
        console.log(localStorage.getItem('anupam_user'));

        let tokenInfo = this.getDecodedAccessToken(resp.token); // decode token
        let expireDate = tokenInfo.exp; // get token expiration dateTime
        this.service.tokenInfo = tokenInfo;
        console.log(this.service.tokenInfo);
        console.log(this.NextUrl);
        this.router.navigate([this.NextUrl]);
      
      }

      else
      {
        this.dialog.error("Username or password not matched");

      }
      
      
      
    })
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
