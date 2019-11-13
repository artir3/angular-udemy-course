import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningAlertComponentComponent } from './warning-alert-component.component';

describe('WarningAlertComponentComponent', () => {
  let component: WarningAlertComponentComponent;
  let fixture: ComponentFixture<WarningAlertComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningAlertComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningAlertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
