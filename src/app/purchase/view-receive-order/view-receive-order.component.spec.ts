import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceiveOrderComponent } from './view-receive-order.component';

describe('ViewReceiveOrderComponent', () => {
  let component: ViewReceiveOrderComponent;
  let fixture: ComponentFixture<ViewReceiveOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReceiveOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReceiveOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
