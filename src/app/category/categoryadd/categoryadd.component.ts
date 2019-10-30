import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.scss']
})
export class CategoryaddComponent implements OnInit {
  
  categoryData:any={}
  loader:any=false;
  categorySeriesDataArray:any=[];
  seriesData:any=[];
  
  label:any;
  constructor(@Inject(MAT_DIALOG_DATA)  public data: any,public dialog:MatDialog,public toast:ToastrManager,public service:MyserviceService) { 
    
    this.label=data.label;
    this.categoryData.catName=data.catName;
    if(data.subCat)
    {
      this.categoryData.subCatName=data.subCat
    }
    console.log(data);
    
    this.categoryData.type='sub_category'
  }
  
  ngOnInit() {
  }
  
  addSubCategory()
  {
    console.log(this.categoryData.sub_category.toLowerCase());
    
    let exist=this.categorySeriesDataArray.findIndex(row=>row.sub_category_name.toLowerCase()==this.categoryData.sub_category.toLowerCase() || row.series_name.toLowerCase()==this.categoryData.series.toLowerCase());
    console.log(exist);
    
    if(exist == -1)
    {
      this.categorySeriesDataArray.push({'sub_category_name':this.categoryData.sub_category,'series_name':this.categoryData.series});
      console.log(this.categorySeriesDataArray);
      this.categoryData.sub_category='';
      this.categoryData.series='';
    }
    else
    {
      this.toast.errorToastr("Sub Category & Series already Exist");
    }
  }
  
  deleteCategory(i)
  {
    this.categorySeriesDataArray.splice(i,1)
  }
  
  addSeries()
  {
    console.log(this.categoryData);
    
    let exist=this.seriesData.findIndex(row=>row.series_name.toLowerCase()==this.categoryData.series.toLowerCase())
    
    if(exist == -1)
    {
      this.seriesData.push({'series_name':this.categoryData.series});
      console.log(this.seriesData);
      
      this.categoryData.series='';
    }
    else
    {
      this.toast.errorToastr("Series already Exist");
    }
  }
  
  deleteSeries(i)
  {
    this.seriesData.splice(i,1);
  }
  
  error:any=false;
  saveSubCategory()
  {
    let data:any={};
    this.error=false;
    
    this.loader=true
    
    if(this.categoryData.type=='sub_category')
    {
      
      
      if(this.categorySeriesDataArray.length==0 && this.categoryData.sub_category)
      {
        console.log(this.categoryData.sub_category);
        this.categorySeriesDataArray.push({'sub_category_name':this.categoryData.sub_category,'series_name':this.categoryData.series})
      }
      
      data={from:'category','sub_category_array':this.categorySeriesDataArray,'category_name':this.categoryData.catName};
    }
    if(this.categoryData.type=='series')
    {
      if(this.seriesData.length==0 && this.categoryData.series)
      {
        this.seriesData.push({'series_name':this.categoryData.series})
      }
      data={from:'category','series_array':this.seriesData,'category_name':this.categoryData.catName};
    }
    
    console.log(data);
    
    if((this.categoryData.type=='sub_category' && this.categorySeriesDataArray.length!=0) || (this.categoryData.type=='series' && this.seriesData.length!=0))
    {
      this.service.get_data({'data':data},"master_product/new_category_series_add").subscribe((result)=>{
        console.log(result);
        this.loader=false
        if(result['message']=='success')
        {
          this.toast.successToastr("Sub Category Add SuccessFully");
          this.dialog.closeAll();
        }
        else
        {
          this.toast.errorToastr("Something Went Wrong")
        }
      })
    }
    else
    {
      this.loader=false;
      // this.toast.errorToastr("Something Went Wrong")
      this.error=true;
    }
  }
  
  saveSeries()
  {
    this.error=false;
    
    this.loader=true
    if(this.seriesData.length==0 && this.categoryData.series)
    {
      this.seriesData.push({'series_name':this.categoryData.series})
    }
    
    let data={from:'sub_category',category_name:this.categoryData.catName,sub_category_name:this.categoryData.subCatName,series_array:this.seriesData}
    console.log(data);
    if(this.seriesData.length!=0)
    {
      this.service.get_data({'data':data},"master_product/new_category_series_add").subscribe((result)=>{
        console.log(result);
        this.loader=false
        if(result['message']=='success')
        {
          this.toast.successToastr("Sub Category Add SuccessFully");
          this.dialog.closeAll();
        }
        else
        {
          this.toast.errorToastr("Something Went Wrong")
        }
      })
    }
    else{
      this.loader=false
      this.error=true;
    }
  }
  
}
