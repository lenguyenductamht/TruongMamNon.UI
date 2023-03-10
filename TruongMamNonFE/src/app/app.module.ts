import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DanhMucThucDonComponent } from './danh-muc-thuc-don/danh-muc-thuc-don.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmationService } from 'primeng/api';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { NienHocComponent } from './nien-hoc/nien-hoc.component';
import { CalendarModule } from 'primeng/calendar';
import { PhongBanComponent } from './phong-ban/phong-ban.component';
import { LopHocComponent } from './lop-hoc/lop-hoc.component';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollerModule } from 'primeng/scroller';
import { HocSinhComponent } from './hoc-sinh/hoc-sinh.component';
import { CardModule } from 'primeng/card';
import { VaccineComponent } from './vaccine/vaccine.component';
import { VitaminComponent } from './vitamin/vitamin.component';
import { ThuocSoGiunComponent } from './thuoc-so-giun/thuoc-so-giun.component';
import { LoaiNhanSuComponent } from './loai-nhan-su/loai-nhan-su.component';
import { ChucVuComponent } from './chuc-vu/chuc-vu.component';
import { NhanSuComponent } from './nhan-su/nhan-su.component';
import { PhieuTiemVaccineComponent } from './phieu-tiem-vaccine/phieu-tiem-vaccine.component';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { DotTiemVaccineComponent } from './dot-tiem-vaccine/dot-tiem-vaccine.component';
import { DiemDanhComponent } from './diem-danh/diem-danh.component';
import { PhieuNhapThucPhamComponent } from './phieu-nhap-thuc-pham/phieu-nhap-thuc-pham.component';
import { PhieuXuatThucPhamComponent } from './phieu-xuat-thuc-pham/phieu-xuat-thuc-pham.component';
import { ThucPhamComponent } from './thuc-pham/thuc-pham.component';
import { DotSoGiunComponent } from './dot-so-giun/dot-so-giun.component';
import { DotUongVitaminComponent } from './dot-uong-vitamin/dot-uong-vitamin.component';
import { DotKhamSucKhoeComponent } from './dot-kham-suc-khoe/dot-kham-suc-khoe.component';
import { PhieuKhamSucKhoeComponent } from './phieu-kham-suc-khoe/phieu-kham-suc-khoe.component';
import { PhieuSoGiunComponent } from './phieu-so-giun/phieu-so-giun.component';
import { PhieuUongVitaminComponent } from './phieu-uong-vitamin/phieu-uong-vitamin.component';
import { MonAnComponent } from './mon-an/mon-an.component';
import { ThucDonComponent } from './thuc-don/thuc-don.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DanhMucThucDonComponent,
    PageNotFoundComponent,
    NienHocComponent,
    PhongBanComponent,
    LopHocComponent,
    HocSinhComponent,
    VaccineComponent,
    VitaminComponent,
    ThuocSoGiunComponent,
    LoaiNhanSuComponent,
    ChucVuComponent,
    NhanSuComponent,
    PhieuTiemVaccineComponent,
    MenuBarComponent,
    DotTiemVaccineComponent,
    DiemDanhComponent,
    PhieuNhapThucPhamComponent,
    PhieuXuatThucPhamComponent,
    ThucPhamComponent,
    DotSoGiunComponent,
    DotUongVitaminComponent,
    DotKhamSucKhoeComponent,
    PhieuKhamSucKhoeComponent,
    PhieuSoGiunComponent,
    PhieuUongVitaminComponent,
    MonAnComponent,
    ThucDonComponent,
    DangNhapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    HttpClientModule,
    ToolbarModule,
    ToastModule,
    FileUploadModule,
    TableModule,
    RatingModule,
    DialogModule,
    ConfirmDialogModule,
    InputNumberModule,
    RadioButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule,
    ProgressBarModule,
    CalendarModule,
    DropdownModule,
    ScrollerModule,
    CardModule,
    TreeModule,
    PasswordModule,
  ],
  providers: [
    DataService,
    MessageService,
    ConfirmationService,
    MenuBarComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
