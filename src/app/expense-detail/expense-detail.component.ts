import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyserviceService } from '../myservice.service';
import {Location} from '@angular/common';
import { ConstantService } from '../constant.service';
import { DialogBoxService } from '../dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {
  
  id:any;
  loader:any=false;
  expenseData:any={};
  image_url:any;
  constructor(public route:ActivatedRoute,public service:MyserviceService,private _location: Location,public constant:ConstantService, public alert:DialogBoxService, public toaster:ToastrManager) {
    this.image_url=this.constant.upload_url;
    
    this.route.params.subscribe(resp=>
      {
        this.id = resp['id'];
        if(this.id)
        {
          this.getExpenseDetail();
        }
      });
    }
    
    ngOnInit() {
    }
    
    backClicked() {
      console.log( 'goBack()...' );
      this._location.back();
    }
    
    getExpenseDetail()
    {
      this.loader=true;
      this.service.get_data({id:this.id},"other/getExpenseDetail").subscribe((result)=>{
        console.log(result);
        this.loader=false;
        if(result['msg']='success')
        {
          this.expenseData=result['detail'];
        }
      })
    }
    
    statusData:any={};
    
    updateStatus()
    {
      
      this.alert.confirmation("Approve Expense").then((result) => {
        if(result)
        {
          this.statusData.id=this.id;
          console.log(this.statusData);
          
          this.service.get_data(this.statusData,'Other/change_expense_status').subscribe((resp)=>
          {
            console.log(resp);
            if(resp!='Error')
            {
              this.toaster.successToastr("Verified","Success");
              this.getExpenseDetail()
            }
            else{
              this.toaster.errorToastr("Can Not Verify Expense!","Error");
              this.getExpenseDetail()
            }
          });
        }
      });
    }

  //   SubmitExpenseRejectReason(reason)
  
  // {
  //   console.log(reason);
    
  //   this.service.get_data({'id':this.data.id,'reason_reject':reason,'from':'Reject'},'Other/change_expense_status').subscribe((resp)=>
  //   {
  //     console.log(resp);
      
  //     if(resp)
  //     {
  //       this.toastr.successToastr("Success","Updated");
  //     }
  //   });
  //   this.dialogRef.closeAll();    
  // }
    
  }
  