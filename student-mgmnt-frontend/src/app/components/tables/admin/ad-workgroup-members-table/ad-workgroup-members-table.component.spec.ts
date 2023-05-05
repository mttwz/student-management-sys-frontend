import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdWorkgroupMembersTableComponent } from './ad-workgroup-members-table.component';

describe('AdWorkgroupMembersTableComponent', () => {
  let component: AdWorkgroupMembersTableComponent;
  let fixture: ComponentFixture<AdWorkgroupMembersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdWorkgroupMembersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdWorkgroupMembersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
