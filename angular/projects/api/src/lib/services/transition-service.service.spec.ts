import { TestBed } from '@angular/core/testing';

import { TransitionServiceService } from './transition-service.service';

describe('TransitionServiceService', () => {
  let service: TransitionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
