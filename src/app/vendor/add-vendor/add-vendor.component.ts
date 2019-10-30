import {Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';




@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html'
})
export class AddVendorComponent implements OnInit {
  data:any={};
  form:any={};
  state_data:any=[];
  district_data:any=[];
  city_data:any=[];
  pincode_data:any=[];
  filter_state_arr:any=[];
  loader:any=false;
  cp_person_data:any=[];
  
  constructor(public service: MyserviceService,public dialog: DialogBoxService,@Inject(PLATFORM_ID) private platformId: Object,public router:Router,public toaster:ToastrManager) {       
    
    this.data.country='India';
    
  }
  
  ngOnInit() {
    this.get_state();
    this.getAllProductType();
  }
  
  
  setFocus(form) {
    console.log(form);
    
    
    for (let key in form.controls) {
      
      if(form.controls.hasOwnProperty(key)) {
        
        if(form.controls[key].status == 'INVALID') {
          
          if (isPlatformBrowser(this.platformId)) {
            
            $('#'+key).focus();
            
          }
          
          return true;
          
        }
      };
    }
  }
  
  submit()
  {
    this.loader=true;
    console.log(this.data);
    
    let sendData:any={};
    
    sendData.assigned_product_type=this.productTypeArray;
    sendData.cp_person_data=this.cp_person_data;
    sendData.data=this.data
    console.log(sendData);
    
    this.service.get_data(sendData,"Vendor/saveVendors").subscribe((result)=>{
      console.log(result);
      this.loader=false;
      if(result['msg']=='success')
      {
        this.router.navigate(['/vendor-master/']);
        this.toaster.successToastr("Vendor Save SuccesFully");
      }
      else
      {
        this.toaster.errorToastr("Something Went Wrong");
      }
      
    })
    
  }
  
  productTypeArray:any=[];
  addToList(data,event,index)
  {
    if(event.checked)
    {
      this.productTypeArray.push(data);
    }
    else
    {
      this.productTypeArray.splice(index,1);
    }
    console.log(this.productTypeArray);
    
  }
  push_cp_table()
  {
    
    this.cp_person_data.push(this.form);
    this.form={};
  }
  
  deleteContactPerson(index)
  {
    this.cp_person_data.splice(index,1)
  }
  
  productType:any=[];
  getAllProductType()
  {
    this.loader=true;
    this.service.get_data("","product/getAllProductTypes").subscribe((result)=>{
      console.log(result);
      this.loader=false;
      this.productType=result['data'];
    })
    
  }
  
  get_state()
  {
    this.service.get_data(0,'user/get_state').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.loader="";
        this.state_data=resp;
        this.filter_state_arr=this.state_data;
      }
    })
  }
  
  
  filter_district_array:any=[];
  get_district(state_name)
  {
    this.data.district_name='';
    this.data.city='';
    this.data.pincode='';
    this.service.get_data(state_name,'user/get_district').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.loader="";
        this.district_data=resp;
        this.filter_district_array=this.district_data;
      }
    })
  }
  filter_city_array:any=[];
  get_city(district_name)
  {
    this.data.city='';
    this.data.pincode='';
    this.service.get_data(district_name,'user/get_city').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.loader="";
        this.city_data=resp;
        this.filter_city_array=this.city_data;
      }
      
    })
  }
  productCodeList:any=[]
  div:any=false;
  getProductCode(code)
  {
    console.log(this.data.assigned_product_type);
    
    this.div=false;
    if(code.length>3)
    {
      this.div=true;
      this.loader=true;
      this.service.get_data({product_code:code,assign_type :this.data.assigned_product_type},"product/product_code_suggestive_search").subscribe((result)=>{
        console.log(result);
        this.loader=false
        if(result['msg']=='success')
        {
          this.productCodeList=result['data'];
        }
      })
    } 
  }
  get_pincode(city_name)
  {
    this.data.pincode=''
    
    let temp = {'city':city_name,'district':this.data.district_name,'state':this.data.state_name};
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
  
  filterstate(data,array,index)
  {
    this.filter_state_arr=this.filter(data.toUpperCase(),array,index);
  }
  filterDistrict(data,district_array,key)
  {
    this.filter_district_array=this.filter(data.toUpperCase(),district_array,key);
  }
  filterCity(data,city_array,key)
  {
    console.log(data);
    this.filter_city_array=this.filter(data.toUpperCase(),city_array,key);
  }
  
  new_array:any=[];
  filter(search_value,search_array,index)
  {
    this.new_array=[];
    for(var i=0; i<search_array.length; i++)
    {
      if(search_array[i][index].toUpperCase().search(search_value) !==-1)
      {
        this.new_array.push(search_array[i]);
      }
    }
    return this.new_array;  
  }
  
  
  MobileNumber(event: any) 
  {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) 
    {event.preventDefault(); }
  }
  namecheck(event: any) 
  {
    const pattern = /^[a-zA-Z0-9!@#$&() `.+,/"-]*$/;
    
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) 
    {event.preventDefault(); }
  }
  
  
  
}