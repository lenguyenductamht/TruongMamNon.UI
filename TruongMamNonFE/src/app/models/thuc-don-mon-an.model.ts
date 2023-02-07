import { MonAn } from './mon-an.model';
import { ThucDon } from './thuc-don.model';

export interface ThucDonMonAn {
  maThucDon: number;
  maMonAn: number;
  soLuong: number;

  thucDon: ThucDon;
  monAn: MonAn;
}
