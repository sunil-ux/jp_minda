import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  animations: [slideToTop()]
  
})
export class AddOrderComponent implements OnInit {
  loader:any = false;
  invalid_amount = 0;
  constructor(public service:MyserviceService, public toaster:ToastrManager, public dialog:DialogBoxService, public toastr:ToastrManager, public router:Router) 
  { 
    this.order.type = '1';
    this.getDr();
    this.getMasterData();
    this.DgetDr();
  }
  
  
  ngOnInit() {
    this.itemData.category = '';
    this.itemData.sub_category = '';
    this.itemData.series = '';
    this.itemData.model_code = '';
  }
  
  
  validate(event:any)
  {
    const pattern = /^[0-9a-zA-Z]+$/;
    let inputChar = String.fromCharCode(event.charCode);if (event.keyCode != 8 && !pattern.test(inputChar))
    {event.preventDefault();}
  }
  get_payment_info(val)
  {
    console.log(val);
    this.order.payment_info = val;
    if(val=='No')
    {
      this.order.payment_mode='';
      this.order.payment_amount='';
      this.order.remark='';
      this.order.transaction_id='';
      this.order.cheque_no='';
      this.order.cheque_date='';
      
      
    }
    
  }
  order:any = {};
  dr_list:any = [];
  distributor_list:any = [];
  filter_username=[];
  
  getDr()
  {
    console.log(this.order.type);
    this.service.get_data({ 'type': this.order.type },'order/get_customer_name').subscribe((resp)=>
    {
      console.log(resp);
      this.dr_list = resp;
      this.filter_username=this.dr_list;
      
    },
    error=>
    {console.log("error");});
    
  }
  filter_distributor_list:any=[];
  DgetDr()
  {
    
    this.service.get_data({ 'type': '1' },'order/get_customer_name').subscribe((r)=>
    {
      this.distributor_list = r;
      this.filter_distributor_list=this.distributor_list;
      console.log(r);
      
    },
    error=>
    {console.log("error");});
    
  }
  active:any = {};
  toggleterritory(key,action)
  {
    console.log(action);
    console.log(key);
    
    if(action == 'open')
    { this.active[key] = true; }
    if(action == 'close')
    { this.active[key] = false;}
    
    console.log(this.active);
  }
  
  ////// //////    item select data   /////////
  
