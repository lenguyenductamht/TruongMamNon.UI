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

  public loading = true;
  public dotKhamSucKhoeDialog: boolean = false;

  public dotKhamSucKhoes: DotKhamSucKhoe[] = [];

  public dotKhamSucKhoe: DotKhamSucKhoe = Object.assign(
    {},
    this.dataService.newDotKhamSucKhoe
  );

  submitted: boolean = false;
  _ngayKhamSucKhoe: Date = new Date();
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  public cols: any[] | undefined;

  public exportColumns: any[] | undefined;

  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getDotKhamSucKhoesByNienHoc();
  }

  public exportExcel() {
    // const exportData: any[] = [];
    // this.dotTiemDotKhamSucKhoes.forEach((table) => {
    //   exportData.push({
    //     TenDotKhamSucKhoe: table.tenDotKhamSucKhoe,
    //     GhiChu: table.ghiChu,
    //   });
    // });
    // this.exportService.exportExcel(exportData, 'DotKhamSucKhoe');
  }

  public exportPdf() {
    // const exportData: any[] = [];
    // this.dotTiemDotKhamSucKhoes.forEach((table) => {
    //   exportData.push({
    //     tenDotKhamSucKhoe: table.tenDotKhamSucKhoe,
    //     ghiChu: table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     tenDotKhamSucKhoe: 'Tên dotTiemDotKhamSucKhoe',
    //     ghiChu: 'Ghi Chú',
    //   },
    //   exportData,
    //   'DotKhamSucKhoe'
    // );
  }

  getDotKhamSucKhoesByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getDotKhamSucKhoesByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.dotKhamSucKhoes = data;
          console.log(this.dotKhamSucKhoes);
          this.loading = false;
        });
    }
  }

  public openNew(): void {
    this.dotKhamSucKhoe = Object.assign({}, this.dataService.newDotKhamSucKhoe);
    this.submitted = false;
    this.dotKhamSucKhoeDialog = true;
    this._ngayKhamSucKhoe = new Date();
  }

  public editDotKhamSucKhoe(dotTiemDotKhamSucKhoe: DotKhamSucKhoe): void {
    console.log('edit dotTiemDotKhamSucKhoe:', dotTiemDotKhamSucKhoe);
    this.dotKhamSucKhoe = dotTiemDotKhamSucKhoe;
    this.dotKhamSucKhoeDialog = true;
    this._ngayKhamSucKhoe = new Date(dotTiemDotKhamSucKhoe.ngayKhamSucKhoe);
  }

  public deleteDotKhamSucKhoe(dotTiemDotKhamSucKhoe: DotKhamSucKhoe) {
    console.log('delete danh muc thuc don', dotTiemDotKhamSucKhoe);
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

  public hideDialog(cancel = true, success = true): void {
    console.log('hideDialog: ');
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

  public saveDotKhamSucKhoe() {
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
    console.log('saveDotKhamSucKhoe: ', this.dotKhamSucKhoe);
    if (this.checkValid(this.dotKhamSucKhoe)) {
      if (this.dotKhamSucKhoe.maDotKhamSucKhoe === 0) {
        this.dataService.addDotKhamSucKhoe(this.dotKhamSucKhoe).subscribe(
          (data) => {
            console.log('return data = ', data);
            this.getDotKhamSucKhoesByNienHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log('error');
            this.hideDialog(false, false);
          }
        );
      } else {
        console.log('ma', this.dotKhamSucKhoe.maDotKhamSucKhoe);
        this.dataService
          .updateDotKhamSucKhoe(
            this.dotKhamSucKhoe.maDotKhamSucKhoe,
            this.dotKhamSucKhoe
          )
          .subscribe(
            (data) => {
              console.log('return data = ', data);
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
    if (
      !dotKhamSucKhoe.ngayKhamSucKhoe ||
      dotKhamSucKhoe.ngayKhamSucKhoe < new Date(Date.now())
    )
      return false;
    return true;
  }
}
