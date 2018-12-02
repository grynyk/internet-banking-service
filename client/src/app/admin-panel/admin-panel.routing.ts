import { ModuleWithProviders } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserTransactionsComponent } from './components/users/user-transactions/user-transactions.component';

export const AdminPanelRoutes: Routes = [
    {
        path:'',
        component:MainComponent
    },
    {
        path:'users/:userId',
        component:UserDetailsComponent
    },
    {
        path:'transactions/:userId',
        component:UserTransactionsComponent
    }
]

export const AdminPanelRouting: ModuleWithProviders = RouterModule.forChild(AdminPanelRoutes);