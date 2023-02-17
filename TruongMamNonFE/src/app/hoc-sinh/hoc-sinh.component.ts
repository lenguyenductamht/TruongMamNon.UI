import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HocSinh } from '../models/hoc-sinh.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { ExportService } from '../services/export.service';
import { LopHoc } from '../models/lop-hoc.model';
import { GioiTinh } from '../models/gioi-tinh.model';
import { TrangThaiHoc } from '../models/trang-thai-hoc.model';
import { DanToc } from '../models/dan-toc.model';
import { TonGiao } from '../models/ton-giao.model';
import { QuocGia } from '../models/quoc-gia.model';
import { TrangThaiTaiKhoan } from '../models/trang-thai-tai-khoan.model';

@Component({
  selector: 'app-hoc-sinh',
  templateUrl: './hoc-sinh.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./hoc-sinh.component.scss'],
})
export class HocSinhComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  hocSinhDialog = false;
  hocSinhs: HocSinh[] = [];
  hocSinh: HocSinh = Object.assign({}, this.dataService.newHocSinh);
  submitted: boolean = false;
  gioiTinhs: GioiTinh[] = [];
  danTocs: DanToc[] = [];
  tonGiaos: TonGiao[] = [];
  quocTichs: QuocGia[] = [];
  trangThaiHocs: TrangThaiHoc[] = [];
  trangThaiTaiKhoans: TrangThaiTaiKhoan[] = [];
  khoiLops: KhoiLop[] = [];
  selectedKhoiLop: KhoiLop | undefined;
  lopHocs: LopHoc[] = [];
  selectedLopHoc: LopHoc | undefined;
  selectedGioiTinh: GioiTinh | undefined;
  selectedNienHoc: NienHoc | undefined;
  selectedTrangThaiHoc: TrangThaiHoc | undefined;
  selectedDanToc: DanToc | undefined;
  selectedTonGiao: TonGiao | undefined;
  selectedQuocTich: QuocGia | undefined;
  nienHocs: NienHoc[] = [];
  _ngayNhapHoc = new Date();
  _ngaySinh = new Date();
  _ngayCapNhat = new Date();
  ngOnInit(): void {
    this.getHocSinhs();
    this.getKhoiLops();
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.gioiTinhs = this.dataService.gioiTinhs;
  }

  exportExcel() {
    const exportData: any[] = [];
    this.hocSinhs.forEach((table) => {
      exportData.push({
        MaHocSinh: table.maHocSinh,
        Ho: table.ho,
        Ten: table.ten,
        GioiTinh: table.gioiTinh?.tenGioiTinh,
        NgaySinh: table.ngaySinh,
        TrangThaiHoc: table.trangThaiHoc?.tenTrangThai,
        NgayNhapHoc: table.ngayNhapHoc,
        LopHoc: table.lopHoc?.tenLop,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachHocSinh');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.hocSinhs.forEach((table) => {
      exportData.push({
        MaHocSinh: table.maHocSinh,
        Ho: table.ho,
        Ten: table.ten,
        GioiTinh: table.gioiTinh?.tenGioiTinh,
        NgaySinh: table.ngaySinh,
        TrangThaiHoc: table.trangThaiHoc?.tenTrangThai,
        NgayNhapHoc: table.ngayNhapHoc,
        LopHoc: table.lopHoc?.tenLop,
      });
    });
    this.exportService.exportPdf(
      {
        MaHocSinh: 'Mã học sinh',
        Ho: 'Họ',
        Ten: 'Tên',
        GioiTinh: 'Giới tính',
        NgaySinh: 'Ngày sinh',
        TrangThaiHoc: 'Trạng thái học',
        NgayNhapHoc: 'Ngày nhập học',
        LopHoc: 'Lớp học',
      },
      exportData,
      'DanhSachHocSinh'
    );
  }

  getHocSinhs(): void {
    this.loading = true;
    this.dataService.getHocSinhs().subscribe((success) => {
      this.hocSinhs = success;
      console.log(this.hocSinh);
      //this.displayHocSinhs=this.hocSinhs.filter((hocSinh)=>hocSinh.nienHoc.maNienHoc===this.selectedNienHoc?.maNienHoc);
      this.loading = false;
    });
  }

  getKhoiLops(): void {
    this.dataService.getKhoiLops().subscribe((success) => {
      this.khoiLops = success;
    });
  }

  getLopHocsByNienHocKhoiLop(): void {
    if (this.selectedNienHoc && this.selectedKhoiLop) {
      this.dataService
        .getLopHocsByNienHocKhoiLop(
          this.selectedNienHoc?.maNienHoc,
          this.selectedKhoiLop?.maKhoiLop
        )
        .subscribe((data) => {
          this.lopHocs = data;
        });
    }
  }

  getGioiTinhs(): void {
    this.dataService.getGioiTinhs().subscribe((success) => {
      this.gioiTinhs = success;
    });
  }

  getTrangThaiHocs(): void {
    this.dataService.getTrangThaiHocs().subscribe((success) => {
      this.trangThaiHocs = success;
    });
  }

  getDanTocs(): void {
    this.dataService.getDanTocs().subscribe((success) => {
      this.danTocs = success;
    });
  }

  getTonGiaos(): void {
    this.dataService.getTonGiaos().subscribe((success) => {
      this.tonGiaos = success;
    });
  }

  getQuocGias(): void {
    this.dataService.getQuocGias().subscribe((success) => {
      this.quocTichs = success;
    });
  }

  // public getTrangThaiTaiKhoans(): void {
  //   this.dataService.getTrangThaiTaiKhoans().subscribe((success) => {
  //     this.trangThaiTaiKhoans = success;
  //   });
  // }

  openNew(): void {
    this.dialogHeader = 'Thêm học sinh';
    this.hocSinh = Object.assign({}, this.dataService.newHocSinh);
    this.submitted = false;
    this.hocSinhDialog = true;
    this._ngayNhapHoc = new Date();
    this._ngaySinh = new Date();
    this._ngayCapNhat = new Date();
    this.getGioiTinhs();
    this.getKhoiLops();
    this.getTrangThaiHocs();
    this.getDanTocs();
    this.getTonGiaos();
    this.getQuocGias();
    // this.getTrangThaiTaiKhoans();
  }

  editHocSinh(hocSinh: HocSinh): void {
    this.dialogHeader = 'Sửa học sinh';
    this.hocSinh = hocSinh;
    this.selectedKhoiLop = this.hocSinh.khoiLop;
    this.selectedLopHoc = this.hocSinh.lopHoc;
    this.selectedGioiTinh = this.hocSinh.gioiTinh;
    this.selectedTrangThaiHoc = this.hocSinh.trangThaiHoc;
    this.selectedDanToc = this.hocSinh.danToc;
    this.selectedTonGiao = this.hocSinh.tonGiao;
    this.selectedQuocTich = this.hocSinh.quocTich;
    this.hocSinhDialog = true;
    this._ngayNhapHoc = new Date(hocSinh.ngayNhapHoc);
    this._ngaySinh = new Date(hocSinh.ngaySinh);
    this._ngayCapNhat = new Date(hocSinh.ngayCapNhat);
    this.getGioiTinhs();
    this.getKhoiLops();
    this.getTrangThaiHocs();
    this.getDanTocs();
    this.getTonGiaos();
    this.getQuocGias();
    this.getLopHocsByNienHocKhoiLop();
  }

  deleteHocSinh(hocSinh: HocSinh) {
    console.log('delete hoc sinh', hocSinh);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + hocSinh.ho + ' ' + hocSinh.ten + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteHocSinh(hocSinh.maHocSinh).subscribe((data) => {
          this.getHocSinhs();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Xóa thành công',
            life: 3000,
          });
        });
      },
    });
  }

  hideDialog(cancel = true, success = true): void {
    console.log('hideDialog: ');
    this.hocSinhDialog = false;
    if (cancel) {
      // this.messageService.add({
      //   severity: 'info',
      //   summary: 'Hủy',
      //   detail: 'Đã hủy',
      //   life: 3000,
      // });
    } else if (success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Lưu thành công',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Lưu không thành công',
        life: 3000,
      });
    }
    this.submitted = false;
  }

  saveHocSinh() {
    this.submitted = true;

    if (this.selectedKhoiLop) {
      this.hocSinh.maKhoiLop = this.selectedKhoiLop.maKhoiLop;
    }
    if (this.selectedLopHoc) {
      this.hocSinh.maLopHoc = this.selectedLopHoc.maLop;
    }
    if (this.selectedGioiTinh) {
      this.hocSinh.maGioiTinh = this.selectedGioiTinh.maGioiTinh;
    }
    if (this.selectedTrangThaiHoc) {
      this.hocSinh.maTrangThaiHoc = this.selectedTrangThaiHoc.maTrangThai;
    }
    if (this.selectedDanToc) {
      this.hocSinh.maDanToc = this.selectedDanToc.maDanToc;
    }
    if (this.selectedTonGiao) {
      this.hocSinh.maTonGiao = this.selectedTonGiao.maTonGiao;
    }
    if (this.selectedQuocTich) {
      this.hocSinh.maQuocTich = this.selectedQuocTich.maQuocGia;
    }
    this.hocSinh.ngayNhapHoc = this._ngayNhapHoc;
    this.hocSinh.ngaySinh = this._ngaySinh;
    this.hocSinh.ngayCapNhat = this._ngayCapNhat;
    if (this.checkValid(this.hocSinh)) {
      if (this.hocSinh.maHocSinh === 0) {
        this.hocSinh.matKhau = 'Student@123';
        this.hocSinh.maTrangThaiTaiKhoan = '0';
        this.dataService.addHocSinh(this.hocSinh).subscribe(
          (data) => {
            this.hideDialog(false, true);
            this.getHocSinhs();
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateHocSinh(this.hocSinh.maHocSinh, this.hocSinh)
          .subscribe(
            (data) => {
              this.hideDialog(false, true);
              this.getHocSinhs();
            },
            (error) => {
              console.log(error);
              this.hideDialog(false, false);
            }
          );
      }
    }
  }

  onKhoiLopChange(event: any): void {
    const khopLop: KhoiLop = event;
    this.selectedKhoiLop = khopLop;
    this.getLopHocsByNienHocKhoiLop();
  }

  onLopHocChange(event: any): void {
    const lopHoc: LopHoc = event;
    this.selectedLopHoc = lopHoc;
  }

  onGioiTinhChange(event: any): void {
    const gioiTinh: GioiTinh = event;
    this.selectedGioiTinh = gioiTinh;
  }

  onTrangThaiHocChange(event: any): void {
    const trangThaiHoc: TrangThaiHoc = event;
    this.selectedTrangThaiHoc = trangThaiHoc;
  }

  onDanTocChange(event: any): void {
    const danToc: DanToc = event;
    this.selectedDanToc = danToc;
  }

  onTonGiaoChange(event: any): void {
    const tonGiao: TonGiao = event;
    this.selectedTonGiao = tonGiao;
  }

  onQuocTichChange(event: any): void {
    const quocTich: QuocGia = event;
    this.selectedQuocTich = quocTich;
  }

  checkValid(hocSinh: HocSinh): boolean {
    if (
      hocSinh.ho.trim() &&
      hocSinh.ten.trim() &&
      hocSinh.maGioiTinh &&
      hocSinh.maKhoiLop &&
      hocSinh.hoTenPhuHuynh.trim() &&
      hocSinh.ngaySinh
    ) {
      return true;
    }
    return false;
  }
}
