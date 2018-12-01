import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import * as moment from 'moment';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) { }

  public lineChartData: Array<any> = [1, 2];
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
    console.log(startDate,finishDate);
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