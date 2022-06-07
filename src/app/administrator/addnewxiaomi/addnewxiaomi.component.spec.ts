import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewxiaomiComponent } from './addnewxiaomi.component';

describe('AddnewxiaomiComponent', () => {
  let component: AddnewxiaomiComponent;
  let fixture: ComponentFixture<AddnewxiaomiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewxiaomiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewxiaomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
