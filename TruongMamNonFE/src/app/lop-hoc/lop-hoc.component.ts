import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { LopHoc } from '../models/lop-hoc.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-lop-hoc',
  templateUrl: './lop-hoc.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./lop-hoc.component.scss'],
})
export class LopHocComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  lopHocDialog = false;
  lopHocs: LopHoc[] = [];
  displayLopHocs: LopHoc[] = [];
  lopHoc: LopHoc = Object.assign({}, this.dataService.newLopHoc);
  submitted: boolean = false;
  selectedKhoiLop: KhoiLop | undefined;
  khoiLops: KhoiLop[] = [];
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });

    this.getLopHocs();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.lopHocs.forEach((table) => {
      exportData.push({
        TenLop: table.tenLop,
        KhoiLop: table.khoiLop?.tenKhoiLop,
        HocPhi: table.hocPhi,
        NienHoc: table.nienHoc?.tenNienHoc,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachLopHoc');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.lopHocs.forEach((table) => {
      exportData.push({
        TenLop: table.tenLop,
        KhoiLop: table.khoiLop?.tenKhoiLop,
        HocPhi: table.hocPhi,
        NienHoc: table.nienHoc?.tenNienHoc,
      });
    });
    this.exportService.exportPdf(
      {
        TenLop: 'T??n l???p',
        KhoiLop: 'Kh???i l???p',
        HocPhi: 'H???c ph??',
        NienHoc: 'Ni??n h???c',
      },
      exportData,
      'DanhSachLopHoc'
    );
  }

  getKhoiLops(): void {
    this.loading = true;
    this.dataService.getKhoiLops().subscribe((data) => {
      this.khoiLops = data;
      this.loading = false;
      this.getLopHocs();
    });
  }

  getNienHocs(): void {
    this.dataService.getNienHocs().subscribe((data) => {
      this.nienHocs = data;
    });
  }

  getLopHocs(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getLopHocsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.lopHocs = data;
          this.loading = false;
        });
    }
  }

  openNew(): void {
    if (!this.selectedNienHoc) {
      this.messageService.add({
        severity: 'error',
        summary: 'L???i',
        detail: 'Ch??a ch???n ni??n h???c',
        life: 3000,
      });
      return;
    }
    this.dialogHeader = 'Th??m l???p h???c';
    this.lopHoc = Object.assign({}, this.dataService.newLopHoc);
    this.lopHocDialog = true;
    this.getKhoiLops();
  }

  editLopHoc(lopHoc: LopHoc): void {
    this.dialogHeader = 'S???a l???p h???c';
    this.lopHoc = lopHoc;
    this.selectedKhoiLop = this.lopHoc.khoiLop;
    this.lopHocDialog = true;
    this.getKhoiLops();
  }

  deleteLopHoc(lopHoc: LopHoc) {
    this.confirmationService.confirm({
      message: 'B???n c?? mu???n x??a ' + lopHoc.tenLop + '?',
      header: 'X??c nh???n',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteLopHoc(lopHoc.maLop).subscribe((data) => {
          this.getLopHocs();
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
    this.lopHocDialog = false;
    if (cancel) {
      this.messageService.add({
        severity: 'info',
        summary: 'H???y',
        detail: '???? h???y',
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

  saveLopHoc() {
    this.submitted = true;
    if (!this.selectedKhoiLop) {
      this.messageService.add({
        severity: 'error',
        summary: 'L???i',
        detail: 'Ch??a ch???n kh???i l???p',
        life: 3000,
      });
      return;
    }

    this.lopHoc.maKhoiLop = this.selectedKhoiLop.maKhoiLop;
    if (this.selectedNienHoc) {
      this.lopHoc.maNienHoc = this.selectedNienHoc.maNienHoc;
    }
    if (this.lopHoc.maNienHoc === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'L???i',
        detail: 'Ch??a ch???n ni??n h???c',
        life: 3000,
      });
      return;
    }
    if (this.checkValid(this.lopHoc)) {
      if (this.lopHoc.maLop === 0) {
        this.dataService.postLopHoc(this.lopHoc).subscribe(
          (data) => {
            this.getLopHocs();
            this.hideDialog(false, true);
            this.getLopHocs();
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService.putLopHoc(this.lopHoc.maLop, this.lopHoc).subscribe(
          (data) => {
            this.hideDialog(false, true);
            this.getLopHocs();
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      }
    }
  }

  onKhoiLopChange(event: any): void {
    const khopLop: KhoiLop = event;
    this.selectedKhoiLop = khopLop;
  }

  private checkValid(lopHoc: LopHoc): boolean {
    if (!lopHoc.tenLop) return false;
    return true;
  }
}
