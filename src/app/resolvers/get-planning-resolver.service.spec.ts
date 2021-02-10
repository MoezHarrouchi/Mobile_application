import { TestBed } from '@angular/core/testing';

import { GetPlanningResolverService } from './get-planning-resolver.service';

describe('GetPlanningService', () => {
  let service: GetPlanningResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPlanningResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
