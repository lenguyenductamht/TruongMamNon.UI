import { DotSoGiun } from './dot-so-giun.model';
import { HocSinh } from './hoc-sinh.model';

export interface PhieuSoGiun {
  maPhieuSoGiun: number;
  maDotSoGiun: number;
  maHocSinh: number;
  trangThai: string;

  dotSoGiun: DotSoGiun;
  hocSinh: HocSinh;
}
