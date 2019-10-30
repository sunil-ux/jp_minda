import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  animations: [slideToTop()]
  
})
export class AddLeadComponent implements OnInit {
  data:any={};
  form:any={};
  state_data:any=[];
  district_data:any=[];
  city_data:any=[];
  pincode_data:any=[];
  cp_person_data:any=[];
  sales_team_data:any=[];
  loader:any="1";
  showError: boolean=false;
  dropdownSettings = {};
  lead_source_list:any=[];
  other_leadtype_list: any;
  product_assign_data:any=[];
  product_code_value:any={};
  constructor(public service:MyserviceService, public dialog:DialogBoxService, public router:Router, public toastr:ToastrManager,@Inject(PLATFORM_ID) private platformId: Object)
  {
    this.get_state();
    this.data.type = '1';
    this.get_lead_source_list();
    this.get_other_lead_type();
    this.getAllProductType();
    this.data.country='India';
    this.data.assigned_product_type=[]
  }
  
  ChangePage(value)
  {
    console.log(value);
    //all separately empty isliye krwa re h becoz.. data.type bhi empty hojata h..
    this.data.counter_name='';
    this.data.email='';
    this.data.mobile='';
    this.data.gst_no='';
    this.data.country='India';
    this.data.address='';
    this.data.state_name='';
    this.data.district_name='';
    this.data.city='';
    this.data.pincode='';
    this.data.sales_team_name='';
    this.form.cp_name='';
    this.form.cp_mobile_1='';
    this.form.cp_mobile_2='';
    this.cp_person_data=[];
    
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

addToCodeList()
{
  this.product_assign_data.push(this.product_code_value);
  this.product_code_value={};
}

deleteCodeFromList(index)
{
  this.product_assign_data.splice(index,1)
}
  onItemSelect(item: any) {
    console.log(item.id);
    console.log(this.data.sales_team_name);
  }
  onSelectAll(items: any) {
  }
  filter_state_arr:any=[];

  get_lead_source_list()
  {
    this.service.get_data(0,'lead/get_lead_source').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.lead_source_list=resp['data'];
      }
    })
  }

  get_other_lead_type()
  {
    this.service.get_data(0,'lead/get_other_lead_type').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.other_leadtype_list=resp['data'];
      }
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
    // for next state change
    this.data.district_name='';
    this.data.city='';
    this.data.pincode='';
    // end
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

  input_get_sales_team_data(pincode) 
  {
    let string = new String(pincode) ;
    console.log(string.length);
    
    // if(string.length==5)
    // {
      this.get_sales_team_data(pincode);
    // }
   
  }

  
  get_sales_team_data(pincode)
  {
    this.service.get_data({'pincode':pincode,'dr_type':this.data.type},'distribution_net/get_sales_team_data').subscribe((resp)=>
    {
      console.log(resp);
      this.sales_team_data=resp;
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        allowSearchFilter: true
      };
      
    })
  }
  
  push_cp_table()
  {
    console.log(this.showError);
    console.log(this.form);
    console.log(this.form.cp_mobile_1.length);

    if(this.form.cp_mobile_1.length!=10)
    {
      console.log("invalid data");
      this.showError=true;
      console.log(this.showError);
    }
    if(this.form.cp_mobile_1.length==10)
    {
      let val=JSON.parse(JSON.stringify(this.form));
      this.cp_person_data.push(val);
      console.log(this.cp_person_data);
      console.log(this.cp_person_data.length);
      this.showError=false;
      console.log(this.showError);
    }
    else
    {
      this.form.cp_name='';
      this.form.cp_mobile_1='';
      this.form.cp_mobile_2='';
      this.showError=true;
      console.log(this.showError);
      console.log(this.form); 
    }
    this.form.cp_name='';
    this.form.cp_mobile_1='';
    this.form.cp_mobile_2='';
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

  submit()
  {
    console.log(this.cp_person_data);
    console.log(this.data);
    console.log(this.data.country);
    
    if(this.data.country=='Other')
    {
      this.data.state_name='';
      this.data.district_name='';
      this.data.city='';
      this.data.pincode='';
    }
    console.log(this.data);

    if(this.form.cp_name && this.form.cp_mobile_1)
    {
      let val=JSON.parse(JSON.stringify(this.form));
      this.cp_person_data.push(val);
    }

    if(this.product_code_value.product_code && this.product_code_value.discount_type && this.product_code_value.discount_val)
    {
      this.product_assign_data.push(this.product_code_value);
    }

    this.data.cp_person_data = this.cp_person_data;
    console.log( this.data.cp_person_data);
    
    if(!this.cp_person_data.length)
    {
      console.log('if');
      this.dialog.error('Atleast one contact person is required');
      return;
    }
    // if(!this.product_assign_data.length)
    // {
    //   console.log('if');
    //   this.dialog.error('Atleast one Product Code is Required');
    //   return;
    // }

    this.data.product_assign_data=this.product_assign_data;
    let new_data={cp_person_data:this.cp_person_data, data:this.data};
    
    this.loader=true;

    this.service.get_data(this.data,'lead/lead_add').subscribe((resp)=>
    {
      this.loader=false;
      console.log(resp);
      if(resp)
      {
        this.toastr.successToastr("Success","Inserted");
        this.router.navigate(['/lead-master-module/']);
        this.data=[];
      }
      else
      {
        this.dialog.error('Something went wrong !!! Try Again...');
      }
    },error =>{
      console.log(error);
      this.dialog.error('Something went wrong !!! Try Again...');
    });
    
  }
  
  delete_cp(index)
  {
    console.log(index);
    this.cp_person_data.splice(index,1);
  }
  
  filterstate(data,array,index)
  {
    console.log(array);
    console.log(data);
    console.log(index);
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
  ngOnInit() {
    this.data.country='India';
  }
  
  // state_array_filter(data,array,index_val)
  // {
  //   this.state_data=this.filterList(data.toUpperCase(),array,index_val);
  // }
  // new_array=[];
  
  // filterList(search_word,search_array,index_val)
  // {
  //   this.new_array=[];
  //   for(var i=0; i<search_array.length; i++)
  //   {
  //     if(search_array[i][index_val].toUpperCase().search(search_word) !==-1)
  //     {
  //       this.new_array.push(search_array[i]);
  //     }
  //   }
  //   return this.new_array;
  // }
  // (keyup)="state_array_filter(data.state,state_data,'state')"
  
}
