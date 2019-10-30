import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading:any="";
  all_lead_count: any;
  all_distnet_count: any;
  todaycheckin_count: any;
  pendingfollowup: any;
  upcoming_followup: any;
  current_monthcheckin: any;
  previousmonthcheckin: any;
  todayattendence: any;
  yesterdayattendence: any;
  latest_checkin: any;
  latest_orders: any;
  executive_info: any;
  no_of_days: any;
  order_count: any;
  dataSource:any;
  dataFormat: string;
  bar_chart_data: any;
  todayleave: any;
  todayexpense: any;
  current_month: any;

  constructor(public service:MyserviceService,public route:ActivatedRoute,public router:Router) {
    this.current_month = moment().format('MMM YYYY');
    console.log(this.current_month);
    this.get_dashboard_data();
   }

  ngOnInit() {
    
  }

  get_dashboard_data()
  {
    this.loading="1";
     
    this.service.get_data({},'Dashboard/dashboarddata')
    .subscribe((result)=>{
      console.log(result);
     
      this.all_lead_count = result['all_lead_count'];
      this.all_distnet_count = result['all_distnet_count'];

      this.todaycheckin_count = result['todaycheckin_count'];
      this.pendingfollowup = result['pendingfollowup'];
      this.upcoming_followup = result['upcoming_followup'];
      this.current_monthcheckin = result['current_monthcheckin'];

      this.previousmonthcheckin = result['previousmonthcheckin'];
      this.todayattendence = result['todayattendence'];
      this.yesterdayattendence = result['yesterdayattendence'];
      this.latest_checkin = result['latest_checkin'];

      this.latest_orders = result['latest_orders'];
      this.executive_info = result['executive_info'];
      this.order_count = result['order_count'];
      this.no_of_days = result['no_of_days'];
      this.bar_chart_data = result['order_bar_chart'];
      this.todayleave = result['todayleave'];
      this.todayexpense = result['todayexpense'];


      console.log(this.bar_chart_data);
    
      let label_category_data = [];

      for(let i=0; i<=this.bar_chart_data[0].bottom_label.length;i++)
      {
        let temp = {'label':this.bar_chart_data[0].bottom_label[i]};
        label_category_data.push(temp);
      }

      let category_series_data =[];
      for(let i=0; i<this.bar_chart_data.length;i++)
      {
        
        let temp1 = {'seriesname':this.bar_chart_data[i].label,'data':this.bar_chart_data[i].values};
        category_series_data.push(temp1);
      }

      console.log(category_series_data);
      
      //bar chart var

      const data = {
        chart: {
          caption: "Current Month Order " + (this.current_month),
          subcaption: "",
          xaxisname: "",
          yaxisname: "",
          formatnumberscale: "1",
          plottooltext:
            "<b>$seriesName</b> : <b>$dataValue</b>",
          theme: "fusion",
          drawcrossline: "1",
        },
        categories: [
          {
            category : label_category_data
          }
        ],
        dataset: category_series_data
      };
    this.dataFormat = "json";
    this.dataSource = data;

    this.loading="";
      
    },error=>{
      console.log("error");
      console.log(error);
    });
  }


  get_attendence_type(val)
  {
    this.router.navigate(['attendance',{'attendence_type':val}]);   
  }

  get_followup_type(val)
  {
    this.router.navigate(['followup-list/1',{'followup_type':val}]);   
  }

  get_lead_type(val)
  {
    this.router.navigate(['lead-master-module',{'lead_user_type':val}]);   
  }

}
