import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { log } from 'util';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Location } from '@angular/common';
import { AddAssignProductComponent } from '../add-assign-product/add-assign-product.component';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  animations: [slideToTop()]
})
export class LeadDetailComponent implements OnInit {
  lead_id:any=[];
  lead_data:any={};
  cp_data:any=[];
  loader:any="1";
  pincode_data:any=[];
  data:any={};
  notification:any=[];
  sales_team:any=[];
  showdetail=1;
  editUserAssign:any=false;
  
  // for follow up
  page_limit:any=20;
  start:any=0;
  search:any={};
  total_page:any = ''
  pagenumber:any = '';
  count:any='';
  followup_list:any=[];
  dr_id_follow_up: any;
  constructor(public service:MyserviceService, public route: ActivatedRoute,public dialog:MatDialog, public toaster:ToastrManager, public alert:DialogBoxService, public router:Router,public _location:Location) 
  { 
    this.get_lead_id();
    this. get_lead_detail();
  }
  
  //for pagination
  pagination(event:any)
  {
    const pattern = /^[0-9 ]+$/;
    let inputChar = String.fromCharCode(event.charCode);if (event.key>this.total_page || !pattern.test(inputChar))
    {event.preventDefault();}
  }
  
  locationBack()
  {
    this._location.back();
  }
  
  refresh()
  {
    this.search='';
    console.log(this.search);
    this.getFollowUpList();
  }
  
  showDetailPage(){
    console.log("i am in detail page");
    this.showdetail=1;
    
  }
  
