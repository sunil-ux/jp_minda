import { Component, OnInit } from '@angular/core';
// import {DatabaseService} from '../../_services/DatabaseService';
// import {SessionStorage} from '../../_services/SessionService';
// import {DialogComponent} from '../../dialog/dialog.component';
import { MyserviceService } from 'src/app/myservice.service';

import { DialogBoxService } from 'src/app/dialog-box.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html'
})
export class AddPurchaseComponent implements OnInit {  
  // options = {};
  vendorList: any = [];
  loader: any = false;
  productType:any=[]
  vendorData:any={}
  // data:any={}
  productList:any=[];
  PO_List:any={}
  poListArray:any=[];
  wareHoseList:any=[]
  constructor(public service: MyserviceService, public dialog: DialogBoxService, public router: Router) {
    this.vendorData.total_amount=0;
    this.vendorData.discountAmount=0;
    this.vendorData.net_amount=0;
    this.vendorData.grossAmount=0;
    this.vendorData.total_qty=0;
    this.vendorData.igst_amount=0
    this.vendorData.cgst_amount=0
    this.vendorData.sgst_amount=0
  }
  
  ngOnInit() 
  {
    // const elems = document.querySelectorAll('select');
    this.getVendorList();
    this.getWareHouseList();
    // this.purchase_form.gst_per = 0; 
    // this.purchase_form.shipping_charge = 0; 
    // this.purchase_form.hsn_code = 0; 
  }
  
  getWareHouseList()
  {
    this.loader=true;
    this.service.get_data('',"Purchase/getWarehouse").subscribe((result)=>{
      console.log(result);
      this.wareHoseList=result['data'];
    })
  }
  
  getVendorList()
  {
    this.loader=true;
    this.service.get_data("","Purchase/getVendor").subscribe((result)=>{
      console.log(result);
      this.loader=false;
      this.vendorList=result['data'];
    })
  }
  
  getGSTPercentage()
  {
    console.log(this.vendorData.WareHouseLocation,this.vendorData.vendorLocation);
    
    if(this.vendorData.WareHouseLocation==this.vendorData.vendorLocation)
    {
      this.vendorData.sgst=9;
      this.vendorData.igst=0;
      this.vendorData.cgst=9;
    }
    else
    {
      this.vendorData.igst=18;
      this.vendorData.sgst=0;
      this.vendorData.cgst=0;
    }
    
    console.log( this.vendorData.sgst,
      this.vendorData.igst,
      this.vendorData.cgst);
      
    }
    
    getProductTypeList(id)
    {
      this.productType=[]
      this.loader=true;
      this.service.get_data({vendor_id:id},"Purchase/getVendorAssignedTypes").subscribe((result)=>{
        console.log(result);
        if(result['msg']=='success')
        {
          this.productType=result['data']
        }
        this.loader=false;
      })
    }
    
    getProductList(productType)
    {
      
      this.loader=true;
      this.productList=[];
      this.service.get_data({product_type:productType},"Purchase/getTypeProduct").subscribe((result)=>{
        console.log(result);
        this.loader=false;
        this.productList=result['data'];
      })
    }
    
    
    
    calculateAmount(qty,discount)
    {
      console.log(this.PO_List);
      if(qty>0)
      {
        this.PO_List.amount=parseInt(qty)*parseFloat(this.PO_List.purchase_price);
        this.PO_List.grossAmount=parseFloat(this.PO_List.amount)-parseFloat(discount);
      }
      else
      {
        this.dialog.error("Quantaty must be greater then 0")
      }
      
    }
    
