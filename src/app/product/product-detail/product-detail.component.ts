import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material';
import { ConstantService } from 'src/app/constant.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  animations: [slideToTop()]
  
})
export class ProductDetailComponent implements OnInit {
  form:any={};
  product_id:any="";
  product_data:any={};
  features_data:any;
  feature_table_data:any=[];
  image_data:any=[];
  image_url:any;
  loader:any="1";
  val:any={};
  new_arrival:any=false;
  
  constructor(public router:Router, public route:ActivatedRoute, public service:MyserviceService, public constant:ConstantService , private dialog:MatDialog,public _location:Location) 
  {
    // this.get_product_id();
    this.route.params.subscribe(resp=>
      {
        console.log(resp);
        this.product_id=resp['id'];
        console.log(this.product_id);
        if(this.product_id)
        {
          this.get_product_detail();
        }
      });
      
      this.image_url=this.constant.upload_url;
      console.log(this.image_url);
      
    }
    
    locationBack()
    {
      this._location.back();
    }
    
    // set_new_arrival()
    // {
    //   console.log(this.val.new_arrival);
    
    //   this.service.get_data({'new_arrival':this.val.new_arrival,'id':this.product_id },'product_update/set_new_arrival').subscribe((resp:any)=>
    //   {
    //     console.log(resp);
    //   });
    // }
    
    // openEditDialog(dialog_data,id,type)
    // {
    //   // const dialogConfig = new MatDialogConfig();
    //   const dialogRef=this.dialog.open(DialogBodyComponent,
    //     {
    //       data:
    //       {
    //         product_id : this.product_id,
    //         product_val : dialog_data,
    //         product_type : type,
    //         category_id : id
    //       }
    //     });
    
    //     dialogRef.afterClosed().subscribe(result => {
    //       this.get_product_detail();
    //     });
    //   }
    
    get_product_detail()
    {
      this.loader=true;
      let data={id:this.product_id}
      this.service.get_data({data:data},'product/product_detail').subscribe((resp)=>
      {
        console.log(resp);
        if(resp['msg']=='success')
        {
          this.product_data = resp['data'];
        }
        this.loader=false;       
      })
    }
    
    
    // push_in_table()
    // {
    //   console.log(this.form);
    //   let val = JSON.parse(JSON.stringify(this.form));
    //   console.log(val);
    //   this.feature_table_data.push(val);
    //   console.log(this.feature_table_data);
    //   this.form.type='';
    //   this.form.values='';
    //   this.form.feature_price='';
    
    // }
    
    // submit()
    // {
    //   console.log(this.form);
    
    //   this.form.product_id = this.product_id;
    
    //   this.service.get_data(this.form,'product_update/insert_feature_data').subscribe((resp)=>
    //   {
    //     console.log(resp);
    
    //   })
    // }
    
    // delete_table_data(id)
    // {
    //   console.log(id);
    
    //   let value={'id':id}
    //   this.service.get_data(value,'product_update/delete_product').subscribe((resp)=>
    //   {
    //     console.log(resp);
    //     if(resp)
    //     {
    //       this.get_product_detail();
    //     }
    
    //   })
    
    // }
    
    
    
    
    ngOnInit() 
    {
      
    }
    
    // active:any = {};
    // toggleterritory(key,action)
    // {
    //   console.log(action);
    //   console.log(key);
    
    //   if(action == 'open')
    //   { this.active[key] = true; }
    //   if(action == 'close')
    //   { this.active[key] = false;}
    
    //   console.log(this.active);
    // }
    
  }
  