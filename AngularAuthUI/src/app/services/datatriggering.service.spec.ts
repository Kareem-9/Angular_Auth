import { TestBed } from '@angular/core/testing';

import { DatatriggeringService } from './datatriggering.service';

describe('DatatriggeringService', () => {
  let service: DatatriggeringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatatriggeringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