    addToList()
    {
      console.log(this.poListArray);
      console.log(this.PO_List);
      this.PO_List.igst=(parseFloat(this.PO_List.grossAmount)*parseInt(this.vendorData.igst))/100;
      this.PO_List.cgst=(parseFloat(this.PO_List.grossAmount)*parseInt(this.vendorData.cgst))/100;
      this.PO_List.sgst=(parseFloat(this.PO_List.grossAmount)*parseInt(this.vendorData.sgst))/100;
      this.PO_List.net_amount=parseFloat(this.PO_List.grossAmount)+parseFloat(this.PO_List.igst)+parseFloat(this.PO_List.cgst)+parseFloat(this.PO_List.sgst);
      let existIndex=this.poListArray.findIndex(row=>row.product_code===this.PO_List.product_code)
      if(existIndex == -1)
      {
        this.poListArray.push(this.PO_List);
      }
      else
      {
        this.poListArray[existIndex].qty=parseInt(this.poListArray[existIndex].qty)+this.PO_List.qty;
        this.poListArray[existIndex].igst=parseInt(this.poListArray[existIndex].igst)+this.PO_List.igst;
        this.poListArray[existIndex].cgst=parseInt(this.poListArray[existIndex].cgst)+this.PO_List.cgst;
        this.poListArray[existIndex].sgst=parseInt(this.poListArray[existIndex].sgst)+this.PO_List.sgst;
        this.poListArray[existIndex].net_amount=parseInt(this.poListArray[existIndex].net_amount)+this.PO_List.net_amount;
        this.poListArray[existIndex].grossAmount=parseInt(this.poListArray[existIndex].grossAmount)+this.PO_List.grossAmount;
        this.poListArray[existIndex].discount=parseInt(this.poListArray[existIndex].discount)+this.PO_List.discount;
        // this.poListArray[existIndex].qty=parseInt(this.poListArray[existIndex].qty)+this.PO_List.qty;
        // this.poListArray[existIndex].qty=parseInt(this.poListArray[existIndex].qty)+this.PO_List.qty;
      }
      this.PO_List={};
      this.calculateFinalTotal();
      
    }
    removeFromList(index)
    {
      this.poListArray.splice(index,1);
      this.calculateFinalTotal();
    }
    
    reCalculateAmount(i)
    {
      if(this.poListArray[i].qty>0)
      {
        this.poListArray[i].amount=parseFloat(this.poListArray[i].purchase_price)*parseInt(this.poListArray[i].qty)
        this.poListArray[i].grossAmount=parseFloat(this.poListArray[i].amount)-parseInt(this.poListArray[i].discount)
        this.poListArray[i].igst=(parseFloat(this.poListArray[i].grossAmount)*parseInt(this.vendorData.igst))/100;
        this.poListArray[i].cgst=(parseFloat(this.poListArray[i].grossAmount)*parseInt(this.vendorData.cgst))/100;
        this.poListArray[i].sgst=(parseFloat(this.poListArray[i].grossAmount)*parseInt(this.vendorData.sgst))/100;
        this.poListArray[i].net_amount=parseFloat(this.poListArray[i].grossAmount)+parseFloat(this.poListArray[i].igst)+parseFloat(this.poListArray[i].cgst)+parseFloat(this.poListArray[i].sgst);
        this.calculateFinalTotal();
      }
      else
      {
        this.dialog.error("Quantaty must be greater then 0")
        
      }
      // this.PO_List.amount=parseInt(qty)*parseFloat(this.PO_List.purchase_price);
      // this.PO_List.grossAmount=parseFloat(this.PO_List.amount)-parseFloat(discount);
      // this.PO_List.igst=(parseFloat(this.PO_List.grossAmount)*parseInt(this.vendorData.igst))/100;
      // this.PO_List.cgst=(parseFloat(this.PO_List.grossAmount)*parseInt(this.vendorData.cgst))/100;
      // this.PO_List.sgst=(parseFloat(this.PO_List.grossAmount)*parseInt(this.vendorData.sgst))/100;
      // this.PO_List.net_amount=parseFloat(this.PO_List.grossAmount)+parseFloat(this.PO_List.igst)+parseFloat(this.PO_List.cgst)+parseFloat(this.PO_List.sgst);
    }
    
    calculateFinalTotal()
    {
      this.vendorData.total_amount=0;
      this.vendorData.discountAmount=0;
      this.vendorData.grossAmount=0;
      this.vendorData.net_amount=0;
      this.vendorData.total_qty=0;
      this.vendorData.igst_amount=0
      this.vendorData.cgst_amount=0
      this.vendorData.sgst_amount=0
      for (let i = 0; i < this.poListArray.length; i++)
      {
        this.vendorData.total_amount=parseFloat(this.vendorData.total_amount)+parseFloat(this.poListArray[i].amount);
        this.vendorData.discountAmount=parseFloat(this.vendorData.discountAmount)+parseFloat(this.poListArray[i].discount);
        this.vendorData.grossAmount=parseFloat(this.vendorData.total_amount)-parseFloat(this.vendorData.discountAmount);
        this.vendorData.igst_amount=(parseFloat(this.vendorData.igst_amount)+parseFloat(this.poListArray[i].igst));
        this.vendorData.cgst_amount=(parseFloat(this.vendorData.cgst_amount)+parseFloat(this.poListArray[i].cgst));
        this.vendorData.sgst_amount=(parseFloat(this.vendorData.sgst_amount)+parseFloat(this.poListArray[i].sgst));
        this.vendorData.net_amount=parseFloat(this.vendorData.grossAmount)+parseFloat(this.vendorData.igst_amount)+parseFloat(this.vendorData.cgst_amount)+parseFloat(this.vendorData.sgst_amount)
        this.vendorData.total_qty=parseInt(this.vendorData.total_qty)+parseFloat(this.poListArray[i].qty);
        console.log(this.vendorData);
        
      }
      
    }

