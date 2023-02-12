import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminModalComponent } from './superadmin-modal.component';

describe('SuperadminModalComponent', () => {
  let component: SuperadminModalComponent;
  let fixture: ComponentFixture<SuperadminModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