  itemData:any = {};
  category_list:any = [];
  sub_category_list:any = [];
  series_list:any = [];
  model_list:any = [];
  filter_category:any = 0;
  filter_sub_category:any = 0;
  filter_sereies:any = 0;
  getMasterData(gruop_by:any = 'category', mode: any = false, reset:any = false)
  {
    console.log(mode);
    
    console.log( this.category_list );
    
    console.log(gruop_by);
    
    if(gruop_by == 'category' ){
      this.itemData.category = '';
      
      this.itemData.sub_category = '';
      
      this.itemData.series = '';
      
      this.itemData.model_code = '';
      
      this.category_list = [];
      this.sub_category_list = [];
      this.series_list = [];
      this.model_list = [];
      
      this.filter_category = 0;
      this.filter_sub_category = 0;
      this.filter_sereies = 0;
      
      
    }else if(gruop_by == 'sub_category' ){
      if(mode) this.filter_category++;
      if(!mode && !reset) this.filter_category--;
      
      
      this.itemData.sub_category = '';
      this.itemData.series = '';
      
      this.itemData.model_code = '';
      
      this.sub_category_list = [];
      this.series_list = [];
      this.model_list = [];
      
      this.filter_sub_category = 0;
      this.filter_sereies = 0;
      if( !this.filter_category  && !mode  )
      {  
        this.getMasterData('product_code','',true); 
        return; 
      }
      
    }
    else if(gruop_by == 'series' )
    {
      if(mode) this.filter_sub_category++;
      if(!mode && !reset) this.filter_sub_category--;
      this.itemData.series = '';
      this.itemData.model_code = '';
      this.series_list = [];
      this.model_list = [];
      this.filter_sereies = 0;
      if( !this.filter_sub_category  && !mode )
      { 
        this.getMasterData('product_code','',true); 
        return; 
      }
      
    }
    else if(gruop_by == 'product_code' )
    {
      if(mode) this.filter_sereies++;
      if(!mode && !reset) this.filter_sereies--;
      
      this.itemData.model_code = '';
      this.model_list = [];
      
    }
    this.loader = true;
    this.service.get_data({ 'gruop_by': gruop_by,'category':this.category_list, 'filter_category':this.filter_category, 'sub_category':this.sub_category_list, 'filter_sub_category':this.filter_sub_category,'series':this.series_list,'filter_sereies':this.filter_sereies,'model_code':this.itemData.model_code },'order/getMasterWebData').subscribe((r:any)=>
    {  
      this.loader = false; 
      console.log(r['r1']);
      console.log(r['r2']);   
      if(gruop_by == 'category' ){
        if(r['r1'].length == 1 && !r['r1'][0].category){
          this.category_list = [];
          this.getMasterData('sub_category','',true);
          return;
        }else if(r['r1'].length > 0 && r['r1'][0].category){
          this.getMasterData('product_code','',true);
        }  
        if(r['r1'].length == 0)this.getMasterData('sub_category','',true);   
        this.category_list = r['r1'];    
      }
      else if(gruop_by == 'sub_category' )
      {
        if(r['r1'].length == 1 && !r['r1'][0].sub_category)
        {
          this.sub_category_list = [];
          this.getMasterData('series','',true);
          return;
        }
        else if(r['r1'].length > 0 && r['r1'][0].sub_category)
        {
          this.getMasterData('product_code','',true);
        }
        
        this.sub_category_list = r['r1'];
        if(r.length == 0)this.getMasterData('series','',true);
        
        
      }
      else if(gruop_by == 'series' )
      {
        if(r['r1'].length == 1 && !r['r1'][0].series){
          this.series_list = [];
          this.getMasterData('product_code','',true);
          return;
        }
        else if(r['r1'].length > 0 && r['r1'][0].series)
        {
          this.getMasterData('product_code','',true);
        }
        
        this.series_list = r['r1'];
        if(r.length == 0)this.getMasterData('product_code','',true);
        
      }
      else if(gruop_by == 'product_code' )
      {
        if(r['r1'].length == 1 && !r['r1'][0].product_code){
          this.model_list = [];
          return;
        }
        this.model_list = r['r1'];
      }
    },
    error=>
    { 
      this.loader = false;
      console.log(error);}
      );
    }
    
    productInfo:any = {};
    getProductInfo(i:any = '-1', mode:any = false)
    {
      if(!mode)
      return false;
      this.itemData = this.model_list[i];
      this.getCategoryDiscount(i);
      
    }
    getCategoryDiscount(i)
    {
      this.loader = true;
      this.service.get_data( {'type': this.order.type, 'dr_id':  this.order.dr_id, 'category': this.itemData.category },'distribution_net/getCategoryDiscount')
      .subscribe((r:any)=>
      {
        console.log(r);
        this.loader = false;
        this.itemData.amount = 0;
        this.itemData.qty = 1;
        this.itemData.discount = 0;
        this.itemData.discounted_amount =  0;
        this.itemData.gross_amount = 0;
        this.itemData.gst=r.gst;
        console.log(this.itemData.gst);
        if(r){
          if(this.order.type == '1')this.itemData.discount =  r.distributor;
          if(this.order.type == '2')this.itemData.discount =  r.retailer;
        }else{
          this.itemData.amount = this.itemData.price ;
          this.itemData.gross_amount = this.itemData.price ;
        }
        this.cal_prod(i);
      });
    }
    