    SubbmitOrder()
    {
      this.vendorData.item=this.poListArray;
      console.log(this.vendorData);

      this.loader=true;
      this.service.get_data({data:this.vendorData},"Purchase/addOrder").subscribe((result)=>{
        console.log(result);
        if(result['msg']=='success')
        {
          this.router.navigate(['/purchase-order-master/'])
        }
        else
        {
          this.dialog.error("Some Thing Went Wrong")
        }
        this.loader=false

      })
      
      
    }
    //   temp_cons:any = [];
    //   GetVendorList() {  
    //     this.loading_list = true;  
    //     this.db.get_data('' , 'purchase/getVendor')
    //     .subscribe((d: any) => {
    //     this.loading_list = false;  
    
    //       this.vendor = d;
    //       console.log(this.vendor);        
    //       console.log(this.vendor.state);        
    //       console.log(this.vendor.users_state);    
    
    //       this.temp_cons = d;
    
    //     },error => {this.loading_list = false;  
    //       // this.dialog.retry().then((result) => {  this.GetVendorList(); }); 
    //     });
    
    //     //console.log(this.ses.users.username);   
    //   }
    
    //   selected_vendor: any = {};
    //   clear(){
    //     this.getCaegoryList();
    //     this.data = {};
    //     this.purchase_list = [];
    //  console.log( this.purchase_list);
    
    //  this.selected_vendor = Object.assign({}, this.vendor.filter(x => x.id === this.purchase_form.vendor_id )[0] ); 
    //  this.purchase_form.gst_per =  this.selected_vendor.gst_percentage;
    //  this.purchase_form.material_type =  this.selected_vendor.meterial_type;
    
    // }
    
    //   categoryList:any = [];
    //   getCaegoryList()
    //   {
    
    //     this.brand = [];
    //     this.product = [];
    
    //     // this.purchase_form.vendor_id = vendor_id;
    //       this.loading_list = true;
    
    
    //       // this.loading_list = false;
    //       this.db.get_data(  '', 'purchase/getVendorCategory/'+this.purchase_form.vendor_id)
    //       .subscribe((result: any) => {
    //           this.loading_list = false;
    //           // this.loading_list = true;
    //           console.log(result);
    //           this.categoryList = result['data']['vendors_category'];
    //           console.log(this.categoryList);        
    //       },err => {  this.loading_list = false;  
    //         // this.dialog.retry().then((result) => { this.getCaegoryList(); });  
    //        });
    //   }
    
    //   update_qty(index,qty,price){
    
    
    //     // this.purchase_list[index].amount = qty*price;
    //     // console.log(this.purchase_list[index].amount);
    // this.cal();
    //   }
    
    //   brand:any = [];
    
    //   GetVendorBrand()
    //   {
    //     this.product = [];
    //     this.loading_list = true;
    //     this.db.get_data(  {'item': this.data } , 'purchase/getVendorBrand/'+this.purchase_form.vendor_id)
    //     .subscribe((result: any) => {
    //     this.loading_list = false;
    
    //       console.log(result);
    //       this.brand = result['data']['vendors_brand'];
    //       console.log(this.brand);        
    //     },error => {this.loading_list = false;  
    //       // this.dialog.retry().then((result) => {  this.GetVendorBrand(); });
    //      });
    //   }
    
    
    
    
    //   product:any = [];
    //   data : any = {};
    //   getDetails()
    //   {
    //     this.loading_list = true;
    //     console.log(this.item_form);
    //     this.db.get_data( {'id': this.item_form.part_id  } , 'purchase/getDetails')
    //     .subscribe( r => {
    //       this.loading_list = false;
    
    //       // console.log(r.detail);
    //       // r.data;
    //       this.data = r['detail'];
    //       this.data.qty = 1;
    
    //     this.data.amount = this.data.qty * this.data.purchase_price;
    
    
    //       // this.GetAmount(1,  r.detail.sale_price);
    
