import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { MyserviceService } from 'src/app/myservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogBoxService } from 'src/app/dialog-box.service';
import * as $ from 'jquery';




@Component({
  selector: 'app-territory-detail',
  templateUrl: './territory-detail.component.html',
  animations: [slideToTop()],
})
export class TerritoryDetailComponent implements OnInit {
  loader: string;
  states: any;
  form:any={};
  districts: any=[];
  pincodes: any=[];
  valid: boolean;
  finalPincodesDetailArr: any=[];
  isAnyStateSelected:boolean = false;
  isAnyDistrictSelected:any = false;
  isAnyPincodeSelected:any = false;
  distinctSelectedState: any=[];
  data:any={};
  territory_id: any;

  
    constructor(public route:ActivatedRoute,public router:Router,public service:MyserviceService,public browser:BrowserAnimationsModule,public toaster:ToastrManager, public dialog:DialogBoxService) 
    { 
  
      this.route.params.subscribe(data=>
      {
        this.territory_id = data.id;
        console.log("territory id : "+this.territory_id);
        this.get_territory_data();
      });
      this.get_state();      
    }


    ngOnInit() {
    }
    
    get_territory_data()
    {
      this.service.get_data(this.territory_id,'Territory_master/edit_territory_data').subscribe((resp)=>
      {
        console.log(resp);      
        this.finalPincodesDetailArr = resp['data']['selected_data'];   
        this.form.territory_name = resp['data']['territory']['territory_name'];   
        this.form.territory_id = resp['data']['territory']['id'];       
      });
    }
    
    get_state()
    {
      this.service.get_data(0,'Territory_master/getStates').subscribe((result)=>
      {
        console.log(result);
        this.loader='';
        this.states=result['data'];  
        console.log(this.states);
        this.isAnyDistrictSelected=false;

        this.isAnyStateSelected=false;

        this.isAnyPincodeSelected=false;
        
      }); 
    }

    active: any = {};
    toggleterritory(key, action)
    {
        console.log(action);
        console.log(key);
        if (action === 'open')
        {
           this.active[key] = true;
  
           $('#'+key).focus();
        }
  
        if (action === 'close')
        {
           this.active[key] = false;
        }
  
        console.log(this.active);
    }
    
    allState(){
      if( !this.form.allStates ){
        for (let i = 0; i < this.states.length; i++) {
          this.states[i].selected = false;
        }
      }else{
        for (let i = 0; i < this.states.length; i++) {
          this.states[i].selected = true;
        }
      }
      this.getAllDistrictList();
    }
  
    getAllDistrictList()
    {
      this.loader='';
      console.log(this.states);
      console.log(this.districts);
      
      this.service.get_data( { 'state': this.states,'district':this.districts }, 'Territory_master/getMultipleDistrict')
      .subscribe(d => { 
        console.log(d);
        // this.loader = 1;
        this.districts = d['data'];
        console.log(this.districts);
        // this.getPincodeList();
  
      this.stateCheckedHandler();
      });
    }
    
    getDistrictList(index)
    {
      console.log(index);
      this.loader='1';
      if(this.states[index]['selected']==true)
      {
        
        console.log(this.states);
        
        this.service.get_data( { 'state': this.states[index]['state_name'] }, 'Territory_master/getMultipleDistrict')
        .subscribe(d => { 
          console.log(d);
          
          if(this.districts && this.districts.length)
          {
            console.log("exist");
            
            let disindex = this.districts.findIndex(x=>x.state_name===d['data']['state_name']);
            console.log(disindex);
            
            if(disindex!=-1)
            {
              this.districts[disindex] = d['data'];
            }
            else
            {
              this.districts.push(d['data']);
            }
          }
          else
          {
            console.log(" not exist");
  
            this.districts.push(d['data']);
          }
          console.log(this.districts);
          
          
          this.loader = '';
          
        });
      }
  
      else
      {
        if(this.districts && this.districts.length)
        {
          console.log("exist");
          
          let disindex = this.districts.findIndex(x=>x.state_name===this.states[index]['state_name']);
          if(disindex!=-1)
          {
            this.districts[disindex]['districts'] = [];
            this.districts[disindex]['selected'] = false;
            this.getAllPincodeList();
          }
        }
        this.loader='';
      }
      
      this.stateCheckedHandler();
    }
  
    stateCheckedHandler() 
    {
  
      let isChecked = false;
  
      for (let index = 0; index < this.states.length; index++) {
           
            if(this.states[index].selected) {
                 isChecked = true;
            }
      }
  
      this.isAnyStateSelected = isChecked;
    }
    
    
    
