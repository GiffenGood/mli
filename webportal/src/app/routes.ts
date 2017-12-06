import {Routes} from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path : '', redirectTo : '/customers', pathMatch : 'full' },
    { path : 'customers', component : CustomerListComponent },
    { path : 'login', component : LoginComponent }
];
