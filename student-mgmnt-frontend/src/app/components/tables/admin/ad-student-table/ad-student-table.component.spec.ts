import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdStudentTableComponent } from './ad-student-table.component';

describe('AdStudentTableComponent', () => {
  let component: AdStudentTableComponent;
  let fixture: ComponentFixture<AdStudentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdStudentTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdStudentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
