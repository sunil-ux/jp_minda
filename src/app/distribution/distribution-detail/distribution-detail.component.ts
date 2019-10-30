import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ActivatedRoute } from '@angular/router';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ConstantService } from 'src/app/constant.service';
import {Location} from '@angular/common';
import { AddAssignProductComponent } from 'src/app/lead/add-assign-product/add-assign-product.component';



@Component({
  selector: 'app-distribution-detail',
  templateUrl: './distribution-detail.component.html',
  animations: [slideToTop()]
  
})
export class DistributionDetailComponent implements OnInit {
  id:any='';
  dr:any={};
  cp_data:any=[];
  data:any={};
  loader:any=1;
  sales_team:any=[];
  discount_data:any=[];
  discount_type:any={};
  notification:any=[];
  category_list: any=[];
  category_discount: any;
  dr_type: any='';
  showdetail:any=1;
  popGiftList:any=[];
  constructor(public service:MyserviceService, public route:ActivatedRoute, public dialog:MatDialog, public toaster:ToastrManager, public alert:DialogBoxService,public constant:ConstantService,private _location: Location) 
  { 
    
    // this.get_sales_team_name();
    this.get_discount_data();
    // this.GetCategoryList();
  }
  
  ngOnInit() {
    
    this.route.params.subscribe(resp=>
      {
        this.id = resp['id'];
        this.dr_type=resp['type'];
        if(this.id)this.get_distribution_detail();
      });
      
    }
    
    backClicked() {
      console.log( 'goBack()...' );
      this._location.back();
    }
    
