import { TestBed } from '@angular/core/testing';

import { WordpressResolverService } from './wordpress-resolver.service';

describe('WordpressResolverService', () => {
  let service: WordpressResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordpressResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
