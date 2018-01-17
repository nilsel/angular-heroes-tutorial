import { TestBed, inject } from '@angular/core/testing';

import { FmsService } from './fms.service';

describe('FmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FmsService]
    });
  });

  it('should be created', inject([FmsService], (service: FmsService) => {
    expect(service).toBeTruthy();
  }));
});
