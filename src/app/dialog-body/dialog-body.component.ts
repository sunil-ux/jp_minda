import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MyserviceService } from '../myservice.service';
import { DialogBoxService } from '../dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html'
})
export class DialogBodyComponent implements OnInit {
  type:boolean=false;
  category_data:any=[];
  sub_category_data:any=[];
  series_data:any=[];
  state_data:any=[];
  district_data:any=[];
  city_data:any=[];
  pincode_data:any=[];
  cp_person_data:any=[];
  loader:any="1";
  sales_team_data:any=[];
  sale_type: any;
  territory_list:any=[];
  distributor_list:any=[];
  product_id: any;
  user_id: any;
  sm_list: any=[];
  parent: any;
  territorylisting:any=[];
  selectedDistributorArray: any =[];
  oenselecteddist:any=[];
  dropdownSettings = {};
  dropdownList:any = [];
  selectedItems:any = [];
  module_list:any=[];
  users_role_list: any=[];
  
  constructor(public route:ActivatedRoute, @Inject(MAT_DIALOG_DATA)  public data: any, private dialogRef:MatDialog, public service:MyserviceService, public dialog:DialogBoxService, public router:Router, public toastr:ToastrManager) 
  {
    console.log(data);
    if(data.access_labeal == 'RSM')
    {
      this.data.sale_type='Asm';
      this.GetTypeList('Asm','default');
    }
    
    
    if(data.type == 'edit_reporting_manager')
    {
      this.data.sale_type = data.parent_access_labeal;
      this.data.parent = data.parent_id;
      this.GetTypeList(this.data.sale_type,'default');
    }
    
    
    if(data.type=='edit_sales_user_role')
    {
      this.users_role_list = [
        {
          'role_name' : 'ASM',
          'role_id' : 'ASM'
          
        },
        {
          'role_name' : 'RSM',
          'role_id' : 'RSM'
          
        },
        {
          'role_name' : 'NSM',
          'role_id' : 'NSM'
          
        }];
      }
      
      else if(data.type=='edit_system_user_role')
      {
        this.get_sys_user_role_list();
      }
      // console.log(data.id);
      this.user_id=data.id;
      this.get_state();
      this.get_district(data.state);
      this.get_city(data.district);
      this.get_pincode(data.city);
      // this.districtdata();
      // this.citytdata();
      // this.pincodedata();
      this.get_sales_team_data(data.pincode,data.drtype);
      this.GetDistributorList();
      this.GetTerritoryList();
      this.GetPermissionArray();
      this.GetModuleArray()
      // this.data = this.data.cp_data;
      
      // if(data.product_type == 'category')
      // {
      //   this.type = true;
      //   this.service.get_data(0,'master_product/master_product_category_list').subscribe((resp)=>
      //   {
      //     console.log(resp);
      //     this.category_data=resp;
      //   })
      // }
      
      // if(data.product_type == 'sub_category')
      // {
      //   this.type = true;
      //   this.service.get_data(0,'master_product/master_product_sub_list').subscribe((resp)=>
      //   {
      //     console.log(resp);
      //     this.sub_category_data=resp;
      //   })
      // }
      
      // if(data.product_type == 'series')
      // {
      //   this.type = true;
      //   this.service.get_data(0,'master_product/series_list').subscribe((resp)=>
      //   {
      //     console.log(resp);
      //     this.series_data=resp;
      //   })
      // }
      
    }
    
    
    charonly(event: any)
    {
      const pattern = /[A-Za-z ]/;
      let inputChar = String.fromCharCode(event.charCode);if (event.keyCode != 8 && !pattern.test(inputChar))
      {event.preventDefault();}
    }
    
    
    MobileNumber2(event: any)
    {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);if (event.keyCode != 8 && !pattern.test(inputChar))
      {event.preventDefault();}
    }
    
    Discount(event:any)
    {
      const pattern = /^[0-9 .]+$/;
      let inputChar = String.fromCharCode(event.charCode);if (event.keyCode != 8 && !pattern.test(inputChar))
      {event.preventDefault();}
    }
    
    GetDistributorList()
    {
      this.loader="1";
      console.log("i am in function ");
      console.log(this.user_id);
      this.service.get_data({'user_id':this.user_id},'user/get_other_dist_dealer')
      .subscribe(result =>{
        console.log("I AM DISTRIBUTOR FUNCTION DATA: ");
        console.log(result);
        // this.loader="";
        // if(result=='success'){
        this.distributor_list = result;
        console.log(this.distributor_list);
        // }
        
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'new_name',
          allowSearchFilter: true
        };
        
      },error=>{
        console.log(error);
      });
    }
    
    get_sys_user_role_list()
    {
      this.loader="1";
      this.service.get_data({},'user/view_role').subscribe((resp)=>
      {
        console.log(resp);
        this.loader="";
        this.users_role_list = resp;
      },
      error=>
      {
        console.log("error");
      });
    }
    
    GetTerritoryList()
    {
      this.loader="1";
      this.service.get_data(this.data,'Territory_master/view_territory').subscribe((result)=>
      {
        console.log(result);
        this.loader="";
        this.territorylisting = result['data']['list'];
        console.log(this.territorylisting);
      },
      error=>
      {
        console.log("error");
      });
    }
    
    GetTypeList(type:any,text:any)
    {
      console.log("i am in function ");
      console.log(type.value);
      console.log(type);
      console.log(text);
      
      
      if(text !='')
      {
        console.log('if');
        
        this.sale_type=type;
      }
      else
      {
        console.log('else');
        
        this.sale_type=type.value;    
      }
      
      this.service.get_data({'type':this.sale_type,'id':this.data.user_id},'user/get_role_wise_list')
      .subscribe(result =>{
        console.log(result);
        this.sm_list = result;
      },error=>{
        console.log(error);
      });
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
    
    get_sales_team_data(pincode,drtype)
    {
      this.loader="1";
      this.service.get_data({'pincode':pincode,'dr_type': drtype},'distribution_net/get_sales_team_data').subscribe((resp)=>
      {
        console.log(resp);
        this.loader="";
        this.sales_team_data=resp;
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
    
    districtdata()
    {
      this.loader="1";
      this.service.get_data(0,'user/get_districtdata').subscribe((resp)=>
      {
        console.log(resp);
        // this.loader="";
        this.district_data=resp;
        
      })
    }
    
    citytdata()
    {
      this.loader="1";
      this.service.get_data(0,'user/get_citydata').subscribe((resp)=>
      {
        console.log(resp);
        // this.loader="";
        this.city_data=resp;
        
      })
    }
    
    pincodedata()
    {
      this.loader="1";
      this.service.get_data(0,'user/get_pincodedata').subscribe((resp)=>
      {
        console.log(resp);
        this.loader="";
        this.pincode_data=resp;
        
      })
    }
    
    submit()
    {
      console.log(this.data);
      
      this.service.get_data(this.data,'lead/update_cp_data').subscribe((resp)=>
      {
        console.log(resp);
        
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();    
    }
    
    update_address()
    {
      console.log(this.data);
      
      this.service.get_data(this.data,'lead/update_address').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    
    
    push_cp_table()
    {
      console.log(this.data);
      
      let val=JSON.parse(JSON.stringify(this.data));
      console.log(val);
      this.cp_person_data.push(val);
      console.log(this.cp_person_data);
      this.data.cp_name='';
      this.data.cp_mobile_1='';
      this.data.cp_mobile_2='';
      console.log(this.data); 
      
    }
    
    add_cp_person()
    {
      this.service.get_data(this.cp_person_data,'lead/add_cp_person').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Inserted");
        }
      });
      this.dialogRef.closeAll();
    }
    
    delete_cp(index)
    {
      console.log(index);
      this.cp_person_data.splice(index,1);
      
    }
    
    update_email()
    {
      
      this.service.get_data(this.data,'lead/update_lead_email').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    update_name()
    {
      console.log(this.data);
      this.service.get_data(this.data,'lead/update_name').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    update_dis_name()
    {
      console.log(this.data);
      this.service.get_data(this.data,'Distribution_net/update_name').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    update_user_name()
    {
      console.log(this.data);
      this.service.get_data(this.data,'user/update_name').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();  
    }
    update_systemuser_name()
    {
      console.log(this.data);
      this.service.get_data(this.data,'user/update_name').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll(); 
    }
    
    update_mobile()
    {
      this.service.get_data(this.data,'lead/update_mobile').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    
    
    update_gst()
    {
      this.service.get_data(this.data,'lead/update_gst').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    // selectDistributor(data){
    //   console.log(data);
    //   console.log(this.oenselecteddist);
    
    
    //   console.log(data.value);
    //   for(var i=0;i<data.value.length; i++){
    //     let filterRowCat = this.distributor_list.filter(x => x.name == data.value[i])[0];
    //     console.log(filterRowCat);
    
    //     let existcase = this.selectedDistributorArray.filter(x => x.name == data.value[i])[0];
    //     console.log(existcase);
    
    //     if(filterRowCat && !existcase)
    //     this.selectedDistributorArray.push(filterRowCat);
    
    //   }
    
    //   console.log(this.selectedDistributorArray);
    
    // }
    
    update_assign_distribution()
    {
      // var dist_dealer = ['id': , 'type':  ];
      
      let final_own_selected=[];
      for(var i=0;i<this.oenselecteddist.length; i++)
      {
        let filterRowCat = this.distributor_list.filter(x => x.id == this.oenselecteddist[i].id)[0];
        console.log(filterRowCat);
        // 2-> retailer, 1-> distributor 3-> direct dealer
        if(filterRowCat)
        {
          if(filterRowCat.type==1){
            filterRowCat.type='distributor';
          }
          else if(filterRowCat.type==3){
            filterRowCat.type= 'OEM';
          }
          
          final_own_selected.push(filterRowCat);
          // this.oenselecteddist[i]['type']=filterRowCat.type;
        }
      }
      
      console.log(final_own_selected);
      
      
      this.service.get_data({'dist_dealer':final_own_selected ,'user_id':this.data.id },'user/update_assign_user_distributor_dealer').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    // sale user & system user data update
    update_user_data()
    {
      this.service.get_data(this.data,'user/update_user_address').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_sales_team_info()
    {
      console.log(this.data);
      
      this.service.get_data({'parent': this.data.parent,'user_id':this.data.user_id },'user/update_sales_team').subscribe((resp)=>
      {
        console.log(resp);
        
        if(resp=='success')
        {
          
          this.toastr.successToastr("Success","Updated");
          
        }
      });
      
      this.dialogRef.closeAll();
      
    }
    
    temp_user_type:any;
    update_user_role()
    {
      console.log(this.data);
      
      if(this.data.type=='edit_sales_user_role')
      {
        this.temp_user_type = 'SALE USER';
      }
      else
      {
        this.temp_user_type = 'SYSTEM USER';
      }
      this.service.get_data({'role_name': this.data.role_name,'user_id':this.data.user_id ,'user_type':this.temp_user_type},'user/update_user_role').subscribe((resp)=>
      {
        console.log(resp);
        
        if(resp && resp['msg']=='success')
        {
          
          this.toastr.successToastr("Success","Updated");
          
        }
      });
      
      this.dialogRef.closeAll();
      
    }
    
    update_territory()
    {
      // console.log(territory);
      
      this.service.get_data({'user_id':this.data.id,'territory':this.data.territory},'user/update_user_territory').subscribe((resp)=>
      {
        console.log(resp);
        if(resp=='success')
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_reporting_manager()
    {
      this.service.get_data({'user_id':this.data.user_id,'new_parent_id':this.data.parent},'user/update_reporting_manager').subscribe((resp)=>
      {
        console.log(resp);
        if(resp=='success')
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    update_useremail(mail)
    {
      console.log(mail);
      
      this.service.get_data({'email': mail,'id': this.data.id},'user/update_user_mail').subscribe((resp)=>
      {
        console.log(resp);
        if(resp==true)
        {
          console.log("VALUE UPDATED!");
          
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    update_usermobile(mobile)
    {
      console.log(mobile);
      this.service.get_data({'mobile':mobile,'id': this.data.id},'user/update_user_mobile').subscribe((resp)=>
      {
        console.log(resp);
        if(resp==true)
        {
          console.log("VALUE UPDATED!");
          
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_dr_discount()
    {
      console.log(this.data);
      
      this.service.get_data(this.data,'distribution_net/dr_discount').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
        
      });
      this.dialogRef.closeAll();
    }
    
    // SYSTEM USER UPDATE 
    update_user_email()
    {
      this.service.get_data(this.data,'user/update_user_email').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_user_mobile()
    {
      this.service.get_data(this.data,'user/update_user_mobile').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_username()
    {
      this.service.get_data(this.data,'user/update_username').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_user_password()
    {
      this.service.get_data(this.data,'user/update_password').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    
    // distributor email update
    update_dis_email()
    {
      this.service.get_data(this.data,'Distribution_net/update_distribution_email').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_dis_mobile()
    {
      this.service.get_data(this.data,'Distribution_net/update_mobile').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_dis_gst()
    {
      this.service.get_data(this.data,'Distribution_net/update_gst').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_dis_target_duration()
    {
      console.log(this.data);
      
      this.service.get_data(this.data,'Distribution_net/update_target').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_dis_target_price()
    {
      this.service.get_data(this.data,'Distribution_net/update_target').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_dis_address()
    {
      console.log(this.data);
      
      this.service.get_data(this.data,'Distribution_net/update_address').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_sales_team()
    {
      console.log("update sales team");
      console.log(this.data);
      
      this.service.get_data(this.data,'Distribution_net/update_sales_team').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    update_lead_sales_team()
    {
      console.log("update sales team");
      
      console.log(this.data);
      
      this.service.get_data(this.data,'lead/update_sales_team').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    dis_submit()
    {
      console.log(this.data);
      
      this.service.get_data(this.data,'Distribution_net/update_cp_data').subscribe((resp)=>
      {
        console.log(resp);
        
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();    
    }
    
    add_dis_cp_person()
    {
      this.service.get_data(this.cp_person_data,'Distribution_net/add_cp_person').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.successToastr("Success","Inserted");
        }
      });
      this.dialogRef.closeAll();
    }
    
    selectedFile:any=[];
    filename:any=[];
    select_file(event)
    {
      // console.log(event);
      // console.log(event.target.files);
      for(var i=0; i<event.target.files.length; i++){ 
        this.selectedFile.push(event.target.files[i]);
        console.log(this.selectedFile);
        this.filename = this.selectedFile[i]['name'];
      }
      
    }
    delFile(name:any,index:any){
      console.log(name); 
      console.log(index);
      this.selectedFile.splice(index,1);
      console.log(this.selectedFile);
    }
    
    // API 
    // upload_payment_doc
    // insert_id
    // files
    
    formData=new FormData(); // for file uploading  
    VerifyPayment(description)
    {
      console.log(this.data.payment_id);
      
      this.service.get_data({'order_id': this.data.order_id,'payment_id': this.data.payment_id},'Order/verify_payment')
      .subscribe((result)=>{
        console.log(result);
        if(result="Success")
        {
          if( this.selectedFile && this.selectedFile.length || description)
          {
            for(var i=0; i<this.selectedFile.length; i++)
            {
              this.formData.append("image"+i ,this.selectedFile[i],this.selectedFile[i].name);
            }
            
            this.formData.append("insert_id",this.data.payment_id);
            this.formData.append("description",description);
            
            this.service.upload_image(this.formData,"Order/upload_payment_doc")
            .subscribe((result:any) =>{
              console.log(result);
            },error=>{
              console.log(error);
            });
          }
        }
        this.dialogRef.closeAll();
      },error=>{
        console.log("error");
        console.log(error);
      });
      
      
      
      
    }
    
    SubmitReason(reason)
    {
      console.log(reason);
      
      this.service.get_data({'order_id':this.data.order_id,'reason':reason ,'dr_id':this.data.dr_id },'order/change_order_reason').subscribe((resp)=>
      {
        console.log(resp);
        
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();    
    }
    //  update role module
    modules_array:any=[];
    GetModuleArray()
    {
      this.modules_array=this.data.modules_array;
      console.log(this.modules_array);
      
    }
    module_id:any=';'
    filterRowModules:any=[];
    module_name:any=''
    update_module(selected_module)
    {
      this.filterRowModules = this.modules_array.filter(x => x.id == selected_module);
      this.module_id=this.filterRowModules[0].id;
      this.module_name=this.filterRowModules[0].module_name;
      console.log(this.filterRowModules);
      console.log(this.filterRowModules[0].name);
      console.log(this.filterRowModules[0].id);
      
      
      // console.log(this.data.module_auto_id);
      // console.log(this.data.module_id);
      // console.log(this.data.role_id);
      // console.log(this.data.modules_array);
      
      
      this.service.get_data({'module_id':this.module_id, 'role_id':this.data.role_id, 'module_name':this.module_name },'role/add_role_module_update').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    // end
    permission_list:any=[];
    
    GetPermissionArray(){
      this.permission_list = this.data.permission_array;
    }
    filterRowPermission:any=[];
    update_module_permission(selected_permission)
    {
      this.filterRowPermission = this.permission_list.filter(x => x.id == selected_permission);
      console.log(this.filterRowPermission);
      console.log(selected_permission);
      console.log(this.data.module_auto_id);
      console.log(this.data.module_id);
      console.log(this.data.role_id);
      console.log(this.data.permission_array);
      
      
      this.service.get_data({'module_auto_id':this.data.module_auto_id, 'module_id':this.data.module_id, 'role_id':this.data.role_id, 'permission_array':this.filterRowPermission },'role/addnew_role_module_perission').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();
    }
    
    
    SubmitExpenseRejectReason(reason)
    
    {
      console.log(reason);
      
      this.service.get_data({'id':this.data.id,'reason_reject':reason,'from':'Reject'},'Other/change_expense_status').subscribe((resp)=>
      {
        console.log(resp);
        
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();    
    }
    
    payment_reject(reason)
    
    {
      console.log(reason);
      
      this.service.get_data({'id':this.data.id,'reason':reason},'Order/change_payment_status').subscribe((resp)=>
      {
        console.log(resp);
        
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();    
    }
    
    
    SubmitLeaveRejectReason(reason)
    {
      console.log(reason);
      
      this.service.get_data({'id':this.data.id,'reason_reject':reason,'from':'Reject'},'Other/change_user_leave_status').subscribe((resp)=>
      {
        console.log('Response: ');
        
        console.log(resp);
        
        if(resp)
        {
          this.toastr.successToastr("Success","Updated");
        }
      });
      this.dialogRef.closeAll();    
    }
    
    
    
    ngOnInit()  {
      
      console.log( this.distributor_list );
      
    }
    onItemSelect(item: any) {
      console.log(item.id);
      console.log(this.oenselecteddist);
    }
    onSelectAll(items: any) {
    }
    
  }
  