import { TestBed } from '@angular/core/testing';

import { RealisateursService } from './realisateurs.service';

describe('RealisateursService', () => {
  let service: RealisateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealisateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
