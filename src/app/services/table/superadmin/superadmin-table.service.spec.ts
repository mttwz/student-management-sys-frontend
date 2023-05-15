import { TestBed } from '@angular/core/testing';

import { SuperadminTableService } from './superadmin-table.service';

describe('SuperadminTableService', () => {
  let service: SuperadminTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperadminTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
