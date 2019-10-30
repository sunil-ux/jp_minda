import { Component, OnInit } from '@angular/core';
// import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-leave-rule-list',
  templateUrl: './leave-rule-list.component.html',
  // animations: [slideToTop()]
})
export class LeaveRuleListComponent implements OnInit {
  holiday_rule_data:any=[];
  leave_rule_data:any=[];
  loader:any=false;
  sendRequest:any=true;

  constructor(public service:MyserviceService, public router:Router, public dialog:DialogBoxService, public toastr:ToastrManager) 
  {
    this.holiday_rules_data();
  }
  
  holiday_rules_data()
  {

    this.loader=true;
    this.service.get_data(0,'leave_holiday/leave_list').subscribe((resp)=>
    {
      console.log(resp);
      this.sendRequest=false;
      this.holiday_rule_data=resp;
      this.loader=false;;
      
    })
  }
  
  update(id)
  {
    console.log(id);
    this.loader=true
    this.service.get_data(id,'leave_holiday/select_leave_rule').subscribe((resp)=>
    {
      console.log(resp);
      this.loader=false;;
      this.leave_rule_data=resp;
      this.service.setOption(this.leave_rule_data);
      this.router.navigate(['/add-leave-rules']);
      
    })
    
  }
  
  delete(id)
  {
    console.log(id);
    this.dialog.delete("Leave Rule").then((result) => {
      if(result)
      {
        
        let value={'id':id}
        this.loader=true
        this.service.get_data(value,'leave_holiday/delete_rules').subscribe((resp)=>
        {
          console.log(resp);
          this.loader=false;;
          if(resp)
          {
            this.toastr.successToastr("Deleted","Success");
            this.holiday_rules_data();
            
          }
          
        });
      }
    }); 
    
    
  }
  
  ngOnInit() {
  }
  
}
