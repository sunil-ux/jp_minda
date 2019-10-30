import { Component, OnInit } from '@angular/core';
// import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-leave-rules',
  templateUrl: './add-leave-rules.component.html'
  // animations: [slideToTop()]
})
export class AddLeaveRulesComponent implements OnInit {
  data:any={};
  leave_rule_data:any=[];
  loader:any=1;

  constructor(public service:MyserviceService, public dialog:DialogBoxService, public router:Router, public toastr:ToastrManager) 
  {
    this.loader=1;
    this.get_leave_rule_data();
    if(this.leave_rule_data)
    {
      this.data = this.leave_rule_data;
      console.log(this.data);
      
    }
  }
  
  get_leave_rule_data()
  {
    this.loader='';
    this.leave_rule_data = this.service.getOption();
    console.log(this.leave_rule_data);
  }
  
  submit()
  {
    console.log(this.data);
    this.loader='1';
    if(this.leave_rule_data)
    {
      this.service.get_data(this.data,'leave_holiday/update_leave_rule').subscribe((resp)=>
      {
        console.log(resp);
        this.loader='';
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
          this.data=[];
          this.router.navigate(['/leave-holiday-master/leave-rule-list']);
        }
        
      },error =>{
        console.log(error);
        this.dialog.error('Something went wrong !!! Try Again...');
      });
    } 
    else
    {
    this.loader='1';

      this.service.get_data(this.data,'leave_holiday/add_leaves_rule').subscribe((resp)=>
      {
        console.log(resp);
        this.loader='';

        if(resp)
        {
          this.toastr.successToastr("Success","Inserted");
          this.data=[];
          this.router.navigate(['/leave-holiday-master/leave-rule-list']);
        }
        
      },error =>{
        console.log(error);
        this.dialog.error('Something went wrong !!! Try Again...');
      });
    }
  }
  
  ngOnInit() {
  }
  
}
