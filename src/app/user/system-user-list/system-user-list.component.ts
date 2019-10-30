import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';

@Component({
  selector: 'app-system-user-list',
  templateUrl: './system-user-list.component.html',
  animations: [slideToTop()]
})
export class SystemUserListComponent implements OnInit {
  user_list:any=[];
  user_data:any=[];
  loader:any="1";
  search: any={};
  
  constructor(public service:MyserviceService, public router:Router, public toastr:ToastrManager, public dialog:DialogBoxService) 
  { 
    this.getSaleUserList();
  }
  
  ngOnInit() 
  {
    
  }
  
  user_detail(id)
  {
    console.log(id);
    
    this.service.get_data(id,'user/get_user_detail').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.user_data = resp;
      }
    });
    
  }
  
  delete(id)
  {
    console.log(id);
    this.dialog.delete("User").then((result) => {
      if(result)
      {
        this.service.get_data(id,'user/delete_system_user').subscribe((resp)=>
        {
          console.log(resp);
          if(resp)
          {
            this.toastr.successToastr("Success","Deleted");
            this.getSaleUserList();
          }
        });
      }
    });
    
  }
  
  getSaleUserList()
  { 
    let user_type = "SYSTEM USER";
    this.loader=true;
    this.service.get_data({'user_type':user_type,'search':this.search},'user/get_user_list').subscribe((result)=>
    {
      this.loader=false;
      console.log(result);
      this.user_list=result;
      for(var i=0;i<this.user_list.length;i++)
      {
        this.user_list[i]["show"]=true;
      }
    });
  }
  
  active:any = {};
  hide:true;
  
  toggleterritory(key,arr)
  {
    console.log(arr);
    console.log(key);
    if(key == true)
    {
      arr["show"]=false;
    }
    if(key == false)
    {
      arr["show"]=true;
    }
    console.log(this.active);
  }
}
