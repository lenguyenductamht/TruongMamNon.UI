import { NienHoc } from './nien-hoc.model';
import { ThuocSoGiun } from './thuoc-so-giun.model';

export interface DotSoGiun {
  maDotSoGiun: number;
  tenDotSoGiun: string;
  ngaySoGiun: Date;
  maThuocSoGiun: number;
  maNienHoc: number;

  thuocSoGiun: ThuocSoGiun;
  nienHoc: NienHoc;
}
