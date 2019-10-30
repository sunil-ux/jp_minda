import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  animations: [slideToTop()]

})
export class OrderListComponent implements OnInit {

  lead_data:any=[];
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any='';
  pagenumber:any='';
  count:any='';
  lead_data_count:any=[];
  loader:any="1";
  approved : any = '';
  pending_order : any = '';
  order_type:any='';
  data_search:any=[];
  reject_order: any;
  today_date;
  status:any = '';


  constructor(public service:MyserviceService, public toaster:ToastrManager, public route:ActivatedRoute, public dialog:DialogBoxService)
  { 
    this.status='Pending';
    this.route.params.subscribe(resp=>
    {
      console.log(resp);
      this.loader="1";
      this.order_type = resp['order_type'];
      console.log(this.order_type);
      this.pagination(50,0,'');
      
    });

    console.log(this.status);
  }

  ngOnInit() 
  {
    this.today_date = new Date().toISOString().slice(0,10);
    console.log(this.today_date);
  }
  
  change_status(val)
  {
    this.status = val;
    console.log(val);
    this.pagination();

  }
  search_by_date(date_to:any,date_from:any)
  {
    this.search.date_to=date_to;
    console.log(this.search.date_to);
    this.search.date_from=date_from;
    console.log(this.search.date_from);
    this.pagination('',this.start,'');
  }
  searchName(name:any){
    console.log(name);
    this.search.name=name;
    console.log(this.search.name);
    this.pagination('',this.start,'');
  }
  searchCustomer(cust_name:any)
  {
    console.log(cust_name);
    this.search.cust_name=cust_name;
    console.log(this.search.cust_name);
    this.pagination('',this.start,'');
  }

  searchPerson(contact_info:any)
  {
    console.log(contact_info);
    this.search.contact_info=contact_info;
    console.log(this.search.contact_info);
    this.pagination('',this.start,'');
  }
  searchCreatedBy(created_by:any)
  {
    console.log(created_by);
    this.search.created_by=created_by;
    console.log(this.search.created_by);
    this.pagination('',this.start,'');
  }
  searchById(id:any)
  {
    console.log(status);
    this.search.id=id;
    console.log(this.search.id);
    this.pagination('',this.start,'');
  }
  searchStatus(status:any)
  {
    console.log(status);
    this.search.addresss=status;
    console.log(this.search.status);
    this.pagination('',this.start,'');
  }
  pagination(pagelimit:any=100, start:any=0, action:any='')
  {

    this.loader=true;
    console.log(this.search.counter_name);
    
    this.page_limit = parseInt(pagelimit);
    this.start = parseInt(start);
    
    console.log(this.page_limit);
    
    if(action == "refresh")
    {
      this.search={};
      this.status='Pending';
      this.start = 0;

    }

    if(this.order_type==2)
    {
      this.status='';
    }

    console.log(this.search);
    console.log(this.order_type);
    console.log(this.status);
    
    
    this.service.get_data({'order_type': this.order_type,'search':this.search,'start':this.start,'pagelimit':this.page_limit,'status': this.status},'order/get_order_invoice').subscribe((resp)=>
    {
      console.log(resp);
      this.loader=false;
      this.lead_data=resp['data'];
      // this.data_search=this.lead_data[0];
      // console.log(this.data_search);
      this.approved=resp['approved'];
      this.pending_order=resp['pending_order'];
      this.reject_order=resp['reject_order'];
      this.count = resp['total_count'];
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      console.log(this.count);
    },
    error=>
    {
      console.log("error");
      
    });
  }

  delete_order(order_id,i,dr_id)
  {
    console.log(order_id);
    this.dialog.delete("Order").then((result) => {
      if(result)
      {
        this.service.get_data({order_id:order_id,dr_id:dr_id},'order/delete_order').subscribe((resp)=>
        {
          console.log(resp);
          if(resp)
          {
            this.toaster.successToastr("Deleted","Success");
            this.lead_data.splice(i,1);
          }
        });
      }
    });
  }
  
  
}
