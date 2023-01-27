import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuNhapThucPhamComponent } from './phieu-nhap-thuc-pham.component';

describe('PhieuNhapThucPhamComponent', () => {
  let component: PhieuNhapThucPhamComponent;
  let fixture: ComponentFixture<PhieuNhapThucPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuNhapThucPhamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuNhapThucPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
