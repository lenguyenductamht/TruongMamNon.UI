import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ThuocSoGiun } from '../models/thuoc-so-giun.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-thuoc-so-giun',
  templateUrl: './thuoc-so-giun.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./thuoc-so-giun.component.scss'],
})
export class ThuocSoGiunComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  thuocSoGiunDialog: boolean = false;

  thuocSoGiuns: ThuocSoGiun[] = [];

  thuocSoGiun: ThuocSoGiun = Object.assign({}, this.dataService.newThuocSoGiun);
  submitted: boolean = false;
  cols: any[] | undefined;

  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getThuocSoGiuns();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.thuocSoGiuns.forEach((table) => {
      exportData.push({
        TenThuocSoGiun: table.tenThuocSoGiun,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachThuocSoGiun');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.thuocSoGiuns.forEach((table) => {
      exportData.push({
        TenThuocSoGiun: table.tenThuocSoGiun,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenThuocSoGiun: 'Tên thuốc sổ giun',
        GhiChu: 'Ghi Chú',
      },
      exportData,
      'DanhSachThuocSoGiun'
    );
  }

  getThuocSoGiuns(): void {
    this.loading = true;
    this.dataService.getThuocSoGiuns().subscribe((data) => {
      this.thuocSoGiuns = data;
      this.loading = false;
    });
  }

  openNew(): void {
    this.thuocSoGiun = Object.assign({}, this.dataService.newThuocSoGiun);
    this.submitted = false;
    this.thuocSoGiunDialog = true;
  }

  editThuocSoGiun(thuocSoGiun: ThuocSoGiun): void {
    this.thuocSoGiun = thuocSoGiun;
    this.thuocSoGiunDialog = true;
  }

  deleteThuocSoGiun(thuocSoGiun: ThuocSoGiun) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + thuocSoGiun.tenThuocSoGiun + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteThuocSoGiun(thuocSoGiun.maThuocSoGiun)
          .subscribe((data) => {
            this.getThuocSoGiuns();
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
    this.thuocSoGiunDialog = false;
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

  saveThuocSoGiun() {
    this.submitted = true;
    if (this.checkValid(this.thuocSoGiun)) {
      if (this.thuocSoGiun.maThuocSoGiun === 0) {
        this.dataService.addThuocSoGiun(this.thuocSoGiun).subscribe(
          (data) => {
            this.getThuocSoGiuns();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateThuocSoGiun(this.thuocSoGiun.maThuocSoGiun, this.thuocSoGiun)
          .subscribe(
            (data) => {
              this.getThuocSoGiuns();
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

  private checkValid(thuocSoGiun: ThuocSoGiun): boolean {
    if (!thuocSoGiun.tenThuocSoGiun) return false;
    return true;
  }
}
