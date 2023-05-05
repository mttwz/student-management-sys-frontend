import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdWorkgroupTableComponent } from './ad-workgroup-table.component';

describe('AdWorkgroupTableComponent', () => {
  let component: AdWorkgroupTableComponent;
  let fixture: ComponentFixture<AdWorkgroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdWorkgroupTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdWorkgroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
