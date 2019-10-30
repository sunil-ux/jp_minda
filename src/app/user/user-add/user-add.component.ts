import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrComponent } from 'ng6-toastr-notifications/lib/toastr.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { race } from 'q';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  animations: [slideToTop()]
  
})
export class UserAddComponent implements OnInit {
  data:any={};
  form:any={};
  territory:any=[];
  distributor:any=[];
  retailer:any=[];
  terArray:any[];
  territory_name:any=[];
  territory_data:any=[];
  data_system_user:any={};
  active:any = {};
  user_type={};
  id:any=[];
  apple:boolean=false;
  role_id:any;
  state_data:any=[];
  district_data:any=[];
  city_data:any=[];
  distributor_data:any=[];
  retailer_data:any=[];
  loader:any='';
  pincode:any=[];
  sale_type: any;
  type_list: any=[];
  allcheck:boolean=false;
  filter_district_array:any=[];
  filter_state_arr:any=[];
  new_array:any=[]; 
  filter_city_array:any=[];
  
  constructor( public db:MyserviceService,public router:Router, public dialog:DialogBoxService, public toastr:ToastrManager,@Inject(PLATFORM_ID) private platformId: Object)
  {
    this.get_territory_data();
    this.data.user_type = 'SALES USER';
    this.data.role_id = 'ASM';
    this.get_state();
    // this.get_distributor_list();
    // this.get_retailer_list();
    this.role_list();
    this.get_rsm_or_nsm_list();
  }
  
  
  charonly(event: any) 
  {
    const pattern = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) 
    {event.preventDefault(); }
  }
  setFocus(form) {
        
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
  get_state()
  {
    this.loader='1';
    this.db.get_data(0,'user/get_state').subscribe((resp)=>
    {
      console.log(resp);
      this.loader='';
      this.state_data = resp;
      this.filter_state_arr=this.state_data
    });
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
  
  get_district(state_name)
  {
    console.log(this.data.city);
    
    // for next state change
    this.data.district_name='';
    this.data.city='';
    this.data.pincode='';
    // end 

    console.log(state_name);
    this.loader='1';
    this.db.get_data(state_name,'user/get_district').subscribe((resp)=>
    {
      console.log(resp);
      this.loader='';
      this.district_data = resp;
      this.filter_district_array=this.district_data;
    });
  }
  
  get_city(district_name)
  {
     // for next district change
     this.data.city='';
     this.data.pincode='';
     // end 

    console.log(district_name);
    this.loader='1';
    this.db.get_data(district_name,'user/get_city').subscribe((resp)=>
    {
      console.log(resp);
      this.loader='';
      this.city_data = resp;
      this.filter_city_array=this.city_data;
      console.log(this.filter_city_array);
      
    });
  }
  
  get_pincode(city_name)
  {
    // for next city change
    this.data.pincode='';
    // end

    console.log(city_name);
    this.loader='1';
    this.db.get_data({city:city_name,district:this.data.district_name,state:this.data.state_name},'user/get_pincode').subscribe((resp)=>
    {
      console.log(resp);
      this.loader='';
      this.pincode = resp;
    });
  }
  
  get_role_id(id)
  {
    console.log(id);
    this.data.role_id = id;
  }
  
  district_toggle()
  {
    this.apple =!this.apple;
  }
  ngOnInit() 
  {    
    
  }
  roleList:any=[];
  role_list()
  {
    this.loader=true
    this.db.get_data(0,'user/view_role').subscribe((result:any)=>
    {
      console.log(result);
      this.loader=false
      this.roleList= result;
    });
  }
  filter_person_list:any=[];
  GetTypeList(type:any)
  {
    console.log("i am in function ");
    console.log(type.value);
    this.sale_type=type.value;    
    console.log(this.sale_type);
    
    this.db.get_data({'type':this.sale_type},'user/get_role_wise_list')
    .subscribe(result =>{
      console.log(result);
      this.sm_list = result;
      this.filter_person_list=this.sm_list;
      console.log(this.filter_person_list);
      
    },error=>{
      console.log(error);
    });
  }
  
  filterReprtPerson(data,array,index)
  {
    console.log(data);
    console.log(array);
    console.log(index);
    
    this.filter_person_list=this.filterPerson(data.toUpperCase(),array,index);
  }
  // new_array:any=[];
  filterPerson(search_value,search_array,index)
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
  namearray:any=[]
  sales_id=''
  findName(name)
  {
    console.log(name);
   this.namearray=this.sm_list.filter(x=>x.name==name)[0];
   console.log(this.namearray);
   this.sales_id=this.namearray.id;
   console.log(this.sales_id);
  }
  submit()
  {  
    this.data.parent=this.sales_id;
    console.log(this.data);
    if(this.data.user_type=='SALES USER')
    { 
      this.data.territory =  this.territory;
      this.data.distributor =  this.distributor;
      this.data.retailer = this.retailer;
      
      this.loader='1';
      this.db.get_data(this.data,'user/add_user').subscribe((result)=>
      {
        console.log(result);  
        this.loader='';
        if(result && result['data'])
        {
          this.toastr.successToastr("Success","Inserted");
          this.data=[];
          this.router.navigate(['/user-master/']);
        }  
        else if(result && result['mobile_existence'])
        {
          $('#mobile').focus();
          $(window).scrollTop(0);
          this.dialog.error('Mobile no already exist!');

        }
      },error =>{
        console.log(error);
        this.dialog.error('Something went wrong !!! Try Again...');
        $(window).scrollTop(0);

      });
    }
    else 
    {
      this.loader='1';
      this.db.get_data(this.data,'user/add_user').subscribe((result1:any)=>{
        console.log(result1);
        this.loader='';
        if(result1)
        {
          this.toastr.successToastr("Success","Inserted");
          this.data=[];
          this.router.navigate(['/system-user-list']);
        }
        
      },error =>{
        console.log(error);
        this.dialog.error('Something went wrong !!! Try Again...');
      });
    }
  }
  
  MobileNumber(event: any) 
  {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) 
    {
      event.preventDefault();     
    }
  }
  
  get_territory_data()
  {
    this.loader='1';
    this.db.get_data('','user/get_territory_name').subscribe((resp)=>
    {
      this.loader='';
      console.log(resp);
      this.territory_data=resp;
      
    })
  }
  
  get_distributor_list(data)
  {
    this.loader=true;
    console.log(this.distributor);
    
    this.db.get_data(data,'user/data_list').subscribe((resp)=>
    {
      console.log(resp);
      this.loader=false;
      this.distributor_data=resp['distributor'];

      if(this.distributor_data.length)
      {
        for(let i=0;i<this.distributor.length;i++)
        {
          for(let j=0;j<this.distributor_data.length;j++)
          {
            console.log("j loop");
            
            if(this.distributor_data[j].id==this.distributor[i])
            {
              console.log("in if");
              
              this.distributor_data[j].check=true;
            }
          }
        }
      }

      if(this.retailer_data.length)
      {
        for(let k=0;k<this.retailer_data.length;k++)
        {
          for(let l=0;l<this.retailer.length;l++)
          {
            if(this.retailer_data[k].id==this.retailer[l])
            {
              this.retailer_data[k].check=true;
            }
          }
        }
      }
      this.retailer_data=resp['retailer'];
    })
  }
  
  sm_list:any = [];
  get_rsm_or_nsm_list()
  {
    console.log(this.data);
    if(this.data.role_id == 'NSM' ) return;
    this.loader='1';
    this.sm_list=[];
    this.data.parent = '';
    
    this.db.get_data(this.data,'user/get_rsm_or_nsm_list').subscribe((r)=>
    {
      console.log(r);
      this.loader='';
      this.sm_list=r;
    })
  }
  
  get_territory(id,event,index)
  {
    console.log("I am in territory function");
    
    console.log(id);
    this.loader=1;
    if(event.checked)
    {
      this.territory.push(id);
      console.log(this.territory);
      this.get_distributor_list(this.territory);
      
    }
    else
    {
      for(var i=0; i < this.territory.length; i++)
      {
        if(this.territory_data[index]['id']==this.territory[i])
        {
          this.territory.splice(i,1);
          if(this.territory.length==0)
          {
            this.distributor=[];
          }
        }
      }
      this.get_distributor_list(this.territory);
      console.log(this.territory);
    }
  }
  
  get_distributor(id,event,index)
  {
    console.log(id);
    
    if(event.checked)
    {
      this.distributor.push(id);
      this.distributor_data[index].check=true;
      console.log(this.distributor);      
    }
    else
    {
      this.distributor_data[index].check=false;
      for(var i=0; i<this.distributor.length; i++)
      {
        if(this.distributor_data[index]['id']==this.distributor[i])
        {
          this.distributor.splice(i,1);
        }
      }
      console.log(this.distributor_data);
      
    }
    
  }
  
  get_retailer(id,event,index)
  {
    console.log(id);
    
    if(event.checked)
    {
      this.retailer.push(id);
      this.retailer_data[index].check=true;
      console.log(this.retailer);      
    }
    else
    {
      this.retailer_data[index].check=false;
      for(var i=0; i<this.retailer.length; i++)
      {
        if(this.retailer_data[index]['id']==this.retailer[i])
        {
          this.retailer.splice(i,1);
        }
      }
      console.log(this.retailer);
      
    }
    
  }
}