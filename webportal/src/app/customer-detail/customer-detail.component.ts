import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../../../../common/src/customer';
import { CustomerDetailService } from './customer-detail.service';
import { FavoritesService } from '../common/services/favorites.service';

@Component({
  selector: 'mli-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  id: string;
  customer: ICustomer;
  isFav = false;

  constructor(private activatedRoute: ActivatedRoute,
    private customerDetailService: CustomerDetailService,
    private favoritesService: FavoritesService) { }

  addToFavorites() {
    this.favoritesService.addFavorite(this.id).then(() => {
      this.isFav = true;
    });
  }

  removeFavorite() {
    this.favoritesService.removeFavorite(this.id).then(() => {
      this.isFav = false;
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.customerDetailService.get(this.id).then(cust => {
      this.customer = cust;
    });
    this.favoritesService.isFavorite(this.id).then((res) => {
      this.isFav = res;
    });
  }
}
