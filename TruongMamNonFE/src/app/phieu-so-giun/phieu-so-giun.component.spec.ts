import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuSoGiunComponent } from './phieu-so-giun.component';

describe('PhieuSoGiunComponent', () => {
  let component: PhieuSoGiunComponent;
  let fixture: ComponentFixture<PhieuSoGiunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuSoGiunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuSoGiunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
