import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ConstantService } from 'src/app/constant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';
// import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from  'ng2-image-compress';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    animations: [slideToTop()]
})
export class AddProductComponent implements OnInit {
    
    productData:any={};
    productType:any=[];
    segmentsArray:any=[];
    loader=false;
    product_id:any;
    uploadUrl:any;
    constructor(private renderer: Renderer2, public service:MyserviceService,public dialog:DialogBoxService,public constant:ConstantService,public router:Router, public toaster:ToastrManager, public route:ActivatedRoute,@Inject(PLATFORM_ID) private platformId: Object,public uploadDb:ConstantService) 
    {  
        this.getAllProductType();

        this.route.params.subscribe(resp=>
            {
                console.log(resp);
                this.product_id=resp['id'];
                console.log(this.product_id);
                if(this.product_id !=0)
                {
                    this.uploadUrl=this.uploadDb.upload_url;
                    this.getProductData();
                }
            });
    }
    
    
    ngOnInit() 
    {
    }
    setFocus(form) {
        
        for (let key in form.controls) {
            
            if(form.controls.hasOwnProperty(key)) {
                
                if(form.controls[key].status == 'INVALID') {
                    
                    if (isPlatformBrowser(this.platformId)) {
                        
                        $('#'+key).focus();
                        
                    }
                    
                    return true;
                    
                }
            };
        }
    }

    getProductData()
    {
        this.loader=true;
      let data={id:this.product_id}
      this.service.get_data({data:data},'product/product_detail').subscribe((resp)=>
      {
        console.log(resp);
        if(resp['msg']=='success')
        {
          this.productData = resp['data'];
          if(this.productData.type)
          {
              this.getSegments(this.productData.type)
          }
        }
        this.loader=false;       
      })
    }

    exist:any=false;
    checkCodeExistense(code)
    {
        this.exist=false;
        this.loader=true;
        this.service.get_data({product_code:code},"product/check_code_existence").subscribe((result)=>{
            console.log(result);
            this.loader=false;
            if(result['msg']=='failed')
            {
                this.exist=true;
                this.dialog.error("Product Code Already Exist");
            }
            
        })
    }
    getAllProductType()
    {
        this.loader=true;
        this.service.get_data("","product/getAllProductTypes").subscribe((result)=>{
            console.log(result);
            this.loader=false;
            this.productType=result['data'];
        })
        
    }
    
    getSegments(productType)
    {
        
        let data={type_name:productType}
        this.loader=true;
        this.service.get_data({data:data},"product/getProductSegment").subscribe((result)=>{
            console.log(result);
            this.loader=false;
            if(result['msg']='success')
            {
                this.segmentsArray=result['data'];
            }
            
        })
    }
 
    imgurl:any=[];
 
    selectedFile:any=[];
    filename:any=[];
    select_file(event)
    {

        let files = event.target.files;
        if (files) {
            for (let file of files) {
                console.log(file);
                if(file.type=='image/jpeg')
                {
                    let reader = new FileReader();
                    reader.onload = (e: any) => {
                        
                        console.log(e);
                        
                        this.imgurl.push(e.target.result);
                        console.log(this.imgurl);
                        
                    }
                    reader.readAsDataURL(file);
                }
                else if(file.type=='application/pdf')
                {
                    this.toaster.errorToastr("invalid file Format");
                }
                
            }
            
            
        }
    
      for(var i=0; i<event.target.files.length; i++)
      { 
        if(event.target.files[i].type=='image/jpeg')
        {
        this.selectedFile.push(event.target.files[i]);
        console.log(this.selectedFile);
        this.filename = this.selectedFile[i]['name'];
        }
      }
      
    }
   
    delFile(index)
    {
        this.imgurl.splice(index,1)
      this.selectedFile.splice(index,1);
       
    }

    deleteImage(imgname,i)
    {

        let data={product_id:this.product_id,image_name:imgname}
        this.loader=true;
        this.service.get_data({data:data},"product/delete_product_image").subscribe((result)=>{
            console.log(result);
            this.loader=false;
            if(result['msg']=='success')
            {
                this.productData.image.splice(i,1);
            }
            
        })
    }
    
    formData=new FormData();
    SubbmitProduct()
    {
       
        console.log(this.productData);
        this.loader=true;
        let url;
        if(this.product_id!=0)
        {
            url="product/update_product"
        }
        else
        {
            url="product/add_product"
        }
        this.service.get_data({data:this.productData},url).subscribe((result)=>{
            console.log(result);
            this.loader=false;
            if(result['msg']=='success')
            {
                this.toaster.successToastr("Product Add Success Fully");
                if( this.selectedFile && this.selectedFile.length)
                {
                  for(var i=0; i<this.selectedFile.length; i++)
                  {
                    this.formData.append("image"+i ,this.selectedFile[i],this.selectedFile[i].name);
                  }
                  
                  if(this.product_id!=0)
                  {
                      this.formData.append("product_id",this.product_id);
                  }
                  else
                  {
                    this.formData.append("product_id",result['product_id']);
                  }
                  
                  this.service.upload_image(this.formData,"product/upload_product_image")
                  .subscribe((result:any) =>{
                    console.log(result);
                  },error=>{
                    console.log(error);
                  });
                }
                this.router.navigate(['/product-master/']);
            }
            else
            {
                this.toaster.errorToastr("Some Thing Went Wrong");
            }
        })
        
    }
    
      
}
