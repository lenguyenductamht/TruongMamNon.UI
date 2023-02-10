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
import { DotKhamSucKhoeComponent } from './dot-kham-suc-khoe/dot-kham-suc-khoe.component';
import { DotUongVitaminComponent } from './dot-uong-vitamin/dot-uong-vitamin.component';
import { DotSoGiunComponent } from './dot-so-giun/dot-so-giun.component';
import { PhieuKhamSucKhoeComponent } from './phieu-kham-suc-khoe/phieu-kham-suc-khoe.component';
import { PhieuSoGiunComponent } from './phieu-so-giun/phieu-so-giun.component';
import { PhieuUongVitaminComponent } from './phieu-uong-vitamin/phieu-uong-vitamin.component';
import { MonAnComponent } from './mon-an/mon-an.component';
import { ThucDonComponent } from './thuc-don/thuc-don.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'CauHinhNienHoc',
    component: NienHocComponent,
    canActivate: [AuthGuard],
  },
  { path: 'PhongBan', component: PhongBanComponent, canActivate: [AuthGuard] },
  { path: 'ChucVu', component: ChucVuComponent, canActivate: [AuthGuard] },
  {
    path: 'LoaiNhanSu',
    component: LoaiNhanSuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'TraCuuNhanSu',
    component: NhanSuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'DanhSachLopHoc',
    component: LopHocComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'HoSoHocSinh',
    component: HocSinhComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'DanhMucVaccine',
    component: VaccineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'DotTiemVaccine',
    component: DotTiemVaccineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'PhieuTiemVaccine',
    component: PhieuTiemVaccineComponent,
    canActivate: [AuthGuard],
  },
  { path: 'DiemDanh', component: DiemDanhComponent, canActivate: [AuthGuard] },
  {
    path: 'NhapThucPham',
    component: PhieuNhapThucPhamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'XuatThucPham',
    component: PhieuXuatThucPhamComponent,
    canActivate: [AuthGuard],
  },
  { path: 'ThucPham', component: ThucPhamComponent, canActivate: [AuthGuard] },
  {
    path: 'DanhMucThuocSoGiun',
    component: ThuocSoGiunComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'DanhMucVitamin',
    component: VitaminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'DotKhamSucKhoe',
    component: DotKhamSucKhoeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'DotSoGiun',
    component: DotSoGiunComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'DotUongVitamin',
    component: DotUongVitaminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'PhieuKhamSucKhoe',
    component: PhieuKhamSucKhoeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'PhieuSoGiun',
    component: PhieuSoGiunComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'PhieuUongVitamin',
    component: PhieuUongVitaminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'DanhMucThucDon',
    component: DanhMucThucDonComponent,
    canActivate: [AuthGuard],
  },
  { path: 'MonAn', component: MonAnComponent, canActivate: [AuthGuard] },
  { path: 'ThucDon', component: ThucDonComponent, canActivate: [AuthGuard] },
  { path: 'DangNhap', component: DangNhapComponent },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
