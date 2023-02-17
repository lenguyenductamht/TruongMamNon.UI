import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DanhMucThucDon } from '../models/danh-muc-thuc-don.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-danh-muc-thuc-don',
  templateUrl: './danh-muc-thuc-don.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./danh-muc-thuc-don.component.scss'],
})
export class DanhMucThucDonComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  danhMucThucDonDialog: boolean = false;

  danhMucThucDons: DanhMucThucDon[] = [];

  danhMucThucDon: DanhMucThucDon = Object.assign(
    {},
    this.dataService.newDanhMucThucDon
  );
  submitted: boolean = false;
  cols: any[] | undefined;

  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getDanhMucThucDons();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.danhMucThucDons.forEach((table) => {
      exportData.push({
        TenDanhMuc: table.tenDanhMuc,
        GhiChu: table.ghiChu,
        ThoiGian: table.thoiGian,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhMucThucDon');
  }

  public exportPdf() {
    const exportData: any[] = [];
    this.danhMucThucDons.forEach((table) => {
      exportData.push({
        TenDanhMuc: table.tenDanhMuc,
        GhiChu: table.ghiChu,
        ThoiGian: table.thoiGian,
      });
    });
    this.exportService.exportPdf(
      {
        TenDanhMuc: 'Tên danh mục',
        GhiChu: 'Ghi Chú',
        ThoiGian: 'Thời gian',
      },
      exportData,
      'DanhMucThucDon'
    );
  }

  getDanhMucThucDons(): void {
    this.dataService.getDanhMucThucDons().subscribe((data) => {
      this.danhMucThucDons = data;
      this.loading = false;
    });
  }

  openNew(): void {
    this.dialogHeader = 'Thêm danh mục thực đơn';
    this.danhMucThucDon = Object.assign({}, this.dataService.newDanhMucThucDon);
    this.submitted = false;
    this.danhMucThucDonDialog = true;
  }

  editDanhMucThucDon(danhMucThucDon: DanhMucThucDon): void {
    this.dialogHeader = 'Sửa danh mục thực đơn';
    this.danhMucThucDon = danhMucThucDon;
    this.danhMucThucDonDialog = true;
  }

  deleteDanhMucThucDon(danhMucThucDon: DanhMucThucDon) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + danhMucThucDon.tenDanhMuc + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDanhMucThucDon(danhMucThucDon.maDanhMuc)
          .subscribe((data) => {
            this.getDanhMucThucDons();
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
    this.danhMucThucDonDialog = false;
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

  saveDanhMucThucDon() {
    this.submitted = true;
    if (this.danhMucThucDon.maDanhMuc === 0) {
      this.dataService.addDanhMucThucDon(this.danhMucThucDon).subscribe(
        (data) => {
          this.getDanhMucThucDons();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log(error);
          this.hideDialog(false, false);
        }
      );
    } else {
      console.log('ma', this.danhMucThucDon.maDanhMuc);
      this.dataService
        .updateDanhMucThucDon(
          this.danhMucThucDon.maDanhMuc,
          this.danhMucThucDon
        )
        .subscribe(
          (data) => {
            this.getDanhMucThucDons();
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
