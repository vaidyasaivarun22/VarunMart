import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewiphoneComponent } from './addnewiphone.component';

describe('AddnewiphoneComponent', () => {
  let component: AddnewiphoneComponent;
  let fixture: ComponentFixture<AddnewiphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewiphoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewiphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
