import {Routes} from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { LoginComponent } from './login/login.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { TestComponent } from './test/test.component';
import { AuthGuardService } from './authRouteGuard';

export const routes: Routes = [
    { path : '', redirectTo : '/customers', pathMatch : 'full' },
    { path : 'customers/:id', component : CustomerDetailComponent, canActivate : [AuthGuardService] },
    { path : 'customers', component : CustomerListComponent, canActivate : [AuthGuardService] },
    { path : 'test', component : TestComponent, canActivate : [AuthGuardService] },
    { path : 'login', component : LoginComponent }
];