    allDistrict()
    {
      this.loader='1';
      if( !this.form.allDistrict ){
        for (let i = 0; i < this.districts.length; i++) {
          this.districts[i].stateWiseDistrict = false;
          if(this.districts[i].selected){
            for (let x = 0; x < this.districts[i].districts.length; x++) {
              this.districts[i].districts[x].selected = false;
              this.form.allDistrict =  this.districts[i].districts[x].selected;
            }
          }
        }
      }else{
        for (let i = 0; i < this.districts.length; i++) {
          this.districts[i].stateWiseDistrict = true;
          
          if(this.districts[i].selected){
            for (let x = 0; x < this.districts[i].districts.length; x++) {
              this.districts[i].districts[x].selected = true;
            }
          }
        }
      }
      this.getAllPincodeList();    
    }
    
    allStateWiseDistrict(index)
    {
      this.loader='1';
      for (let x = 0; x < this.districts[ index ].districts.length; x++) {
        if( this.districts[ index ].stateWiseDistrict == true ){
          this.districts[ index ].districts[x].selected = true;
        }else{
          this.districts[ index ].districts[x].selected = false;
        }
      }
      console.log( this.districts );
      this.districtCheckedHandler();
      this.getAllPincodeList();
    }
  
    getAllPincodeList()
    {
      console.log(this.districts);
      console.log(this.pincodes);
      this.service.get_data({'district':this.districts,'pincodes':this.pincodes}, 'Territory_master/getMultiplePincode')
      .subscribe(d => { 
        console.log(d);
        this.pincodes = d['data'];
        this.loader='';
        
      });
    }
  
    
    getPincodeList(sindex:any='',dindex:any='')
    {
      this.loader='1';
      console.log('s index' + sindex);
      console.log('d index' + dindex);
  
      console.log(this.districts[sindex]['districts'][dindex]);
      
      if(this.districts[sindex]['districts'][dindex]['selected']==true)
      {
        this.service.get_data( {'state_name':this.districts[sindex].state_name,'district':this.districts[sindex]['districts'][dindex]['district_name'] }, 'Territory_master/getMultiplePincode')
        .subscribe(d => { 
          console.log(d);
          if(this.pincodes && this.pincodes.length)
          {
            let psindex = this.pincodes.findIndex(x=>x.state_name===this.districts[sindex].state_name);
            console.log(psindex);
            if(psindex!=-1)
            {
              console.log("ps exist");
              let pd_index = this.pincodes[psindex]['districts'].findIndex(x=>x.district_name===this.districts[sindex]['districts'][dindex]['district_name']);
              console.log(pd_index);
              console.log(this.pincodes[psindex]['districts']);
              console.log(this.pincodes[psindex]['districts'].length);
  
              if(this.pincodes[psindex]['districts'] && this.pincodes[psindex]['districts'].length)
              {
                
                if(pd_index!=-1)
                {
                  this.pincodes[psindex]['districts'][pd_index]['selected']=true;
                  this.pincodes[psindex]['districts'][pd_index]['pincodes'] = d['data']['districts'][0]['pincodes'];
                }
                else
                {
                  console.log("not exist");
                  console.log(d['data']['districts'][0]['pincodes']);
                  
                  console.log(this.pincodes[psindex]['districts']);
  
                  this.pincodes[psindex]['districts'].push(d['data']['districts'][0]);
                  console.log(this.pincodes[psindex]['districts']);
                  
                }
              }
            }
            else
            {
              this.pincodes.push(d['data']);
            }
          }
  
          else
          {
            this.pincodes.push(d['data']);
          }
          console.log(this.pincodes);
          this.loader='';
          
        });
      }
      else
      {
        this.districts[sindex]['districts'][dindex]['selected']=false;
  
        if(this.pincodes && this.pincodes.length)
        {
          let psindex = this.pincodes.findIndex(x=>x.state_name===this.districts[sindex].state_name);
          console.log(psindex);
          if(psindex!=-1)
          {
            console.log("ps exist");
            let pd_index = this.pincodes[psindex]['districts'].findIndex(x=>x.district_name===this.districts[sindex]['districts'][dindex]['district_name']);
            console.log(pd_index);
  
            if(this.pincodes[psindex]['districts'] && this.pincodes[psindex]['districts'].length)
            {
              
              if(pd_index!=-1)
              {
                console.log("pd index exist");
                this.pincodes[psindex]['districts'][pd_index]['selected']=false;
                this.pincodes[psindex]['districts'][pd_index]['pincodes']=[];
  
              }
              console.log(this.pincodes[psindex]['districts']);
              
            }
          }
        }
        this.loader='';
      }
      console.log(this.districts[sindex]['districts'][dindex]);
      this.districtCheckedHandler();
  
  
    }
  
