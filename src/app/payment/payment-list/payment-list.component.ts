import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../DialogComponent.js';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material';
import { ConstantService } from 'src/app/constant.service';


@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  animations: [slideToTop()]
  
})
export class PaymentListComponent implements OnInit {
  
  pay_list:any=[];
  page_limit:any=50;
  start:any=0;
  search:any={};
  total_page:any = ''
  pagenumber:any = '';
  count:any='';
  pay_list_count:any=[];
  loader:any="1";
  type:any='';
  tab_count_data: any={};
  
  constructor(public service:MyserviceService, public toaster:ToastrManager, public route:ActivatedRoute, public alert:DialogBoxService,public dialog: MatDialog,public constant:ConstantService) 
  { 
    this.route.params.subscribe(resp=>
      { 
        this.loader=1;
        console.log(resp);
        this.type = resp['type'];
        console.log(this.type);
      this.status='Pending';
      if(this.type)
        this.getPaymentList(50,0,'');
      });
    }
    
    ngOnInit() {
    }
    
    verify_pay_status(payment_id,order_id,index,type)
    {
      console.log("payment_id: "+payment_id); 
      console.log("Order_id : "+order_id);
      console.log("index : "+index);
      
      
      const dialogRef=this.dialog.open(DialogBodyComponent,
        {
          width: '600px',
          data:
          {
            payment_id: payment_id,
            order_id:order_id,
            type
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            this.loader=1;
            console.log(result);
            this.getPaymentList();
            
          });
          this.loader='';
        }
        //for pagination
        pagination(event:any)
        {
          const pattern = /^[0-9 ]+$/;
          let inputChar = String.fromCharCode(event.charCode);if (event.key>this.total_page || !pattern.test(inputChar))
          {event.preventDefault();}
        }
        
        status:any = '';
        change_status(status: any = ''){
          console.log(status);
          this.status = status;
          this.getPaymentList();
        }
        
        search_by_date(date_to:any,date_from:any)
        {
          this.search.date_to=date_to;
          console.log(this.search.date_to);
          this.search.date_from=date_from;
          console.log(this.search.date_from);
          this.getPaymentList(this.page_limit,this.start,'');
        }
        searchMode(mode:any){
          console.log(mode);
          this.search.mode=mode;
          console.log(this.search.mode);
          this.getPaymentList(this.page_limit,this.start,'');
        }
        searchName(name:any){
          console.log(name);
          this.search.name=name;
          console.log(this.search.name);
          this.getPaymentList(this.page_limit,this.start,'');
        }
        searchCreatedBy(created_by:any){
          console.log(created_by);
          this.search.created_by=created_by;
          console.log(this.search.created_by);
          this.getPaymentList(this.page_limit,this.start,'');
        }
        searchStatus(status:any)
        {
          console.log(status);
          this.search.status=status;
          console.log(this.search.status);
          this.getPaymentList(this.page_limit,this.start,''); 
        }
        getPaymentList(pagelimit:any=50, start:any=0, action:any='')
        {
          this.loader='1';
          this.page_limit = parseInt(pagelimit);
          this.start = parseInt(start);
          if(action == "refresh")
          {
            this.search = {};
            this.type='1';
            this.status='Pending';

            this.start = 0;
          }
          console.log(this.search);
          console.log("status");
          
          console.log(this.status);
          
          this.service.get_data({'type': this.type,'search':this.search,'start':this.start,'pagelimit':this.page_limit,'status': this.status},'order/payment_list').subscribe((resp)=>
          {
            console.log(resp);
            this.loader="";
            this.pay_list=resp['payment_list'];
            this.count = resp['TotalCount'];
            this.tab_count_data = resp['notifydata'];
            
            this.total_page = Math.ceil(this.count/this.page_limit);
            this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
          },
          error=>
          {
            console.log("error");
            
          });
        }
        reject(id,index,type)
        {
          console.log(id);
          const dialogRef=this.dialog.open(DialogBodyComponent,
            {
              width: '508px',
              data:
              {
                id:id,
                type
              }
            });
            dialogRef.afterClosed().subscribe(result => 
              {
                this.pay_list.splice(index,1);
                
                console.log(result);
                this.getPaymentList();
              });
              
            }
            
            delete_payment(dr_id,id)
            {
              console.log(dr_id);
              this.alert.delete("Payment").then((result) => {
                if(result)
                {
                  this.service.get_data({'dr_id':dr_id,'id':id},'Order/delete_payment').subscribe((resp)=>
                  {
                    console.log(resp);
                    if(resp)
                    {
                      this.toaster.successToastr("Deleted","Success");
                      this.getPaymentList();
                    }
                  });
                }
              });
            }
            
            getPendingList(){
              this.pay_list = this.pay_list.filter(x => x.payment_status=='Pending');
            }
            getVerifyList(){
              this.pay_list = this.pay_list.filter(x => x.payment_status=='Verified');
            }
            
          }
          