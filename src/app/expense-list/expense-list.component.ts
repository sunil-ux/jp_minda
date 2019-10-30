import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { ConstantService } from '../constant.service';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  animations: [slideToTop()]
  
})
export class ExpenseListComponent implements OnInit {
  
  expense_list:any=[];
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any = ''
  pagenumber:any = '';
  // loader:any="1";
  status:any = '';
  count: number;
  loader:any;
  today_date;
  reject_exp: any;
  pending_exp: any;
  approved_exp: any;
  
  constructor(public service:MyserviceService, public toaster:ToastrManager, public route:ActivatedRoute, public alert:DialogBoxService,public dialog: MatDialog,public constant:ConstantService) {
    this.status='Pending';
    this.getExpenseList();
  }
  
  ngOnInit() {
    this.today_date = new Date().toISOString().slice(0,10);
    console.log(this.today_date)
  }
  search_by_date(date_to:any,date_from:any)
  {
    this.search.date_to=date_to;
    console.log(this.search.date_to);
    this.search.date_from=date_from;
    console.log(this.search.date_from);
    this.getExpenseList(this.page_limit,this.start,'');
  }
  searchName(username:any){
    console.log(username);
    this.search.username=username;
    console.log(this.search.username);
    this.getExpenseList(this.page_limit,this.start,'');
  }
  searchStatus(status:any)
  {
    console.log(status);
    this.search.status=status;
    console.log(this.search.status);
    this.getExpenseList(this.page_limit,this.start,''); 
  }


  change_status(val){
    console.log(val);
    this.status = val;
    this.getExpenseList();
  }


  getExpenseList(pagelimit:any=100, start:any=0, action:any='')
  {
    this.loader=1;
    
    this.page_limit = parseInt(pagelimit);
    this.start = parseInt(start);
    if(action == "refresh")
    {
      this.status='Pending';

      this.search = {};
      this.start = 0;
    }

    console.log(this.search);
    console.log(this.status);
    
    
    this.service.get_data({'search':this.search,'start':this.start,'pagelimit':this.page_limit,'status': this.status},'Other/getExpenseList').subscribe((resp)=>
    {
      console.log(resp);
      this.loader="";
      this.expense_list=resp['expense'];

      this.approved_exp=resp['approved'];
      this.pending_exp=resp['pending'];
      this.reject_exp=resp['reject'];

      this.count=resp['count'];
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
    },
    error=>
    {
      console.log(error);
    });
  }
  verify(id,index)
  {
    console.log(id);
    this.expense_list.splice(index,1);
    this.alert.confirmation("Verify Expense").then((result) => {
      if(result)
      {
        this.service.get_data({'id':id ,'from':'Approved'},'Other/change_expense_status').subscribe((resp)=>
        {
          console.log(resp);
          if(resp!='Error')
          {
            this.toaster.successToastr("Verified","Success");
            this.getExpenseList();
          }
          else{
            this.toaster.errorToastr("Can Not Verify Expense!","Error");
            this.getExpenseList();
            
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
          this.expense_list.splice(index,1);
          
          this.getExpenseList();
        });
        
      }
      
      delete(id,index)
      {
        console.log(id);
        
        this.alert.delete("Expense").then((result) => {
          if(result)
          {
            this.service.get_data({'id':id},'Other/delete_expense').subscribe((resp)=>
            {
              console.log(resp);
              if(resp)
              {
                this.toaster.successToastr("Deleted","Success");
                this.expense_list.splice(index,1);
                
                this.getExpenseList();
              }
            });
          }
        });
      }
      
      
    }
    