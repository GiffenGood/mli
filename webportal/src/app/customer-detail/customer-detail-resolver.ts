import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { CustomerDetailService } from './customer-detail.service';
import { ICustomer } from '../../../../common/src/customer';
import { IPromise } from 'q';


@Injectable()
export class CustomerDetailResolver implements Resolve<ICustomer> {
    constructor(private detailService: CustomerDetailService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ICustomer> {
        let id = route.paramMap.get('id');
        return this.detailService.get(id);
    }
}
