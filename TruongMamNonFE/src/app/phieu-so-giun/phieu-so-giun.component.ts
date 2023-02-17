import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhieuSoGiun } from '../models/phieu-so-giun.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { LopHoc } from '../models/lop-hoc.model';
import { Vaccine } from '../models/vaccine.model';
import { HocSinh } from '../models/hoc-sinh.model';
import { DotSoGiun } from '../models/dot-so-giun.model';

@Component({
  selector: 'app-chuc-vu',
  templateUrl: './phieu-so-giun.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./phieu-so-giun.component.scss'],
})
export class PhieuSoGiunComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = false;
  phieuSoGiunDialog: boolean = false;

  phieuSoGiuns: PhieuSoGiun[] = [];

  phieuSoGiun: PhieuSoGiun = Object.assign({}, this.dataService.newPhieuSoGiun);
  submitted: boolean = false;
  cols: any[] | undefined;

  khoiLops: KhoiLop[] = [];
  selectedKhoiLop: KhoiLop | undefined;
  lopHocs: LopHoc[] = [];
  selectedLopHoc: LopHoc | undefined;

  dotSoGiuns: DotSoGiun[] = [];
  selectedDotSoGiun: DotSoGiun | undefined;

  selectedNienHoc: NienHoc | undefined;

  hocSinhs: HocSinh[] = [];
  selectedHocSinhs: HocSinh[] = [];

  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getPhieuSoGiunsByNienHoc();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.phieuSoGiuns.forEach((table) => {
      exportData.push({
        DotSoGiun: table.dotSoGiun?.tenDotSoGiun,
        MaHocSinh: table.hocSinh?.maHocSinh,
        Ho: table.hocSinh?.ho,
        Ten: table.hocSinh?.ten,
        NgaySinh: table.hocSinh?.ngaySinh,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachPhieuSoGiun');
  }

  public exportPdf() {
    const exportData: any[] = [];
    this.phieuSoGiuns.forEach((table) => {
      exportData.push({
        DotSoGiun: table.dotSoGiun?.tenDotSoGiun,
        MaHocSinh: table.hocSinh?.maHocSinh,
        Ho: table.hocSinh?.ho,
        Ten: table.hocSinh?.ten,
        NgaySinh: table.hocSinh?.ngaySinh,
      });
    });
    this.exportService.exportPdf(
      {
        DotSoGiun: 'Đợt sổ giun',
        MaHocSinh: 'Mã học sinh',
        Ho: 'Họ',
        Ten: 'Tên',
        NgaySinh: 'Ngày sinh',
      },
      exportData,
      'DanhSachPhieuSoGiun'
    );
  }

  getPhieuSoGiunsByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getPhieuSoGiunsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.phieuSoGiuns = data;
          this.loading = false;
        });
    }
  }

  getKhoiLops(): void {
    this.dataService.getKhoiLops().subscribe((data) => {
      this.khoiLops = data;
    });
  }

  getDotSoGiunsByNienHoc(): void {
    if (this.selectedNienHoc) {
      this.dataService
        .getDotSoGiunsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe(
          (success) => {
            this.dotSoGiuns = success;
          },
          (error) => console.log(error)
        );
    }
  }

  getHocSinhs(): void {
    if (this.selectedLopHoc) {
      this.dataService
        .getHocSinhsByLopHoc(this.selectedLopHoc.maLop)
        .subscribe((data) => {
          this.hocSinhs = data;
        });
    } else if (this.selectedKhoiLop) {
      this.dataService
        .getHocSinhsByKhoiLop(this.selectedKhoiLop?.maKhoiLop)
        .subscribe((data) => {
          this.hocSinhs = data;
        });
    } else {
      this.dataService.getHocSinhs().subscribe((data) => {
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

  openNew(): void {
    this.dialogHeader = 'Thêm phiếu sổ giun';
    this.phieuSoGiun = Object.assign({}, this.dataService.newPhieuSoGiun);
    this.submitted = false;
    this.getDotSoGiunsByNienHoc();
    this.getKhoiLops();
    this.getLopHocs();
    this.getHocSinhs();
    this.phieuSoGiunDialog = true;
  }

  editPhieuSoGiun(phieuSoGiun: PhieuSoGiun): void {
    this.dialogHeader = 'Thêm phiếu sổ giun';
    this.phieuSoGiun = phieuSoGiun;
    this.phieuSoGiunDialog = true;
  }

  deletePhieuSoGiun(phieuSoGiun: PhieuSoGiun) {
    this.confirmationService.confirm({
      message:
        'Bạn có muốn xóa phiếu tiêm của ' +
        phieuSoGiun.hocSinh.ho +
        ' ' +
        phieuSoGiun.hocSinh.ten +
        '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deletePhieuSoGiun(this.phieuSoGiun.maPhieuSoGiun)
          .subscribe((data) => {
            this.getPhieuSoGiunsByNienHoc();
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
    this.phieuSoGiunDialog = false;
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

  savePhieuSoGiun() {
    this.submitted = true;
    if (this.selectedDotSoGiun) {
      this.phieuSoGiun.maDotSoGiun = this.selectedDotSoGiun.maDotSoGiun;
    }
    if (this.checkValid(this.phieuSoGiun)) {
      if (this.phieuSoGiun.maPhieuSoGiun === 0) {
        this.selectedHocSinhs.forEach((element) => {
          this.phieuSoGiun.maHocSinh = element.maHocSinh;
          this.dataService.addPhieuSoGiun(this.phieuSoGiun).subscribe(
            (data) => {},
            (error) => {
              console.log(error);
              this.hideDialog(false, false);
            }
          );
        });
        this.getPhieuSoGiunsByNienHoc();
        this.hideDialog(false, true);
      } else {
        this.dataService
          .updatePhieuSoGiun(this.phieuSoGiun.maPhieuSoGiun, this.phieuSoGiun)
          .subscribe(
            (data) => {
              this.getPhieuSoGiunsByNienHoc();
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
    this.getHocSinhs();
  }

  onLopHocChange(event: any) {
    const lopHoc: LopHoc = event;
    this.selectedLopHoc = lopHoc;
    this.getHocSinhs();
  }

  onDotSoGiunChange(event: any) {
    const dotSoGiun: DotSoGiun = event;
    this.selectedDotSoGiun = dotSoGiun;
  }

  private checkValid(phieuSoGiun: PhieuSoGiun): boolean {
    if (!phieuSoGiun.maDotSoGiun) return false;
    return true;
  }
}
