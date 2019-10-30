import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { MatDialog,MatDialogConfig } from '@angular/material';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  animations: [slideToTop()]
  
})
export class RoleListComponent implements OnInit {
  role_list: any=[];
  rolelistlength: any;
  loader:any='';
  search: any={};
  constructor(public service:MyserviceService, public dialogs: MatDialog,public toaster:ToastrManager, public dialog:DialogBoxService,) { 
    this.getRoleList();
  }
  
  ngOnInit() {
  }
  
  getRoleList(){
    this.loader=1;
    
    this.service.get_data({'search':this.search},'role/role_list')
    .subscribe((resp:any)=>{
      console.log(resp);
      this.loader='';
      this.role_list = resp['list'];
      this.rolelistlength=this.role_list.length;
      console.log(this.rolelistlength);
      
      console.log(this.role_list);
      // console.log(this.role_list[0]['modules'][0]['permission_array'][0]['action_name']);
      
    });
  }
  
  // update module function
  openAddModulesDialog(role_index,module_index,role_id,module_id,type)
  {
    console.log(module_index);
    console.log(role_id);
    console.log(module_id);
    console.log(type);
    this.service.get_data({'role_id':role_id},'role/get_notused_role_modules')
    .subscribe((result:any)=>{
      console.log(result);
      if(result!='failed')
      {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {role_id:role_id,module_id:module_id,modules_array:result['modules_array']};
        const dialogRef=this.dialogs.open(DialogBodyComponent,
          {
            width:'350px',
            data:
            {
              role_id:role_id,
              module_id:module_id,
              modules_array:result,
              type
            }
          });
          dialogRef.afterClosed().subscribe(result => 
            {
              console.log(result);
              if(result && result.message=="Success")
              {
                this.role_list[role_index].modules[module_index].modules_array = result.data;
              }
              else if(result && result!="Success")
              {
              }
              
              this.getRoleList();
            });
          }
          else if(result=='failed')
          {
            console.log("can not add permission ");
            this.toaster.warningToastr("Can Not add More Permission to this module","Warning");
          }
          
        },error=>{
          console.log(error);
        });
      }
      //  end
      
      openAddPermissionDialog(role_index,module_index,role_id,module_auto_id,module_id,type)
      {
        // permission_array(action_name , action_id)
        
        console.log(role_id);
        console.log(module_index);
        console.log(module_auto_id);
        console.log(module_id);
        
        this.service.get_data({'role_id':role_id,'module_id':module_id,'module_auto_id':module_auto_id},'role/get_notused_role_module_perission')
        .subscribe((result:any)=>{
          console.log(result);
          if(result!='failed')
          {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {role_id:role_id,module_id:module_id,permission_array:result['data']};
            // dialogConfig.data = {role_id:role_id,module_id:module_id};
            
            const dialogRef=this.dialogs.open(DialogBodyComponent,
              {
                width:'350px',
                data:
                {
                  role_id:role_id,
                  module_id:module_id,
                  module_auto_id:module_auto_id,
                  permission_array:result,
                  type
                }
              });
              dialogRef.afterClosed().subscribe(result => 
                {
                  console.log(result);
                  if(result && result.message=="Success")
                  {
                    this.role_list[role_index].modules[module_index].permission_array = result.data;
                    // this.toaster.successToastr("Updated","Success");
                  }
                  else if(result && result!="Success")
                  {
                    // this.toaster.warningToastr("Something went wrong !!! Try again... ");
                  }
                  
                  this.getRoleList();
                });
              }
              else if(result=='failed')
              {
                console.log("can not add permission ");
                this.toaster.warningToastr("Can Not add More Permission to this module","Warning");
              }
              
            },error=>{
              console.log(error);
            });
          }
          
          
          delete_role(index,id)
          {
            console.log(id);
            this.dialog.delete("Role").then((result) => {
              if(result)
              {
                console.log(result);
                this.role_list.splice(index,1);
                
                this.service.get_data({'id':id},'role/delete_role').subscribe((result)=>
                {
                  console.log(result); 
                  if(result)
                  {
                    this.toaster.successToastr("Deleted","Success");
                    this.getRoleList();
                  }
                });
              }
            });
            
          }
          
          
          delete_role_permission(role_index,module_index,perm_index,role_id,module_id,action_id)
          {
            console.log(perm_index);
            
            this.dialog.delete('Permission ').then((result) => {
              console.log(result);
              if(result)
              {
                let data = {'role_id':role_id,'module_id':module_id,'action_id':action_id};
                console.log(data);
                
                this.service.get_data({'data': data},'role/delete_master_role_permission')
                .subscribe(res => {
                  console.log(res);
                  if(res['message']=='Success')
                  {
                    this.role_list[role_index].modules[module_index].permission_array.splice(perm_index,1);
                    this.toaster.successToastr("Deleted","Success");
                  }
                },err=>{
                  console.log(err);
                  // this.toast.openError('Something went wrong !!! Try again... ','');      
                });
              }
            });
          }
          
          
          delete_role_modules(role_index,module_index,role_id,module_id,action_id)
          {
            console.log(role_id);
            console.log(module_id);
            
            
            this.dialog.delete('Module ').then((result) => {
              console.log(result);
              if(result)
              {
                let data = {'role_id':role_id,'module_id':module_id,'action_id':action_id};
                console.log(data);
                
                this.service.get_data({'data': data},'role/delete_master_role_module')
                .subscribe(res => {
                  console.log(res);
                  if(res['message']=='Success')
                  {
                    this.role_list[role_index].modules.splice(module_index,1);
                    this.toaster.successToastr("Deleted","Success");
                    
                  }
                },err=>{
                  console.log(err);
                  // this.toast.openError('Something went wrong !!! Try again... ','');      
                });
              }
            });
          }
          
          
        }
        