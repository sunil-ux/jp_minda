import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-add-assign-product',
  templateUrl: './add-assign-product.component.html',
  styleUrls: ['./add-assign-product.component.scss']
})
export class AddAssignProductComponent implements OnInit {
  
  assignProductData:any={};
  productData:any=[];
  loader:any;
  drData:any={}

  
  constructor(@Inject(MAT_DIALOG_DATA)  public data: any,public service:MyserviceService,public dialog:MatDialog) {
    console.log(data);
    
    this.drData.productType=[];
    this.drData.drId=data.drId;
    this.drData.type=data.type;
    for(let i=0;i<data.productType.length;i++)
    {
      this.drData.productType.push(data.productType[i].type)
    }
    // this.drData.productType=data.productType;
    if(data.type=='edit')
    {
      this.assignProductData=data.value;
    }
   }
  
  ngOnInit() {
  }
  
  productCodeList:any=[]
  getProductCode(code)
  {
    console.log(code);
    
    if(code.length>3)
    {
      this.loader=true;
      this.service.get_data({product_code:code,dr_id:this.drData.drId,assign_type:this.drData.productType},"Distribution_net/get_unassigned_dr_product_discount_data").subscribe((result)=>{
        console.log(result);
        this.loader=false
        if(result['msg']=='success')
        {
          this.productCodeList=result['data'];
        }
      })
    } 
  }
  
  addToCodeList()
  {
    this.productData.push(this.assignProductData);
    this.assignProductData={};
  }
  
  deleteCodeFromList(index)
  {
    this.productData.splice(index,1)
  }
  
  addAssignProduct()
  {
    this.loader=true;
    // let product_assign_data={}
    let data={dr_id:this.drData.drId,product_assign_data:this.productData}
    this.service.get_data({data:data},"Distribution_net//insert_new_dr_product_discount_assigned_data").subscribe((result)=>{
      console.log(result);
      if(result['msg']='success')
      {
        this.dialog.closeAll();
      }
      this.loader=false;
      
    })
  }

  updateAssignProduct()
  {


    this.loader=true;
    let product_assign_data={product_code:this.assignProductData.product_code,discount_type:this.assignProductData.discount_type,discount_val:this.assignProductData.discount_val}

    let data={dr_id:this.drData.drId,product_assign_data:product_assign_data,id:this.assignProductData.id}
    this.service.get_data(data,"Distribution_net/update_dr_product_discount_assigned_data").subscribe((result)=>{
      console.log(result);
      if(result['msg']='success')
      {
        this.dialog.closeAll();
      }
      this.loader=false;
      
    })
  }
  
  
}
