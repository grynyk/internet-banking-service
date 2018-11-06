import {Component, OnInit , EventEmitter , Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
  menuItems: { icon: string, text: string, url: string }[] = [
    { 'icon': 'history',     'text': 'Expenses history',         'url': '/manage-expenses-history' },
    { 'icon': 'trending_up',     'text': 'Analytics',         'url': '/analytics' },
    { 'icon': 'info',     'text': 'About',         'url': '/manage-history' }
  ];

  constructor(private router: Router) {
    const actualWidth = window.innerWidth;
  }

  ngOnInit() {
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
