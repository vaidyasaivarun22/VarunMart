import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewproductsComponent } from './addnewproducts.component';

describe('AddnewproductsComponent', () => {
  let component: AddnewproductsComponent;
  let fixture: ComponentFixture<AddnewproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewproductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
