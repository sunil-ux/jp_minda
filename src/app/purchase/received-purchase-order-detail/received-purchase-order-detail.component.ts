import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material';
import * as moment from 'moment/moment';

export const MY_FORMATS = {

  parse: {
    dateInput: 'LL',
  },
  display: {

    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',

  },
};

@Component({
  selector: 'app-received-purchase-order-detail',
  templateUrl: './received-purchase-order-detail.component.html',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ReceivedPurchaseOrderDetailComponent implements OnInit {
  purchase_id;
  loader:any=false;
  order:any={};
  constructor(public service: MyserviceService, private route: ActivatedRoute, private router: Router,public matDialog: MatDialog,  public dialog: DialogBoxService) {}
    
ngOnInit() {      
      this.route.params.subscribe(params => {
        this.purchase_id = params['id'];
        console.log(this.purchase_id);        
     
      if (this.purchase_id) {
        this.getPurchaseDetail(this.purchase_id); 
      }
    });
    }

    _openCalendar(picker: MatDatepicker<Date>) {
      picker.open();
  }
    parent:any = {};
    child:any = {};
    sub_child:any = [];

   
    vendorData:any={};
    itemList:any=[];
    selectedFile:any=[];
    filename:any=[];
    select_file(event)
    {
      this.selectedFile=[];
      // console.log(event);
      // console.log(event.target.files);
      for(var i=0; i<event.target.files.length; i++){ 
        this.selectedFile.push(event.target.files[i]);
        console.log(this.selectedFile);
        this.filename = this.selectedFile[i]['name'];
      }
      
    }

    calcReciveAmount(i,qty)
    {
      // this.itemList[i].
      // qty = parseInt(qty);
      // this.itemList[i].rate = parseInt(this.itemList[i].rate);
      // this.itemList[i].recieved_sub_total =this.itemList[i].rate*qty ;
      // this.itemList[i].recieved_discount_amount =this.itemList[i].rate*qty ;
    }

    formData=new FormData(); // for file uploading  
    subbmitPurchaseOrder()
    {
      console.log(this.itemList);
      
      this.vendorData.invoice_date=moment(this.vendorData.invoice_date).format('DD-MM-YYYY');
      console.log(this.vendorData);

      this.vendorData.item=this.itemList
      this.service.get_data({data:this.vendorData},'Purchase/savePurReceive')
      .subscribe((result)=>{
        console.log(result);
        if(result['msg']=="success")
        {

          if( this.selectedFile && this.selectedFile.length )
          {
            for(var i=0; i<this.selectedFile.length; i++)
            {
              this.formData.append("image"+i ,this.selectedFile[i],this.selectedFile[i].name);
            }
            this.service.upload_image(this.formData,"Purchase/img_upload_receiving/"+result['receiving_id'])
            .subscribe((result:any) =>{
              console.log(result);
            },error=>{
              this.dialog.error("Some Thing Went Wrong")
              console.log(error);
            });
          }
          this.router.navigate(['/purchase-order-master/purchase-detail/'+this.purchase_id])

        }
        
      },error=>{
        this.dialog.error("Some Thing Went Wrong")

        console.log("error");
        console.log(error);
      });
      
      
      
      
    }
    getPurchaseDetail(id)
    {
      this.loader=true;
      this.service.get_data({id:id},"Purchase/getPurchaseDetail").subscribe((result)=>{
        console.log(result);
        this.loader=false;
        this.vendorData=result['orderdetail'];
        this.itemList=result['itemdetail'];
      })
    }

    recivedQty(i,qty)
    {
      
      console.log(i,qty);
      console.log(this.itemList[i].pending_qty);
      
      if(qty>this.itemList[i].pending_qty || qty<=0)
      {
        this.dialog.error("Please Enter valid Quantity");
        this.itemList[i].accept_qty=''
      }
      else
      {
        this.calcReciveAmount(i,qty);
      }
      
      
    }


   
  }
  