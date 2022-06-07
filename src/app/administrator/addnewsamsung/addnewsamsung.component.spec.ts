import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewsamsungComponent } from './addnewsamsung.component';

describe('AddnewsamsungComponent', () => {
  let component: AddnewsamsungComponent;
  let fixture: ComponentFixture<AddnewsamsungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewsamsungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewsamsungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
