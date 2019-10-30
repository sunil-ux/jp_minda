import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';


@Component({
  selector: 'app-sale-user-list',
  templateUrl: './sale-user-list.component.html',
  animations: [slideToTop()]
  
})
export class SaleUserListComponent implements OnInit {
  user_list:any=[];
  data:any={};
  apple:boolean=false;
  user_data:any=[];
  loader:any="1";  
  search: any={};
  constructor(public service:MyserviceService,public router:Router, public toaster:ToastrManager, public dialog:DialogBoxService) 
  { 
    this.getSaleUserList();
  }
  
  ngOnInit() {
    
  }

  searchRole(role:any)
  {
    console.log(role);
    this.search.role=role;
    console.log(this.search.role);
    this.getSaleUserList();
  }
  
  getSaleUserList()
  { 
    let user_type = "SALES USER";
    console.log(this.search);
    this.loader=true;
    this.service.get_data({'user_type':user_type,'search':this.search},'user/get_user_list').subscribe((result)=>
    {
      this.loader=false;
      console.log(result);
      if(result)
      {
        this.user_list=result;
      }
    });
  }



  delete(id)
  {
    console.log(id);
    this.dialog.delete("User").then((result) => {
      if(result)
      {
        this.service.get_data({'id':id},'user/delete_user_detail').subscribe((result)=>
        {
          console.log(result); 
          if(result)
          {
            this.getSaleUserList();
            this.toaster.successToastr("Deleted","Success");
          }
        });
      }
    });
    
  }
}