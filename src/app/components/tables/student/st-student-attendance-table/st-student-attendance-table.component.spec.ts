import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StStudentAttendanceTableComponent } from './st-student-attendance-table.component';

describe('StStudentAttendanceTableComponent', () => {
  let component: StStudentAttendanceTableComponent;
  let fixture: ComponentFixture<StStudentAttendanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StStudentAttendanceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StStudentAttendanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
