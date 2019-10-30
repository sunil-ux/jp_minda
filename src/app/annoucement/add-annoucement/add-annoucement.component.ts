import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { Router } from '@angular/router';
import { AnnoucementListComponent } from '../annoucement-list/annoucement-list.component';

@Component({
  selector: 'app-add-annoucement',
  templateUrl: './add-annoucement.component.html',
  animations: [slideToTop()]
})
export class AddAnnoucementComponent implements OnInit {
data:any={};
loader:any="";

  constructor(public service:MyserviceService, public dialog:DialogBoxService, public router:Router) 
  { 
    this.data.network_type = 'Distributor';
    this.data.action_type = 'SMS';
  }

  submit()
  {
    console.log(this.data);
    this.loader="1";
    this.service.get_data(this.data,'annoucement/add_annoucement').subscribe((resp)=>
    {
      console.log(resp);
      this.loader="";
      if(resp)
      {
        this.dialog.success("Success","Updated");
        this.router.navigate(['/annoucement-list']);
        this.data=[];
      }
      
    },error =>{
      console.log(error);
      this.dialog.error('Something went wrong !!! Try Again...');
    });
    
  }

  ngOnInit() {
  }

}
