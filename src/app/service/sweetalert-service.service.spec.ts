import { TestBed } from '@angular/core/testing';

import { SweetalertServiceService } from './sweetalert-service.service';

describe('SweetalertServiceService', () => {
  let service: SweetalertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetalertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
