import {Component, OnInit, Renderer2} from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  toggle = false;
  
  tokenInfo:any;
  constructor(private renderer: Renderer2, public service:MyserviceService, public router:Router) {

    this.tokenInfo = this.service.tokenInfo;
    console.log(this.tokenInfo);
   }
  
  ngOnInit() {
  }

  addPermission:any={};
  get_permission()
  {
    this.toggle = !this.toggle;
    if(this.toggle)
    {
      this.service.get_data('','Other/get_module_wise_add_access').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.addPermission = resp['module'];
          this.service.add_master_permission = this.addPermission;
          console.log(this.addPermission);
        }
      });
    }
    
  }
  
  // toggleHeader() {  
  //   console.log('header file');
    
  //   console.log("Before : "+this.status1);

  //     this.status1 = !this.status1;
  //    console.log("After : "+this.status1);
  //     if(this.status1) {
  //       //if true tbhi active krta h
  //        console.log(this.status1);
  //         this.renderer.addClass(document.body, 'nav-active');
  //     }
  //     else {

  //         this.renderer.removeClass(document.body, 'nav-active');
  //     }
  //     console.log("status in function: "+this.status1); 
      
  //     // this.status=false;
  //     // console.log("status in function after doing it false : "+this.status); 
      
      
  // }

  logout()
  {
      this.service.logout_user();
      this.router.navigate(['']);
  }
}
