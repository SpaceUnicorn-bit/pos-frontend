import { TestBed } from '@angular/core/testing';

import { CheckadminGuard } from './checkadmin.guard';

describe('CheckadminGuard', () => {
  let guard: CheckadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
