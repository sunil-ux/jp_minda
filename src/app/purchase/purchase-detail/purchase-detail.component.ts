import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
// import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
// import {DialogComponent} from '../../dialog/dialog.component';
// import {SessionStorage} from '../../_services/SessionService';
import {Location} from '@angular/common';


import { MyserviceService } from 'src/app/myservice.service';

import { DialogBoxService } from 'src/app/dialog-box.service';
import { ViewReceiveOrderComponent } from '../view-receive-order/view-receive-order.component';
import { ConstantService } from 'src/app/constant.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html'
})
export class PurchaseDetailComponent implements OnInit {
  purchase_id;
  // loading_list = false;
  // vendor_name;
  // created_by;
  // loading_data = true;
  order:any={};
  loader:any=false
  step = 0;
  constructor(public service: MyserviceService, private route: ActivatedRoute, private router: Router,
    public matDialog: MatDialog,  public dialog: DialogBoxService,private _location: Location,public url:ConstantService) {}
    
    ngOnInit() {      
      this.route.params.subscribe(params => {
        this.purchase_id = params['id'];
        console.log(this.purchase_id);        
        if (this.purchase_id) {
          this.getPurchaseDetails(this.purchase_id); 
        }
      });
    }
    backClicked() {
      console.log( 'goBack()...' );
      this._location.back();
    }
    
    setStep(index: number) {
      this.step = index;
    }
    getPurchaseDetails(id)
    {
      this.loader=true;
      this.service.get_data({id:id},"Purchase/getPurchaseDetail").subscribe((result)=>{
        console.log(result);
        this.loader=false;
        this.order=result;
      })
    }
    
    recivedOrer()
    {
      this.router.navigate(['/purchase-order-master/recive-purchase/'+this.purchase_id]);
    }
    