    //     },error => {this.loading_list = false;  
    //       // this.dialog.retry().then((result) => {  this.getDetails(); });
    //      });
    //   }
    
    
    
    
    
    //   keyword = 'part_number';
    //   // data:any = [];
    
    
    //   selectEvent(item) {
    //     this.item_form.part_id = item.id;
    //     console.log(   this.item_form.part_id );
    
    //     if(this.item_form.part_id){
    //       this.getDetails();
    //     }
    
    //   }
    
    //   onChangeSearch(val: string) {
    
    //   }
    
    //   onFocused(e){
    //   }
    
    
    
    
    
    
    
    //   GetAmount(qty,purchase_price)
    //   {
    //     // qty = qty ? qty : 1;   
    //     // this.data.amount = qty * purchase_price;
    //     // console.log(this.data);    
    //   }  
    
    //   purchase_list:any = [];
    //     AddItem(f:any = '')
    //   {
    //     // this.purchase_list.push(this.data);
    //     console.log(this.purchase_list);   
    //     this.purchase_form.item_total_temp = 0; 
    
    
    
    //     if(this.purchase_list.length == 0)
    //     {
    //         this.purchase_list.push(this.data);
    //         console.log(this.data);
    
    //     }
    //     else
    //     {
    //         for(let i=0;i<this.purchase_list.length;i++)
    //         {
    //             if(this.data.part_number == this.purchase_list[i].part_number )
    //             {
    
    //               this.purchase_list[i].qty = parseInt( this.purchase_list[i].qty );
    //               this.purchase_list[i].purchase_price += parseInt(this.data.purchase_price );
    //               this.purchase_list[i].qty += parseInt(this.data.qty);
    //               this.purchase_list[i].amount += this.data.amount;
    
    //               break;    
    
    //             }
    //             else if(i == this.purchase_list.length - 1)
    //             {
    //                 this.purchase_list.push(this.data);    
    //                 break;    
    //             }
    //         }
    //     }
    
    //     for(var j=0; j<this.purchase_list.length; j++)
    //     {
    //       this.purchase_form.item_total_temp  = parseFloat(this.purchase_list[j].amount) + parseInt(this.purchase_form.item_total_temp);      
    //     } 
    
    
    
    //     this.purchase_form.item_total = parseFloat(this.purchase_form.item_total_temp).toFixed(2);    
    
    //   console.log(this.purchase_list);    
    //   this.data = {};
    //   if(f)
    //   f.resetForm();
    //   this.cal();
    
    //   }
    
    //   RemoveItem(index,amount)
    //   {
    //     this.purchase_form.item_total = parseFloat(this.purchase_form.item_total) - amount;  
    //     console.log(index);
    //     this.dialog.delete('Item Data !').then((result) => {
    //       console.log(result);
    //       if(result){
    //         this.purchase_list.splice(index,1);
    //         // this.dialog.success('Item has been deleted.');
    //         this.cal();
    //       }
    //     },error => { 
    //       // this.dialog.retry().then((result) => {  this.RemoveItem(index,amount); }); 
    //     });   
    //   }
    //   sendingData:any;
    //   submit_po()
    //   {
    //     this.loading_list = true;
    //     this.sendingData = true;
    //     // this.purchase_form.item_data = this.purchase_list;
    //     console.log(this.purchase_form);
    //     console.log(this.purchase_list);  
    
    //     this.db.get_data( {'data':this.purchase_form,'item':this.purchase_list,'created_by': 1,'created_by_type': 'admin'} , 'purchase/addOrder')
    //     .subscribe((result: any) => {
    //       this.sendingData = false;
    //       this.loading_list = false;
    //       console.log(result);
    //         if(result)
    //         {
    //           this.router.navigate(['/purchases']);
    //         }
    //       },error => {    this.sendingData = false; this.loading_list = false;
    //         // this.dialog.retry().then((result) => {   }); 
    //       });
    //   } 
    
    
    //   cal(){
    
    //     this.purchase_form.total_qty  = 0;
    //     this.purchase_form.total_amount  = 0;
    //     this.purchase_form.gst  = 0;
    //     this.purchase_form.gst_per  = this.purchase_form.gst_per ? this.purchase_form.gst_per : 0;
    //     this.purchase_form.net_amount  = 0;
    //     this.purchase_form.actual_amount  = 0;
    //     this.purchase_form.cgst_amount = 0;
    //     this.purchase_form.sgst_amount= 0;
    //     this.purchase_form.igst_amount= 0;
    
    //     for (let i = 0; i < this.purchase_list.length; i++) {
    
