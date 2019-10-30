import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ConstantService } from 'src/app/constant.service';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  animations: [slideToTop()]
  
})
export class GiftListComponent implements OnInit {
  pop_gift_data:any=[];
  pop_gift_image:any;
  upload_url:any;
  
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any='';
  pagenumber:any='';
  count:any='';
  gift_total_count:any=[];
  update_pop_gift_data:any=[];
  update_pop_gift_images:any=[];
  loader:any="";
  
  constructor(public service:MyserviceService, public constant:ConstantService,public router:Router, public dialog:DialogBoxService, public toastr:ToastrManager) 
  { 
    this.pagination(100,0,'');
    this.loader=1;
  }
  
  pagination(pagelimit:any=100, start:any=0, action:any='')
  {
    console.log(start);
    
    this.page_limit = parseInt(pagelimit);
    this.start = parseInt(start);
    
    // console.log(this.page_limit);
    
    if(action == "refresh")
    {
      this.search={};
    }
    this.service.get_data({'search':this.search.master,'start':this.start,'pagelimit':this.page_limit},'pop_gift/pop_gift_list').subscribe((resp)=>
    {
      console.log(resp);
      this.loader="";
      this.pop_gift_data=resp['list'];
      this.gift_total_count=resp['total_count'];
      console.log(this.gift_total_count);
      this.count = resp['count'];
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      console.log(this.count);
      
    },
    error=>
    {
      console.log("error");
      
    });
  }
  
 
  
  
  ngOnInit() 
  {
    this.upload_url= this.constant.upload_url;
    console.log(this.upload_url);
    
  }
  
  delete(id)
  {
    console.log(id);
    this.dialog.delete("Gift").then((result) => {
      if(result)
      {
        let value={'id':id}
        this.service.get_data(value,'pop_gift/delete_pop_gift').subscribe((resp)=>
        {
          console.log(resp);
          if(resp=='success')
          {
            this.toastr.successToastr("Deleted","Success");
            this.pagination();
          }
          
        })
      }
      
    })
    
  }
  refresh()
  {
    this.loader="1";
    this.pagination();
  }
  
}