    districtCheckedHandler() 
    {
  
      let isChecked = false;
  
      for (let index = 0; index < this.districts.length; index++) {
          
          if(this.districts[index].selected) {
  
  
              for (let index1 = 0; index1 < this.districts[index].districts.length; index1++) {
                      
                      if (this.districts[index].districts[index1].selected) {
                          isChecked = true;
                      }
              }
              
          }
      }
  
      this.isAnyDistrictSelected = isChecked;
  
      console.log(this.isAnyDistrictSelected);
    }
  
    
    
    allDistrictWisePincode(sindex,dindex)
    {
      this.loader='1';
      for (let x = 0; x < this.pincodes[ sindex ]['districts'][dindex].pincodes.length; x++) {
        if( this.pincodes[ sindex ]['districts'][dindex].DistrictWisePincode == true ){
          this.pincodes[ sindex ]['districts'][dindex].pincodes[x].selected = true;
        }else{
          this.pincodes[ sindex ]['districts'][dindex].pincodes[x].selected = false;
        }
      }
      
      console.log( this.pincodes );
      this.PincodeCheckedHandler();
      this.loader='';
    }
    
    allPincodes()
    {
      this.loader='1';
      if( !this.form.allPincode ){
        for (let i = 0; i < this.pincodes.length; i++) {
          if(this.pincodes[i]['districts'])
          {
            for(let ij = 0; ij < this.pincodes[i]['districts'].length; ij++)
            {
              
              this.pincodes[i]['districts'][ij].DistrictWisePincode = false;
              if(this.pincodes[i]['districts'][ij] && this.pincodes[i]['districts'][ij].pincodes)
              {
                
                for (let x = 0; x < this.pincodes[i]['districts'][ij].pincodes.length; x++) 
                {
                  this.pincodes[i]['districts'][ij].pincodes[x].selected = false;
                  this.form.allPincode =  this.pincodes[i]['districts'][ij].pincodes[x].selected;
                }
              }
              
            }
          }
        }
      }else{
        for (let i = 0; i < this.pincodes.length; i++) {
          if(this.pincodes[i]['districts'])
          {
            for(let ij = 0; ij < this.pincodes[i]['districts'].length; ij++)
            {
              this.pincodes[i]['districts'][ij].DistrictWisePincode = true;
              if(this.pincodes[i]['districts'][ij] && this.pincodes[i]['districts'][ij].pincodes)
              {
                for (let x = 0; x < this.pincodes[i]['districts'][ij].pincodes.length; x++) 
                {
                  this.pincodes[i]['districts'][ij].pincodes[x].selected = true;
                  this.form.allPincode =  this.pincodes[i]['districts'][ij].pincodes[x].selected;
                }
              }
              
            }
          }
        }
      }
      console.log(this.pincodes);
      this.PincodeCheckedHandler();
      this.loader='';
      
      
    }
  
    SelectPincode()
    {
      this.form.allPincode=false;
      this.PincodeCheckedHandler();
  
    }
  
    PincodeCheckedHandler() 
    {
      let isChecked = false;
      for (let index = 0; index < this.pincodes.length; index++) 
      {
        if(this.pincodes[index].selected) 
        {
          for (let index1 = 0; index1 < this.pincodes[index].districts.length; index1++) 
          {    
            if (this.pincodes[index].districts[index1].selected) 
            {
              for (let index2 = 0; index2 < this.pincodes[index].districts[index1].pincodes.length; index2++) 
              {
                if (this.pincodes[index].districts[index1].pincodes[index2].selected) 
                {
  
                  isChecked = true;
                }
              }
            }
          }   
        }
      }
  
      this.isAnyPincodeSelected = isChecked;
  
      console.log(this.isAnyPincodeSelected);
    }
  
