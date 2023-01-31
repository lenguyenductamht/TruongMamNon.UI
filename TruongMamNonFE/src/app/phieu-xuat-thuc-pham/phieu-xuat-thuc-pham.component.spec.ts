import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuXuatThucPhamComponent } from './phieu-xuat-thuc-pham.component';

describe('PhieuXuatThucPhamComponent', () => {
  let component: PhieuXuatThucPhamComponent;
  let fixture: ComponentFixture<PhieuXuatThucPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuXuatThucPhamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuXuatThucPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
