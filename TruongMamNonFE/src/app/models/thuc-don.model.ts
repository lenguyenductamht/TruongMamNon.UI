import { DanhMucThucDon } from './danh-muc-thuc-don.model';

export interface ThucDon {
  maThucDon: number;
  ngayTao: Date;
  ngayApDung: Date;
  maDanhMuc: number;

  danhMucThucDon: DanhMucThucDon;
}
