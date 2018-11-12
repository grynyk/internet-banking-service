import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatDialog } from '@angular/material';
import * as model from '../../shared/exportModels';
import { CountdownComponent } from 'ngx-countdown';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ErrorHandlerDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(CountdownComponent) counter: CountdownComponent;


  loginRespond = JSON.parse(localStorage.getItem('currentUser'));
  user: model.User = {
    firstname: this.loginRespond.userData.firstname,
    lastname: this.loginRespond.userData.lastname,
    address: this.loginRespond.userData.address,
    email: this.loginRespond.email,
    admin: this.loginRespond.userData.admin
  }

  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private router: Router,
    private authenticationService:AuthenticationService,
    public dialog: MatDialog,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (this.counter) {
          this.counter.restart();
        }
      }
    });
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/logo.svg")
    );
  }

  ngOnInit() {

  }

  refreshSession() {
    this.counter.restart();
  }

  onSessionExpired() {
    const dialogRef = this.dialog.open(ErrorHandlerDialogComponent, {
      disableClose: true,
      data:{title:"Your session has expired", message:"please relogin", button:"Log in"},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(result==true){
         this.authenticationService.logout();
         this.router.navigate(['/login']);
        }else{

        }
      }
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
