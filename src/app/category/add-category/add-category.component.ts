import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  animations: [slideToTop()]
})
export class AddCategoryComponent implements OnInit {
  data:any={};
  data_subcategory:any={};
  data_series:any={};
  category_data:any=[];
  sub_cat_data:any=[];
  tem_category:any=[];
  temp_sub:any=[];
  loader:any="1";
  
  constructor(public service:MyserviceService, public dialog:DialogBoxService, public router:Router,public toaster:ToastrManager) 
  {
    this.data.cat_type='Category';
    this.get_category();
    this.get_sub_category();
    this.loader=1;
  }
  
  ngOnInit() 
  {
  }
  
  get_category()
  {
    this.loader="1";
    this.service.get_data(0,'master_product/master_product_category_list').subscribe((resp:any)=>
    {
      console.log(resp);
      this.category_data=resp;
      this.tem_category=this.category_data;
      this.loader=""; 
    });
  }
  
  get_sub_category()
  {
    this.loader="1";
    console.log(this.data_series.category);
    
    this.service.get_data(this.data_series.category,'master_product/master_product_sub_list').subscribe((resp:any)=>
    {
      console.log(resp);
      this.sub_cat_data=resp;
      this.temp_sub=this.sub_cat_data    
      this.loader="";
    })
  }
  
  get_category_id(category)
  {
    console.log(category);
    
    this.data_subcategory.category_id = this.category_data.filter(x => x.category===category)[0]['id'];
    console.log(this.data_subcategory.category_id);
  }
  
  submit()
  {
    
    console.log(this.data);
    
    if(this.data.cat_type == 'Category')
    {
      this.loader="1";
      this.service.get_data(this.data,'master_product/add_category').subscribe((resp)=>
      {
        console.log(resp);
        if(resp=='Success')
        {
          this.loader="";
          this.data={};
          this.get_category();
          this.toaster.successToastr("Success","Inserted");
          this.router.navigate(['/category-list']);
        }
        else if(resp=='Already Exit')
        {
          this.loader="";
          this.data={};
          this.dialog.error("Category Already Exit");
        }
        
      },error =>{
        console.log(error);
        this.dialog.error('Something went wrong !!! Try Again...');
      });
    }
    
    if(this.data.cat_type == 'Subcategory')
    {
      this.loader="1";
      this.service.get_data(this.data_subcategory,'master_product/add_subcategory').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.data_subcategory={};
          this.toaster.successToastr("Success","Inserted");
          this.router.navigate(['/category-list']);

        }
        else if(resp=='Already Exit')
        {
          this.loader="";
          this.data={};
          this.dialog.error("Sub category Already Exit");
        }
        
      },error =>{
        console.log(error);
        this.dialog.error('Something went wrong !!! Try Again...');
      });
    }
    
    if(this.data.cat_type == 'Series')
    {
      this.loader="1";
      this.service.get_data(this.data_series,'master_product/add_series').subscribe((resp)=>
      {
        console.log(resp);
        if(resp)
        {
          this.loader="";
          this.data_series={};
          this.toaster.successToastr("Success","Inserted");
          this.router.navigate(['/category-list']);
        }
        else if(resp=='Already Exit')
        {
          this.loader="";
          this.data={};
          this.dialog.error("Series Already Exit");
        }
        
      },error =>{
        console.log(error);
        this.dialog.error('Something went wrong !!! Try Again...');
      });
    }
    
  }


  category_array_filter(data,array,index_val)
  {
    this.tem_category=this.filterList(data.toUpperCase(),array,index_val);
  }
  sub_category_array_filter(data,array,index_val)
  {
    this.temp_sub=this.filterList(data.toUpperCase(),array,index_val);
  }

  new_array=[];   
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
  

  
}
