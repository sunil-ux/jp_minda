import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss'],
  animations: [slideToTop()]

})
export class LeaveListComponent implements OnInit {

  leave_list:any=[];
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any = ''
  pagenumber:any = '';
  status:any = '';
  count: number;
  loader:any;
  approved_leave: any;
  pending_leave: any;
  reject_leave: any;
  constructor(public service:MyserviceService, public toaster:ToastrManager, public route:ActivatedRoute, public alert:DialogBoxService,public dialog: MatDialog) { 
    this.status ='Pending';
    this.getLeaveList();

  }

  ngOnInit() {
  }

        
  change_status(val){
    console.log(val);
    this.status = val;
    this.getLeaveList();
  }
  search_by_date(leave_to:any,leave_from:any)
  {
    this.search.leave_to=leave_to;
    console.log(this.search.leave_to);
    this.search.leave_from=leave_from;
    console.log(this.search.leave_from);
    this.getLeaveList('',this.start,'');
  }
  searchStatus(status:any)
  {
    console.log(status);
    this.search.status=status;
    console.log(this.search.status);
    this.getLeaveList('',this.start,''); 
  }
  searchName(username:any){
    console.log(username);
    this.search.username=username;
    console.log(this.search.username);
    this.getLeaveList('',this.start,'');
  }
  getLeaveList(pagelimit:any=100, start:any=0, action:any='')
  {
    this.loader="1";    
    this.page_limit = parseInt(pagelimit);
    this.start = parseInt(start);
    if(action == "refresh")
    {
      this.search = {};
      this.status='Pending';
      this.start = 0;
    }
    
    console.log(this.status);
    
    this.service.get_data({'search':this.search,'start':this.start,'pagelimit':this.page_limit,'status': this.status},'Other/getUserLeaveList').subscribe((resp)=>
    {
      console.log(resp);
      this.loader="";
      this.leave_list=resp['leave'];

      this.approved_leave=resp['approved'];
      this.pending_leave=resp['pending'];
      this.reject_leave=resp['reject'];

      this.count=resp['count'];
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
    },
    error=>
    {
      console.log(error);
    });
  }

  Accept(id,index)
  {
    console.log(id);
   
    this.alert.confirmation("Accept Leave").then((result) => {
      if(result)
      {
        this.service.get_data({'id':id,'from':'Approved'},'Other/change_user_leave_status').subscribe((resp)=>
        {
          console.log(resp);
          if(resp)
          {
            this.toaster.successToastr("Accepted","Success");
            this.leave_list.splice(index,1);
            this.getLeaveList();
          }
          else{
            this.toaster.errorToastr("Can Not Accept Leave!","Error");
            this.getLeaveList();
            
          }
        });
      }
    });
  }
  
  reject(id,index,type)
  {
    console.log(id);
    const dialogRef=this.dialog.open(DialogBodyComponent,
      {
        width: '508px',
        data:
        {
          id:id,
          type
        }
      });
      dialogRef.afterClosed().subscribe(result => 
        {
          console.log(result);
          this.getLeaveList();
        });
        
      }
      
  delete(id,index)
  {
    console.log(id);
    
    this.alert.delete("Leave").then((result) => {
      if(result)
      {
        this.service.get_data({'id':id},'Other/delete_leave').subscribe((resp)=>
        {
          console.log(resp);
          if(resp)
          {
            this.leave_list.splice(index,1);
            this.toaster.successToastr("Deleted","Success");
            this.getLeaveList();
          }
        });
      }
    });
  }
}