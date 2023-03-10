import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DotUongVitamin } from '../models/dot-uong-vitamin.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { Vaccine } from '../models/vaccine.model';
import { NienHoc } from '../models/nien-hoc.model';
import { Suspense } from 'preact/compat';
import { Vitamin } from '../models/vitamin.model';

@Component({
  selector: 'app-dotTiemDotUongVitamin',
  templateUrl: './dot-uong-vitamin.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./dot-uong-vitamin.component.scss'],
})
export class DotUongVitaminComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  dotUongVitaminDialog: boolean = false;

  dotUongVitamins: DotUongVitamin[] = [];

  dotUongVitamin: DotUongVitamin = Object.assign(
    {},
    this.dataService.newDotUongVitamin
  );

  vitamins: Vitamin[] = [];
  selectedVitamin: Vitamin | undefined;
  submitted: boolean = false;
  _ngayUongVitamin: Date = new Date();
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  cols: any[] | undefined;

  exportColumns: any[] | undefined;

  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getDotUongVitaminsByNienHoc();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.dotUongVitamins.forEach((table) => {
      exportData.push({
        TenDotUongVitamin: table.tenDotUongVitamin,
        NgayUongVitamin: table.ngayUongVitamin,
        ThuocUongVitamin: table.vitamin.tenVitamin,
        NienHoc: table.nienHoc.tenNienHoc,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachDotUongVitamin');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.dotUongVitamins.forEach((table) => {
      exportData.push({
        TenDotUongVitamin: table.tenDotUongVitamin,
        NgayUongVitamin: table.ngayUongVitamin,
        Vitamin: table.vitamin.tenVitamin,
        NienHoc: table.nienHoc.tenNienHoc,
      });
    });
    this.exportService.exportPdf(
      {
        TenDotUongVitamin: 'T??n ?????t u???ng vitamin',
        NgayUongVitamin: 'Ng??y u???ng vitamin',
        Vitamin: 'Vitamin',
        NienHoc: 'Ni??n h???c',
      },
      exportData,
      'DanhSachDotUongVitamin'
    );
  }

  getVitamins(): void {
    this.dataService.getVitamins().subscribe(
      (success) => {
        this.vitamins = success;
      },
      (error) => console.log(error)
    );
  }

  getDotUongVitaminsByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getDotUongVitaminsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.dotUongVitamins = data;
          console.log(this.dotUongVitamins);
          this.loading = false;
        });
    }
  }

  openNew(): void {
    this.dialogHeader = 'Th??m ?????t u???ng vitamin';
    this.dotUongVitamin = Object.assign({}, this.dataService.newDotUongVitamin);
    this.submitted = false;
    this.dotUongVitaminDialog = true;
    this._ngayUongVitamin = new Date();
    this.getVitamins();
  }

  editDotUongVitamin(dotTiemDotUongVitamin: DotUongVitamin): void {
    this.dialogHeader = 'S???a ?????t u???ng vitamin';
    this.dotUongVitamin = dotTiemDotUongVitamin;
    this.dotUongVitaminDialog = true;
    this._ngayUongVitamin = new Date(dotTiemDotUongVitamin.ngayUongVitamin);
    this.getVitamins();
    this.selectedVitamin = this.dotUongVitamin.vitamin;
  }

  deleteDotUongVitamin(dotTiemDotUongVitamin: DotUongVitamin) {
    console.log('delete danh muc thuc don', dotTiemDotUongVitamin);
    this.confirmationService.confirm({
      message: 'B???n c?? mu???n x??a ?????t ti??m?',
      header: 'X??c nh???n',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDotUongVitamin(dotTiemDotUongVitamin.maDotUongVitamin)
          .subscribe((data) => {
            this.getDotUongVitaminsByNienHoc();
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
    this.dotUongVitaminDialog = false;
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

  saveDotUongVitamin() {
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
    this.dotUongVitamin.ngayUongVitamin = this._ngayUongVitamin;
    if (this.selectedVitamin) {
      this.dotUongVitamin.maVitamin = this.selectedVitamin.maVitamin;
    }
    if (this.selectedNienHoc) {
      this.dotUongVitamin.maNienHoc = this.selectedNienHoc.maNienHoc;
    }
    if (this.checkValid(this.dotUongVitamin)) {
      if (this.dotUongVitamin.maDotUongVitamin === 0) {
        this.dataService.addDotUongVitamin(this.dotUongVitamin).subscribe(
          (data) => {
            this.getDotUongVitaminsByNienHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateDotUongVitamin(
            this.dotUongVitamin.maDotUongVitamin,
            this.dotUongVitamin
          )
          .subscribe(
            (data) => {
              this.getDotUongVitaminsByNienHoc();
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

  onVitaminChange(event: any): void {
    const vitamin: Vitamin = event;
    this.selectedVitamin = vitamin;
  }

  private checkValid(dotUongVitamin: DotUongVitamin): boolean {
    if (!dotUongVitamin.tenDotUongVitamin.trim()) return false;
    if (!dotUongVitamin.ngayUongVitamin) return false;
    return true;
  }
}
