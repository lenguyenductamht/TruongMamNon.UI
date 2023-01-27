import { PhieuNhapThucPham } from './phieu-nhap-thuc-pham.model';
import { ThucPham } from './thuc-pham.mode';

export interface ChiTietPhieuNhapThucPham {
  maPhieuNhapThucPham: number;
  maThucPham: number;
  donGia: number;
  soLuong: number;

  phieuNhapThucPham: PhieuNhapThucPham;
  thucPham: ThucPham;
}
