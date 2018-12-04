import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  @Output() sidenavToggle = new EventEmitter<void>();

  private loginRespond = JSON.parse(localStorage.getItem('currentUser'));
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  constructor() {
  }

}