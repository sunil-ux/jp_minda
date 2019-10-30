import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any = ''
  pagenumber:any = '';
  count:any='';
  check_list_count:any=[];
  check_list:any=[];
  loader:any="1";
  showdetail:any='';
  today_date: string;
  filterRow:any=[];
  type: any;
  
  constructor(public service:MyserviceService, public toastr:ToastrManager) {
    this.showdetail='Today';

  }
  
  ngOnInit() {
    this.getCheckinList();
  }
  refresh()
  {
    this.search = {};
    this.start = 0;
    this.getCheckinList();
  }

  searchType(type)
  {
    console.log(type)
    this.search.dr_type = type;
    this.getCheckinList();
  }
  searchName(created_by){
    console.log(created_by);
    this.search.created_by=created_by;
    console.log(this.search.created_by);
    this.getCheckinList(this.page_limit,this.start,this.type);
  }
  search_by_date(date_to:any,date_from:any)
  {
    this.search.date_to=date_to;
    console.log(this.search.date_to);
    this.search.date_from=date_from;
    console.log(this.search.date_from);
    this.getCheckinList(this.page_limit,this.start,this.type);
  }

  changeTab(val)
  {
    this.showdetail =val;
    this.getCheckinList();
  }
  
  getCheckinList(pagelimit:any=100, start:any=0, action:any='')
  {
    this.loader=1;

    console.log(action);
    this.page_limit = parseInt(pagelimit);
    this.start = parseInt(start);
    if(action == "refresh")
    {
      this.search = {};
      this.start = 0;
      this.showdetail='Today';

    }

    console.log(this.showdetail);
    
    this.service.get_data({'search':this.search,'start':this.start,'pagelimit':this.page_limit,'type':this.type,'tab_status':this.showdetail},'other/getcheckin').subscribe((resp)=>
    {
      console.log(resp);
      this.loader="";
      this.count=resp['count'];;
      this.check_list=resp['checkin'];
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
    },
    error=>
    {
      console.log("error");
    });
  }
  
 
}
