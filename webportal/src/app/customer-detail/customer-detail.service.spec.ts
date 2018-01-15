import { TestBed, inject } from '@angular/core/testing';

import { CustomerDetailService } from './customer-detail.service';

describe('CustomDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerDetailService]
    });
  });

  it('should be created', inject([CustomerDetailService], (service: CustomerDetailService) => {
    expect(service).toBeTruthy();
  }));
});
