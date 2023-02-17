import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhongBan } from '../models/phong-ban.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-phong-ban',
  templateUrl: './phong-ban.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./phong-ban.component.scss'],
})
export class PhongBanComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  phongBanDialog: boolean = false;
  phongBans: PhongBan[] = [];
  phongBan: PhongBan = Object.assign({}, this.dataService.newPhongBan);
  submitted: boolean = false;
  cols: any[] | undefined;
  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getPhongBans();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.phongBans.forEach((table) => {
      exportData.push({
        TenPhongBan: table.tenPhongBan,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachPhongBan');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.phongBans.forEach((table) => {
      exportData.push({
        TenPhongBan: table.tenPhongBan,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenPhongBan: 'Tên phòng ban',
        GhiChu: 'Ghi Chú',
      },
      exportData,
      'DanhSachPhongBan'
    );
  }

  getPhongBans(): void {
    this.dataService.getPhongBans().subscribe((data) => {
      this.phongBans = data;
      this.loading = false;
    });
  }

  openNew(): void {
    this.dialogHeader = 'Thêm phòng ban';
    this.phongBan = Object.assign({}, this.dataService.newPhongBan);
    this.submitted = false;
    this.phongBanDialog = true;
  }

  editPhongBan(phongBan: PhongBan): void {
    this.dialogHeader = 'Sửa phòng ban';
    this.phongBan = phongBan;
    this.phongBanDialog = true;
  }

  deletePhongBan(phongBan: PhongBan) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + phongBan.tenPhongBan + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deletePhongBan(phongBan.maPhongBan)
          .subscribe((data) => {
            this.getPhongBans();
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
    this.phongBanDialog = false;
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

  savePhongBan() {
    this.submitted = true;
    if (this.checkValid(this.phongBan)) {
      if (this.phongBan.maPhongBan === 0) {
        this.dataService.postPhongBan(this.phongBan).subscribe(
          (data) => {
            this.getPhongBans();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .putPhongBan(this.phongBan.maPhongBan, this.phongBan)
          .subscribe(
            (data) => {
              this.getPhongBans();
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

  private checkValid(phongBan: PhongBan): boolean {
    if (!phongBan.tenPhongBan) return false;
    return true;
  }
}
