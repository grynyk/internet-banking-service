import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyBoxesDialogComponent } from './money-boxes-dialog.component';

describe('MoneyBoxesDialogComponent', () => {
  let component: MoneyBoxesDialogComponent;
  let fixture: ComponentFixture<MoneyBoxesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyBoxesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyBoxesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
