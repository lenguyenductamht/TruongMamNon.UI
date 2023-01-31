import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhMucThucDonComponent } from './danh-muc-thuc-don/danh-muc-thuc-don.component';
import { NienHocComponent } from './nien-hoc/nien-hoc.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhongBanComponent } from './phong-ban/phong-ban.component';
import { LopHocComponent } from './lop-hoc/lop-hoc.component';
import { HocSinhComponent } from './hoc-sinh/hoc-sinh.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { ThuocSoGiunComponent } from './thuoc-so-giun/thuoc-so-giun.component';
import { VitaminComponent } from './vitamin/vitamin.component';
import { LoaiNhanSuComponent } from './loai-nhan-su/loai-nhan-su.component';
import { ChucVuComponent } from './chuc-vu/chuc-vu.component';
import { NhanSuComponent } from './nhan-su/nhan-su.component';
import { PhieuTiemVaccineComponent } from './phieu-tiem-vaccine/phieu-tiem-vaccine.component';
import { DotTiemVaccineComponent } from './dot-tiem-vaccine/dot-tiem-vaccine.component';
import { DiemDanhComponent } from './diem-danh/diem-danh.component';
import { PhieuNhapThucPhamComponent } from './phieu-nhap-thuc-pham/phieu-nhap-thuc-pham.component';
import { PhieuXuatThucPhamComponent } from './phieu-xuat-thuc-pham/phieu-xuat-thuc-pham.component';
import { ThucPhamComponent } from './thuc-pham/thuc-pham.component';

const routes: Routes = [
  { path: 'CauHinhNienHoc', component: NienHocComponent },
  { path: 'PhongBan', component: PhongBanComponent },
  { path: 'ChucVu', component: ChucVuComponent },
  { path: 'LoaiNhanSu', component: LoaiNhanSuComponent },
  { path: 'TraCuuNhanSu', component: NhanSuComponent },
  { path: 'DanhSachLopHoc', component: LopHocComponent },
  { path: 'HoSoHocSinh', component: HocSinhComponent },
  { path: 'DanhMucVaccine', component: VaccineComponent },
  { path: 'DotTiemVaccine', component: DotTiemVaccineComponent },
  { path: 'PhieuTiemVaccine', component: PhieuTiemVaccineComponent },
  { path: 'DiemDanh', component: DiemDanhComponent },
  { path: 'NhapThucPham', component: PhieuNhapThucPhamComponent },
  { path: 'XuatThucPham', component: PhieuXuatThucPhamComponent },
  { path: 'ThucPham', component: ThucPhamComponent },

  { path: 'DanhMucThuocSoGiun', component: ThuocSoGiunComponent },
  { path: 'DanhMucVitamin', component: VitaminComponent },
  { path: 'DanhMucThucDon', component: DanhMucThucDonComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
