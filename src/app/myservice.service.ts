import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  anupam_user:any = {};
  can_active:any = '';
  token_value:any = {};
  tokenInfo:any=[];
  add_master_permission={};
  loader=false;
  constructor(public constant:ConstantService, public http:HttpClient) 
  { 

  }

  get_data(val,fn_name)
  {
    console.log(val);
    this.loader=false;

    this.token_value = JSON.parse(localStorage.getItem('anupam_user'))  || [];

    console.log(this.token_value.token);

    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    header = header.append('Authorization','Bearer ' + this.token_value.token);
    header = header.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http.post(this.constant.server_url+fn_name, JSON.stringify(val), {headers:header});
  }

  upload_image(val,fn_name)
  {
    console.log(val);

    let header = new HttpHeaders();
    header = header.append('Authorization','Bearer ' + this.token_value.token);

    return this.http.post(this.constant.server_url+fn_name, val, {headers:header});
    
  }

  // fetch_data(id,fn_name)
  // {
  //   console.log(id);

  //   let header = new HttpHeaders();

  //   return this.http.get(this.constant.server_url+fn_name+'/'+id, {headers:header});
    
  // }

  get_session(): Observable<any>
  {
    this.anupam_user = JSON.parse(localStorage.getItem('anupam_user')) || [];
    console.log(this.anupam_user);
    return of (this.anupam_user);
  }

  logout_user()
  {
    this.anupam_user = {};
    this.anupam_user.anupam_login = false;
    this.can_active = '';
    localStorage.removeItem('anupam_user');
  }

  private data : any;
  setOption(value)
  {
    this.data = value;
    console.log(this.data);
    
  }
  getOption()
  {
    return this.data;
  }
}
