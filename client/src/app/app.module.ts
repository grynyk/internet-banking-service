import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from './app.routing';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/sidemenu/sidemenu.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { Http, HttpModule } from '@angular/http';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import 'hammerjs';
import { Page404Component } from './components/page404/page404.component';
import { MatDialogModule } from '@angular/material';
import { MatTreeModule } from '@angular/material/tree';
import { ErrorHandlerDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { ManageItemDialogComponent } from './components/dialogs/manage-item-dialog/manage-item.component';
import { ExpensesHistoryComponent } from './components/expenses-history/expenses-history.component';
import { AddExpenseDialogComponent } from './components/expenses-history/add-expense-dialog/add-expense-dialog.component';

import { SharedModule } from './shared/shared.module';
import { ExpenseDetailsDialogComponent } from './components/expenses-history/expense-details-dialog/expense-details-dialog.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { ImportedDataComponent } from './components/expenses-history/imported-data/imported-data.component';
import { AccountInfoDialogComponent } from './components/home/account-info-dialog/account-info-dialog.component';
import { MoneyBoxesDialogComponent } from './components/home/money-boxes-dialog/money-boxes-dialog.component';
import { BalanceSheetDialogComponent } from './components/home/balance-sheet-dialog/balance-sheet-dialog.component';
import { SendMoneyComponent } from './components/home/send-money/send-money.component';
import { ExpensesChartComponent } from './components/home/expenses-chart/expenses-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    RegistrationComponent,
    Page404Component,
    ErrorHandlerDialogComponent,
    ManageItemDialogComponent,
    ExpensesHistoryComponent,
    AddExpenseDialogComponent,
    ExpenseDetailsDialogComponent,
    ImportedDataComponent,
    AccountInfoDialogComponent,
    MoneyBoxesDialogComponent,
    BalanceSheetDialogComponent,
    SendMoneyComponent,
    ExpensesChartComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    MatProgressBarModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatTreeModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatMenuModule,
    MatSortModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDatepickerModule,
    ScrollDispatchModule,
    MatSidenavModule,
    MatRadioModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    FlexLayoutModule,
    HttpModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ApiInterceptor,
    //   multi: true
    // },
    AuthGuard,
    CanDeactivateGuard,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorHandlerDialogComponent,
    ManageItemDialogComponent,
    AddExpenseDialogComponent,
    ImportedDataComponent,
    ExpenseDetailsDialogComponent,
    MoneyBoxesDialogComponent,
    AccountInfoDialogComponent
  ]
})
export class AppModule { }
