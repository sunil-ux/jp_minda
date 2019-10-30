import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-territory-list',
  templateUrl: './territory-list.component.html',
  animations: [slideToTop()]
  
})
export class TerritoryListComponent implements OnInit {
  territorylisting:any=[];

  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any='';
  pagenumber:any='';
  count:any='';
  territory_list_count:any=[];
  loader:any="";
  constructor(public service:MyserviceService,public router:Router, public dialog:DialogBoxService, public toastr:ToastrManager) 
  { 
    // this.update('id');
    this.loader=1;
  }
  
  ngOnInit() {
    this.pagination(20,0,'');
    
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
    this.service.get_data({'search':this.search.master,'start':this.start,'pagelimit':this.page_limit},'Territory_master/view_territory').subscribe((result)=>
    {
      console.log(result);
      this.territorylisting = result['data']['list'];
      console.log(this.territorylisting);
      
      this.territory_list_count=result['data']['total_count'];
      console.log(this.territory_list_count);
      this.count = result['data']['count'];
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
  delete(series,index:any)
  { 
    
    this.dialog.delete("Territory").then((result) => {
      if(result)
      {
        this.service.get_data({'id': series},'Territory_master/delete_territory_detel/' +series).subscribe((result)=>
        {
          console.log(result);
          if(result)
          {
            this.territorylisting.splice(index,1);
            this.toastr.successToastr("Deleted","Success");
            this.pagination();
          }
          
        });
      }
    });  
    
  }
  
  update_territory_data:any=[];
  terretoryList:any=[];
  
  get_user_detail(id)
  {
    console.log(id);
    
    this.service.get_data(id,'Territory_master/edit_territory_data').subscribe((resp)=>
    {
      console.log(resp);
      
      this.terretoryList=resp['data'];
      
      if(this.terretoryList)
      {
        this.service.setOption(this.terretoryList);
        this.router.navigate(['/territory-detail']);
      }
    });
  }

  refresh()
  {
    this.loader="1";
    this.pagination();
  }
  
}
