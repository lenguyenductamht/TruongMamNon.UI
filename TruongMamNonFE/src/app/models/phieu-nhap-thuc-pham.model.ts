import { NhanSu } from './nhan-su.model';

export interface PhieuNhapThucPham {
  maPhieuNhapThucPham: number;
  ngayNhap: Date;
  maNguoiNhap: string;
  ghiChu: string;
  trangThai: string;

  nguoiNhap: NhanSu;
}
