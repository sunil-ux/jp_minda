import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {
  loader:any="1";
  enquiry_list:any=[];
  page_limit:any=50;
  start:any='';
  search:any={};
  status:any='';
  count:any='';
  total_page:any='';
  pagenumber:any='';


  constructor(public service:MyserviceService)
   {
    this.loader=1;
    this.getEnquiryList();
   }
  

  ngOnInit() {
   }

   searchName(name:any)
   {
     console.log(name);
     this.search.customername=name;
     console.log(this.search.name);
     this.getEnquiryList('',this.start,'');
   }
   searchModel(product_code:any)
   {
     console.log(product_code);
     this.search.product_code=product_code;
     console.log(this.search.product_code);
     this.getEnquiryList();
   }
   searchByMobile(mobile:any)
   {
     console.log(mobile);
     this.search.mobile=mobile;
     console.log(this.search.mobile);
     this.getEnquiryList();
   }
  //  searchByMobile(mobile:any)
  //  {
  //    console.log(mobile);
  //    this.search.mobile=mobile;
  //    console.log(this.search.mobile);
  //   //  this.GetLeadList('',this.start,'');
  //  }
   search_by_date(date_to:any,date_from:any)
  {
    this.search.date_to=date_to;
    console.log(this.search.date_to);
    this.search.date_from=date_from;
    console.log(this.search.date_from);
    this.getEnquiryList();
  }

  getEnquiryList(pagelimit:any=50, start:any=0, action:any='')
  {
    console.log(this.search);
    
    this.page_limit=parseInt(pagelimit);
    this.start=parseInt(start)
    if(action =="refresh")
    {
      this.search={};
      this.start=0;
    }
   this.service.get_data({'search':this.search,'pagelimit':this.page_limit,'start':this.start,'status':this.status},'Other/getEnquiryList').subscribe((resp)=>
  {
    console.log(resp);
    this.loader="";
    this.enquiry_list=resp['list'];
    console.log(this.enquiry_list);
    this.count=resp['count'];
    console.log(this.count);
    this.total_page=Math.ceil(this.count/this.page_limit);
    this.pagenumber=Math.ceil(this.start/this.page_limit)+1;
  },
  error=>
  {
    console.log(error);
  });
}
refresh()
  {
    console.log("refreesh");
    
    this.loader="1";
    this.search={};
    this.status={};
    console.log(this.search);
    this.getEnquiryList();
  } 
}

