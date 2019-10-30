import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material';

import { DialogBoxService } from 'src/app/dialog-box.service';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { Router } from '@angular/router';
import { CategoryaddComponent } from '../categoryadd/categoryadd.component';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  animations: [slideToTop()]
  
})
export class CategoryListComponent implements OnInit {
  data_category:any=[];
  subcategory_data:any=[];
  series_data:any=[];
  series:any=[];
  
  
  page_limit:any=100;
  start:any=0;
  search:any={};
  total_page:any='';
  pagenumber:any='';
  count:any='';
  category_count:any=[];
  loader:any="1";
  
  constructor(public service:MyserviceService, public toaster:ToastrManager, public alert:DialogBoxService,public dialog:MatDialog,public router:Router)
  {
    this.pagination(50,0,'');
    this.loader=1;
    
    
    // this.service.get_data(0,'master_product/all_series').subscribe((resp)=>
    // {
    //   console.log(resp);
    //   this.series=resp;
    //   this.series_data=resp['series'];
    // })
  }


  refresh()
  {
    this.pagination();
  }
  
  
  
  ngOnInit() 
  {
    
  }
  
  
  pagination(pagelimit:any=100, start:any=0, action:any='')
  {
    console.log(start);
    
    this.page_limit = parseInt(pagelimit);
    this.start = parseInt(start);    
    if(action == "refresh")
    {
      this.search={};
    }

    this.loader=true;
    this.service.get_data({'search':this.search.master,'start':this.start,'pagelimit':this.page_limit},'master_product/category_master_listing').subscribe((resp)=>
    {
      console.log(resp);
      this.loader=false;
      
      this.data_category=resp['data'];
      console.log(this.data_category);
      
      this.category_count=resp['total_count'];
      console.log(this.category_count);
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
  data:any={};

  edit_category(index)
   { 

    // this.router.navigate(['edit-category/'+id])
    // console.log(index);
    this.data_category[index]['active']=true;
  }

  remove_cat_edit_button(index){
    console.log(" i am in function");
    this.data_category[index]['active']=false;
  }


  updatecategory(input,category,id,index)
  {
    this.data={};
    console.log(category);
    console.log(id);
    console.log(index);
    this.data.input_category=input;
    this.data.category=category;

    this.data.id=id;
    
    this.service.get_data({'data':this.data},'master_product/update_category_master').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.toaster.successToastr("Success","Updated");
        this.data_category[index]['active']=false;

        this.pagination();
        // this.data_category[index] = resp;
      }
    })
  }

  
  edit_subcategory(catindex,subcat_index) { 
    console.log(catindex);
    console.log(subcat_index);
    this.data_category[catindex].category_data[subcat_index]['active']=true;
    
  }

  
  remove_subcata_edit_button(catindex,subcat_index){
    console.log(" i am in function");
    this.data_category[catindex].category_data[subcat_index]['active']=false;

  }


  updatesubcategory(category,input,subcategory,sub_id,catindex,subcat_index)
  {
    this.data={};
    console.log(category);
    console.log(subcategory);
    console.log(sub_id);
    this.data.category=category;
    this.data.subcategory=subcategory;
    this.data.input_subcategory=input;

    this.data.sub_id=sub_id;
    
    this.service.get_data({'data':this.data},'master_product/update_category_master').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.toaster.successToastr("Success","Updated");
        this.data_category[catindex].category_data[subcat_index]['active']=false;
        this.pagination();        
      }
    })
  }
  
  edit_series(catindex,subcat_index,series_index) 
  {  

    this.data_category[catindex].category_data[subcat_index]['series_data'][series_index]['active']=true;
    console.log(this.data_category[catindex].category_data[subcat_index]['series_data'][series_index]['active']);
    
  }
  

  remove_series_edit_button(catindex,subcat_index,series_index){
    console.log(" i am in function");
    this.data_category[catindex].category_data[subcat_index]['series_data'][series_index]['active']=false;

  }

  updateseries(category,subcategory,input,series,series_id,catindex,subcat_index,series_index)
  {
    this.data={};
    console.log(category);
    console.log(subcategory);
    console.log(series);
    console.log(series_id);
    
    this.data.category=category;
    this.data.subcategory=subcategory;
    this.data.input_series=input;
    this.data.series=series;
    this.data.series_id=series_id;
    console.log(this.data);
    
    this.service.get_data({'data':this.data},'master_product/update_category_master').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.toaster.successToastr("Success","Updates");
        this.pagination();
        this.data_category[catindex].category_data[subcat_index]['series_data'][series_index]['active']=false;
       
      }
    })
  }
  
  
  
  deleteCategory(name)
  {
    // console.log(category_name);
    
    this.alert.delete("Category").then((result) => 
    {
      if(result)
      {
        this.loader=true
        let data={'from':'category',category_name:name};
        this.service.get_data({data:data},'master_product/new_delete_category').subscribe((resp)=>
        {
          this.loader=false
          console.log(resp);
          if(resp['message']=='success')
          {
            this.toaster.successToastr("Success","Deleted");
            this.pagination();
          }
          
        })
      }
    })
    
  }
  
  delete_sub_category(cat_name,subCate_name)
  {
        
    this.alert.delete("Sub category").then((result) => 
    {
      let data={'from':'sub_category','sub_category_name':subCate_name,'category_name':cat_name};
      if(result)
      {
        this.loader=true

        this.service.get_data({'data':data},'master_product/new_delete_category').subscribe((resp)=>
        {
          this.loader=false
          console.log(resp);
          if(resp['message']=='success')
          {
            this.toaster.successToastr("Success","Deleted");
            this.pagination();
          }
          
        })
      }
    })
  }
  val:any=[];
  delete_series(cat_name,subCate_name,series_name)
  {
    // console.log(series_name, sub_cat, cat);
    
    this.alert.delete("Series").then((result) => 
    {
      if(result)
      {
        this.loader=true
        let data={'from':'series','series_name':series_name,'category_name':cat_name,'sub_category_name':subCate_name}
        this.service.get_data({data:data},'master_product/new_delete_category').subscribe((resp)=>
        {
          console.log(resp);
          this.loader=false
          if(resp['message']=='success')
          {
            this.toaster.successToastr("Success","Deleted");
            this.pagination();
          }
          
        })
      }
    })
    
  }

  addSubCategorySeries(label,catName)
  {
    // this.dialog.open(CategoryaddComponent).afterClosed()
    const dialogRef=this.dialog.open(CategoryaddComponent,
      {
        width: '650px',
        data:
        {
          label,
          catName
        }
      });
      dialogRef.afterClosed().subscribe(result => 
        {
          console.log(result);
          this.pagination()
        });
  }

  addSeries(label,catName,subCat)
  {
    const dialogRef=this.dialog.open(CategoryaddComponent,
      {
        width: '650px',
        data:
        {
          label,
          catName,
          subCat
        }
      });
      dialogRef.afterClosed().subscribe(result => 
        {
          console.log(result);
          this.pagination()
          
        });
  }

  
}
