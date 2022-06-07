import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphonesComponent } from './iphones.component';

describe('IphonesComponent', () => {
  let component: IphonesComponent;
  let fixture: ComponentFixture<IphonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IphonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IphonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
