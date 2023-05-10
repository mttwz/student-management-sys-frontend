import { TestBed } from '@angular/core/testing';

import { SuperadminModalService } from './superadmin-modal.service';

describe('SuperadminModalService', () => {
  let service: SuperadminModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperadminModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
