import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StStudentScheduleTableComponent } from './st-student-schedule-table.component';

describe('StStudentScheduleTableComponent', () => {
  let component: StStudentScheduleTableComponent;
  let fixture: ComponentFixture<StStudentScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StStudentScheduleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StStudentScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
