import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import { MyserviceService } from 'src/app/myservice.service';

import { DialogBoxService } from 'src/app/dialog-box.service';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html'
})
export class PurchaseOrderListComponent implements OnInit {
  // loading: any;
  // po_id: any;
  // data: any;
  // isInvoiceDataExist = false;
  // search: any = '';
  // source: any = '';
  // loading_page = false;
  // loading_list = false;
  // loader: any = false;
  // leads: any = [];
  // current_page = 1;
  // total_order:any;
  // last_page: number ;
  // searchData = true;
  loader:any=false;
  purchaseOrderData:any={}
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  search:any={};
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public service: MyserviceService, public dialog: DialogBoxService ) {
  }
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.loading_page = true;
    // this.getPurchaseOrderList();
    this.getPurchaseOrderList();
  }

  orders:any= [];


  getPurchaseOrderList()
  {
    this.loader=true;
    this.service.get_data({	pagelimit:100 , start:0},"Purchase/getPurchases").subscribe((result)=>{
      console.log("result=>",result);
      this.purchaseOrderData=result;
      this.loader=false;
    })
  }
  
//   redirect_previous() {
//     this.current_page--;
//     this.getPurchaseOrderList();
//   }
//   redirect_next() {
//     if (this.current_page < this.last_page) { this.current_page++; }
//     else { this.current_page = 1; }
//     this.getPurchaseOrderList();
//   }

  
//   filter:any = {};

//   filtering : any = false;

//   approved_order : any = 0;
// pendingorder : any = 0;
// rejectorder : any = 0;

//   getPurchaseOrderList() {

//     this.isInvoiceDataExist = false;
//     this.loading_list = true;
          
//     // this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';

    
//     if( this.filter.date || this.filter.search || this.filter.status)this.filtering = true;

  
//     this.db.get_data( { 'filter': this.filter }, 'Vendor/getPurchase' )
//       .subscribe(data => {
//         console.log(data);
//         this.loading_list = false;
        
//         this.data = data['data']['purchesorderList'];

      
//         this.total_order =  data['data']['AllPO'];
// this.rejectorder =  data['data']['Cancel'];
// this.pendingorder =  data['data']['Pending'];
// this.approved_order =  data['data']['Received'];

//         this.orders = this.data.data;
//         this.current_page = this.data.current_page;
//         this.last_page = this.data.last_page;
//         // this.total_order = this.data.total;
//         if (this.search && (this.orders.length < 1)) { this.searchData = false; }
//         if (this.search && (this.orders.length > 0)) { this.searchData = true; }
//       },error => {
//         this.loading_list = false;
//         // this.dialog.retry().then((result) => {  this.getPurchaseOrderList(); });
//        });
//   }
//   deletePurchaseorder(po_id) {   
//     this.dialog.delete('Purchase Order').then((result) => {
//      if(result) {
//         this.db.get_data({po_id: po_id}, 'purchase/remove')
//           .subscribe(data => {
//             this.data = data;            
//             this.getPurchaseOrderList();                  
//             });
//        }
//     });  
//  }
//   orderListReverse(){
//     this.orders=this.orders.reverse();
//   }


//   formData = new FormData();

  
//   fileChange(event) {
    
//     this.formData.set('image data', event.target.files[0], event.target.files[0].name);
//     this.formData.set('x', 'k');
    
//   //   this.db.fileData( this.formData, 'stock/imageTest')
//   //   .subscribe(data => {
//   //  console.log( data );
               
//   //     });

//     }


// }

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [];

}