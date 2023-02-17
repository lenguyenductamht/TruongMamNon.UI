import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DotKhamSucKhoe } from '../models/dot-kham-suc-khoe.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { Vaccine } from '../models/vaccine.model';
import { NienHoc } from '../models/nien-hoc.model';
import { Suspense } from 'preact/compat';

@Component({
  selector: 'app-dotTiemDotKhamSucKhoe',
  templateUrl: './dot-kham-suc-khoe.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./dot-kham-suc-khoe.component.scss'],
})
export class DotKhamSucKhoeComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  dotKhamSucKhoeDialog: boolean = false;

  dotKhamSucKhoes: DotKhamSucKhoe[] = [];

  dotKhamSucKhoe: DotKhamSucKhoe = Object.assign(
    {},
    this.dataService.newDotKhamSucKhoe
  );

  submitted: boolean = false;
  _ngayKhamSucKhoe: Date = new Date();
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  cols: any[] | undefined;

  exportColumns: any[] | undefined;

  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getDotKhamSucKhoesByNienHoc();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.dotKhamSucKhoes.forEach((table) => {
      exportData.push({
        TenDotKhamSucKhoe: table.tenDotKhamSucKhoe,
        NgayKhamSucKhoe: table.ngayKhamSucKhoe,
        NienHoc: table.nienHoc?.tenNienHoc,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachDotKhamSucKhoe');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.dotKhamSucKhoes.forEach((table) => {
      exportData.push({
        TenDotKhamSucKhoe: table.tenDotKhamSucKhoe,
        NgayKhamSucKhoe: table.ngayKhamSucKhoe,
        NienHoc: table.nienHoc?.tenNienHoc,
      });
    });
    this.exportService.exportPdf(
      {
        TenDotKhamSucKhoe: 'Tên đợt khám sức khỏe',
        NgayKhamSucKhoe: 'Ngày khám sức khỏe',
        NienHoc: 'Niên học',
      },
      exportData,
      'DanhSachDotKhamSucKhoe'
    );
  }

  getDotKhamSucKhoesByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getDotKhamSucKhoesByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.dotKhamSucKhoes = data;
          this.loading = false;
        });
    }
  }

  openNew(): void {
    this.dialogHeader = 'Thêm đợt khám sức khỏe';
    this.dotKhamSucKhoe = Object.assign({}, this.dataService.newDotKhamSucKhoe);
    this.submitted = false;
    this.dotKhamSucKhoeDialog = true;
    this._ngayKhamSucKhoe = new Date();
  }

  editDotKhamSucKhoe(dotTiemDotKhamSucKhoe: DotKhamSucKhoe): void {
    this.dialogHeader = 'Sửa đợt khám sức khỏe';
    this.dotKhamSucKhoe = dotTiemDotKhamSucKhoe;
    this.dotKhamSucKhoeDialog = true;
    this._ngayKhamSucKhoe = new Date(dotTiemDotKhamSucKhoe.ngayKhamSucKhoe);
  }

  deleteDotKhamSucKhoe(dotTiemDotKhamSucKhoe: DotKhamSucKhoe) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa đợt tiêm?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDotKhamSucKhoe(dotTiemDotKhamSucKhoe.maDotKhamSucKhoe)
          .subscribe((data) => {
            this.getDotKhamSucKhoesByNienHoc();
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
    this.dotKhamSucKhoeDialog = false;
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

  saveDotKhamSucKhoe() {
    if (this.selectedNienHoc?.maNienHoc === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn niên học',
        life: 3000,
      });
      return;
    }
    this.submitted = true;
    this.dotKhamSucKhoe.ngayKhamSucKhoe = this._ngayKhamSucKhoe;
    if (this.selectedNienHoc) {
      this.dotKhamSucKhoe.maNienHoc = this.selectedNienHoc.maNienHoc;
    }
    if (this.checkValid(this.dotKhamSucKhoe)) {
      if (this.dotKhamSucKhoe.maDotKhamSucKhoe === 0) {
        this.dataService.addDotKhamSucKhoe(this.dotKhamSucKhoe).subscribe(
          (data) => {
            this.getDotKhamSucKhoesByNienHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateDotKhamSucKhoe(
            this.dotKhamSucKhoe.maDotKhamSucKhoe,
            this.dotKhamSucKhoe
          )
          .subscribe(
            (data) => {
              this.getDotKhamSucKhoesByNienHoc();
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

  checkValid(dotKhamSucKhoe: DotKhamSucKhoe): boolean {
    if (!dotKhamSucKhoe.tenDotKhamSucKhoe.trim()) return false;
    if (!dotKhamSucKhoe.ngayKhamSucKhoe) return false;
    return true;
  }
}