    //       this.purchase_list[i].cgst_amount  = 0;
    //       this.purchase_list[i].sgst_amount  = 0;
    //       this.purchase_list[i].igst_amount  = 0;
    //       this.purchase_list[i].gst_amount  = 0;
    
    //       this.purchase_list[i].qty = this.purchase_list[i].qty ? this.purchase_list[i].qty : 0;
    
    //       // this.purchase_list[i].gst  = 18;
    
    //       this.purchase_list[i].amount = this.purchase_list[i].qty * this.purchase_list[i].purchase_price;
    
    //       this.purchase_form.total_qty += parseInt( this.purchase_list[i].qty );
    //       this.purchase_form.total_amount += parseInt(  this.purchase_list[i].amount );
    //       // this.purchase_form.tot_pur_amount += parseInt(  this.purchase_list[i].amount );
    
    //       // this.itemdetail[i].gst_amount  = parseInt(  this.itemdetail[i].deliver_rantal ) * ( parseInt( this.itemdetail[i].gst ) / 100);
    //       // this.purchase_form.gst  += parseInt(    this.itemdetail[i].gst_amount );
    
    //       console.log(this.selected_vendor.state );
    //       // console.log(this.db.datauser.state );
    // console.log( this.purchase_form.gst_per );
    
    //       // if( this.selected_vendor.state ==  this.db.datauser.state   ){
    
    
    //       //   this.purchase_list[i].cgst_amount  = parseInt(  this.purchase_list[i].amount ) * ( ( parseInt( this.purchase_form.gst_per ) / 2 ) / 100);
    //       //   this.purchase_list[i].sgst_amount  = parseInt(  this.purchase_list[i].amount ) * ( ( parseInt( this.purchase_form.gst_per ) / 2 ) / 100);
    
    //       // }else{
    
    //         this.purchase_list[i].igst_amount  = parseInt(  this.purchase_list[i].amount ) * ( parseInt( this.purchase_form.gst_per ) / 100);
    
    //       // }
    
    //       this.purchase_list[i].gst_amount  += parseInt( this.purchase_list[i].cgst_amount )  + parseInt( this.purchase_list[i].sgst_amount ) + parseInt( this.purchase_list[i].igst_amount );
    
    //       console.log(this.purchase_form.cgst_amount);
    //       console.log(this.purchase_form.sgst_amount);
    //       console.log(this.purchase_form.igst_amount);
    
    //       this.purchase_form.cgst_amount  += parseInt(    this.purchase_list[i].cgst_amount );
    //       this.purchase_form.sgst_amount  += parseInt(    this.purchase_list[i].sgst_amount );
    //       this.purchase_form.igst_amount  += parseInt(    this.purchase_list[i].igst_amount );
    
    //       this.purchase_form.gst  += parseInt( this.purchase_form.cgst_amount )  + parseInt( this.purchase_form.sgst_amount ) + parseInt( this.purchase_form.igst_amount );
    
    
    //       this.purchase_form.net_amount +=  parseInt( this.purchase_list[i].gst_amount )  +  parseInt( this.purchase_list[i].amount );
    
    //       // this.purchase_form.actual_amount  = parseInt(this.purchase_form.net_amount) + parseInt(this.purchase_form.shipping_charge) ;
    
    //       // this.purchase_form.net_amount =  parseInt( this.purchase_form.gst )  +  parseInt( this.purchase_form.total_amount );
    
    
    
    //     }
    
    //       console.log(  this.purchase_form);
    
    //   }
    
    //   active:any={};
    
    // toggleterritory1(key,action)
    // {
    //   console.log(action);
    //   console.log(key);
    
    //   if(action == 'open')
    //   { this.active.user1 = true; }
    //   if(action == 'close')
    //   { this.active.user1 = false;}
    
    //   console.log(this.active);
    
    
    // }
    
    // search2:any={};
    // tmpsearch3:any={};
    // getItemscheckin(con,search)
    // {
    //   console.log(search);
    //   if(con=='con2'){
    //     this.vendor=[];
    //     for(var i=0;i<this.temp_cons.length; i++)
    //     {
    //       search=search.toLowerCase();
    //       this.tmpsearch3=this.temp_cons[i]['name'].toLowerCase();
    //       if(this.tmpsearch3.includes(search))
    //       {
    //         this.vendor.push(this.temp_cons[i]);
    //       }     
    //     }    
    //     console.log(this.vendor);
    //   }
    // }
    
  }
  