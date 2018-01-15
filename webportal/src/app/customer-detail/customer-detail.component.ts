import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../../../../common/src/customer';
import { CustomerDetailService } from './customer-detail.service';

@Component({
  selector: 'mli-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  id: string;
  customer: ICustomer;

  constructor(private activatedRoute: ActivatedRoute,
    private customerDetailService: CustomerDetailService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.customerDetailService.get(this.id).then(cust => {
      this.customer = cust;
      console.log(cust);
    });
  }
}
