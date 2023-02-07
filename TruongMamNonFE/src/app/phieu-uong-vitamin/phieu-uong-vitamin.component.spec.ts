import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuUongVitaminComponent } from './phieu-uong-vitamin.component';

describe('PhieuUongVitaminComponent', () => {
  let component: PhieuUongVitaminComponent;
  let fixture: ComponentFixture<PhieuUongVitaminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuUongVitaminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuUongVitaminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
