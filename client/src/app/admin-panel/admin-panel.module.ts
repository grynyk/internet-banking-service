import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule

} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserTransactionsComponent } from './components/users/user-transactions/user-transactions.component';
import { AdminPanelRouting } from './admin-panel.routing';
import { AdminMainpageComponent } from './components/admin-mainpage/admin-mainpage.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminSidemenuComponent } from './components/admin-sidemenu/admin-sidemenu.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsersComponent } from './components/users/users.component';
import { AdminPanelService } from './admin-panel.service';
import { ApiInterceptor } from '../interceptors/api.interceptor';
import { TransactionsComponent } from './components/transactions/transactions.component';


@NgModule({
  declarations: [
    UserDetailsComponent,
    UserTransactionsComponent,
    AdminMainpageComponent,
    AdminNavbarComponent,
    AdminSidemenuComponent,
    AdminHomeComponent,
    UsersComponent,
    TransactionsComponent
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    AdminPanelService
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatInputModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    AdminPanelRouting
  ]
})
export class AdminPanelModule { }
