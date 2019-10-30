import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { log } from 'util';
import {Location} from '@angular/common';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  animations: [slideToTop()]
})
export class OrderDetailComponent implements OnInit {
  id:any='';
  dr:any={};
  order:any=[];
  order_item:any=[];
  cp_data:any=[];
  loader:any;
  state:any="";
  notification:any=[];
  pay_list: any=[];
  step = 0;
  amount=0;
  
  
  constructor(public service:MyserviceService, public route:ActivatedRoute, public dialog:MatDialog, public toaster:ToastrManager, public alert:DialogBoxService, public router:Router,private _location: Location)
  { 
  }
  
  ngOnInit() {
    this.route.params.subscribe(resp=>
      {
        this.id = resp['id'];
        if(this.id)this.get_order_detail();
      });
    }

    backClicked() {
      console.log( 'goBack()...' );
      this._location.back();
    }
    
    setStep(index: number) {
      this.step = index;
    }
    
    nextStep() {
      this.step++;
    }
    
    prevStep() {
      this.step--;
    }
    
    get_order_detail()
    {
      this.loader=true;
      
      this.service.get_data({'id': this.id},'order/order_detailed').subscribe((r)=>
      {
        console.log(r);
        this.dr = r['dr'];
        this.cp_data = r['contact'];
        this.order = r['order'];
        this.order_item = r['order_item'];
        this.notification = r['notification'];
        this.pay_list=r['payment'];
        this.loader=false;

      });
    }
    
    update_status()
    {
      
      this.alert.confirmation("Reject Order").then((result) => {
        if(result){  
          this.service.get_data({'id':this.order.id , 'dr_id':this.dr.id, 'status':'Reject'},'order/update_status').subscribe((resp)=>
          {
            this.get_order_detail();
            this.toaster.successToastr("Updated","Success");
            
          });
        }
      });
    }
    approve_status()
    {
      this.alert.confirmation("Approve Order").then((result) => {
        if(result){  
          this.service.get_data({'id':this.order.id , 'dr_id':this.dr.id, 'status':'Approved'},'order/update_status').subscribe((resp)=>
          {
            this.get_order_detail();
            this.toaster.successToastr("Updated","Success");
            
          });
        }
      });
    }
    
    reject(id,type,order_id)
    {
      console.log(id);
      const dialogRef=this.dialog.open(DialogBodyComponent,
        {
          width: '600px',
          data:
          {
            dr_id:id,
            order_id:order_id,
            type
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.get_order_detail();
          });
        }
      }
      