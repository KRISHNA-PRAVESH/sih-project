import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTestComponent } from './dash-test.component';

describe('DashTestComponent', () => {
  let component: DashTestComponent;
  let fixture: ComponentFixture<DashTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashTestComponent]
    });
    fixture = TestBed.createComponent(DashTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
