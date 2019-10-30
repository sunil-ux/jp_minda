import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Location } from '@angular/common';
import { UpdateVendorComponent } from '../update-vendor/update-vendor.component';
import { ToastrManager } from 'ng6-toastr-notifications';



@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html'
})
export class VendorDetailComponent implements OnInit {
  
  vendor_id:any;
  loader:any=false;
  editProductDeal:any=false;
  allProductType:any=[];
  
  constructor(public db: MyserviceService, private route: ActivatedRoute, private router: Router,
    public matDialog: MatDialog,  public dialog: DialogBoxService,public _location:Location,public toaster:ToastrManager) { }
    
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.vendor_id = params['id'];
        
        if (this.vendor_id) {
          this.getVendorDetails(this.vendor_id); 
          
        }   
      }); 
      //console.log(this.vendor_id);
    }
    
    locationBack()
    {
      this._location.back();
    }
    vendorDetail:any={};
    getVendorDetails(vendor_id) 
    {
      console.log(vendor_id);
      this.loader=true;
      this.db.get_data( {vendor_id:vendor_id}, 'Vendor/getVendorDetails')
      .subscribe(result => {
        this.loader=false;
        console.log(result);
        
        this.vendorDetail = result['data'];
        // this.loading_list = true;        
      },err => { 
        // this.dialog.retry().then((result) => { this.getVendorDetails(vendor_id); }); 
      });
    }
    
    editBasicDetail(value,action)
    {
      console.log(value);
      const dialogRef=this.matDialog.open(UpdateVendorComponent,
        {
          width:'400px',
          data:
          {
            value,
            action,
            id:this.vendor_id
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.getVendorDetails(this.vendor_id);
          });
    }

    cp_edit(cp_data,type)
    {
      console.log(cp_data);
      const dialogRef=this.matDialog.open(UpdateVendorComponent,
        {
          width:'800px',
          data:
          {
            name:cp_data.name,
            phone1:cp_data.phone1,
            phone2:cp_data.phone2,
            id:cp_data.id,
            vendor_id:cp_data.vendor_id,
            type
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.getVendorDetails(this.vendor_id);
          });
    }
        
    delete_cp(cp_id)
    {
      console.log(cp_id);
      this.dialog.delete("Contact").then((result) => {
        if(result)
        {
          this.db.get_data({vendor_id:cp_id},'Vendor/delete_cp_data').subscribe((resp)=>
          {
            console.log(resp);
            
            if(resp)
            {
              this.toaster.successToastr("Deleted","Success");
              this.getVendorDetails(this.vendor_id);
              
            }
          });
        }
      });    
    }
        
    cp_add(lead_id,type)
    {
      const dialogRef=this.matDialog.open(UpdateVendorComponent,
        {
          width: '800px',
          data:
          {
            id:lead_id,
            type
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.getVendorDetails(this.vendor_id);
          });
    }
            
    edit_address(lead_id,action)
    {
      const dialogRef=this.matDialog.open(UpdateVendorComponent,
        {
          width: '700px',
          data:
          {
            state: this.vendorDetail.state,
            district: this.vendorDetail.district,
            city: this.vendorDetail.city,
            pincode: this.vendorDetail.pin_code,
            address: this.vendorDetail.address,
            id:lead_id,
            action
          }
        });
        dialogRef.afterClosed().subscribe(result => 
          {
            console.log(result);
            this.getVendorDetails(this.vendor_id);
          });
    }
                
    getProductType()
    {
      this.loader=true;
      this.db.get_data("","product/getAllProductTypes").subscribe((result)=>{
        console.log(result);
        this.loader=false;
        this.allProductType = result['data'];
        
        for (let i = 0; i < this.allProductType.length; i++)
        {
          for(let j=0;j<this.vendorDetail.type_assigned.length;j++)
          {
            if(this.allProductType[i].name==this.vendorDetail.type_assigned[j].type)
            {
              this.allProductType[i].exist=true;
            }
          }
          
        }
        console.log(this.allProductType);
        
      })
    }
    
    selectProductType(index,event)
    {
      if(event.checked)
      {
        console.log("checked");
        
        this.allProductType[index].exist=true;
      }
      else
      {
        console.log("unchecked");
        
        this.allProductType[index].exist=false;
      }
    }
    
    saveSelectedProdectType()
    {
      console.log(this.allProductType);
      
      let value =[];
      
      for(let i=0;i<this.allProductType.length;i++)
      {
        if(this.allProductType[i].exist==true)
        {
          value.push(this.allProductType[i].name);
        }
      }
      console.log(value);
      
      this.loader=true;
      this.db.get_data({assigned_product_type:value,vendor_id:this.vendor_id},"Vendor/vendor_product_type_update").subscribe((result)=>{
        console.log(result);
        if(result['msg']=='success')
        {
          this.editProductDeal=false;
          this.getVendorDetails(this.vendor_id);
          this.toaster.successToastr("Update SuccessFully")
        }
        else
        {
          this.dialog.error("Some Thing Went wrong");
        }
      })
    }
                
}
              