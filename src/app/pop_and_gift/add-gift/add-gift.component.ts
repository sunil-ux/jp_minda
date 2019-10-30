import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxService } from 'src/app/dialog-box.service';
import { ConstantService } from 'src/app/constant.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'app-add-gift',
    templateUrl: './add-gift.component.html',
    animations: [slideToTop()]
})
export class AddGiftComponent implements OnInit {
    data:any={};
    selectedFile:any=[];
    formData= new FormData();
    pop_id:any=[];
    product_id:any="";
    update_data:any=[];
    image_data:any=[];
    form_data:any=[];
    popgift_id:any=[];
    loader:any=1;
    
    constructor(public service:MyserviceService, public route:ActivatedRoute, public dialog:DialogBoxService,public image_url:ConstantService, public router:Router, public toastr:ToastrManager) 
    {
        // this.loader=1;
        console.log(this.image_url.upload_url);
        this.closeLoader();
        this.route.params.subscribe(resp=>
            {
                console.log(resp);
                this.popgift_id=resp['id'];
                console.log(this.popgift_id);
                if(this.popgift_id)
                {
                    this.update();
                }
            });
            
        } 
        closeLoader()
        {
            this.loader='';
        }
        update()
        {      
            this.service.get_data(this.popgift_id,'pop_gift/select_pop_gift_data').subscribe((resp)=>
            {
                console.log(resp);
                this.update_data=resp;
                if(resp)
                {
                    this.loader='';
                    this.form_data = this.update_data['data'];
                    this.image_data = this.update_data['images'];
                    console.log(this.image_data);
                    this.data = this.form_data;
                    this.data.description = this.form_data.discription;
                    console.log(this.data);
                }
            })
        }
        
        
        ngOnInit() 
        {
          
        }
        
        imageSrc: any={};
        urls = new Array<string>();
        img_upload_func(event)
        {
            // this.urls = [];
            let files = event.target.files;
            if (files) {
                for (let file of files) {
                    let reader = new FileReader();
                    reader.onload = (e: any) => {
                        this.urls.push(e.target.result);
                    }
                    reader.readAsDataURL(file);
                }
            }
            // console.log(data);
            // console.log(data.target.files.length);
            // for(var i=0; i<data.target.files.length; i++)
            // {
            //     this.selectedFile.push(data.target.files[i]);
            // }
            console.log(this.imageSrc); 
            let total_files_size=0;
            
            for(var i=0; i<event.target.files.length; i++)
            {
              const file = event.target.files[i];
              console.log('size', file.size);
              console.log('type', file.type);
              let extension  = file.type.split('/').pop(); 
              console.log(extension);
              console.log(typeof(file.size));
              
              total_files_size = total_files_size + parseInt(file.size);
              if(parseInt(file.size)<=5242880)
              {
                if(extension=='png' || extension=='jpeg' || extension=='jpg' || extension=='gif' || extension=='tif' || extension=='pdf')
                {
                  this.selectedFile.push(event.target.files[i]);
                }
                else
                {
                    this.dialog.error('The file type not allowed!!! Try Again...');
                }
              }
        
              else
              {
                this.dialog.error('The file size not allowed more than 5mb !!! Try Again...');

              }
            }
        
            console.log(total_files_size);
            
            if(total_files_size>5242880)
            {

              this.dialog.error('The file size not allowed more than 5mb !!! Try Again...');
              this.selectedFile=[];
            }
        }
        
        onsubmit()
        {
            console.log(this.data.id);
            this.loader='1';
            if(this.popgift_id)
            {
                this.service.get_data(this.data,'pop_gift/update_data').subscribe((resp)=>
                {
                    console.log(resp);
                    this.pop_id=resp;
                    this.loader='';
                    for(var i=0; i<this.selectedFile.length; i++)
                    {
                        this.formData.append("image"+i,this.selectedFile[i],this.selectedFile[i].name);
                    }
                    
                    this.formData.append('pop_id',this.data.id);
                    
                    this.service.upload_image(this.formData,'pop_gift/insert_pop_image').subscribe((resp)=>
                    {
                        console.log(resp);
                        this.loader='';
                        if(resp)
                        {
                            this.router.navigate(['/pop-gift-master']);
                            this.toastr.successToastr("Success","Updated");
                            this.data={};
                        }
                    });
                },error =>{
                    console.log(error);
                    this.dialog.error('Something went wrong !!! Try Again...');
                });
            }
            else
            {
                console.log(this.data);
                
                this.loader='1';
                this.service.get_data(this.data,'pop_gift/add_pop_gift').subscribe((resp)=>
                {
                    console.log(resp);
                    this.pop_id=resp;
                    
                    for(var i=0; i<this.selectedFile.length; i++)
                    {
                        this.formData.append("image"+i,this.selectedFile[i],this.selectedFile[i].name);
                    }
                    
                    this.formData.append('pop_id',JSON.stringify(this.pop_id));
                    
                    this.service.upload_image(this.formData,'pop_gift/insert_pop_image').subscribe((resp)=>
                    {
                        console.log(resp);
                        this.loader='';
                        if(resp)
                        {
                            this.toastr.successToastr("Success","Inserted");
                            this.router.navigate(['/pop-gift-master']);
                            this.data={};
                        }
                    });
                },error =>{
                    console.log(error);
                    this.dialog.error('Something went wrong !!! Try Again...');
                });
            }
            
            
        }
        
        remove_image(id)
        {
            console.log(" i am in remove image");
            this.dialog.delete("Image").then((result) => {
                if(result)
                {
                    console.log(result);
                    if(result)
                    {
                        this.urls.splice(id,1);
                        this.selectedFile.splice(id,1);
                        this.toastr.successToastr("Success","Deleted");
                    }
                }
            });
        }
        
        delete_image(id,index)
        {
            console.log(" i am in delete image");
            console.log(id);
            this.dialog.delete("Image").then((result) => {
                if(result)
                {
                    console.log(result);
                    if(result)
                    {
                        let value={'id':id}
                        this.service.get_data(value,'pop_gift/delete_image').subscribe((resp)=>
                        {
                            console.log(resp);
                            this.image_data.splice(index,1);
                            this.toastr.successToastr("Success","Deleted");
                        })
                    }
                }
            });
        }
    }
    