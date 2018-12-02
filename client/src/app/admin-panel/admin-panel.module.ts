import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserTransactionsComponent } from './components/users/user-transactions/user-transactions.component';
import { AdminPanelRouting } from './admin-panel.routing';


@NgModule({
  declarations: [
    MainComponent,
    UserDetailsComponent,
    UserTransactionsComponent],
  imports: [
    CommonModule,
    AdminPanelRouting
  ]
})
export class AdminPanelModule { }
