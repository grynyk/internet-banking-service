import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-mainpage',
  templateUrl: './admin-mainpage.component.html',
  styleUrls: ['./admin-mainpage.component.css']
})
export class AdminMainpageComponent implements OnInit {

  @Input() opened:string;
  innerWidth: any;
  constructor() {
      this.innerWidth = (window.screen.width);
  }

  ngOnInit() {
  }

  openSideNav(){
    if(innerWidth>960){
     return "true";
    }else{
      return "false";
    }
  }

}