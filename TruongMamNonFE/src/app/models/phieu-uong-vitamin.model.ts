import { DotUongVitamin } from './dot-uong-vitamin.model';
import { HocSinh } from './hoc-sinh.model';

export interface PhieuUongVitamin {
  maPhieuUongVitamin: number;
  maDotUongVitamin: number;
  maHocSinh: number;
  trangThai: string;

  dotUongVitamin: DotUongVitamin;
  hocSinh: HocSinh;
}
