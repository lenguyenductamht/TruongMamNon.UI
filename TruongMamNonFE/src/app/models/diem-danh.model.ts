import { HocSinh } from './hoc-sinh.model';
import { TrangThaiDiemDanh } from './trang-thai-diem-danh.model';

export interface DiemDanh {
  maDiemDanh: number;
  ngayDiemDanh: Date;
  maHocSinh: string;
  maTrangThaiDiemDanh: string;

  hocSinh: HocSinh;
  trangThaiDiemDanh: TrangThaiDiemDanh;
}
