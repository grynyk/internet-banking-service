import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor( private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        "logo",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/logo.svg")
      );
  }

  ngOnInit() {
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
