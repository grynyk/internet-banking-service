import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MainComponent } from './components/main/main.component';
import { Page404Component } from './components/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { PaymentsHistoryComponent } from './components/payments-history/payments-history.component';
import { RecipientsManagerComponent } from './components/recipients-manager/recipients-manager.component';
import { AboutComponent } from './components/about/about.component';
import { StatsComponent } from './components/stats/stats.component';
import { RoleGuard } from './guards/role.guard';




const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'payments-history', component: PaymentsHistoryComponent },
      { path: 'recipients-manager', component: RecipientsManagerComponent },
      { path: 'stats', component: StatsComponent, },
    ]
  },
  {
    path: 'admin-panel', loadChildren: './admin-panel/admin-panel.module#AdminPanelModule',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      isAdmin: true
    }
  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: Page404Component }
];

export const AppRouting = RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules
});

