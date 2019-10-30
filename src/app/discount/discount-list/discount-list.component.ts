import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  animations: [slideToTop()]
})
export class DiscountListComponent implements OnInit {
  discounts_data:any=[];
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any='';
  pagenumber:any='';
  count:any='';
  discount_total_count:any=[];
  loader:any="1";
  
  constructor(public service:MyserviceService, public toastr:ToastrManager) 
  {
    this.loader=1;
    this.pagination(100,0,'');
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
    this.service.get_data({'search':this.search.master,'start':this.start,'pagelimit':this.page_limit},'discount/master_discount_list').subscribe((resp)=>
    {
      console.log(resp);
      this.discounts_data=resp['list'];
      this.discount_total_count=resp['total_count'];
      console.log(this.discount_total_count);
      this.count = resp['count'];
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      console.log(this.count);
      this.loader="";
    },
    error=>
    {
      console.log("error");
      
    });
  }
  
  
  ngOnInit() 
  {
    
  }
  
  delete(id)
  {
    console.log(id);
    let value={'id':id}
    this.service.get_data(value,'discount/master_discount_delete').subscribe((resp)=>
    {
      console.log(resp);
      if(resp=='success')
      {
        this.toastr.successToastr("Deleted","Success");
        this.pagination();
        
      }
      
    })
    
  }
  
  refersh()
  {
    this.pagination();
  }
  
}
