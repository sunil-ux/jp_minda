import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ActivatedRoute } from '@angular/router';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
@Component({
  selector: 'app-distribution-order-list',
  templateUrl: './distribution-order-list.component.html',
  animations: [slideToTop()]

})
export class DistributionOrderListComponent implements OnInit {

  dr_id:any='';
  loader:any="1";
  order:any=[];

  constructor(public service:MyserviceService, public route:ActivatedRoute, public dialog:MatDialog, public toaster:ToastrManager, public alert:DialogBoxService)
{

}  

  ngOnInit() {

    this.route.params.subscribe(resp=>
      {

        console.log(resp);
        
        this.dr_id = resp['id'];
        console.log(this.dr_id);
        if(this.dr_id)this.get_order_detail();
      });

  }

  get_order_detail()
    {
      this.loader=true;
      
      this.service.get_data({'dr_id': this.dr_id},'Distribution_net/distributor_order_list').subscribe((r)=>
      {
        this.loader=false;
        console.log(r);
        this.order = r['order'];
        
      });
    }

}
