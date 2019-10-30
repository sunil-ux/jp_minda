import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  animations: [slideToTop()]
})
export class AddPaymentComponent implements OnInit {
  loader:any = false;
  user_list: any=[];
  data:any={};
  currentDate:any = new Date().toJSON().split('T')[0];

  constructor(public service:MyserviceService, public router:Router, public toastr:ToastrManager,public dialog:DialogBoxService) {
  }
  
  ngOnInit() {

    this.data.dr_type=1;
    this.getUserList(1);
  }
  filter_userlist:any=[]; 
  getUserList(dr_type)
  {
    console.log(dr_type);
    this.service.get_data({'type':dr_type},'order/get_customer_name').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.loader = false;
        this.user_list=resp;
        this.filter_userlist=this.user_list;
      }
    })
  }
  filterusername(data,array,index)
    {
      this.filter_userlist=this.filter(data.toUpperCase(),array,index);
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
  
  validate(event:any)
  {
    const pattern = /^[0-9]+$/;
    let inputChar = String.fromCharCode(event.charCode);if (event.keyCode != 8 && !pattern.test(inputChar))
    {event.preventDefault();}
  }

  transactionID(event:any)
  {
    const pattern = /^[0-9a-zA-Z]+$/;
    let inputChar = String.fromCharCode(event.charCode);if (event.keyCode != 8 && !pattern.test(inputChar))
    {event.preventDefault();}
  }

  UsersName(name)
  {
    console.log(name);
    let filter_data = this.filter_userlist.filter(x=>x.name==name)[0];
    this.data.new_dr_id=filter_data.id;
  }

  submit(dr_type)
  {
    console.log(this.data);
    this.data['dr_type'] = dr_type;
    this.service.get_data({'data':this.data},'order/save_payment').subscribe((resp)=>
    {
      console.log(resp);
      if(resp!='error')
      {
        this.loader="";
        this.toastr.successToastr("Success","Inserted");
        this.router.navigate(['/order-master-module/payment-list/1']); 
      }
      else
      {
        this.dialog.error('Something went wrong !!! Try Again...');
      }
    },error =>{
      console.log(error);
      this.dialog.error('Something went wrong !!! Try Again...');
    }); 
  }
  
}
