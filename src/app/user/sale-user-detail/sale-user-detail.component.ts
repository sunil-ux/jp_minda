import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sale-user-detail',
  templateUrl: './sale-user-detail.component.html',
  animations: [slideToTop()]
})
export class SaleUserDetailComponent implements OnInit {
  userdata:any=[];
  encrpt_id:any;
  params;
  district:any=[];
  districtnew:any=[];
  state:any=[];
  // state_name;
  data:any={};
  form:any={};
  loader:any = '';
  product_id:any='';
  user_data:any={};
  state_data:any=[];
  district_data:any=[];
  city_data:any=[];
  citys:any=[];
  districts:any=[];
  sales_team_data: any=[];
 territoryEdit:any=false;
  constructor(public service:MyserviceService,public router:Router,public route:ActivatedRoute, public dialog:MatDialog,public alert:DialogBoxService, public toaster:ToastrManager,public _location:Location) 
  {
    this.route.params.subscribe(data=>
      {
        this.product_id = data.id;
        console.log(this.product_id);
        
      });
      
      // this.get_state();
      this.get_product_detail();
      // this.districtdata();
      // this.citytdata();
    }

    // districtdata()
    // {
    //   this.service.get_data(0,'user/get_districtdata').subscribe((resp)=>
    //   {
    //     console.log(resp);
    //     this.district_data=resp;
        
    //   })
    // }

    // citytdata()
    // {
    //   this.service.get_data(0,'user/get_citydata').subscribe((resp)=>
    //   {
    //     console.log(resp);
    //     this.citys=resp;
        
    //   })
    // }
    locationBack()
    {
      this._location.back();
    }

    userTerritoryData:any=[];
    distibutor_retrailer:any = [];
    get_product_detail()
    {
      this.service.get_data(this.product_id,'user/get_user_detail').subscribe((resp)=>
      {
        console.log(resp);
        this.user_data = resp['r1'];
        this.userTerritoryData=resp['assign_territory_data']
        this.distibutor_retrailer = resp['r2'];
        this.sales_team_data = resp['final_asm_rsm_data'];
        if(this.user_data)
        {
          this.data.state = this.user_data.state;
          this.data.district = this.user_data.district;
          this.data.city = this.user_data.city;
          this.data.address = this.user_data.address;
          this.data.pincode=this.user_data.pincode;
          this.data.role=this.user_data.access_labeal;
          console.log(this.data.role);
          
        }
        
      })
    }

    territorylisting:any=[];

    getTerritoryList()
    {
      this.service.get_data('','Territory_master/view_territory').subscribe((result)=>
      {
        console.log(result);
        this.loader="";
        if(result['message']=='success')
        {
          this.territorylisting = result['data']['list'];

          for(let i=0;i<this.territorylisting.length;i++)
          {
            for(let j=0;j<this.userTerritoryData.length;j++)
            {
              if(this.userTerritoryData[j].id==this.territorylisting[i].id)
              {
                this.territorylisting[i].exist=true;
              }
            }
          }
        }
        console.log(this.territorylisting);
      },
      error=>
      {
        console.log("error");
      });
    }
    selectedterritory(index,event)
    {
      if(event.checked)
      {
        this.territorylisting[index].exist=true;
      }
      else
      {
        this.territorylisting[index].exist=false;
      }

      console.log(this.territorylisting);
      
    }

    saveSelectedTerritory()
    {
      this.loader=true;
      let data:any={};
      data.territory=[];
      data.user_id=this.product_id;
      for(let i=0;i<this.territorylisting.length;i++)
      {
        if(this.territorylisting[i].exist==true)
        {
          data.territory.push(this.territorylisting[i].id);
        }
      }
      console.log(data);
      
      this.service.get_data(data,"user/update_user_territory").subscribe((result)=>{
        console.log(result);

        this.loader=false;
        this.get_product_detail();
        
        
      })
    }
    ngOnInit() 
    {
      
    }
    
    // get_state()
    // {
    //   this.service.get_data(0,'user/get_state').subscribe((resp)=>
    //   {
    //     console.log(resp);
    //     this.state_data = resp;
    //   })
    // }
    
    // get_district(state_name)
    // {
    //   console.log(state_name);
      
    //   this.service.get_data(state_name,'user/get_district').subscribe((resp)=>
    //   {
    //     console.log(resp);
    //     this.district_data = resp;
    //   })
    // }
    
