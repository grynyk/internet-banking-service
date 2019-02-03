import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import * as moment from 'moment';
import { AnimationComponent } from '../../shared/animationsComponent';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) { }

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartLegend = false;
  public lineChartType: string = 'line';
  public pieChartLegend: boolean = false;
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartLegend: boolean = false;


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
 
  public barChartData:any[] = [
    {data: [36, 59], label: 'Series A'},
    {data: [28, 48], label: 'Series B'}
  ];
  ngOnInit() {
    this.statisticsService.getAll().subscribe((res: any) => {
      console.log(res);
      this.doughnutChartLabels = ['Primary account', 'Savings account'];
      this.doughnutChartData.push(res.primary);
      this.doughnutChartData.push(res.savings);
      this.pieChartLabels = ['Deposits', 'Withdrawals', 'Domestic Transactions', 'External Transactions'];
      this.pieChartData.push(res.deposits[0].all);
      this.pieChartData.push(res.withdrawals[0].all);
      this.pieChartData.push(res.domestic_transactions[0].all);
      this.pieChartData.push(res.external_transactions[0].all);
      this.lineChartData = res.daily_spendings_per_month.map((item, i, arr) => {
        return +item.amount;
      });
    });
    let finishDate =  moment();
    let startDate = moment().subtract(30, 'days');
    
    for (let i = moment(startDate) ; i.isBefore(finishDate) ; i.add(1,'days')) {
      this.lineChartLabels.push(i.format('DD.MM'));
      }
 
    // for (let i = 1; i <= 30; i++) {
    //   if(i==30){
    //     this.lineChartLabels.push('today');
    //   }else if(i==29){
    //     this.lineChartLabels.push('yest.');
    //   }else{
    //     this.lineChartLabels.push(i);
    //   }
    // }
  }



  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];


}