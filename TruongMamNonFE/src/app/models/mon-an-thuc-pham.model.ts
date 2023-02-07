import { MonAn } from './mon-an.model';
import { ThucPham } from './thuc-pham.model';

export interface MonAnThucPham {
  maMonAn: number;
  maThucPham: number;
  soLuong: number;

  monAn: MonAn;
  thucPham: ThucPham;
}