    temp_disc:any;
    cal_prod(i){
      if(this.itemData.qty == '' || this.itemData.qty == 0){
        this.itemData.qty = 1;
      }
      this.itemData.amount = this.itemData.qty * this.itemData.price ;
      if( this.itemData.discount > 0 ){
        this.itemData.discount = Math.round(this.itemData.discount);
        this.itemData.discounted_amount = parseInt( this.itemData.amount ) * ( this.itemData.discount / 100);
        this.itemData.discounted_amount = this.itemData.discounted_amount ? this.itemData.discounted_amount : 0;
      }else{
        this.itemData.discounted_amount = 0 ;
        this.itemData.discount  = 0;
      }
      this.temp_disc = parseFloat(this.itemData.discounted_amount).toFixed(2);
      this.itemData.gross_amount = parseInt(this.itemData.amount) - this.temp_disc;
      this.model_list[i] =  this.itemData;
      console.log(this.itemData);
    }
    
    
    
    invoiceItemList:any = [];
    // Add to list
    Add_multiple_item(f)
    {
      console.log(" i am add to list type function");
      for(let i=0; i < this.model_list.length;i++)
      {
        this.model_list[i]['net_value'] = this.model_list[i]['gross_amount'];
        if(this.model_list[i].product_code_selected === true)  {
          this.itemData =   this.model_list[i];
          console.log(this.itemData);
          this.AddItem(f);
        }
      }
      
      // this.itemData.category = '';
      
      // this.itemData.sub_category = '';
      
      // this.itemData.series = '';
      
      // this.itemData.model_code = '';
      
      // this.category_list = [];
      // this.sub_category_list = [];
      // this.series_list = [];
      // this.model_list = [];
      
      // this.filter_category = 0;
      // this.filter_sub_category = 0;
      // this.filter_sereies = 0;
      
      // f.resetForm();
      
      // this.itemData = {};
      
      this.getMasterData();
      
    }
    
    
    AddItem(form)
    {
     
      
      let itemFoundIndex = null;
      for(let i=0; i < this.invoiceItemList.length;i++)
      {
        if(this.itemData.category === this.invoiceItemList[i].category && this.itemData.sub_category === this.invoiceItemList[i].sub_category && this.itemData.series === this.invoiceItemList[i].series &&  this.itemData.product_code === this.invoiceItemList[i].product_code)
        {
          itemFoundIndex = i;
        }
      }
      
      
      
      if(itemFoundIndex !== null) {
        console.log('if');
        
        this.invoiceItemList[itemFoundIndex].qty = parseInt(this.invoiceItemList[itemFoundIndex].qty) + parseInt(this.itemData.qty);
        this.invoiceItemList[itemFoundIndex].amount += this.itemData.amount;
        this.invoiceItemList[itemFoundIndex].discounted_amount += this.itemData.discounted_amount;
        this.invoiceItemList[itemFoundIndex].gross_amount = parseInt(this.invoiceItemList[itemFoundIndex].amount)-parseInt(this.invoiceItemList[itemFoundIndex].discounted_amount);
        
      } 
      else {
        
        this.invoiceItemList.push(JSON.parse(JSON.stringify(this.itemData)));
        console.log(this.invoiceItemList);
      }
      
      console.log(this.invoiceItemList);
      for(var j=0;j<this.invoiceItemList.length;j++)
      {
        this.invoiceItemList[j].gross_amount = parseFloat(this.invoiceItemList[j].gross_amount).toFixed(2)
        this.invoiceItemList[j]['net_value']=this.invoiceItemList[j].gross_amount;
        console.log(this.invoiceItemList[j]['net_value']);
      }
      
      this.calculateNetInvoiceTotal();
    }

    QtyEditcart(i,qty)
    {
      console.log(i);
      console.log(qty);
      this.invoiceItemList[i].qty=qty;
      this.invoiceItemList[i].amount=qty* this.invoiceItemList[i].price;
      this.invoiceItemList[i].discounted_amount=parseInt(this.invoiceItemList[i].amount)*(this.invoiceItemList[i].discount/100)
      this.invoiceItemList[i].net_value= parseInt(this.invoiceItemList[i].amount)- parseInt(this.invoiceItemList[i].discounted_amount)
      this.invoiceItemList[i].gross_amount=this.invoiceItemList[i].net_value;
      this.calculateNetInvoiceTotal();
    }
    
