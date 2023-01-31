import { DanhMucThucPham } from './danh-muc-thuc-pham.model';

export interface ThucPham {
  maThucPham: number;
  tenThucPham: string;
  donViTinh: string;
  tonKho: number;
  maDanhMuc: number;
  nangLuong: number;
  chatDam: number;
  chatBeo: number;
  chatBot: number;
  danhMucThucPham: DanhMucThucPham;
}
