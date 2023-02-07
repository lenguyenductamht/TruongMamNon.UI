import { DotTiemVaccine } from './dot-tiem-vaccine.model';
import { HocSinh } from './hoc-sinh.model';
import { Vaccine } from './vaccine.model';

export interface PhieuTiemVaccine {
  maPhieuTiemVaccine: number;
  maDotTiemVaccine: number;
  maHocSinh: number;
  trangThai: string;

  dotTiemVaccine: DotTiemVaccine;
  hocSinh: HocSinh;
}
