import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentScheduleTableComponent } from './student-schedule-table.component';

describe('StudentScheduleTableComponent', () => {
  let component: StudentScheduleTableComponent;
  let fixture: ComponentFixture<StudentScheduleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentScheduleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