    onFinalPinCodesHandler() 
    {
      this.loader = '1';
      setTimeout(() => 
      {
        for (let index = 0; index < this.pincodes.length; index++) 
        {
          if (this.pincodes[index].selected) 
          {
            for (let index2 = 0; index2 < this.pincodes[index]['districts'].length; index2++) 
            {
              if (this.pincodes[index]['districts'][index2].selected) 
              {
                for (let index3 = 0; index3 < this.pincodes[index]['districts'][index2]['pincodes'].length; index3++)
                {
                  if (this.pincodes[index]['districts'][index2]['pincodes'][index3].selected) 
                  {
                    console.log(this.pincodes[index]);
  
                    console.log(this.pincodes[index]['districts']);
  
                    console.log(this.pincodes[index]['districts'][index2]['pincodes']);
  
                    console.log(this.pincodes[index]['districts'][index2]['pincodes'][index3]['pincode']);
                    console.log(this.finalPincodesDetailArr);
  
                    
                    const isPincodeExist = this.finalPincodesDetailArr.findIndex(x => x.pincode == this.pincodes[index]['districts'][index2]['pincodes'][index3]['pincode']);
                    
                    console.log(isPincodeExist);
                    if(isPincodeExist===-1) 
                    {
                      this.finalPincodesDetailArr.push({state_name: this.pincodes[index].state_name, district_name: this.pincodes[index]['districts'][index2]['district_name'], pincode: this.pincodes[index]['districts'][index2]['pincodes'][index3].pincode});
                    } 
                  }
                }
              }
            }
          }
        }
  
        // push in to datail selected array start
        if(this.finalPincodesDetailArr && this.finalPincodesDetailArr.length) 
        {
          
          for (let finalIndex = 0; finalIndex < this.finalPincodesDetailArr.length; finalIndex++) 
          {
            if(this.distinctSelectedState && this.distinctSelectedState.length)
            {
              const existIndex = this.distinctSelectedState.findIndex(stateName => stateName == this.finalPincodesDetailArr[finalIndex].state_name);
  
              if(existIndex == -1) 
              {
                this.distinctSelectedState.push(this.finalPincodesDetailArr[finalIndex].state_name);
              }  
            }
            else
            {
              this.distinctSelectedState.push(this.finalPincodesDetailArr[finalIndex].state_name);
            }
            
          }
          this.toaster.successToastr("Success","PincodeList Updated");
        } 
        // push in to datail selected array  end
  
        this.loader = '';
        this.districts=[];
        this.pincodes=[];
        this.get_state();
      }, 1000);
    }
  
  
    deleteSelectedPincode(pincodeType, pincodeRowSelected) 
    {
  
      console.log(pincodeType);
  
      this.dialog.delete(pincodeType).then((result) => {
  
          console.log(result);
  
          if(result) {
  
              if(pincodeType == 'Pincode') {
  
                  console.log(pincodeRowSelected);
                  
                  this.finalPincodesDetailArr = this.finalPincodesDetailArr.filter(pincodeRow => pincodeRow.pincode != pincodeRowSelected.pincode);
  
                  console.log(this.finalPincodesDetailArr);
  
              } else if(pincodeType == 'all') {
  
                  this.finalPincodesDetailArr = [];
  
              } else {
  
                  const statePincodeArr = this.finalPincodesDetailArr.filter(pincodeRow =>  pincodeRow.state_name ==  pincodeType);
  
                  this.finalPincodesDetailArr = this.finalPincodesDetailArr.filter(pincodeRow =>  pincodeRow.state_name !=  pincodeType);
  
                  this.distinctSelectedState = [];
                  for (let finalIndex = 0; finalIndex < this.finalPincodesDetailArr.length; finalIndex++){
  
                      const existIndex = this.distinctSelectedState.findIndex(stateName => stateName == this.finalPincodesDetailArr[finalIndex].state_name);
  
                      if(existIndex == -1 && this.finalPincodesDetailArr[finalIndex].state_name) {
                          this.distinctSelectedState.push(this.finalPincodesDetailArr[finalIndex].state_name);
                      }
                  }
              }
  
              this.toaster.successToastr("Success","Deleted");
          }
          
      })
    }
  
  
    onsubmit()
    {
      console.log(this.form);
      this.form.Selecteddata=this.finalPincodesDetailArr;
  
      if(this.finalPincodesDetailArr && this.finalPincodesDetailArr.length && this.form.territory_name && this.form.territory_id){
        this.valid=true;
        console.log(this.form);
        this.service.get_data(this.form,'Territory_master/update_territory_data').subscribe((result)=>
        {
          console.log(result);
          
          if(result['data']['territory_name'])
          {
            this.dialog.success("Success",'Inserted');
            this.router.navigate(['/territory-list']);
          }
          else
          {
            this.dialog.error('Something went wrong !!! Try Again...');
          }
          
        },error =>{
          console.log(error);
          this.dialog.error('Something went wrong !!! Try Again...');
        });
      }
      else 
      {
        this.valid=false;
        this.dialog.error("All the fields are required");
        
        // console.log(this.valid);
      }
    } 
    
    
  }
  