    viewDetail(id)
    { 
      
      console.log(id);
      const dialogRef=this.matDialog.open(ViewReceiveOrderComponent,
        {
          width:'400px',
          data:
          {
            id
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            // this.getVendorDetails(this.vendor_id);
          });
          this.service.get_data({id:id},"Purchase/recieve_detail").subscribe((result)=>{
            console.log(result);
            
          })
          
        }
        // orderdetail:any = {};
        // itemdetail:any = [];
        // orderreceive:any = [];
        // allitem:any = [];
        // v_contact:any =[];
        // vp_log:any =[];
        // tmp:any = {};
        // form: any = {};
        // qty:any = 0;
        // receiveqty:any = 0;
        // rejectqty:any = 0;
        // pendingqty:any = 0;
        // getPurchaseDetails(purchase_id) {
        //   this.loading_list = false;
        //   this.db.get_data(  '', 'purchase/details/' + purchase_id)
        //   .subscribe(data => {
        //     console.log(data);
        //     this.tmp = data;
        //     this.orderdetail = this.tmp.data.orderdetail;
        //     this.orderdetail.gst_data = parseInt( this.tmp.data.orderdetail.cgst) + parseInt( this.tmp.data.orderdetail.sgst ) + parseInt( this.tmp.data.orderdetail.igst );
        //     this.itemdetail = this.tmp.data.itemdetail;
        //     this.v_contact = this.tmp.data.v_con;
        //     this.vp_log = this.tmp.data.v_log;
        //     this.created_by = this.tmp.data.usernam;
        //     this.orderreceive = this.tmp.data.pid_receive;
        //     this.allitem = this.tmp.data.all_receive_item;
        //     this.qty = this.tmp.data.itemdetailqty;
        //     this.receiveqty = this.tmp.data.itemdetailreceiveqty;
        //     this.rejectqty = this.tmp.data.itemdetailRejectqty;
        //     this.pendingqty = this.tmp.data.itemdetailPendingqty;
        //     this.form.company_name=this.orderdetail.company_name;
        //     this.form.name=this.orderdetail.name;
        //     this.form.mobile = this.orderdetail.phone;
        //     this.form.landline = this.orderdetail.landline;
        //     this.form.hsn_code = this.orderdetail.hsn_code;
        //     this.form.material_type = this.orderdetail.material_type;
        //     this.form.address = (this.orderdetail.address)+(' ')+(this.orderdetail.city)+(' ')+(this.orderdetail.district)+(' ')+(this.orderdetail.state)+(' ')+(this.orderdetail.country);
        //     this.loading_list = true;
        //   },error => {
        //     // this.dialog.retry().then((result) => {  this.getPurchaseDetails(purchase_id); });
        //    });
        //   }
        //   cancel(id)
        //   {
        //     this.loading_data = true;
        //     this.dialog.delete('Cancel').then((result) => {
        //       if(result) {
        //         this.db.get_data(  {'id':this.purchase_id}, 'purchase/purchese_cancel')
        //         .subscribe(data => {
        //           this.loading_data = false;
        //           // this.dialog.success('Cancel Successfully!');
        //           this.router.navigate(['/purchases']);
        //         }
        //         ,error => { this.loading_data = false; 
        //           // this.dialog.retry().then((result) => {  this.cancel(id); });
        //          });
        //       }
        //     });
        //   }
        
        //   print1() {
        //     setTimeout(function(){ 
        //       let printContents, popupWin;
        //       printContents = document.getElementById('print-section1').innerHTML;
        //       popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        //       popupWin.document.open();
        //       popupWin.document.write(`
        //       <html>
        //       <head>
        //       <title>Print tab</title>
        //       <style>
        //       body
        //       {
        //         font-family: 'arial';
        //       }
        //       .print-section
        //       {
        //         width: 1024px;
        //         background: #fff;
        //         padding: 15px;
        //         margin: 0 auto
        //       }
        //       .print-section table
        //       {
        //         width: 1024px;
        //         box-sizing: border-box;
        //         table-layout: fixed;
        //       }
        //       .print-section table tr table.table1 tr td h2
        //       {
        //         font-size: 4px;
        //         line-height: 10px;
        //       }
        //       .print-section table tr table.table1 tr td p
        //       {
        //         font-size: 1px;
        //         line-height: 10px;
        //       }
        //       table .table3 tr td
        //       {
        //         background: #ccc;
        //       }
        //       .print-section table tr table.table1 tr td:nth-child(1){width: 324px;}
        //       .print-section table tr table.table1 tr td:nth-child(2){width: 700px;}
        //       </style>
        //       </head>
        //       <body onload="window.print();window.close()">${printContents}</body>
        //       </html>`
        //       );
        //       popupWin.document.close();
        //     }, 300);
        //   }
        
        //   receive:any ={};
        //   item:any =[];
        //   contact:any =[];
        //   pur_invoice:any = {};
        //   print2(r:any) {
        //     this.item=[]
        //     console.log( this.orderreceive);
        //     console.log( r );
        //     this.contact = Object.assign({}, this.v_contact[r] );
        //     this.receive = Object.assign({}, this.orderreceive[r] );
        //     for(let i=0;i<this.allitem.length;i++)
        //     {
        //       if(this.receive.id==this.allitem[i].receive_id)
        //       {
        //         this.item.push(this.allitem[i]);
        //       }
        //     }
        //     console.log( this.contact );
        //     console.log( this.receive );
        //     console.log( this.item );
        //     setTimeout(function(){ 
        //       let printContents, popupWin;
        //       printContents = document.getElementById('print-section2').innerHTML;
        //       popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        //       popupWin.document.open();
        //       popupWin.document.write(`
        //       <html>
        //       <head>
        //       <title>Print tab</title>
        //       <style>
        //       body
        //       {
        //         font-family: 'arial';
        //       }
        //       .print-section
        //       {
        //         width: 1024px;
        //         background: #fff;
        //         padding: 15px;
        //         margin: 0 auto
        //       }
        //       .print-section table
        //       {
        //         width: 1024px;
        //         box-sizing: border-box;
        //         table-layout: fixed;
        //       }
        //       .print-section table tr table.table1 tr td h2
        //       {
        //         font-size: 4px;
        //         line-height: 10px;
        //       }
        //       .print-section table tr table.table1 tr td p
        //       {
        //         font-size: 1px;
        //         line-height: 10px;
        //       }
        //       table .table3 tr td
        //       {
        //         background: #ccc;
        //       }
        //       .print-section table tr table.table1 tr td:nth-child(1){width: 324px;}
        //       .print-section table tr table.table1 tr td:nth-child(2){width: 700px;}
        //       </style>
        //       </head>
        //       <body onload="window.print();window.close()">${printContents}</body>
        //       </html>`
        //       );
        //       popupWin.document.close();
        //     }, 300);
        
        //   }
      }
      