import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupMembersTableComponent } from './su-workgroup-members-table.component';

describe('WorkgroupMembersTableComponent', () => {
  let component: WorkgroupMembersTableComponent;
  let fixture: ComponentFixture<WorkgroupMembersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkgroupMembersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkgroupMembersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
