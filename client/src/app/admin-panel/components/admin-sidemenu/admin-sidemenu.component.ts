import {Component, OnInit , EventEmitter , Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-sidemenu',
  templateUrl: './admin-sidemenu.component.html',
  styleUrls: ['./admin-sidemenu.component.css']
})
export class AdminSidemenuComponent{

  @Output() closeSidenav = new EventEmitter<void>();
  menuItems: { icon: string, text: string, url: string }[] = [
    { 'icon': 'home',     'text': 'Home',         'url': '/admin-panel' },
    { 'icon': 'group',     'text': 'Users',         'url': '/admin-panel/users' },
    { 'icon': 'compare_arrows',     'text': 'Trasactions',         'url': '/admin-panel/transactions' }
  ];

  constructor(private router: Router) {
    const actualWidth = window.innerWidth;
  }
  onClose() {
    this.closeSidenav.emit();
  }
}