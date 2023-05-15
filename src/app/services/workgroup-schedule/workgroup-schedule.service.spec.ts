import { TestBed } from '@angular/core/testing';

import { WorkgroupScheduleService } from './workgroup-schedule.service';

describe('WorkgroupScheduleService', () => {
  let service: WorkgroupScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkgroupScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
