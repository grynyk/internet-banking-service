import { Component, OnInit ,Input} from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentUser:any;


  @Input() opened:string;
  innerWidth: any;
  constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
