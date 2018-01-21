import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFavsComponent } from './customer-favs.component';

describe('CustomerFavsComponent', () => {
  let component: CustomerFavsComponent;
  let fixture: ComponentFixture<CustomerFavsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFavsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
