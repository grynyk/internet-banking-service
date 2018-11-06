import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoDialogComponent } from './account-info-dialog.component';

describe('AccountInfoDialogComponent', () => {
  let component: AccountInfoDialogComponent;
  let fixture: ComponentFixture<AccountInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
