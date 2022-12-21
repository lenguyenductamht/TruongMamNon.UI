import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DanhMucThucDonComponent } from './danh-muc-thuc-don/danh-muc-thuc-don.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmationService } from 'primeng/api';

import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import { MessageService } from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {PanelModule} from 'primeng/panel';
import {ProgressBarModule} from 'primeng/progressbar';
import { NienHocComponent } from './nien-hoc/nien-hoc.component';
import {CalendarModule} from 'primeng/calendar';
import { PhongBanComponent } from './phong-ban/phong-ban.component';
import { LopHocComponent } from './lop-hoc/lop-hoc.component';
import { DropdownModule } from 'primeng/dropdown';
import {ScrollerModule} from 'primeng/scroller';
import { HocSinhComponent } from './hoc-sinh/hoc-sinh.component';
import {CardModule} from 'primeng/card';
import { VaccineComponent } from './vaccine/vaccine.component';
import { VitaminComponent } from './vitamin/vitamin.component';
import { ThuocSoGiunComponent } from './thuoc-so-giun/thuoc-so-giun.component';
import { LoaiNhanSuComponent } from './loai-nhan-su/loai-nhan-su.component';
import { ChucVuComponent } from './chuc-vu/chuc-vu.component';
import { NhanSuComponent } from './nhan-su/nhan-su.component';
import { PhieuTiemVaccineComponent } from './phieu-tiem-vaccine/phieu-tiem-vaccine.component';
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';


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
  ],
  providers: [DataService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
