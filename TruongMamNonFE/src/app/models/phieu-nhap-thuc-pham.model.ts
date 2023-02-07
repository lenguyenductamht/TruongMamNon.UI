import { NhanSu } from './nhan-su.model';

export interface PhieuNhapThucPham {
  maPhieuNhapThucPham: number;
  ngayNhap: Date;
  maNguoiNhap: number;
  ghiChu: string;
  trangThai: string;

  nguoiNhap: NhanSu;
}
