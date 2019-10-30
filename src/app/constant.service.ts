import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }

  public server_url: string = 'http://jpmgrp.abacusdesk.com/jpm/';
  public upload_url: string = 'http://jpmgrp.abacusdesk.com/jpm/uploads/';
}
