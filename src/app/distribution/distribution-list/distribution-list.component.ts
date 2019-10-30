import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-distribution-list',
  templateUrl: './distribution-list.component.html',
  
})
export class DistributionListComponent implements OnInit {
  distribution_data:any=[];
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any='';
  pagenumber:any='';
  count:any='';
  distribution_data_count:any=[];
  loader:any="1";
  cp_data:any=[];
  type:any='';
  data_search:any=[];
  distribution_cp_data:any={};
  today_date;
  
  constructor(public service:MyserviceService, public dialog:DialogBoxService,public route:ActivatedRoute, public toaster:ToastrManager, public alert:DialogBoxService) 
  { 
    this.route.params.subscribe(resp=>
      {
        console.log(resp);
        this.loader=1;
        this.type = resp['type'];
        console.log(this.type);
   
        if(this.type)this.get_distribution_list(50,0,'');
      });
    
  }


  ngOnInit() 
  {
    this.today_date = new Date().toISOString().slice(0,10);
    console.log(this.today_date)
  }
  
  status:any = '';
  change_status(status: any = ''){
    this.status = status;
    this.get_distribution_list();

  }
  search_by_date(date_to:any,date_from:any)
  {
    this.search.date_to=date_to;
    console.log(this.search.date_to);
    this.search.date_from=date_from;
    console.log(this.search.date_from);
    this.get_distribution_list(this.page_limit,this.start,this.type);
  }
  
  searchName(name:any){
    console.log(name);
    this.search.name=name;
    console.log(this.search.name);
    this.get_distribution_list(this.page_limit,this.start,this.type);
  }
  searchPerson(contact_info:any)
  {
    console.log(contact_info);
    this.search.contact_info=contact_info;
    console.log(this.search.contact_info);
    this.get_distribution_list(this.page_limit,this.start,this.type);
  }
  searchCreatedBy(created_by:any)
  {
    console.log(created_by);
    this.search.created_by=created_by;
    console.log(this.search.created_by);
    this.get_distribution_list(this.page_limit,this.start,this.type);
  }
  searchByAddress(address:any)
  {
    console.log(address);
    this.search.address=address;
    console.log(this.search.addresss);
    this.get_distribution_list(this.page_limit,this.start,this.type);
  }
  get_distribution_list(pagelimit:any=100, start:any=0, action:any='')
  {
    console.log(start);
    
    this.page_limit = parseInt(pagelimit);
    this.start = parseInt(start);
    
    // console.log(this.page_limit);
    
    if(action == "refresh")
    {
      this.search={};
      this.start = 0;

    }
    
    console.log(this.search);
    this.service.get_data({'type': this.type,'search':this.search,'start':this.start,'pagelimit':this.page_limit},'distribution_net/get_distribution_data').subscribe((resp)=>
    {
      console.log(resp);
      this.loader="";
      this.distribution_data=resp['data'];
      this.data_search=this.distribution_data[0];
      console.log(this.data_search);
      // this.distribution_cp_data=resp['data']['contact'];
      this.distribution_data_count=resp['total_count'];
      console.log(this.distribution_data_count);
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
  
  delete(id)
  {
    console.log(id);
    this.dialog.delete("Customer").then((result) => {
      if(result)
      {
        this.service.get_data(id,'distribution_net/delete_customer').subscribe((resp)=>
        {
          console.log(resp);
          if(resp)
          {
            this.toaster.successToastr("Success","Deleted");
            this.get_distribution_list();
          }
        });
      }
    });
  }
  // status(data,id,index)
  // {
  //   console.log(data);
  
  
  //   console.log(id);
  //   console.log(index);
  
  //   console.log(this.distribution_data[index].status);
  
  //   if(this.distribution_data[index].data=="true")
  //   { 
  //     this.distribution_data[index].data="false";
  //     console.log(this.distribution_data[index].status);
  //   }
  //   else
  //   { 
  //     this.distribution_data[index].data="true";
  //     console.log(this.distribution_data[index].status);
  //   }
  //   let value={"status":this.distribution_data[index].status}
  
  //   let new_data={user_id:id,data:value};
  //   this.service.get_data(new_data,"distribution_net/update_user_status").subscribe(resp=>
  //     {
  //       console.log(resp);
  //       this.get_distribution_list();
  //       this.loader="";
  //     });
  //   }
  
  
}