  // sales team edit start
  edit_sales_team(id,pincode,type,lead_dr_type)
  {
    console.log(id);
    console.log(lead_dr_type);
    if(!this.lead_data.pincode)
    {
      this.alert.error("Pincode Required")
    }
    else
    {
      const dialogRef=this.dialog.open(DialogBodyComponent, 
        {
          width: '400px',
          data:
          {
            dr_id:id,
            type,
            pincode:pincode,
            drtype:lead_dr_type,
            dr_type:1,
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_lead_detail();
          }); 
        }
        
        
      }
      // end
      
      showFollowUp(){
        console.log("i am in follow up page");
        this.showdetail=0;
        this.getFollowUpList();
      }
      
      getFollowUpList(pagelimit:any=20, start:any=0, action:any=''){
        console.log(" i am in follow up list function");
        this.page_limit = parseInt(pagelimit);
        this.start = parseInt(start);
        if(action == "refresh")
        {
          this.search = {};
          this.start = 0;
        }
        console.log("I am Dr_id: ");
        console.log(this.lead_data.id);
        this.dr_id_follow_up= this.lead_data.id;
        //  send dr_id 
        this.service.get_data({'dr_id':this.dr_id_follow_up ,'search':this.search,'start':this.start,'pagelimit':this.page_limit},'lead/get_lead_followup').subscribe((resp)=>
        {
          console.log(resp);
          this.loader="";
          this.followup_list=resp['followup'];
          this.count = resp['count'];
          this.total_page = Math.ceil(this.count/this.page_limit);
          this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
        },
        error=>
        {
          console.log("error");
          
        });
        
        
      }
      
      
      delete(id,index)
      {
        console.log(id);
        this.alert.delete("Follow Up").then((result) => {
          if(result)
          {
            let value={'id':id}
            this.service.get_data(value,'lead/delete_lead_followup').subscribe((resp)=>
            {
              console.log(resp);
              if(resp=='success')
              {
                this.toaster.successToastr("Deleted","Success");
                this.getFollowUpList();
              }
            })
          }
          
        })
        
      }
      
      sales_team_data:any=[];
      
      getSalesUserList(pincode,drtype)
      {
        this.loader=true
        this.service.get_data({'pincode':pincode,'dr_type': drtype},'distribution_net/get_sales_team_data').subscribe((resp)=>
        {
          console.log(resp);
          this.loader=false;
          this.sales_team_data=resp;
          
          for (let i = 0; i < this.sales_team_data.length; i++)
          {
            for(let j=0;j<this.sales_team.length;j++)
            {
              console.log("in inner loop",this.sales_team_data[i].id,this.sales_team[j].user_id);
              
              if(this.sales_team_data[i].id==this.sales_team[j].user_id)
              {
                console.log("in if");
                
                this.sales_team_data[i].exist=true;
              }
            }
            
          }
        })
      }
      
      selectedUser(index,event)
      {
        if(event.checked)
        {
          console.log("checked");
          
          this.sales_team_data[index].exist=true;
        }
        else
        {
          console.log("unchecked");
          
          this.sales_team_data[index].exist=false;
        }
      }
      saveSelectedUser()
      {
        
        let data={
          
          'dr_id':this.lead_id ,
          'dr_type': "1",
          'drtype': "1",
          'pincode': this.lead_data.pincode,
          'sales_team_id': [],
          'type': "edit_sales_team"}
  
          for(let i=0;i<this.sales_team_data.length;i++)
          {
            if(this.sales_team_data[i].exist==true)
            {
              data.sales_team_id.push(this.sales_team_data[i].id);
            }
          }
          console.log(data);
          
          
          this.service.get_data(data,'Distribution_net/update_sales_team').subscribe((resp)=>
          {
            this.loader="";
            console.log(resp);
            if(resp)
            {
              this.toaster.successToastr("Success","Updated");
              this.get_lead_detail();
            }
          });
        }
        
      
      
      get_lead_id()
      {
        this.route.params.subscribe(resp=>
          {
            this.lead_id = resp.id;
            console.log(this.lead_id);
          });
        }
        
        productAssign:any=[]
        productTypeAssing:any=[];
        get_lead_detail()
        {
          
          this.loader=true
          this.service.get_data(this.lead_id,'lead/get_lead_detail').subscribe((resp)=>
          {
            console.log(resp);
            this.loader=false;
            this.lead_data=resp['lead_data'];
            this.cp_data=resp['contact'];
            // this.cp_data.dr.id=resp['contact'][0]['dr_id'];
            
            this.notification = resp['notification'];
            this.sales_team = resp['sales_team'];
            this.productAssign=resp['product_discount_assign_data'];
            this.productTypeAssing=resp['product_type_assign_data'];
            this.data.state = this.lead_data.state;
            this.data.district = this.lead_data.district;
            this.data.city = this.lead_data.city;
            this.data.pincode = this.lead_data.pincode;
            this.data.address = this.lead_data.address;
            console.log(this.lead_data.state);
            
          })
        }
        
        addAssignProduct(type)
        {
          const dialogRef=this.dialog.open(AddAssignProductComponent,
            {
              width: '702px',
              data:
              {
                drId:this.lead_id,
                type
              }
            });
            dialogRef.afterClosed().subscribe(result => 
              {
                console.log(result);
                this.get_lead_detail();
              });
            }
            
            editAssignProduct(type,value)
            {
              const dialogRef=this.dialog.open(AddAssignProductComponent,
                {
                  width: '702px',
                  data:
                  {
                    drId:this.lead_id,
                    type,
                    value
                  }
                });
                dialogRef.afterClosed().subscribe(result => 
                  {
                    console.log(result);
                    this.get_lead_detail();
                  });
                }
                
                deleteAssignProduct(code,i)
                {
                  this.service.get_data({product_code:code,dr_id:this.lead_id},"Distribution_net/delete_dr_assigned_product").subscribe((result)=>{
                    console.log(result);
                    if(result['msg']=='success')
                    {
                      this.productAssign.splice(i,1)
                    }
                    
                  })
                }
                
                delete_sales_team(id,i)
                {
                  console.log(i);
                  console.log(this.cp_data[0]['dr_id']);
                  
                  this.alert.delete("Assigned Sales Team Person").then((result) => {
                    if(result)
                    {
                      this.service.get_data({'id':id,'dr_id':this.cp_data[0]['dr_id']},'lead/delete_sales_team').subscribe((resp)=>
                      {
                        console.log(resp);
                        if(resp=='success')
                        {
                          this.toaster.successToastr("Deleted","Success");
                          this.sales_team.splice(i,1);
                        }
                      });
                    }
                  });
                }
                
                
                cp_edit(cp_data,type)
                {
                  console.log(cp_data);
                  const dialogRef=this.dialog.open(DialogBodyComponent,
                    {
                      width:'800px',
                      data:
                      {
                        name:cp_data.name,
                        mobile_01:cp_data.mobile_01,
                        mobile_02:cp_data.mobile_02,
                        id:cp_data.id,
                        dr_id:cp_data.dr_id,
                        type
                      }
                    });
                    dialogRef.afterClosed().subscribe(result => 
                      {
                        console.log(result);
                        this.get_lead_detail();
                      });
                    }
                    
                    delete_cp(cp_id)
                    {
                      console.log(cp_id);
                      this.alert.delete("Contact").then((result) => {
                        if(result)
                        {
                          this.service.get_data(cp_id,'lead/delete_cp_data').subscribe((resp)=>
                          {
                            console.log(resp);
                            
                            if(resp)
                            {
                              this.toaster.successToastr("Deleted","Success");
                              this.get_lead_detail();
                            }
                          });
                        }
                      });    
                    }
                    
                    cp_add(lead_id,type)
                    {
                      const dialogRef=this.dialog.open(DialogBodyComponent,
                        {
                          width: '800px',
                          data:
                          {
                            id:lead_id,
                            type
                          }
                        });
                        dialogRef.afterClosed().subscribe(result => 
                          {
                            console.log(result);
                            this.get_lead_detail();
                          });
                        }
                        
                        edit_address(lead_id,type)
                        {
                          const dialogRef=this.dialog.open(DialogBodyComponent,
                            {
                              width: '700px',
                              data:
                              {
                                state: this.data.state,
                                district: this.data.district,
                                city: this.data.city,
                                pincode: this.data.pincode,
                                address: this.data.address,
                                id:lead_id,
                                type
                              }
                            });
                            dialogRef.afterClosed().subscribe(result => 
                              {
                                console.log(result);
                                this.get_lead_detail();
                              });
                            }
                            
                            edit_email(email,lead_id,type)
                            {
                              console.log(email);
                              const dialogRef=this.dialog.open(DialogBodyComponent,
                                {
                                  width: '400px',
                                  data:
                                  {
                                    email: email,
                                    id:lead_id,
                                    type
                                  }
                                });
                                dialogRef.afterClosed().subscribe(result => 
                                  {
                                    
                                    console.log(result);
                                    this.get_lead_detail();
                                  });
                                }
                                
                                edit_mobile(mobile,lead_id,type)
                                {
                                  const dialogRef=this.dialog.open(DialogBodyComponent,
                                    {width: '400px',
                                    data:
                                    {
                                      mobile : mobile,
                                      id:lead_id,
                                      type
                                    }
                                  });
                                  dialogRef.afterClosed().subscribe(result => 
                                    {
                                      console.log(result);
                                      this.get_lead_detail();
                                    });
                                  }
                                  
                                  edit_gst(gst,lead_id,type)
                                  {
                                    const dialogRef=this.dialog.open(DialogBodyComponent,
                                      {width: '400px',
                                      data:
                                      {
                                        gst : gst,
                                        id:lead_id,
                                        type
                                      }
                                    });
                                    dialogRef.afterClosed().subscribe(result => 
                                      {
                                        console.log(result);
                                        this.get_lead_detail();
                                      });
                                    }
                                    edit_lead_name(lead_id,name,type)
                                    {
                                      const dialogRef=this.dialog.open(DialogBodyComponent,
                                        {
                                          width: '400px',
                                          data:
                                          {
                                            id:lead_id,
                                            type,
                                            name:name
                                          }
                                        });
                                        dialogRef.afterClosed().subscribe(result => 
                                          {
                                            console.log(result);
                                            this.get_lead_detail();
                                          });
                                        }
                                        
                                        convert_to_customer(id,type)
                                        {
                                          console.log(id);
                                          
                                          this.alert.confirmation("Convert to Customer").then((result) => 
                                          {
                                            if(result)
                                            {
                                              this.service.get_data(id,'lead/lead_convert').subscribe((resp)=>
                                              {
                                                console.log(resp);
                                                if(resp)
                                                {
                                                  this.toaster.successToastr("Converted","Success");
                                                  
                                                  this.router.navigate(['/distribution-module/distribution-list/'+type]);
                                                }
                                              });
                                            }
                                          });
                                        }                  
                                        ngOnInit() 
                                        {
                                          
                                        }
                                        
                                      }
                                      