    delete_sales_team(id,i)
    {
      console.log(i);
      console.log(id);
      
      this.alert.delete("Assigned Sales Team").then((result) => {
        if(result)
        {
          this.service.get_data({'id':id,'dr_id':this.cp_data[0]['dr_id']},'distribution_net/delete_sales_team').subscribe((resp)=>
          {
            console.log(resp);
            if(resp)
            {
              this.toaster.successToastr("Deleted","Success");
              this.sales_team.splice(i,1);
            }
          });
        }
      });
    }
    update_dr_discount()
    {
      console.log(this.data.distributor);
      
      console.log(this.data);
      
      this.service.get_data(this.data,'distribution_net/dr_discount').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          // this.toastr.successToastr("Success","Updated");
        }
        
      });
      // this.dialogRef.closeAll();
    }
    Discount(event:any)
    {
      const pattern = /^[0-9 .]+$/;
      let inputChar = String.fromCharCode(event.charCode);if (event.keyCode != 8 && !pattern.test(inputChar))
      {event.preventDefault();}
    }
    refresh()
    {
      this.search = {};
      this.start = 0;
    }
    
    showDetailPage(){
      console.log("i am in detail page");
      this.showdetail=1;
      
    }
    
    showFollowUp(){
      console.log("i am in follow up page");
      this.showdetail=2;
      this.getFollowUpList();
    }
    
    showorders(){
      console.log("i am in Order page");
      this.showdetail=3;
      this.getOrderList();
    }
    
    showPayments(){
      console.log("i am in payment page");
      this.showdetail=4;
      this.getPaymentList();
    }
    
    showCheckin(){
      console.log("i am in checkin page");
      this.showdetail=5;
      this.getCheckinList();
    }
    
    
    showpopgift()
    {
      console.log("i am in pop & gift page");
      this.showdetail=6; 
      this.getpopgiftlist()
    }
    
    getpopgiftlist()
    {
      this.service.get_data({'dr_id':this.dr.id },'distribution_net/get_distribution_pop_gift').subscribe((resp)=>
      {
        console.log(resp);
        this.popGiftList=resp['pop_gift'];
      },
      error=>
      {
        console.log("error");
        
      });
    }
    // for follow up
    page_limit:any=20;
    start:any=0;
    search:any={};
    total_page:any = ''
    pagenumber:any = '';
    count:any='';
    followup_list:any=[];
    
    getFollowUpList(pagelimit:any=20, start:any=0, action:any='')
    {
      console.log(" i am in follow up list function");
      this.page_limit = parseInt(pagelimit);
      this.start = parseInt(start);
      if(action == "refresh")
      {
        this.search = {};
        this.start = 0;
      }
      console.log("I am Dr_id: ");
      console.log(this.dr.id);
      //  send dr_id 
      this.service.get_data({'dr_id':this.dr.id ,'search':this.search,'start':this.start,'pagelimit':this.page_limit},'distribution_net/get_distribution_followup').subscribe((resp)=>
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
    
    // for Order up
    orderpage_limit:any=100;
    orderstart:any=0;
    ordersearch:any={};
    ordertotal_page:any = ''
    orderpagenumber:any = '';
    ordercount:any='';
    order_list:any=[];
    getOrderList(orderpage_limit:any=100, orderstart:any=0, action:any='')
    {
      console.log(" i am in follow up list function");
      console.log(this.ordersearch.master)
      this.orderpage_limit = parseInt(orderpage_limit);
      this.orderstart = parseInt(orderstart);
      if(action == "refresh")
      {
        this.ordersearch = {};
        this.orderstart = 0;
      }
      console.log("I am Dr_id: ");
      console.log(this.dr.id);
      //  send dr_id 
      this.service.get_data({'dr_id':this.dr.id ,'search':this.ordersearch.master,'start':this.start,'pagelimit':this.orderpage_limit},'distribution_net/get_distribution_orders').subscribe((resp)=>
      {
        console.log(resp);
        this.loader="";
        this.order_list=resp['orders'];
        this.ordercount = resp['count'];
        this.ordertotal_page = Math.ceil(this.count/this.orderpage_limit);
        this.orderpagenumber = Math.ceil(this.start/this.orderpage_limit)+1;
      },
      error=>
      {
        console.log("error");
        
      });
      
      
    }
    
    
    // for payments
    paymentpage_limit:any=100;
    paymentstart:any=0;
    paymentsearch:any={};
    paymenttotal_page:any = ''
    paymentpagenumber:any = '';
    paymentcount:any='';
    payment_list:any=[];
    getPaymentList(paymentpage_limit:any=100, paymentstart:any=0, action:any='')
    {
      console.log(" i am in follow up list function");
      console.log(this.ordersearch.master)
      this.paymentpage_limit = parseInt(paymentpage_limit);
      this.paymentstart = parseInt(paymentstart);
      if(action == "refresh")
      {
        this.paymentsearch = {};
        this.paymentstart = 0;
      }
      console.log("I am Dr_id: ");
      console.log(this.dr.id);
      //  send dr_id 
      this.service.get_data({'dr_id':this.dr.id ,'search':this.paymentsearch.master,'start':this.paymentstart,'pagelimit':this.paymentpage_limit},'distribution_net/get_distribution_payments').subscribe((resp)=>
      {
        console.log(resp);
        this.loader="";
        this.payment_list=resp['payments'];
        this.paymentcount = resp['count'];
        this.paymenttotal_page = Math.ceil(this.count/this.paymentpage_limit);
        this.paymentpagenumber = Math.ceil(this.start/this.paymentpage_limit)+1;
      },
      error=>
      {
        console.log("error");
        
      });
      
      
    }
    
    editAssign:any=false;
    editUserAssign:any=false
    allProductType:any=[];
    sales_team_data:any=[];
    getProductType()
    {
      this.loader=true;
      this.service.get_data("","product/getAllProductTypes").subscribe((result)=>{
        console.log(result);
        this.loader=false;
        this.allProductType = result['data'];
        
        for (let i = 0; i < this.allProductType.length; i++)
        {
          for(let j=0;j<this.productTypeAssign.length;j++)
          {
            if(this.allProductType[i].name==this.productTypeAssign[j].type)
            {
              this.allProductType[i].exist=true;
            }
          }
          
        }
        console.log(this.allProductType);
        
      })
    }
    
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
    
    selectProductType(index,event)
    {
      if(event.checked)
      {
        console.log("checked");
        
        this.allProductType[index].exist=true;
      }
      else
      {
        console.log("unchecked");
        
        this.allProductType[index].exist=false;
      }
    }
    
    saveSelectedUser()
    {
      
      let data={
        
        'dr_id':this.id ,
        'dr_type': "1",
        'drtype': "1",
        'pincode': this.dr.pincode,
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
            this.get_distribution_detail();
          }
        });
      }
      
      saveSelectedProdectType()
      {
        console.log(this.allProductType);
        
        let value =[];
        
        for(let i=0;i<this.allProductType.length;i++)
        {
          if(this.allProductType[i].exist==true)
          {
            value.push(this.allProductType[i].name);
          }
        }
        console.log(value);
        
        this.loader=true;
        this.service.get_data({product_type_data:value,dr_id:this.id},"Distribution_net/update_dr_product_type_asssign").subscribe((result)=>{
          console.log(result);
          if(result['msg']=='success')
          {
            this.editAssign=false;
            this.get_distribution_detail();
          }
        })
      }
      addAssignProduct(type)
      {
        const dialogRef=this.dialog.open(AddAssignProductComponent,
          {
            width: '702px',
            data:
            {
              drId:this.id,
              type,
              productType:this.productTypeAssign
            }
          });
          dialogRef.afterClosed().subscribe(result => 
            {
              console.log(result);
              this.get_distribution_detail();
            });
          }
          
          editAssignProduct(type,value)
          {
            const dialogRef=this.dialog.open(AddAssignProductComponent,
              {
                width: '702px',
                data:
                {
                  drId:this.id,
                  type,
                  value,
                  productType:this.productTypeAssign
                  
                }
              });
              dialogRef.afterClosed().subscribe(result => 
                {
                  console.log(result);
                  this.get_distribution_detail();
                });
              }
              
              deleteAssignProduct(code,i)
              {
                this.service.get_data({product_code:code,dr_id:this.id},"Distribution_net/delete_dr_assigned_product").subscribe((result)=>{
                  console.log(result);
                  if(result['msg']=='success')
                  {
                    this.productAssign.splice(i,1)
                  }
                  
                })
              }
              
              
              // for checkins 
              checkinpage_limit:any=100;
              checkinstart:any=0;
              checkinsearch:any={};
              checkintotal_page:any = ''
              checkinpagenumber:any = '';
              checkincount:any='';
              checkin_list:any=[];
              getCheckinList(checkinpage_limit:any=100, checkinstart:any=0, action:any='')
              {
                console.log(" i am in checkin list function");
                console.log(this.checkinsearch.master)
                this.checkinpage_limit = parseInt(checkinpage_limit);
                this.checkinstart = parseInt(checkinstart);
                if(action == "refresh")
                {
                  this.checkinsearch = {};
                  this.checkinstart = 0;
                }
                console.log("I am Dr_id: ");
                console.log(this.dr.id);
                //  send dr_id 
                this.service.get_data({'dr_id':this.dr.id ,'search':this.checkinsearch.master,'start':this.checkinstart,'pagelimit':this.checkinpage_limit},'distribution_net/get_distribution_checkins').subscribe((resp)=>
                {
                  console.log(resp);
                  this.loader="";
                  this.checkin_list=resp['checkin'];
                  this.checkincount = resp['count'];
                  this.checkintotal_page = Math.ceil(this.count/this.checkinpage_limit);
                  this.checkinpagenumber = Math.ceil(this.start/this.checkinpage_limit)+1;
                },
                error=>
                {
                  console.log("error");
                  
                });
                
                
              }
              
              productAssign:any=[];
              productTypeAssign:any=[];
              get_distribution_detail()
              {
                this.loader=true;
                
                this.service.get_data(this.id,'distribution_net/get_distribution_detail').subscribe((r)=>
                {
                  this.loader=false;
                  console.log(r);
                  
                  this.dr = r['dr'];
                  this.data.state = this.dr.state;
                  this.data.district = this.dr.district;
                  this.data.city = this.dr.city;
                  this.data.pincode = this.dr.pincode;
                  this.data.address = this.dr.address;
                  this.cp_data = r['contact'];
                  this.notification = r['notification'];
                  this.sales_team = r['sales_team'];
                  this.productAssign=r['product_discount_assign_data'];
                  this.productTypeAssign=r['product_type_assign_data'];
                  
                  console.log(this.sales_team);
                  let new_data={dr_id:this.dr.id,type:this.dr.type};
                  
                  this.service.get_data(new_data,'distribution_net/get_discount_listing').subscribe((resp)=>
                  {
                    console.log(resp);
                    this.discount_data=resp;
                    // this.discount_type=resp[0];
                    this.discount_type=resp[0]['discount_type'];
                    
                    console.log(this.discount_type);
                    this.category_discount=resp['distributor'];
                  });  
                });
              }
              
              
              // GetCategoryList()
              // {
              //   this.service.get_data({},'discount/master_discount_list').subscribe((resp)=>
              //   {
              //     console.log(resp);
              //     this.category_list=resp['list'];
              //   });
              // }
              
              deleteFollowup(followup_id,i,dr_id)
              {
                console.log(followup_id);
                this.alert.delete("Followup").then((result) => {
                  if(result)
                  {
                    this.service.get_data({followup_id:followup_id,dr_id:dr_id},'Distribution_net/delete_followup').subscribe((resp)=>
                    {
                      console.log(resp);
                      
                      if(resp && resp['message']=='success')
                      {
                        this.toaster.successToastr("Deleted","Success");
                        this.followup_list.splice(i,1);
                      }
                      else
                      {
                        this.toaster.successToastr("Deleted","Failed");
                      }
                    });
                  }
                }); 
              }
              
              deleteorder(order_id,i,dr_id)
              {
                console.log(order_id);
                this.alert.delete("Order").then((result) => {
                  if(result)
                  {
                    this.service.get_data({order_id:order_id,dr_id:dr_id},'order/delete_order').subscribe((resp)=>
                    {
                      console.log(resp);
                      
                      if(resp)
                      {
                        this.toaster.successToastr("Deleted","Success");
                        this.order_list.splice(i,1);
                      }
                    });
                  }
                }); 
              }
              deletegiftorder(id,i,dr_id)
              {
                console.log(id);
                this.alert.delete("Pop & Gift").then((result) => {
                  if(result)
                  {
                    this.service.get_data({'id':id,'dr_id':dr_id},'distribution_net/delete_dr_pop_data').subscribe((resp)=>
                    {
                      console.log(resp);
                      
                      if(resp)
                      {
                        this.toaster.successToastr("Deleted","Success");
                        this.popGiftList.splice(i,1);
                      }
                    });
                  }
                }); 
              }
              
              
              edit_dis_email(id,email,type)
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
                      this.get_distribution_detail();
                    });
                  }
                  edit_distributor_name(id,name,type)
                  {
                    const dialogRef=this.dialog.open(DialogBodyComponent,
                      {
                        width: '400px',
                        data:
                        {
                          id:id,
                          name:name,
                          type
                        }
                      });
                      dialogRef.afterClosed().subscribe(result => 
                        {
                          console.log(result);
                          this.get_distribution_detail();
                        });
                      }
                      edit_dis_mobile(id,mobile,type)
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
                              this.get_distribution_detail();
                            });
                          }
                          
                          edit_dis_target_duration(id,target_duration,type,target_amount)
                          {
                            const dialogRef=this.dialog.open(DialogBodyComponent,
                              {
                                width: '400px',
                                data:
                                {
                                  target_duration: target_duration,
                                  target_amount: target_amount,
                                  id:id,
                                  type
                                }
                              });
                              dialogRef.afterClosed().subscribe(result => 
                                {
                                  console.log(result);
                                  this.get_distribution_detail();
                                });
                              }
                              
                              edit_dis_target_price(id,target_price,type)
                              {
                                const dialogRef=this.dialog.open(DialogBodyComponent,
                                  {
                                    width: '400px',
                                    data:
                                    {
                                      target_price: target_price,
                                      id:id,
                                      type
                                    }
                                  });
                                  dialogRef.afterClosed().subscribe(result => 
                                    {
                                      console.log(result);
                                      this.get_distribution_detail();
                                    });
                                  }
                                  
                                  edit_dis_gst(id,gst,type)
                                  {
                                    const dialogRef=this.dialog.open(DialogBodyComponent,
                                      {
                                        width: '400px',
                                        data:
                                        {
                                          gst : gst,
                                          id:id,
                                          type
                                        }
                                      });
                                      dialogRef.afterClosed().subscribe(result => 
                                        {
                                          console.log(result);
                                          this.get_distribution_detail();
                                        });
                                      }
                                      
                                      edit_dis_address(id,type)
                                      {
                                        const dialogRef=this.dialog.open(DialogBodyComponent,
                                          {
                                            width: '768px',
                                            data:
                                            {
                                              state: this.data.state,
                                              district: this.data.district,
                                              city: this.data.city,
                                              pincode: this.data.pincode,
                                              address: this.data.address,
                                              id:id,
                                              type
                                            }
                                          });
                                          dialogRef.afterClosed().subscribe(result => 
                                            {
                                              console.log(result);
                                              this.get_distribution_detail();
                                            });
                                          }
                                          // sales team edit start
                                          edit_sales_team(id,type,pincode,drtype)
                                          {
                                            const dialogRef=this.dialog.open(DialogBodyComponent, 
                                              {
                                                width: '768px',
                                                data:
                                                {
                                                  dr_id:id,
                                                  pincode:pincode,
                                                  drtype:drtype,
                                                  type,
                                                  dr_type:this.dr_type,
                                                }
                                              });
                                              dialogRef.afterClosed().subscribe(result => 
                                                {
                                                  console.log(result);
                                                  this.get_distribution_detail();
                                                }); 
                                              }
                                              // end
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
                                                        this.get_distribution_detail();
                                                      }
                                                    });
                                                  }
                                                }); 
                                              }
                                              
                                              cp_dis_edit(cp_data,type)
                                              {
                                                console.log(cp_data);
                                                const dialogRef=this.dialog.open(DialogBodyComponent,
                                                  {
                                                    width: '768px',
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
                                                      this.get_distribution_detail();
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
                                                          this.get_distribution_detail();
                                                        });
                                                      }
                                                      
                                                      edit_discount(dr_id,data,categoryname,type,cs_type)
                                                      {
                                                        console.log(data);
                                                        const dialogRef=this.dialog.open(DialogBodyComponent,
                                                          {
                                                            width: '768px',
                                                            data:
                                                            {
                                                              dr_id,
                                                              data,
                                                              categoryname,
                                                              type,
                                                              cs_type
                                                            }
                                                          });
                                                          dialogRef.afterClosed().subscribe(result => 
                                                            {
                                                              console.log(result);
                                                              this.get_distribution_detail();
                                                            });
                                                            
                                                          }
                                                          
                                                          // get_sales_team_name()
                                                          // {
                                                          //   this.service.get_data(this.id,'distribution_net/get_sales_team_detail').subscribe((resp)=>
                                                          //   {
                                                          //     console.log(resp);
                                                          //     this.sales_team=resp;
                                                          
                                                          //   });
                                                          // }
                                                          
                                                          get_discount_data()
                                                          {
                                                            console.log(this.dr);
                                                            this.loader=''
                                                            
                                                          }
                                                          
                                                          
                                                          
                                                        }
                                                        