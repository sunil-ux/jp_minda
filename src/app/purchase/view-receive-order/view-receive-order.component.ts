import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-view-receive-order',
  templateUrl: './view-receive-order.component.html',
  styleUrls: ['./view-receive-order.component.scss']
})


export class ViewReceiveOrderComponent implements OnInit {

  itemData:any=[];

  constructor(@Inject(MAT_DIALOG_DATA)  public data: any,public service:MyserviceService) { 
    console.log(data);
    if(data)
    {
      this.viewItemDetail(data.id)
    }
    
  }

  ngOnInit() {
  }

  viewItemDetail(id)
  {
    this.service.get_data({id:id},"Purchase/recieve_detail").subscribe((result)=>{
      console.log(result);
        this.itemData=result['all_receive_item'];
    })
  }

}