    // get_city(district_name)
    // {
    //   console.log(district_name);
      
    //   this.service.get_data(district_name,'user/get_city').subscribe((resp)=>
    //   {
    //     console.log(resp);
    //     this.citys = resp;
        
    //   })
      
    // }

    editDetails(user_id,type)
    {
      console.log(user_id);
      console.log(type);

      const dialogRef=this.dialog.open(DialogBodyComponent,
        {
          width:'800px',
          data:
          {
            state: this.user_data.state,
            district: this.user_data.district,
            city: this.user_data.city,
            pincode: this.user_data.pincode,
            address: this.user_data.address,
            id:user_id,
            type
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_product_detail();
          });
      
    }

    
    editSalesInfo(user_id,access_labeal,parent,type)
    {
      console.log(access_labeal);
      console.log(user_id);
      console.log(type);
      console.log(parent);

      const dialogRef=this.dialog.open(DialogBodyComponent,
        {width: '600px',
          data:
          {
            user_id:user_id,
            parent:parent,
            // role_id:this.data.role,
            type,
            access_labeal: access_labeal,    

            // sales_data: this.sales_team_data
              }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_product_detail();
          });
    }    

    // editTerritory(user_id,territory,type)
    // {
    //   console.log(user_id);
    //   console.log(type);
    //   console.log(territory);
      
    //   const dialogRef=this.dialog.open(DialogBodyComponent,
    //     {width: '400px',
    //       data:
         
    //       {
    //         id:user_id,
    //         type,
    //         territory:territory
    //           }
    //     });
    //     dialogRef.afterClosed().subscribe(result => 
    //       {
    //         console.log(result);
    //         this.get_product_detail();
    //       });
    // }    

    editManager(user_id,parent_id,type,parent_access_labeal)
    {
      const dialogRef=this.dialog.open(DialogBodyComponent,
        {width: '600px',
          data:
         
          {
            user_id:user_id,
            type,
            parent_id:parent_id,
            parent_access_labeal: parent_access_labeal
              }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_product_detail();
          });
    }

    editEmail(user_id,email,type)
    {
      console.log(user_id);
      console.log(type);
      console.log(email);
      
      const dialogRef=this.dialog.open(DialogBodyComponent,
        {width: '400px',
          data:
         
          {
            id:user_id,
            type,
            email:email
              }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_product_detail();
          });
    }   
    edit_user_name(user_id,name,type)
    {
      const dialogRef=this.dialog.open(DialogBodyComponent,
        {width: '400px',
          data:
         
          {
            user_id:user_id,
            type,
            name:name,
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_product_detail();
          });
    } 


    editMobile(user_id,mobile,type)
    {
      console.log(user_id);
      console.log(type);
      console.log(mobile);
      
      const dialogRef=this.dialog.open(DialogBodyComponent,
        {width: '400px',
          data:
         
          {
            id:user_id,
            type,
            mobile:mobile
              }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_product_detail();
          });
    }  
    
    
    editSalesUserRole(user_id,role,type)
    {
      console.log(user_id);
      console.log(type);
      console.log(role);
      
      const dialogRef=this.dialog.open(DialogBodyComponent,
        {width: '400px',
          data:
         
          {
            user_id:user_id,
            type:type,
            role_name:role
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_product_detail();
          });
    }  


    edit_assign_distribution(user_id,type){
      console.log("i am in function");
      const dialogRef=this.dialog.open(DialogBodyComponent,
        {width: '600px',
          data:
          {
            id:user_id,
            type,
            }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_product_detail();
          });
      
    }

    delete(index,id,type,user_id)
    {
      console.log(index);
      console.log(id);
      console.log(type);
      console.log(user_id);

      this.alert.confirmation("delete").then((result) => 
      {
        console.log(result);
        
        if(result==true)
        {
            this.service.get_data({'user_id': user_id , 'type': type, 'id':id},'user/delete_assigned_dis_dealer')
           .subscribe(res => {
             console.log(res);
             if(res=='success')
             {
              this.distibutor_retrailer.splice(index,1);
              this.toaster.successToastr("Updated","Success");
             }
             else{
               this.toaster.errorToastr("Something went wrong!");
             }
           },err=>{
             console.log(err);
            });
        }
      });

    }


 }
  