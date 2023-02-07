import { NienHoc } from './nien-hoc.model';
import { Vitamin } from './vitamin.model';

export interface DotUongVitamin {
  maDotUongVitamin: number;
  tenDotUongVitamin: string;
  ngayUongVitamin: Date;
  maVitamin: number;
  maNienHoc: number;

  vitamin: Vitamin;
  nienHoc: NienHoc;
}
