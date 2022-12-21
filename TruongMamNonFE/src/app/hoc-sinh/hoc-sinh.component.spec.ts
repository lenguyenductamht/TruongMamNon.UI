import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HocSinhComponent } from './hoc-sinh.component';

describe('HocSinhComponent', () => {
  let component: HocSinhComponent;
  let fixture: ComponentFixture<HocSinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HocSinhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HocSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
