import { NienHoc } from './nien-hoc.model';
import { Vaccine } from './vaccine.model';

export interface DotTiemVaccine {
  maDotTiemVaccine: number;
  tenDotTiemVaccine: string;
  ngayTiemVaccine: Date;
  maVaccine: number;
  maNienHoc: number;

  vaccine: Vaccine;
  nienHoc: NienHoc;
}
