import { TestBed } from '@angular/core/testing';

import { AdminTableService } from './admin-table.service';

describe('AdminTableService', () => {
  let service: AdminTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
