import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupTableComponent } from './su-workgroup-table.component';

describe('WorkgroupTableComponent', () => {
  let component: WorkgroupTableComponent;
  let fixture: ComponentFixture<WorkgroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkgroupTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkgroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
