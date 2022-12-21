import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTiemVaccineComponent } from './phieu-tiem-vaccine.component';

describe('PhieuTiemVaccineComponent', () => {
  let component: PhieuTiemVaccineComponent;
  let fixture: ComponentFixture<PhieuTiemVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTiemVaccineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTiemVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
