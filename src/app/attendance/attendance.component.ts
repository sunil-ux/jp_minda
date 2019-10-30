import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any = ''
  pagenumber:any = '';
  count:any='';
  attendance_count:any=[];
  attendance:any=[];
  loader:any="1";
  filterRow: any;
  showdetail: string;
  attendence_type: any;
  
  constructor(public service:MyserviceService,  public toastr:ToastrManager,public route:ActivatedRoute) {

    this.route.params.subscribe(resp=>
    {
      this.attendence_type = resp['attendence_type'];
    });

    if(this.attendence_type)
    {
      this.showdetail = this.attendence_type;
    }
    else
    {
      this.showdetail='Today';
    }
  }
  
  ngOnInit() {
    this.getAttendance ();
    
  }
  refresh()
  {
    this.search = {};
    this.start = 0;
    this.getAttendance();
  }

  changeTab(val)
  {
    this.showdetail =val;
    this.getAttendance();
  }

  searchName(name)
  {
    console.log(name);
    if(name!='')
    {
      this.getAttendance();
    }

     var filterRow=this.attendance.filter(x => x.name == name);
    console.log(filterRow);
    
    if(filterRow.length!=0)
    {
      console.log("i am in if");
      this.attendance=filterRow;
      console.log(this.attendance);
    }
  }


  search_by_date(date_to:any,date_from:any)
  {
    this.search.to=date_to;
    console.log(this.search.to);
    this.search.from=date_from;
    console.log(this.search.from);
    this.getAttendance(this.page_limit,this.start,'');
  }

  getAttendance(pagelimit:any=100, start:any=0, action:any='')
  {
    this.loader=1;
    this.page_limit = parseInt(pagelimit);
    this.start = parseInt(start);
    if(action == "refresh")
    {
      this.search = {};
      this.start = 0;
      this.showdetail='Today';
    }
    this.service.get_data({'search':this.search,'start':this.start,'pagelimit':this.page_limit,'tab_status':this.showdetail},'other/getAttendance').subscribe((resp)=>
    {
      console.log(resp);
      this.loader="";
      this.attendance=resp['attendance'];
      this.count = resp['count'];
      
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
    },
    error=>
    {
      console.log("error");
      
    });
  }
 
  
  
}
