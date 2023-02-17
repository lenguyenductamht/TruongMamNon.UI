import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ChucVu } from '../models/chuc-vu.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';

@Component({
  selector: 'app-chuc-vu',
  templateUrl: './chuc-vu.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./chuc-vu.component.scss'],
})
export class ChucVuComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  loading = false;
  chucVuDialog: boolean = false;
  dialogHeader = '';
  chucVus: ChucVu[] = [];
  loaiNhanSus: LoaiNhanSu[] = [];
  filterSelectedLoaiNhanSu: LoaiNhanSu | undefined;
  selectedLoaiNhanSu: LoaiNhanSu | undefined;
  chucVu: ChucVu = Object.assign({}, this.dataService.newChucVu);
  submitted: boolean = false;
  cols: any[] | undefined;
  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getLoaiNhanSus();
    this.getChucVus();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.chucVus.forEach((table) => {
      exportData.push({
        TenChucVu: table.tenChucVu,
        LoaiNhanSu: table.loaiNhanSu.tenLoaiNhanSu,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachChucVu');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.chucVus.forEach((table) => {
      exportData.push({
        TenChucVu: table.tenChucVu,
        LoaiNhanSu: table.loaiNhanSu.tenLoaiNhanSu,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenChucVu: 'Tên chức vụ',
        LoaiNhanSu: 'Loại nhân sự',
        GhiChu: 'Ghi Chú',
      },
      exportData,
      'DanhSachChucVu'
    );
  }
  getLoaiNhanSus(): void {
    this.dataService.getLoaiNhanSus().subscribe((data) => {
      this.loaiNhanSus = data;
    });
  }
  getChucVus(): void {
    this.loading = true;
    if (this.filterSelectedLoaiNhanSu) {
      this.dataService
        .getChucVusByLoaiNhanSu(this.filterSelectedLoaiNhanSu?.maLoaiNhanSu)
        .subscribe((data) => {
          this.chucVus = data;
          this.loading = false;
        });
    } else {
      this.dataService.getChucVus().subscribe((data) => {
        this.chucVus = data;
        this.loading = false;
      });
    }
  }

  openNew(): void {
    this.dialogHeader = 'Thêm chức vụ';
    this.chucVu = Object.assign({}, this.dataService.newChucVu);
    this.submitted = false;
    this.chucVuDialog = true;
  }

  editChucVu(chucVu: ChucVu): void {
    this.dialogHeader = 'Sửa chức vụ';
    this.chucVu = chucVu;
    this.selectedLoaiNhanSu = chucVu.loaiNhanSu;
    this.chucVuDialog = true;
    this.getLoaiNhanSus();
  }

  deleteChucVu(chucVu: ChucVu) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + chucVu.tenChucVu + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteChucVu(chucVu.maChucVu).subscribe((data) => {
          this.getChucVus();
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
    this.chucVuDialog = false;
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

  saveChucVu() {
    this.submitted = true;
    if (this.selectedLoaiNhanSu) {
      this.chucVu.maLoaiNhanSu = this.selectedLoaiNhanSu.maLoaiNhanSu;
    }
    if (this.checkValid(this.chucVu)) {
      if (this.chucVu.maChucVu === 0) {
        this.dataService.addChucVu(this.chucVu).subscribe(
          (data) => {
            this.getChucVus();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateChucVu(this.chucVu.maChucVu, this.chucVu)
          .subscribe(
            (data) => {
              this.getChucVus();
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

  onFilterLoaiNhanSuChange(event: any): void {
    const loaiNhanSu: LoaiNhanSu = event;
    this.filterSelectedLoaiNhanSu = loaiNhanSu;
    this.getChucVus();
  }

  onLoaiNhanSuChange(event: any): void {
    const loaiNhanSu: LoaiNhanSu = event;
    this.selectedLoaiNhanSu = loaiNhanSu;
  }

  private checkValid(chucVu: ChucVu): boolean {
    if (!chucVu.tenChucVu) return false;
    if (chucVu.maLoaiNhanSu === 0) return false;
    return true;
  }
}
