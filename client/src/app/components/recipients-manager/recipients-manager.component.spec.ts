import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientsManagerComponent } from './recipients-manager.component';

describe('RecipientsManagerComponent', () => {
  let component: RecipientsManagerComponent;
  let fixture: ComponentFixture<RecipientsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
