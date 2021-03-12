import { TestBed } from '@angular/core/testing';

import { BillingserviceService } from './billingservice.service';

describe('BillingserviceService', () => {
  let service: BillingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
