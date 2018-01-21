import {Routes} from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { LoginComponent } from './login/login.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { TestComponent } from './test/test.component';
import { AuthGuardService } from './authRouteGuard';
import { CustomerFavsComponent } from './customer-favs/customer-favs.component';
import { CustomerDetailResolver } from './customer-detail/customer-detail-resolver';

export const routes: Routes = [
    { path : '', redirectTo : '/customers', pathMatch : 'full' },
    { path : 'customers/:id',
      component : CustomerDetailComponent,
      canActivate : [AuthGuardService],
      resolve : {customer:CustomerDetailResolver }},
    { path : 'customers', component : CustomerListComponent, canActivate : [AuthGuardService] },
    { path : 'favorites', component : CustomerFavsComponent, canActivate : [AuthGuardService] },
    { path : 'test', component : TestComponent, canActivate : [AuthGuardService] },
    { path : 'login', component : LoginComponent }
];
