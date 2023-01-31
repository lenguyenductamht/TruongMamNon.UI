import { PhieuXuatThucPham } from './phieu-xuat-thuc-pham.model';
import { ThucPham } from './thuc-pham.model';

export interface ChiTietPhieuXuatThucPham {
  maPhieuXuatThucPham: number;
  maThucPham: number;
  donGia: number;
  soLuong: number;

  thucPham: ThucPham;
  phieuXuatThucPham: PhieuXuatThucPham;
}
