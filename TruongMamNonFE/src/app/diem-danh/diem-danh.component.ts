import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DiemDanh } from '../models/diem-danh.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { LopHoc } from '../models/lop-hoc.model';
import { Vaccine } from '../models/vaccine.model';
import { HocSinh } from '../models/hoc-sinh.model';
import { DotTiemVaccine } from '../models/dot-tiem-vaccine.model';
import { TrangThaiDiemDanh } from '../models/trang-thai-diem-danh.model';

@Component({
  selector: 'app-diem-danh',
  templateUrl: './diem-danh.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./diem-danh.component.scss'],
})
export class DiemDanhComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = false;
  diemDanhDialog: boolean = false;

  diemDanhs: DiemDanh[] = [];

  diemDanh: DiemDanh = Object.assign({}, this.dataService.newDiemDanh);
  submitted: boolean = false;
  cols: any[] | undefined;

  khoiLops: KhoiLop[] = [];
  selectedKhoiLop: KhoiLop | undefined;
  lopHocs: LopHoc[] = [];
  selectedLopHoc: LopHoc | undefined;
  trangThaiDiemDanhs: TrangThaiDiemDanh[] = [];
  selectedTrangThaiDiemDanh: TrangThaiDiemDanh | undefined;

  selectedNienHoc: NienHoc | undefined;

  hocSinhs: HocSinh[] = [];
  selectedHocSinh: HocSinh | undefined;
  fromDate = new Date();
  toDate = new Date();
  ngayDiemDanh = new Date();

  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getKhoiLops();
    this.getLopHocs();
    // this.getDiemDanhsByDateLopHoc();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.diemDanhs.forEach((table) => {
      exportData.push({
        MaHocSinh: table.maHocSinh,
        Ho: table.hocSinh?.ho,
        Ten: table.hocSinh?.ten,
        NgaySinh: table.hocSinh?.ngaySinh,
        NgayDiemDanh: table.ngayDiemDanh,
        TrangThaiDiemDanh: table.trangThaiDiemDanh?.tenTrangThai,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachPhieuDiemDanh');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.diemDanhs.forEach((table) => {
      exportData.push({
        MaHocSinh: table.maHocSinh,
        Ho: table.hocSinh?.ho,
        Ten: table.hocSinh?.ten,
        NgaySinh: table.hocSinh?.ngaySinh,
        NgayDiemDanh: table.ngayDiemDanh,
        TrangThaiDiemDanh: table.trangThaiDiemDanh?.tenTrangThai,
      });
    });
    this.exportService.exportPdf(
      {
        MaHocSinh: 'Mã học sinh',
        Ho: 'Họ',
        Ten: 'Tên',
        NgaySinh: 'Ngày sinh',
        NgayDiemDanh: 'Ngày điểm danh',
        TrangThaiDiemDanh: 'Trạng thái',
      },
      exportData,
      'DanhSachPhieuDiemDanh'
    );
  }

  getDiemDanhsByDateLopHoc(): void {
    if (this.selectedNienHoc && this.selectedLopHoc) {
      this.loading = true;
      this.dataService
        .getDiemDanhsByDateLopHoc(
          this.fromDate.toJSON(),
          this.toDate.toJSON(),
          this.selectedLopHoc.maLop
        )
        .subscribe((data) => {
          this.diemDanhs = data;
          this.loading = false;
        });
    }
  }

  getKhoiLops(): void {
    this.dataService.getKhoiLops().subscribe((data) => {
      this.khoiLops = data;
    });
  }

  getHocSinhsByLopHoc(): void {
    if (this.selectedLopHoc) {
      this.dataService
        .getHocSinhsByLopHoc(this.selectedLopHoc.maLop)
        .subscribe((data) => {
          this.hocSinhs = data;
        });
    }
  }
  getLopHocs(): void {
    if (this.selectedNienHoc && !this.selectedKhoiLop) {
      this.dataService
        .getLopHocsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.lopHocs = data;
        });
    } else if (this.selectedNienHoc && this.selectedKhoiLop) {
      this.dataService
        .getLopHocsByNienHocKhoiLop(
          this.selectedNienHoc.maNienHoc,
          this.selectedKhoiLop.maKhoiLop
        )
        .subscribe((data) => {
          this.lopHocs = data;
        });
    }
  }

  getTrangThaiDiemDanhs(): void {
    this.dataService.getTrangThaiDiemDanhs().subscribe((success) => {
      this.trangThaiDiemDanhs = success;
    });
  }

  openNew(): void {
    this.diemDanh = Object.assign({}, this.dataService.newDiemDanh);
    this.submitted = false;
    this.dialogHeader = 'Thêm phiếu điểm danh';

    this.getTrangThaiDiemDanhs();
    this.diemDanhDialog = true;
  }

  editDiemDanh(diemDanh: DiemDanh): void {
    this.dialogHeader = 'Sửa phiếu điểm danh';
    this.diemDanh = diemDanh;
    this.selectedHocSinh = this.diemDanh.hocSinh;
    this.diemDanhDialog = true;
    this.getTrangThaiDiemDanhs();
  }

  deleteDiemDanh(diemDanh: DiemDanh) {
    this.confirmationService.confirm({
      message:
        'Bạn có muốn xóa phiếu tiêm của ' +
        diemDanh.hocSinh.ho +
        ' ' +
        diemDanh.hocSinh.ten +
        '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDiemDanh(this.diemDanh.maDiemDanh)
          .subscribe((data) => {
            this.getDiemDanhsByDateLopHoc();
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
    this.diemDanhDialog = false;
    if (cancel) {
      this.messageService.add({
        severity: 'info',
        summary: 'Hủy',
        detail: 'Không muốn thêm nữa',
        life: 3000,
      });
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

  saveDiemDanh() {
    this.submitted = true;
    if (this.selectedHocSinh) {
      this.diemDanh.maHocSinh = this.selectedHocSinh.maHocSinh;
    }
    this.diemDanh.ngayDiemDanh = this.ngayDiemDanh;
    if (this.selectedTrangThaiDiemDanh) {
      this.diemDanh.maTrangThaiDiemDanh =
        this.selectedTrangThaiDiemDanh.maTrangThai;
    }
    if (this.checkValid(this.diemDanh)) {
      if (this.diemDanh.maDiemDanh === 0) {
        this.dataService.addDiemDanh(this.diemDanh).subscribe(
          (data) => {
            this.getDiemDanhsByDateLopHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateDiemDanh(this.diemDanh.maDiemDanh, this.diemDanh)
          .subscribe(
            (data) => {
              this.getDiemDanhsByDateLopHoc();
              this.hideDialog(false, true);
            },
            (error) => {
              console.log(error);
              this.hideDialog(false, false);
            }
          );
      }
    }
  }

  onKhoiLopChange(event: any) {
    const khoiLop: KhoiLop = event;
    this.selectedKhoiLop = khoiLop;
    this.getLopHocs();
  }

  onLopHocChange(event: any) {
    const lopHoc: LopHoc = event;
    this.selectedLopHoc = lopHoc;
    this.getHocSinhsByLopHoc();
    this.getDiemDanhsByDateLopHoc();
  }

  onHocSinhChange(event: any) {
    const hocSinh: HocSinh = event;
    this.selectedHocSinh = hocSinh;
  }

  onTrangThaiDiemDanhChange(event: any) {
    const trangThaiDiemDanh: TrangThaiDiemDanh = event;
    this.selectedTrangThaiDiemDanh = trangThaiDiemDanh;
  }

  checkValid(diemDanh: DiemDanh): boolean {
    if (diemDanh.maHocSinh === 0) return false;
    if (!diemDanh.maTrangThaiDiemDanh) return false;
    return true;
  }
}
