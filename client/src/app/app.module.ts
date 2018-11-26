import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from './app.routing';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
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

import { RegistrationComponent } from './components/registration/registration.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { Http, HttpModule } from '@angular/http';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import 'hammerjs';
import { Page404Component } from './components/page404/page404.component';
import { MatDialogModule } from '@angular/material';
import { MatTreeModule } from '@angular/material/tree';
import { ErrorHandlerDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { ManageItemDialogComponent } from './components/dialogs/manage-item-dialog/manage-item.component';

import { AddExpenseDialogComponent } from './components/payments-history/add-expense-dialog/add-expense-dialog.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { SharedModule } from './shared/shared.module';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { ImportedDataComponent } from './components/payments-history/imported-data/imported-data.component';
import { MoneyBoxesDialogComponent } from './components/home/money-boxes-dialog/money-boxes-dialog.component';

import { SendMoneyComponent } from './components/home/send-money/send-money.component';
import { CreateAccountDialogComponent } from './components/home/create-account-dialog/create-account-dialog.component';
import { PaymentsDialogComponent } from './components/home/payments-dialog/payments-dialog.component';
import {NgxMaskModule} from 'ngx-mask';
import { PaymentsHistoryComponent } from './components/payments-history/payments-history.component';
import { AccountDetailsComponent } from './components/home/account-details/account-details.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RecipientsManagerComponent } from './components/recipients-manager/recipients-manager.component';
import { RecipientsListComponent } from './components/recipients-manager/recipients-list/recipients-list.component';
import { AboutComponent } from './components/about/about.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
const options = {};

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    Page404Component,
    ErrorHandlerDialogComponent,
    ManageItemDialogComponent,
    AddExpenseDialogComponent,
    ImportedDataComponent,
    MoneyBoxesDialogComponent,
    SendMoneyComponent,
    CreateAccountDialogComponent,
    PaymentsDialogComponent,
    PaymentsHistoryComponent,
    AccountDetailsComponent,
    RecipientsManagerComponent,
    RecipientsListComponent,
    AboutComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    SimpleNotificationsModule.forRoot(),
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
    MatStepperModule,
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
    MatBottomSheetModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    FlexLayoutModule,
    CountdownModule,
    HttpModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
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
    MoneyBoxesDialogComponent,
    CreateAccountDialogComponent,
    PaymentsDialogComponent,
    AccountDetailsComponent,
    RecipientsListComponent,
    UserProfileComponent
  ]
})
export class AppModule { }