    calculateNetInvoiceTotal() 
    {
      this.order.price = 0;
      this.order.qty = 0;
      this.order.amount = 0;
      this.order.discount = 0;
      this.order.gross_amount = 0;
      this.order.gst=0;
      this.order.net_amount=0;
      for (let j = 0; j < this.invoiceItemList.length; j++)
      {
        this.order.price += parseInt(this.invoiceItemList[j].price);
        this.order.qty += parseInt(this.invoiceItemList[j].qty);
        this.order.amount += this.invoiceItemList[j].amount;
        this.order.discount += this.invoiceItemList[j].discounted_amount;
        this.order.gross_amount = parseFloat(this.order.gross_amount)+parseFloat(this.invoiceItemList[j].gross_amount)
        
      }
      this.order.total_amount= parseFloat(this.order.gross_amount)-parseFloat(this.order.discount);
      console.log(this.order.total_amount);
      
      this.order.net_amount=(this.order.total_amount).toFixed(2)
      console.log(this.order.net_amount);
      
    }
    delete_from_cart(index)
    {
      console.log(index);
      
      this.dialog.delete("Cart item").then((result) => {
        if(result)
        {
          this.invoiceItemList.splice(index,1)
        }
      });
      this.calculateNetInvoiceTotal();
      
    }
    
    submit(){
      
      console.log(this.order);
      this.order.dr_id=this.dr_id;
      this.order.name=this.name;
      console.log(this.invoiceItemList);
      
      // let payment = {'payment_mode': this.order.payment_mode,'payment_amount': this.order.payment_amount,'cheque_no': this.order.cheque_no,'cheque_date': this.order.cheque_date, 'transaction_id': this.order.transaction_id,'remark': this.order.remark};
      // ,'payment': payment


      this.service.get_data( {'order': this.order,  'item': this.invoiceItemList, 'dr_id':this.order.dr_id},'order/orderinvoice')
      .subscribe((r:any)=>
      {
        console.log(this.order.type);
        
        if(this.order.type== '1' ||  this.order.type == '3')
        var t = 1;
        
        if( this.order.type == '2')
        var t = 2;
        
        console.log(r);
        if(r)
        {
          this.loader="";
          this.toastr.successToastr("Success","Inserted");
          this.router.navigate(['/order-list/'+t]);
        }
        else
        {
          this.dialog.error('Something went wrong !!! Try Again...');
        }
        
      }, error=>{
        console.log(error);
        this.dialog.error('Something went wrong !!! Try Again...');
      });
      
      
    }
    filter_name:any=[];
    dr_id:any;
    name:any;
    custmerName(name)
    {
      console.log(name);
      this.filter_name=this.dr_list.filter(x=>x.name==name)[0];
      this.dr_id=this.filter_name.id;
      this.name=this.filter_name.name;
      console.log(this.dr_id);
    }

    AssignName(name)
    {
      console.log(name);
      let filter_name=this.filter_distributor_list.filter(x=>x.name==name)[0];
      console.log(filter_name);
      
      // this.order.assign_distributor= filter_name.name;
      this.order.assign_distributor_id= filter_name.id;
      console.log(this.order.assign_distributor_id);
      

    }

    filterdistributor(data,array,index)
    {
      console.log(data);
      console.log(array);
      console.log(index);
      
        this.filter_distributor_list=this.filter(data.toUpperCase(),array,index);
    }
    filterusername(data,array,index)
    {
      this.filter_username=this.filter(data.toUpperCase(),array,index);
    }
    new_array:any=[];
    filter(search_value,search_array,index)
    {
      this.new_array=[];
      for(var i=0; i<search_array.length; i++)
      {
        if(search_array[i][index].toUpperCase().search(search_value) !==-1)
        {
          this.new_array.push(search_array[i]);
        }
      }
      return this.new_array;  
    }
  }
  