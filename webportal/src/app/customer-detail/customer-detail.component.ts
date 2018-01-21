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
      this.customer = this.activatedRoute.snapshot.data['customer'];
  }
}
