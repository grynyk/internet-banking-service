import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainpageComponent } from './admin-mainpage.component';

describe('AdminMainpageComponent', () => {
  let component: AdminMainpageComponent;
  let fixture: ComponentFixture<AdminMainpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMainpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
