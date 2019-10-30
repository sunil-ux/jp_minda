import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-annoucement-list',
  templateUrl: './annoucement-list.component.html',
  animations: [slideToTop()]

})
export class AnnoucementListComponent implements OnInit {
  annoucement_data:any=[];
  page_limit:any=10;
  start:any=0;
  search:any={};
  total_page:any='';
  pagenumber:any='';
  count:any='';
  loader:any="1";
  annoucement_total_count:any=[];
  constructor(public service:MyserviceService,public dialog:DialogBoxService,public toastr:ToastrManager) 
  {
    this.pagination(10,0,'');
   }

   pagination(pagelimit:any=10, start:any=0, action:any='')
   {
     console.log(start);
 
     this.page_limit = parseInt(pagelimit);
     this.start = parseInt(start);
 
     // console.log(this.page_limit);
 
     if(action == "refresh")
     {
       this.search={};
     }
     this.service.get_data({'search':this.search.master,'start':this.start,'pagelimit':this.page_limit},'annoucement/get_annoucement_data').subscribe((resp)=>
     {
       console.log(resp);
       this.annoucement_data=resp['list'];
       this.annoucement_total_count=resp['total_count'];
       console.log(this.annoucement_total_count);
       this.count = resp['count'];
       this.total_page = Math.ceil(this.count/this.page_limit);
       this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
       console.log(this.count);
       this.loader="";
     },
     error=>
     {
       console.log("error");
       
     });
   }

   delete(id)
  {
    console.log(id);

    this.dialog.delete("Annoucement").then((result) => {
      if(result)
      {
        console.log(id);
        let value={'id':id}
        this.service.get_data(value,'annoucement/delete_annoucement').subscribe((resp)=>
        {
          console.log(resp);
          if(resp)
          {
            this.toastr.successToastr("Deleted","Success");
            this.pagination();
          }
          
        })
      }
  });    
  }

  refresh()
  {
    this.pagination();
  }

  ngOnInit() {
    
  }

  // showLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     spinner: 'hide',
  //     content: `<img class="rotate h65" src="assets/imgs/gif-loder.svg" />`,
  //     dismissOnPageChange: true
  //   });
  //   this.loading.present();
  // }
  // home()
  // {
  //   this.navCtrl.push(TabsPage);
  // }

}
