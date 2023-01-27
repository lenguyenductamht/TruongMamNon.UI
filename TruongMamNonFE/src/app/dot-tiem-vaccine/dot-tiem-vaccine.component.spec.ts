import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotTiemVaccineComponent } from './dot-tiem-vaccine.component';

describe('DotTiemVaccineComponent', () => {
  let component: DotTiemVaccineComponent;
  let fixture: ComponentFixture<DotTiemVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotTiemVaccineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotTiemVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
