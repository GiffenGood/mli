import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { ICustomer } from '../../../../common/src/customer';
import { IPromise } from 'q';
import { FavoritesService } from '../common/services/favorites.service';


@Injectable()
export class CustomerFavsResolver implements Resolve<ICustomer> {
    constructor(private favoriteService: FavoritesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        return this.favoriteService.getFavs();
    }
}
