import { DanToc } from './dan-toc.model';
import { GioiTinh } from './gioi-tinh.model';
import { KhoiLop } from './khoi-lop.model';
import { LopHoc } from './lop-hoc.model';
import { QuocGia } from './quoc-gia.model';
import { TonGiao } from './ton-giao.model';
import { TrangThaiHoc } from './trang-thai-hoc.model';
import { TrangThaiTaiKhoan } from './trang-thai-tai-khoan.model';

export interface HocSinh {
  maHocSinh: string;
  ho: string;
  ten: string;
  maGioiTinh: string;
  maKhoiLop: number;
  maLopHoc: number;
  ngayNhapHoc: Date;
  maTrangThaiHoc: string;
  lyDoNghiHoc: string;
  ngayCapNhat: Date;
  ngaySinh: Date;
  noiSinh: string;
  maDanToc: string;
  maTonGiao: string;
  maQuocTich: string;
  ghiChu: string;
  hoKhau: string;
  diaChi: string;
  hinhAnh: string;
  matKhau: string;
  maTrangThaiTaiKhoan: string;

  hoTenPhuHuynh: string;
  namSinhPhuHuynh: string;
  cmndPhuHuynh: string;
  sdtPhuHuynh: string;
  ngheNghiepPhuHuynh: string;
  emailPhuHuynh: string;
  diaChiPhuHuynh: string;

  khoiLop: KhoiLop;
  lopHoc: LopHoc;
  gioiTinh: GioiTinh;
  danToc: DanToc;
  tonGiao: TonGiao;
  quocTich: QuocGia;
  trangThaiHoc: TrangThaiHoc;
  trangThaiTaiKhoan: TrangThaiTaiKhoan;
}
