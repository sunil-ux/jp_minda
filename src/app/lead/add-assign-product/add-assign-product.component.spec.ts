import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignProductComponent } from './add-assign-product.component';

describe('AddAssignProductComponent', () => {
  let component: AddAssignProductComponent;
  let fixture: ComponentFixture<AddAssignProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssignProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
