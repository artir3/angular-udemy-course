import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessAlertComponentComponent } from './success-alert-component.component';

describe('SuccessAlertComponentComponent', () => {
  let component: SuccessAlertComponentComponent;
  let fixture: ComponentFixture<SuccessAlertComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessAlertComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessAlertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
