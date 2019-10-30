import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { slideToTop } from '../../router-animation/router-animation.component';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { LoginComponent } from 'src/app/login/login.component';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  // animations: [slideToTop()]
  
})
export class AddRoleComponent implements OnInit {
  form:any={};
  data:any={};
  addRoleForm: FormGroup;
  cart_list_data:any=[];
  module_list:any=[];
  module_action_list: any=[];
  per_arr_for_disable:any=[];
  module_id: any;
  module_name: any;
  action_name: any;
  showError: boolean=false;
  loader:any=1;
  constructor(public router:Router,private formBuilder: FormBuilder,public service:MyserviceService,public toaster:ToastrManager) { 
    this.getModuleList();
  }
  
  ngOnInit() {
    this.addRoleForm = this.formBuilder.group({
      role_name: ['', Validators.required],
      modules_array: [[]],
      search_permission: [[]],

    });
  }
  get d() { return this.addRoleForm.controls; }
  
  getModuleList()
  {
    this.service.get_data({},'role/get_master_modules')
    .subscribe((resp:any)=>{
      this.loader='';
      console.log(resp);
      this.module_list = resp['list'];
      console.log(this.module_list);
    });
  }
  
  getModuleAction(event)
  {
    console.log(event);
    console.log(event.value);  //id of module
    let filterRow= this.module_list.filter(x => x.id == event.value)[0];
    console.log(filterRow);
    // this.module_id=filterRow.id;
    this.service.get_data({'module_id':filterRow.id},'role/get_master_module_actions')
    .subscribe((resp:any)=>{
      console.log(resp);
      // this.showError=false;
      this.module_action_list = resp['list'];
      console.log(this.module_action_list);
    });
  }
  
  //for disable button
  getpermissionvalue(permission)
  {
    console.log(" ia m in permission function!");
    console.log(permission.value);
    if(permission.value){
      this.per_arr_for_disable=permission.value;
    }
  }
  
  charonly(event: any){
    const pattern =/^[a-zA-Z ]+$/;
    let inputChar = String.fromCharCode(event.charCode);if (event.keyCode != 8 && !pattern.test(inputChar))
    {event.preventDefault();}
  }
  
  delete(index)
  {
    console.log("i am in delete function");
    this.cart_list_data.splice(index,1);
    console.log(this.cart_list_data);
  }
  
  addToList(modules)
  {

    console.log(this.addRoleForm.get('search_permission').value);

    let permission_array  = this.addRoleForm.get('search_permission');
    console.log(modules.value);
    console.log(this.cart_list_data);
    console.log(permission_array.value);
    let existindex = this.cart_list_data.findIndex(({ module_id }) => module_id == modules.value); 
    console.log(existindex);
    if(existindex!=-1)
    {
      let temp_perm = [{'action_id':'', 'action_name': 'View'}  ];
      console.log(temp_perm);
      if(permission_array.value && permission_array.value.length>0)
      {
        for(var i=0;i<permission_array.value.length;i++)
        {
          let filterRowPermission = this.module_action_list.filter(x => x.id == permission_array.value[i])[0];
          console.log(filterRowPermission);
          if(filterRowPermission)
          {
            temp_perm.push({'action_id': permission_array.value[i],'action_name':filterRowPermission['action_name']});
          }
          
          console.log(temp_perm);
        }
      }
      this.cart_list_data[existindex]['permission_array']=temp_perm;
      
      //  this.addRoleForm.reset();
    }
    else
    {
      console.log("new push");
      console.log(permission_array.value);
      console.log(this.module_list);
      console.log(modules.value);
      let filterRowCat = this.module_list.filter(x => x.id == modules.value)[0];
      console.log(filterRowCat); //filtered module 
      this.module_id=filterRowCat.id;
      console.log(this.module_id);
      this.module_name= filterRowCat.module_name;
      console.log(this.module_name);
      let temp_perm = [{'action_id':'', 'action_name': 'View'}  ];
      console.log(temp_perm);
      if(permission_array.value && permission_array.value.length>0)
      {
        for(var i=0;i<permission_array.value.length;i++)
        {
          console.log("i am in for loop ");
          console.log(this.module_action_list);
          console.log(permission_array.value);
          console.log(permission_array.value[i]);
          
          let filterRowactionName= this.module_action_list.filter(x => x.id == permission_array.value[i])[0];
          console.log(filterRowactionName);
          if(filterRowactionName)
          { 
            this.action_name=filterRowactionName.action_name;
            console.log(this.action_name);
          }
          
          
          let filterRowPermission = this.module_action_list.filter(x => x.id == permission_array.value[i]);
          temp_perm.push({'action_id': permission_array.value[i],'action_name':this.action_name});
          console.log(filterRowPermission);
        }
      }
      
      let data = {'module_name':this.module_name,'module_id':this.module_id,'permission_array':temp_perm};
      this.cart_list_data.push(data);
      console.log(" i am cart list data ");
      console.log(this.cart_list_data);
    }
    this.module_action_list=[];

    this.addRoleForm.controls['search_permission'].setValue('', {onlySelf: true});       

  }
  
  submitUser() 
  {
    console.log("i am in function");
    this.addRoleForm.controls['modules_array'].setValue(this.cart_list_data);
    console.log(this.addRoleForm.value);
    // this.submitted = true; 
    // this.toast.openError('Something went wrong !!! Try Again...','');
    if (this.addRoleForm.invalid)
    {
      console.log("i am in Invalid");
      this.showError=true;
      return;
    }
    else
    { 
      console.log("i am in else");
      console.log(this.addRoleForm.value);
      this.service.get_data({'data':this.addRoleForm.value},'role/save_role')
      .subscribe((result)=>{
        console.log(result);
        if(result=='Success')
        {
          this.toaster.successToastr("Updated","Success");
          this.router.navigate(['/user-master/role-list']);
        }
      },error=>{
        console.log(error);
      });
    }
  }
  
}