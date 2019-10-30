import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  animations: [slideToTop()]
})
export class ProductListComponent implements OnInit {
  product_data:any=[];
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any='';
  pagenumber:any='';
  count:any='';
  product_total_count:any=[];
  select_product_data:any=[];
  filter:any=false;
  category_list:any=[];
  subcategory_list:any=[];
  temarry:any=[];
  tem_sub:any=[];
  series_list:any=[];
  tem_series:any=[];
  model_list:any=[];
  tem_model:any=[];
  tem_productdata:any=[];
  loader:any="";
  sendRequest:any=true;
  
  data:any={};
  constructor(public service:MyserviceService, public router:Router, public dialog:DialogBoxService, public toaster:ToastrManager) 
  {
    this.pagination(100,0,'');
    this.getAllProductType()
  }
  
  pagination(pagelimit:any=100, start:any=0, action:any='')
  {
    this.loader="1";
    console.log(start);
    
    console.log(this.data.category);   
    console.log(this.data.sub_category);   
    console.log(this.data.series);   
    console.log(this.data.product_code);
    
    
    this.page_limit = parseInt(pagelimit);
    this.start = parseInt(start);    
    if(action == "refresh")
    {
      this.search={};
    }
    console.log(this.data);
    
    this.service.get_data({pagelimit:pagelimit,start :start ,search :this.data},'product/product_list	').subscribe((resp)=>
    {
      console.log(resp);
      this.sendRequest=false;
      this.loader="";
      this.product_data=resp['data'];
      
      console.log(this.product_data);
      
      this.tem_productdata=this.product_data;
      // this.product_total_count=resp['data']['total_count'];
      // console.log(this.product_total_count);
      this.count = resp['count'];
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      console.log(this.count);
    },
    error=>
    {
      console.log("error");
      
    });
  }
  
  productType:any=[]
  getAllProductType()
  {
    this.loader=true;
    this.service.get_data("","product/getAllProductTypes").subscribe((result)=>{
      console.log(result);
      this.loader=false;
      this.productType=result['data'];
    })
    
  }
  
  
  
  delete(id)
  {
    console.log(id);
    
    this.dialog.delete("Product").then((result) => {
      if(result)
      {
        this.loader=true;
        let value={'id':id}
        this.service.get_data(value,'product/delete_product').subscribe((resp)=>
        {
          this.loader=false;
          console.log(resp['msg']='success');
          if(resp)
          {
            this.toaster.successToastr("Deleted","Success");
            this.pagination();
          }
          
        })
      }
      
    })
    
  }
  
  OpenFilter()
  {
    this.filter=true;    
  }
  closeFilter()
  {
    this.filter=false;
  }
  
  ngOnInit() {
    // this.getGategory();
    // this.getSubGategory();
    // this.getSeries();
    // this.getModelcode();
  }
  
  // getGategory(){
  //   this.service.get_data(0,"Product_filter/category").subscribe((response)=>{
  //     this.category_list=response;
  //     console.log(this.category_list);
  //     this.temarry=response;
  
  //   });
  // }
  
  // getSubGategory(){
  //   this.service.get_data(0,"Product_filter/sub_category").subscribe((response)=>{
  //     this.subcategory_list=response;
  //     console.log(this.subcategory_list);
  //     this.tem_sub=response;
  
  //   });
  // }
  // getSeries(){
  //   this.service.get_data(0,"Product_filter/series").subscribe((response)=>{
  //     this.series_list=response;
  //     console.log(this.series_list);
  //     this.tem_series=response;
  
  //   });
  // }
  // getModelcode(){
  //   this.service.get_data(0,"Product_filter/modelcode").subscribe((response)=>{
  //     this.model_list=response;
  //     console.log(this.model_list);
  //     this.tem_model=response;
  
  
  //   });
  // }
  
  // category_array_filter(data,array,index_val)
  // {
  //   this.temarry=this.filterList(data.toUpperCase(),array,index_val);
  // }
  
  // sub_category_array_filter(data,array,index_val)
  // {
  //   this.tem_sub=this.filterList(data.toUpperCase(),array,index_val);
  // }
  
  // series_array_filter(data,array,index_val)
  // {
  //   this.tem_series=this.filterList(data.toUpperCase(),array,index_val);
  // }
  
  // model_array_filter(data,array,index_val)
  // {
  //   this.tem_model=this.filterList(data.toUpperCase(),array,index_val);
  // }
  
  new_array:any=[];
  filterList(search_word,search_array,index_val)
  {
    this.new_array=[];
    for(var i=0; i<search_array.length; i++)
    {
      if(search_array[i][index_val].toUpperCase().search(search_word) !==-1)
      {
        this.new_array.push(search_array[i]);
      }
    }
    return this.new_array;
  }
  
  refresh()
  {
    this.loader="1";
    this.pagination();
  }
  
  
}
