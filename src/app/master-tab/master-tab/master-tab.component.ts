import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';


@Component({
  selector: 'app-master-tab',
  templateUrl: './master-tab.component.html'
})
export class MasterTabComponent implements OnInit {
  addPermission:any={};
  constructor(public service:MyserviceService) { }

  ngOnInit() {
    this.addPermission = this.service.add_master_permission;
    console.log(this.addPermission);
    
  }

}
