import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  
})
export class AddHolidayComponent implements OnInit {
  data:any={};
  state_data:any={};
  holiday_data:any=[];
  holiday_state:any={};
  loader:any=1;
  states:any='';
  new_val:any=[];
  constructor(public service:MyserviceService, public dialog:DialogBoxService, public toastr:ToastrManager, public router:Router) 
  {
    this.data.type = 'National';
    this.get_state_data();
  }
  
  get_state_data()
  {
    this.service.get_data(0,'Territory_master/get_state').subscribe(resp=>
      {
        console.log(resp);
        this.loader='';
        this.state_data=resp['data'];
      })
    }
    
    
    state_array(event,value,index)
    {
      if(event.checked)
      {
        this.new_val.push(value);
        this.states+=value+",";
      }
      else
      {
        this.states.splice(index,1);
      }
      console.log(this.states);
      
    }
    
    push_in_table()
    {
      this.data.states = this.states;
      console.log(this.data);
      let val = JSON.parse(JSON.stringify(this.data));
      var currentDate = new Date();
      currentDate =  JSON.parse(JSON.stringify(this.data.holiday_date));
      
      currentDate = new Date(currentDate);
      console.log(currentDate);

      val.holiday_date = currentDate;

      console.log(val);
      this.holiday_data.push(val);
      console.log(this.holiday_data);
      this.holiday_state=this.holiday_data[0];
      this.data.holiday_date='';
      this.data.title='';
      this.states=[];
    }
    
    
    
    submit()
    {
      console.log(this.data);
      this.loader='1';
      // this.data.state_data = this.state_data;
      
      this.service.get_data(this.holiday_data,'leave_holiday/add_holiday').subscribe((resp)=>
      {
        console.log(resp);
        this.loader='';
        if(resp)
        {
          this.toastr.successToastr("Success","Inserted");
          this.router.navigate(['/leave-holiday-master/']);
          this.data=[];
          this.holiday_data=[];
        }
        
      },error =>{
        console.log(error);
        this.dialog.error('Something went wrong !!! Try Again...');
      });
      
    }
    
    delete_table_data(index)
    {
      console.log(index);
      this.holiday_data.splice(index,1);
    }
    
    ngOnInit() 
    {
      
    }
    
  }
  