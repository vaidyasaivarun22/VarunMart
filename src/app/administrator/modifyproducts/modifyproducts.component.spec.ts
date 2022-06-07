import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyproductsComponent } from './modifyproducts.component';

describe('ModifyproductsComponent', () => {
  let component: ModifyproductsComponent;
  let fixture: ComponentFixture<ModifyproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyproductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
