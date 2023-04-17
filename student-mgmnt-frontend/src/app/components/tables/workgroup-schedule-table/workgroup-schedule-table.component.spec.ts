import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupScheduleTableComponent } from './workgroup-schedule-table.component';

describe('WorkgroupScheduleTableComponent', () => {
  let component: WorkgroupScheduleTableComponent;
  let fixture: ComponentFixture<WorkgroupScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkgroupScheduleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkgroupScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
