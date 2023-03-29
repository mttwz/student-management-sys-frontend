import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminTableComponent } from './superadmin-table.component';

describe('SuperadminTableComponent', () => {
  let component: SuperadminTableComponent;
  let fixture: ComponentFixture<SuperadminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
