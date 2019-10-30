import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-system-user-detail',
  templateUrl: './system-user-detail.component.html',
  animations: [slideToTop()]
})
export class SystemUserDetailComponent implements OnInit {
  user_data:any={};
  loader:any="";
  product_id:any='';
  state_data:any=[];
  district_data:any=[];
  city_data:any=[];
  data:any={};
  constructor( public service : MyserviceService,public router:Router, public route:ActivatedRoute, public dialog:MatDialog,public _location:Location) 
  { 
    // this.user_data = this.service.getOption();
    // console.log(this.user_data);
    
    this.route.params.subscribe(data=>
      {
        this.product_id=data.id;
      });
      this.get_product_detail();
      // this.get_state();
    }
    
    locationBack()
    {
      this._location.back();
    }
    
    get_product_detail()
    {
      this.service.get_data(this.product_id,'user/get_user_detail').subscribe((resp)=>
      {
        console.log(resp);
        this.user_data = resp['r1'];
        
        if(this.user_data)
        {
          this.data.state = this.user_data.state;
          this.data.district = this.user_data.district;
          this.data.city = this.user_data.city;
          this.data.address = this.user_data.address;
          console.log(this.data.district);         
        }
      });
    }
    
    ngOnInit() 
    {
      
    }
    
    editDetails(id,type)
    {
      const dialogRef=this.dialog.open(DialogBodyComponent,
        {
          width:'600px',
          data:
          {
            state: this.user_data.state,
            district: this.user_data.district,
            city: this.user_data.city,
            pincode: this.user_data.pincode,
            address: this.user_data.address,
            id:id,
            type
          }
          
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_product_detail();
          });
          
        }
        
        
        edit_user_email(id,email,type)
        {
          const dialogRef=this.dialog.open(DialogBodyComponent,
            {
              width: '400px',
              data:
              {
                email: email,
                id:id,
                type
              }
            });
            dialogRef.afterClosed().subscribe(result => 
              {
                console.log(result);
                this.get_product_detail();
              });
            }
            edit_system_user(user_id,name,type)
            {
              const dialogRef=this.dialog.open(DialogBodyComponent,
                {
                  width: '400px',
                  data:
                  {
                    user_id: user_id,
                    name:name,
                    type
                  }
                });
                dialogRef.afterClosed().subscribe(result => 
                  {
                    console.log(result);
                    this.get_product_detail();
                  });
                }
                
                
                editSystemUserRole(user_id,role,type)
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
                  
                  
                  edit_user_mobile(id,mobile,type)
                  {
                    const dialogRef=this.dialog.open(DialogBodyComponent,
                      {
                        width: '400px',
                        data:
                        {
                          mobile: mobile,
                          id:id,
                          type
                        }
                      });
                      dialogRef.afterClosed().subscribe(result => 
                        {
                          console.log(result);
                          this.get_product_detail();
                        });
                      }
                      
                      edit_username(id,username,type)
                      {
                        const dialogRef=this.dialog.open(DialogBodyComponent,
                          {
                            width: '400px',
                            data:
                            {
                              username: username,
                              id:id,
                              type
                            }
                          });
                          dialogRef.afterClosed().subscribe(result => 
                            {
                              console.log(result);
                              this.get_product_detail();
                            });
                          }
                          
                          edit_user_password(id,password,type)
                          {
                            const dialogRef=this.dialog.open(DialogBodyComponent,
                              {
                                width: '400px',
                                data:
                                {
                                  password: password,
                                  id:id,
                                  type
                                }
                              });
                              dialogRef.afterClosed().subscribe(result => 
                                {
                                  console.log(result);
                                  this.get_product_detail();
                                });
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
                              //     this.city_data = resp;
                              
                              //   })
                              
                              // }
                              
                            }
                            