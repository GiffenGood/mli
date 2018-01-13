import { Component, OnInit } from '@angular/core';
import * as fb from 'firebase/app';
import { PageEvent } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { CustomerListService } from './customer-list.service';
import { ICustomer } from '../../../../common/src/customer';

@Component({
  selector: 'mli-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers = new MatTableDataSource<Element>([]);
  feedbackMsg = '';
  searchArgs = { name: '', zip: '19426' };
  searching: boolean;

  constructor(private customerListService: CustomerListService) { }

  ngOnInit() {
  }

  disableSearch() {
    return this.feedbackMsg !== '' ||
      (!this.searchArgs.name && !this.searchArgs.zip) ||
      (this.searchArgs.name.length < 3 && this.searchArgs.zip.length < 5);
  }

  clear() {
    this.searchArgs = this.customerListService.getNewSearch();
    this.customers = new MatTableDataSource<Element>([]);
  }

  doSearch() {
    this.feedbackMsg = 'Searching...';
    this.customerListService.doSearch(this.searchArgs).then(res => {
      if (res == null) {
        this.feedbackMsg = 'An error occurred.';
        return;
      }
      const data = [];
      res.forEach(e => {
          data.push(e.data());
      });
      this.customers = new MatTableDataSource<Element>(data);
      this.feedbackMsg = '';
    });
  }

  doPage(direction: 'next' | 'prev') {
    this.feedbackMsg = 'Searching...';
    this.customerListService.doPage(direction).then(res => {
      if (res == null) {
        this.feedbackMsg = 'An error occurred.';
        return;
      }
      const data = [];
      res.forEach(e => {
          data.push(e.data());
      });
      this.customers = new MatTableDataSource<Element>(data);
      this.feedbackMsg = '';
    });
  }

  get disablePrev() {
    return this.customerListService.disablePrev;
  }

  get disableNext() {
    return !this.customers || this.customers.data.length < this.customerListService.pageSize;
  }
}
