import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Vitamin } from '../models/vitamin.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-vitamin',
  templateUrl: './vitamin.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./vitamin.component.scss'],
})
export class VitaminComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  vitaminDialog: boolean = false;
  vitamins: Vitamin[] = [];
  vitamin: Vitamin = Object.assign({}, this.dataService.newVitamin);
  submitted: boolean = false;
  cols: any[] | undefined;
  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getVitamins();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.vitamins.forEach((table) => {
      exportData.push({
        TenVitamin: table.tenVitamin,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachVitamin');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.vitamins.forEach((table) => {
      exportData.push({
        TenVitamin: table.tenVitamin,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenVitamin: 'Tên Vitamin',
        GhiChu: 'Ghi Chú',
      },
      exportData,
      'DanhSachVitamin'
    );
  }

  getVitamins(): void {
    this.loading = true;
    this.dataService.getVitamins().subscribe((data) => {
      this.vitamins = data;
      this.loading = false;
    });
  }

  openNew(): void {
    this.dialogHeader = 'Thêm vitamin';
    this.vitamin = Object.assign({}, this.dataService.newVitamin);
    this.submitted = false;
    this.vitaminDialog = true;
  }

  editVitamin(vitamin: Vitamin): void {
    this.dialogHeader = 'Sửa vitamin';
    this.vitamin = vitamin;
    this.vitaminDialog = true;
  }

  deleteVitamin(vitamin: Vitamin) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + vitamin.tenVitamin + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteVitamin(vitamin.maVitamin).subscribe((data) => {
          this.getVitamins();
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
    this.vitaminDialog = false;
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

  saveVitamin() {
    this.submitted = true;
    if (this.checkValid(this.vitamin)) {
      if (this.vitamin.maVitamin === 0) {
        this.dataService.addVitamin(this.vitamin).subscribe(
          (data) => {
            this.getVitamins();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateVitamin(this.vitamin.maVitamin, this.vitamin)
          .subscribe(
            (data) => {
              this.getVitamins();
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

  private checkValid(vitamin: Vitamin): boolean {
    if (!vitamin.tenVitamin) return false;
    return true;
  }
}
