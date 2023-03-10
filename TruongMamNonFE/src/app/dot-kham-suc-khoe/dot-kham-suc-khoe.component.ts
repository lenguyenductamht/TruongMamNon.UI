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
        TenDotKhamSucKhoe: 'T??n ?????t kh??m s???c kh???e',
        NgayKhamSucKhoe: 'Ng??y kh??m s???c kh???e',
        NienHoc: 'Ni??n h???c',
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
    this.dialogHeader = 'Th??m ?????t kh??m s???c kh???e';
    this.dotKhamSucKhoe = Object.assign({}, this.dataService.newDotKhamSucKhoe);
    this.submitted = false;
    this.dotKhamSucKhoeDialog = true;
    this._ngayKhamSucKhoe = new Date();
  }

  editDotKhamSucKhoe(dotTiemDotKhamSucKhoe: DotKhamSucKhoe): void {
    this.dialogHeader = 'S???a ?????t kh??m s???c kh???e';
    this.dotKhamSucKhoe = dotTiemDotKhamSucKhoe;
    this.dotKhamSucKhoeDialog = true;
    this._ngayKhamSucKhoe = new Date(dotTiemDotKhamSucKhoe.ngayKhamSucKhoe);
  }

  deleteDotKhamSucKhoe(dotTiemDotKhamSucKhoe: DotKhamSucKhoe) {
    this.confirmationService.confirm({
      message: 'B???n c?? mu???n x??a ?????t ti??m?',
      header: 'X??c nh???n',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDotKhamSucKhoe(dotTiemDotKhamSucKhoe.maDotKhamSucKhoe)
          .subscribe((data) => {
            this.getDotKhamSucKhoesByNienHoc();
            this.messageService.add({
              severity: 'success',
              summary: 'Th??nh c??ng',
              detail: 'X??a th??nh c??ng',
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
        summary: 'H???y',
        detail: 'Kh??ng mu???n th??m n???a',
        life: 3000,
      });
    } else if (success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Th??nh c??ng',
        detail: 'L??u th??nh c??ng',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'L???i',
        detail: 'L??u kh??ng th??nh c??ng',
        life: 3000,
      });
    }
    this.submitted = false;
  }

  saveDotKhamSucKhoe() {
    if (this.selectedNienHoc?.maNienHoc === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'L???i',
        detail: 'Ch??a ch???n ni??n h???c',
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
