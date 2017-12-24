import {Routes} from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { LoginComponent } from './login/login.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    { path : '', redirectTo : '/customers', pathMatch : 'full' },
    { path : 'customers/:id', component : CustomerDetailComponent },
    { path : 'customers', component : CustomerListComponent },
    { path : 'test', component : TestComponent },
    { path : 'login', component : LoginComponent }
];
