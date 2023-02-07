import { DotKhamSucKhoe } from './dot-kham-suc-khoe.model';
import { HocSinh } from './hoc-sinh.model';

export interface PhieuKhamSucKhoe {
  maPhieuKhamSucKhoe: number;
  maDotKhamSucKhoe: number;
  ketLuan: string;
  maHocSinh: number;

  chieuCao: number;
  canNang: number;
  BMI: number;
  nhipTim: number;
  tamThu: number;
  tamTruong: number;
  loaiTheLuc: string;

  tuanHoan: string;
  hoHap: string;
  tieuHoa: string;
  thanTietNieu: string;
  thanKinhTamThan: string;
  lamSangKhac: string;

  matPhaiKhongKinh: number;
  matTraiKhongKinh: number;
  matPhaiCoKinh: number;
  matTraiCoKinh: number;
  cacBenhVeMat: string;

  taiTraiNoiThuong: number;
  taiTraiNoiTham: number;
  taiPhaiNoiThuong: number;
  taiPhaiNoiTham: number;
  cacBenhTaiMuiHong: string;

  hamTren: string;
  hamDuoi: string;
  cacBenhRangHamMat: string;

  dotKhamSucKhoe: DotKhamSucKhoe;
  hocSinh: HocSinh;
}
