import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  animations: [slideToTop()]
  
  
})
export class LeadListComponent implements OnInit 
{
    lead_data:any=[];
    page_limit:any=51;
    start:any=0;
    search:any={};
    select:any={};
    total_page:any='';
    pagenumber:any='';
    count:any='';
    lead_data_count:any=[];
    loader:any="1";
    status:any = '';
    today_date;
    lead_user_type: any;
    notFoundDiv:any=false;
    constructor(public service:MyserviceService, public toaster:ToastrManager, public dialog:DialogBoxService,public route:ActivatedRoute) 
    {
      this.route.params.subscribe(resp=>
      {
        this.lead_user_type = resp['lead_user_type'];
        this.search.type=this.lead_user_type;
      });
        
      this.GetLeadList(100,0,'');
      this.today_date = new Date().toISOString().slice(0,10);
      console.log(this.today_date); 
    }

    ngOnInit() {
    }
    
    // Search function
    search_by_date(date_to:any,date_from:any)
    {
      this.search.date_to=date_to;
      console.log(this.search.date_to);
      this.search.date_from=date_from;
      console.log(this.search.date_from);
      this.GetLeadList(this.page_limit,this.start,'');
    }
    searchCreatedby(created_by)
    {
      console.log(created_by);
      this.search.created_by=created_by;
      console.log(this.search.created_by);
      this.GetLeadList(this.page_limit,this.start,'');
    }
    searchName(name:any){
      console.log(name);
      this.search.name=name;
      console.log(this.search.name);
      this.GetLeadList(this.page_limit,this.start,'');
    }
    searchByuser(type:any)
    {
      console.log(type);
      this.search.type=type;
      console.log(this.search.type);
      this.GetLeadList(this.page_limit,this.start,'');
    }
    searchPerson(contact_info:any)
    {
      console.log(contact_info);
      this.search.contact_info=contact_info;
      console.log(this.search.contact_info);
      this.GetLeadList(this.page_limit,this.start,'');
    }
    searchByMobile(mobile:any)
    {
      console.log(mobile);
      this.search.mobile=mobile;
      console.log(this.search.mobile);
      this.GetLeadList(this.page_limit,this.start,'');
    }
    searchByAddress(address:any)
    {
      console.log(address);
      this.search.address=address;
      console.log(this.search.address);
      this.GetLeadList(this.page_limit,this.start,'');
    }
    // end
    GetLeadList(pagelimit:any=50, start:any=0, action:any='')
    {
      this.loader=true;
      this.notFoundDiv=false;
      this.page_limit = parseInt(pagelimit);
      this.start = parseInt(start);    
      if(action == "refresh")
      {
        this.search={};
        this.status='';
        this.start = 0;
        
      }
      this.service.get_data({'search':this.search,'start':this.start,'pagelimit':this.page_limit},'lead/lead_listing').subscribe((resp)=>
      {
        console.log(resp);
        this.loader=false
        this.lead_data=resp['data'];
        this.lead_data_count=resp['total_count'];
        if(this.lead_data.length==0)
        {
          this.notFoundDiv=true;
        }
        console.log(this.lead_data_count);
        this.count = resp['count'];
        this.total_page = Math.ceil(this.count/this.page_limit);
        this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
        console.log(this.count);
      },
      error=>
      {
        this.notFoundDiv=true;
        console.log(error);
        console.log("error");
        
      });
    }
    
    delete_lead(lead_id,index)
    {
      console.log(lead_id);
      this.dialog.delete("Lead").then((result) => {
        if(result)
        {
          this.service.get_data({'id':lead_id},'lead/delete_lead').subscribe((resp)=>
          {
            console.log(resp);
            if(resp=='success')
            {
              // lead_data
              this.lead_data.splice(index,1);
              this.toaster.successToastr("Deleted","Success");
              this.GetLeadList();
            }
          },
          error=>
          {
            console.log(error);
            console.log("error");
            
          });
        }
      });
    }
    
  }
  