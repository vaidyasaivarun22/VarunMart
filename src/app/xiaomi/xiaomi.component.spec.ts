import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XiaomiComponent } from './xiaomi.component';

describe('XiaomiComponent', () => {
  let component: XiaomiComponent;
  let fixture: ComponentFixture<XiaomiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XiaomiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XiaomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
