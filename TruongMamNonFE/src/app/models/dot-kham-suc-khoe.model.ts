import { NienHoc } from './nien-hoc.model';

export interface DotKhamSucKhoe {
  maDotKhamSucKhoe: number;
  tenDotKhamSucKhoe: string;
  ngayKhamSucKhoe: Date;
  maNienHoc: number;

  nienHoc: NienHoc;
}
