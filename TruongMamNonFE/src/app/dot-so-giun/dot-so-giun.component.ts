import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DotSoGiun } from '../models/dot-so-giun.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { Vaccine } from '../models/vaccine.model';
import { NienHoc } from '../models/nien-hoc.model';
import { Suspense } from 'preact/compat';
import { ThuocSoGiun } from '../models/thuoc-so-giun.model';

@Component({
  selector: 'app-dotTiemDotSoGiun',
  templateUrl: './dot-so-giun.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./dot-so-giun.component.scss'],
})
export class DotSoGiunComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  dotSoGiunDialog: boolean = false;

  dotSoGiuns: DotSoGiun[] = [];

  dotSoGiun: DotSoGiun = Object.assign({}, this.dataService.newDotSoGiun);

  thuocSoGiuns: ThuocSoGiun[] = [];
  selectedThuocSoGiun: ThuocSoGiun | undefined;
  submitted: boolean = false;
  _ngaySoGiun: Date = new Date();
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  cols: any[] | undefined;

  exportColumns: any[] | undefined;

  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getDotSoGiunsByNienHoc();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.dotSoGiuns.forEach((table) => {
      exportData.push({
        TenDotSoGiun: table.tenDotSoGiun,
        NgaySoGiun: table.ngaySoGiun,
        ThuocSoGiun: table.thuocSoGiun.tenThuocSoGiun,
        NienHoc: table.nienHoc.tenNienHoc,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachDotSoGiun');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.dotSoGiuns.forEach((table) => {
      exportData.push({
        TenDotSoGiun: table.tenDotSoGiun,
        NgaySoGiun: table.ngaySoGiun,
        ThuocSoGiun: table.thuocSoGiun.tenThuocSoGiun,
        NienHoc: table.nienHoc.tenNienHoc,
      });
    });
    this.exportService.exportPdf(
      {
        TenDotSoGiun: 'T??n ?????t s??? giun',
        NgaySoGiun: 'Ng??y s??? giun',
        ThuocSoGiun: 'Thu???c s??? giun',
        NienHoc: 'Ni??n h???c',
      },
      exportData,
      'DanhSachDotSoGiun'
    );
  }

  getThuocSoGiuns(): void {
    this.dataService.getThuocSoGiuns().subscribe(
      (success) => {
        this.thuocSoGiuns = success;
      },
      (error) => console.log(error)
    );
  }

  getDotSoGiunsByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getDotSoGiunsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.dotSoGiuns = data;
          this.loading = false;
        });
    }
  }

  openNew(): void {
    this.dialogHeader = 'Th??m ?????t s??? giun';
    this.dotSoGiun = Object.assign({}, this.dataService.newDotSoGiun);
    this.submitted = false;
    this.dotSoGiunDialog = true;
    this._ngaySoGiun = new Date();
    this.getThuocSoGiuns();
  }

  editDotSoGiun(dotSoGiun: DotSoGiun): void {
    this.dialogHeader = 'S???a ?????t s??? giun';
    this.dotSoGiun = dotSoGiun;
    this.dotSoGiunDialog = true;
    this._ngaySoGiun = new Date(dotSoGiun.ngaySoGiun);
    this.getThuocSoGiuns();
    this.selectedThuocSoGiun = dotSoGiun.thuocSoGiun;
  }

  deleteDotSoGiun(dotTiemDotSoGiun: DotSoGiun) {
    this.confirmationService.confirm({
      message: 'B???n c?? mu???n x??a ?????t ti??m?',
      header: 'X??c nh???n',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDotSoGiun(dotTiemDotSoGiun.maDotSoGiun)
          .subscribe((data) => {
            this.getDotSoGiunsByNienHoc();
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
    this.dotSoGiunDialog = false;
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

  saveDotSoGiun() {
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
    this.dotSoGiun.ngaySoGiun = this._ngaySoGiun;
    if (this.selectedThuocSoGiun) {
      this.dotSoGiun.maThuocSoGiun = this.selectedThuocSoGiun.maThuocSoGiun;
    }
    if (this.selectedNienHoc) {
      this.dotSoGiun.maNienHoc = this.selectedNienHoc.maNienHoc;
    }
    if (this.checkValid(this.dotSoGiun)) {
      if (this.dotSoGiun.maDotSoGiun === 0) {
        this.dataService.addDotSoGiun(this.dotSoGiun).subscribe(
          (data) => {
            this.getDotSoGiunsByNienHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateDotSoGiun(this.dotSoGiun.maDotSoGiun, this.dotSoGiun)
          .subscribe(
            (data) => {
              this.getDotSoGiunsByNienHoc();
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

  onThuocSoGiunChange(event: any): void {
    const thuocSoGiun: ThuocSoGiun = event;
    this.selectedThuocSoGiun = thuocSoGiun;
  }

  checkValid(dotSoGiun: DotSoGiun): boolean {
    if (!dotSoGiun.tenDotSoGiun.trim()) return false;
    if (!dotSoGiun.ngaySoGiun) return false;
    return true;
  }
}
