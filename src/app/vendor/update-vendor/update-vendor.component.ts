import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.scss']
})
export class UpdateVendorComponent implements OnInit {

  vendorData:any={};
  state_data:any=[];
  district_data:any=[];
  city_data:any=[];
  pincode_data:any=[];
  loader:any=false;

  constructor(@Inject(MAT_DIALOG_DATA)  public data: any,public service:MyserviceService,public toastr:ToastrManager,public dialog:MatDialog) {
    console.log(data);
    if(this.data.action=='edit_address')
    {
      this.get_state();
      this.get_district(data.state);
      this.get_city(data.district);
      this.get_pincode(data.city);
    }
    // this.vendorData=data;
   }

  ngOnInit() {
   
  }

  submit()
  {
    console.log(this.data);
    
    this.service.get_data(this.data,'Vendor/update_Cp_data').subscribe((resp)=>
    {
      console.log(resp);
      
      if(resp)
      {
        this.toastr.successToastr("Success","Updated");
      }
    });
    this.dialog.closeAll();    
  }

  add_cp_person()
  {
    let data={vendor_id:this.data.id,cp_person:this.cp_person_data}
    
    this.service.get_data(data,'Vendor/add_cp_person').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.toastr.successToastr("Success","Inserted");
      }
    });
    this.dialog.closeAll();
  }

  MobileNumber2(event: any)
    {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);if (event.keyCode != 8 && !pattern.test(inputChar))
      {event.preventDefault();}
    }
    cp_person_data:any=[]
    push_cp_table()
    {
      this.cp_person_data.push(this.vendorData);
      this.vendorData={};
    }
    delete_cp(index)
    {
      this.cp_person_data.splice(index,1)
    }

    update_address()
    {
      this.service.get_data(this.data,"Vendor/update_vendor").subscribe((result)=>{
        console.log(result);
        if(result=='success')
        {
          this.dialog.closeAll();
        }
      })
    }

    get_state()
    {
      this.loader="1";
      this.service.get_data(0,'user/get_state').subscribe((resp)=>
      {
        console.log(resp);
        this.state_data=resp;
      })
    }
    get_district(state_name)
    {
      this.loader="1";
      this.service.get_data(state_name,'user/get_district').subscribe((resp)=>
      {
        console.log(resp);
        this.loader="";
        this.district_data=resp;
      })
    }
    
    get_city(district_name)
    {
      this.loader="1";
      this.service.get_data(district_name,'user/get_city').subscribe((resp)=>
      {
        console.log(resp);
        this.loader="";
        this.city_data=resp;
      })
    }
    
    get_pincode(city_name)
    {
      this.loader="1";
      let temp = {'city':city_name,'district':this.data.district,'state':this.data.state};
      console.log(temp);
      
      this.service.get_data(temp,'user/get_pincode').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.pincode_data=resp;
        }
      })
    }

    updateBasicDetail()
    {

     
      this.loader=true;
      let data={[this.data.action]:this.data.value,'action':this.data.action,'id':this.data.id}
      console.log(data);
      
      this.service.get_data(data,"Vendor/update_vendor").subscribe((result)=>{
        console.log(result);
        this.dialog.closeAll();
      })
    }
}
