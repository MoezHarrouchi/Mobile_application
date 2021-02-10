import { TestBed } from '@angular/core/testing';

import { GetContentCoursesResolverService } from './getContentCourses-resolver.service';

describe('GetContentCoursesResolverService', () => {
  let service: GetContentCoursesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetContentCoursesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
