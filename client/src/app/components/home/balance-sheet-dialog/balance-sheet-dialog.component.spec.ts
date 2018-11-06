import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetDialogComponent } from './balance-sheet-dialog.component';

describe('BalanceSheetDialogComponent', () => {
  let component: BalanceSheetDialogComponent;
  let fixture: ComponentFixture<BalanceSheetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceSheetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceSheetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
