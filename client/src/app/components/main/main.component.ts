import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.css' ]
})
export class MainComponent implements OnInit {
  currentUser: any;
  sidemenuMode: any;
  innerWidth: any;
  @Input() opened: string;
  @HostListener('window:resize', [ '$event' ])
  onResize(event: any) {
    if (event.target.innerWidth < 600) {
      this.sidemenuMode = 'push';
    }
    if (event.target.innerWidth > 600) {
      this.sidemenuMode = 'side';
    }
  }

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.innerWidth = window.screen.width;
  }

  ngOnInit() {
    if (window.innerWidth < 600) {
      this.sidemenuMode = 'push';
    }
    if (window.innerWidth > 600) {
      this.sidemenuMode = 'side';
    }
    document.querySelector('body').style.backgroundColor = '#eeeeee';
  }

  openSideNav() {
    if (innerWidth > 960) {
      return 'true';
    } else {
      return 'false';
    }
  }
}
