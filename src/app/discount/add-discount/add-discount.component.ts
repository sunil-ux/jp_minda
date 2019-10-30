import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  animations: [slideToTop()]
})
export class AddDiscountComponent implements OnInit {
form:any={};
category_data:any=[];
flat_discount_data:any={};
loader:any=1;

  constructor(public service:MyserviceService, success_msg:DialogBoxService, public dialog:DialogBoxService, public router:Router, public toastr:ToastrManager) 
  {
    // this.loader=1;
    this.form.discount_type = "CATEGORY";
    this.get_category();
  }

  ngOnInit() {
  }


  get_category()
    {
      console.log(this.form);
      
        this.service.get_data(this.form,'discount/master_discount_category_list')
        .subscribe((resp:any)=>
        {
          this.loader='';
            console.log(resp);
            this.category_data=resp; 
            this.flat_discount_data=resp[0];
            console.log(this.category_data);
            console.log(this.flat_discount_data);
            
            
        });
    }

  submit()
  {
    console.log(this.category_data);

    if(this.form.discount_type=='CATEGORY')
    {
      for(var i=0; i<this.category_data.length; i++)
      {
        this.category_data[i].discount_type = this.form.discount_type;
        console.log(this.category_data[i].discount_type);

      }
    }
    
    // else if(this.form.discount_type == 'FLAT DISCOUNT')
    // {
    //   for(var i=0; i<this.category_data.length; i++)
    //   {
    //     this.category_data[i].distributors = this.form.distributors;
    //     this.category_data[i].direct_dealers = this.form.direct_dealers;
    //     this.category_data[i].discount_type = this.form.discount_type;
    //   }
    // }
    
    console.log(this.category_data);

    // return false;
    this.loader='1';
    this.service.get_data(this.category_data,'discount/master_discount').subscribe((resp)=>
    {
      console.log(resp);
      this.loader='';
      if(resp)
      {
        this.get_category();
        // this.dialog.success("Success","Updated");
        this.toastr.successToastr("Success","Updated");
        this.category_data='';
        this.form.distributors='';
        this.form.direct_dealers='';
        this.router.navigate(['/discount-list']);
      }
      
    });
    
  }

}
