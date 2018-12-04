import { ModuleWithProviders } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { AdminMainpageComponent } from './components/admin-mainpage/admin-mainpage.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserTransactionsComponent } from './components/users/user-transactions/user-transactions.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsersComponent } from './components/users/users.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

export const AdminPanelRoutes: Routes = [
    {
        path:'',
        component:AdminMainpageComponent,
        children: [
            { 
                path: '', component: AdminHomeComponent
            },
            { 
                path: 'users',
                component: UsersComponent
            },
            { 
                path: 'transactions',
                component: TransactionsComponent
            },
            {
                path:'users/:id',
                component:UserDetailsComponent
            },
            {
                path:'transactions/:id',
                component:UserTransactionsComponent
            }
        ]
    }
]

export const AdminPanelRouting: ModuleWithProviders = RouterModule.forChild(AdminPanelRoutes);