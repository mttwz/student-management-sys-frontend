import { TestBed } from '@angular/core/testing';

import { WorkgroupService } from './workgroup.service';

describe('WorkgroupService', () => {
  let service: WorkgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
