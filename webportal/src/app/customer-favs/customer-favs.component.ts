import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../../../common/src/customer';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'mli-customer-favs',
  templateUrl: './customer-favs.component.html',
  styleUrls: ['./customer-favs.component.css']
})
export class CustomerFavsComponent implements OnInit {
  customers =  new MatTableDataSource<Element>([]);

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.customers = new MatTableDataSource<Element>(this.activatedRoute.snapshot.data['customers']);
  }
}
