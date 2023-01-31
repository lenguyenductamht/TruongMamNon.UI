import { NhanSu } from './nhan-su.model';

export interface PhieuXuatThucPham {
  maPhieuXuatThucPham: number;
  ngayXuat: Date;
  maNguoiXuat: string;
  ghiChu: string;
  trangThai: string;

  nguoiXuat: NhanSu;
}
