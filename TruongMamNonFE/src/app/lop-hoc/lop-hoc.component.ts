import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { LopHoc } from '../models/lop-hoc.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-lop-hoc',
  templateUrl: './lop-hoc.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./lop-hoc.component.scss'],
})
export class LopHocComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  lopHocDialog = false;
  lopHocs: LopHoc[] = [];
  displayLopHocs: LopHoc[] = [];
  lopHoc: LopHoc = Object.assign({}, this.dataService.newLopHoc);
  submitted: boolean = false;
  selectedKhoiLop: KhoiLop | undefined;
  khoiLops: KhoiLop[] = [];
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });

    this.getLopHocs();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.lopHocs.forEach((table) => {
      exportData.push({
        TenLop: table.tenLop,
        KhoiLop: table.khoiLop?.tenKhoiLop,
        HocPhi: table.hocPhi,
        NienHoc: table.nienHoc?.tenNienHoc,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachLopHoc');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.lopHocs.forEach((table) => {
      exportData.push({
        TenLop: table.tenLop,
        KhoiLop: table.khoiLop?.tenKhoiLop,
        HocPhi: table.hocPhi,
        NienHoc: table.nienHoc?.tenNienHoc,
      });
    });
    this.exportService.exportPdf(
      {
        TenLop: 'Tên lớp',
        KhoiLop: 'Khối lớp',
        HocPhi: 'Học phí',
        NienHoc: 'Niên học',
      },
      exportData,
      'DanhSachLopHoc'
    );
  }

  getKhoiLops(): void {
    this.loading = true;
    this.dataService.getKhoiLops().subscribe((data) => {
      this.khoiLops = data;
      this.loading = false;
      this.getLopHocs();
    });
  }

  getNienHocs(): void {
    this.dataService.getNienHocs().subscribe((data) => {
      this.nienHocs = data;
    });
  }

  getLopHocs(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getLopHocsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.lopHocs = data;
          this.loading = false;
        });
    }
  }

  openNew(): void {
    if (!this.selectedNienHoc) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn niên học',
        life: 3000,
      });
      return;
    }
    this.dialogHeader = 'Thêm lớp học';
    this.lopHoc = Object.assign({}, this.dataService.newLopHoc);
    this.lopHocDialog = true;
    this.getKhoiLops();
  }

  editLopHoc(lopHoc: LopHoc): void {
    this.dialogHeader = 'Sửa lớp học';
    this.lopHoc = lopHoc;
    this.selectedKhoiLop = this.lopHoc.khoiLop;
    this.lopHocDialog = true;
    this.getKhoiLops();
  }

  deleteLopHoc(lopHoc: LopHoc) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + lopHoc.tenLop + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteLopHoc(lopHoc.maLop).subscribe((data) => {
          this.getLopHocs();
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
    this.lopHocDialog = false;
    if (cancel) {
      this.messageService.add({
        severity: 'info',
        summary: 'Hủy',
        detail: 'Đã hủy',
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

  saveLopHoc() {
    this.submitted = true;
    if (!this.selectedKhoiLop) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn khối lớp',
        life: 3000,
      });
      return;
    }

    this.lopHoc.maKhoiLop = this.selectedKhoiLop.maKhoiLop;
    if (this.selectedNienHoc) {
      this.lopHoc.maNienHoc = this.selectedNienHoc.maNienHoc;
    }
    if (this.lopHoc.maNienHoc === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn niên học',
        life: 3000,
      });
      return;
    }
    if (this.checkValid(this.lopHoc)) {
      if (this.lopHoc.maLop === 0) {
        this.dataService.postLopHoc(this.lopHoc).subscribe(
          (data) => {
            this.getLopHocs();
            this.hideDialog(false, true);
            this.getLopHocs();
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService.putLopHoc(this.lopHoc.maLop, this.lopHoc).subscribe(
          (data) => {
            this.hideDialog(false, true);
            this.getLopHocs();
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
  }

  private checkValid(lopHoc: LopHoc): boolean {
    if (!lopHoc.tenLop) return false;
    return true;
  }
}
