import { TestBed } from '@angular/core/testing';

import { GenerateRandService } from './generate-rand.service';

describe('GenerateRandService', () => {
  let service: GenerateRandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateRandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
