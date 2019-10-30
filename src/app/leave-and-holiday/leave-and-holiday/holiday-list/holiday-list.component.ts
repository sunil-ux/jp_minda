import { Component, OnInit } from '@angular/core';
// import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html'
  // animations: [slideToTop()]
})
export class HolidayListComponent implements OnInit {
  holidays_data:any=[];
  holidays_state:any=[];
  loader:any=false;
  constructor(public service:MyserviceService, public dialog:DialogBoxService, public toastr:ToastrManager) 
  {
    this.holiday_data();
  }
  
  holiday_data()
  {
    this.loader=true;
    this.service.get_data(0,'leave_holiday/holiday_list').subscribe((resp)=>
    {
      console.log(resp);
      this.holidays_data=resp;
      this.loader=false;
    })
  }
  
  // delete(id)
  // {
  //   console.log(id);
  //   this.dialog.delete("Holiday").then((result) => {
  //     if(result)
  //     {
  //       let value={'id':id}
  //       this.service.get_data(value,'leave_holiday/delete_holiday').subscribe((resp)=>
  //       {
  //         console.log(resp);
  //         if(resp)
  //         {
  //           this.toastr.successToastr("Deleted","Success");
  //           this.holiday_data();
  //         }
          
  //       });
  //     }
  //   }); 
    
  // }
  

  delete(id)
  {
    console.log(id);
    this.dialog.delete("User").then((result) => {
      if(result)
      {
        this.loader=true;
        this.service.get_data({'id':id},'leave_holiday/delete_holiday').subscribe((result)=>
        {
          this.loader=false;
          console.log(result); 
          if(result)
          {
            this.holiday_data();
            this.toastr.successToastr("Deleted","Success");
          }
        });
      }
    });
    
  }


  ngOnInit() {
  }
  
}
