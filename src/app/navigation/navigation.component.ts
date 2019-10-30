import { Component, OnInit, Renderer2 } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  
  tokenInfo:any;
  distactive: boolean=false;
  ordersactive: boolean=false;
  masteractive: boolean=false;
  constructor(private renderer: Renderer2,public service:MyserviceService,public router:Router) { }
  
  ngOnInit() {
    this.tokenInfo = this.service.tokenInfo;
    console.log(this.tokenInfo);
    
  }
  
  status:boolean = false;
  
  toggleDropdown(value) 
  {
    const activeId = $(event.target).attr('id');
    console.log(value);
      if(value==1)
      {
        this.distactive=true;
        console.log(this.distactive);
        this.ordersactive=false;
        this.masteractive=false;
        const activeClass = $(event.target).hasClass('active'); 
        console.log(activeClass);
        this.renderer.removeClass(event.target, 'active');
        this.renderer.removeClass(document.body, 'active');
        if(!activeClass)
        {
         this.renderer.addClass(event.target, 'active');
        }

      }
      else if(value==2)
      {
        this.distactive=false;
        this.ordersactive=true;
        this.masteractive=false;
        const activeClass = $(event.target).hasClass('active'); 
        console.log(activeClass);
        this.renderer.removeClass(event.target, 'active');
        this.renderer.removeClass(document.body, 'active');
        if(!activeClass)
        {
         this.renderer.addClass(event.target, 'active');
        }
      }
      else if(value==3)
      {
        this.distactive=false;
        this.ordersactive=false;
        this.masteractive=true;
        const activeClass = $(event.target).hasClass('active'); 
        console.log(activeClass);
        this.renderer.removeClass(event.target, 'active');
        this.renderer.removeClass(document.body, 'active');
        if(!activeClass)
        {
         this.renderer.addClass(event.target, 'active');
        }
      }
      else if(value==4)
      {
        console.log('paymnet');
        
        this.distactive=false;
        this.ordersactive=false;
        this.masteractive=false;

      }
      if(activeId == 'distributor') {
        $('.menu').scrollTop(0);
      }
      if(activeId == 'masters') {
        $('.menu').scrollTop(599);
      }
      if(activeId == 'order') {
        $('.menu').scrollTop(0);
      }
      
      // else {
      //   this.distactive=false;
      //   this.ordersactive=false;
      //   this.masteractive=false;

      // }
    // this.status = !this.status;
    
    // if(this.status) {
    //   this.renderer.addClass(event.target, 'active');
    //   this.renderer.removeClass(document.body, 'active');
    // }
    // else {
    //   this.renderer.removeClass(event.target, 'active');
    //   // this.renderer.removeClass(document.body, 'active');
    // }
  }

  
  status1:boolean = false;
  toggleNav() {
    this.status1 = !this.status1;
    if(this.status1) {
      this.renderer.addClass(document.body, 'active');
    }
    else {
      this.renderer.removeClass(document.body, 'active');
    }
  }
  
  logout()
  {
      this.service.logout_user();
      this.router.navigate(['']);
  }
  
  presentLoading(url){
    console.log(url,this.router.url);
    console.log(url.includes(this.router.url))
    
    if(url.includes(this.router.url))
    {
      this.service.loader=false;
    }
    // this.router.url
  }
  
}
