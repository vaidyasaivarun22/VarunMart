import { TestBed } from '@angular/core/testing';

import { InsidecardService } from './insidecard.service';

describe('InsidecardService', () => {
  let service: InsidecardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsidecardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
