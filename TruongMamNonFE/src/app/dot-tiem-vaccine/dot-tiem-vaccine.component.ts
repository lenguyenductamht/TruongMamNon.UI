import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DotTiemVaccine } from '../models/dot-tiem-vaccine.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { Vaccine } from '../models/vaccine.model';
import { NienHoc } from '../models/nien-hoc.model';
import { Suspense } from 'preact/compat';

@Component({
  selector: 'app-dotTiemDotTiemVaccine',
  templateUrl: './dot-tiem-vaccine.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./dot-tiem-vaccine.component.scss'],
})
export class DotTiemVaccineComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  dotTiemVaccineDialog: boolean = false;

  dotTiemVaccines: DotTiemVaccine[] = [];

  dotTiemVaccine: DotTiemVaccine = Object.assign(
    {},
    this.dataService.newDotTiemVaccine
  );

  vaccines: Vaccine[] = [];
  selectedVaccine: Vaccine | undefined;
  submitted: boolean = false;
  _ngayTiemVaccine: Date = new Date();
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  cols: any[] | undefined;

  exportColumns: any[] | undefined;

  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getDotTiemVaccinesByNienHoc();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.dotTiemVaccines.forEach((table) => {
      exportData.push({
        TenDotTiemVaccine: table.tenDotTiemVaccine,
        NgayTiemVaccine: table.ngayTiemVaccine,
        ThuocTiemVaccine: table.vaccine.tenVaccine,
        NienHoc: table.nienHoc.tenNienHoc,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachDotTiemVaccine');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.dotTiemVaccines.forEach((table) => {
      exportData.push({
        TenDotTiemVaccine: table.tenDotTiemVaccine,
        NgayTiemVaccine: table.ngayTiemVaccine,
        Vaccine: table.vaccine.tenVaccine,
        NienHoc: table.nienHoc.tenNienHoc,
      });
    });
    this.exportService.exportPdf(
      {
        TenDotTiemVaccine: 'T??n ?????t ti??m vaccine',
        NgayTiemVaccine: 'Ng??y ti??m vaccine',
        Vaccine: 'Vaccine',
        NienHoc: 'Ni??n h???c',
      },
      exportData,
      'DanhSachDotTiemVaccine'
    );
  }

  getVaccines(): void {
    this.dataService.getVaccines().subscribe(
      (success) => {
        this.vaccines = success;
      },
      (error) => console.log(error)
    );
  }

  getDotTiemVaccinesByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getDotTiemVaccinesByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.dotTiemVaccines = data;
          console.log(this.dotTiemVaccines);
          this.loading = false;
        });
    }
  }

  openNew(): void {
    this.dialogHeader = 'Th??m ?????t ti??m vaccine';
    this.dotTiemVaccine = Object.assign({}, this.dataService.newDotTiemVaccine);
    this.submitted = false;
    this.dotTiemVaccineDialog = true;
    this._ngayTiemVaccine = new Date();
    this.getVaccines();
  }

  editDotTiemVaccine(dotTiemDotTiemVaccine: DotTiemVaccine): void {
    this.dialogHeader = 'S???a ?????t ti??m vaccine';
    this.dotTiemVaccine = dotTiemDotTiemVaccine;
    this.dotTiemVaccineDialog = true;
    this._ngayTiemVaccine = new Date(dotTiemDotTiemVaccine.ngayTiemVaccine);
    this.getVaccines();
    this.selectedVaccine = dotTiemDotTiemVaccine.vaccine;
  }

  deleteDotTiemVaccine(dotTiemDotTiemVaccine: DotTiemVaccine) {
    this.confirmationService.confirm({
      message: 'B???n c?? mu???n x??a ?????t ti??m?',
      header: 'X??c nh???n',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDotTiemVaccine(dotTiemDotTiemVaccine.maDotTiemVaccine)
          .subscribe((data) => {
            this.getDotTiemVaccinesByNienHoc();
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
    this.dotTiemVaccineDialog = false;
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

  public saveDotTiemVaccine() {
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
    this.dotTiemVaccine.ngayTiemVaccine = this._ngayTiemVaccine;
    if (this.selectedVaccine) {
      this.dotTiemVaccine.maVaccine = this.selectedVaccine.maVaccine;
    }
    if (this.selectedNienHoc) {
      this.dotTiemVaccine.maNienHoc = this.selectedNienHoc.maNienHoc;
    }
    if (this.checkValid(this.dotTiemVaccine)) {
      if (this.dotTiemVaccine.maDotTiemVaccine === 0) {
        this.dataService.addDotTiemVaccine(this.dotTiemVaccine).subscribe(
          (data) => {
            this.getDotTiemVaccinesByNienHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateDotTiemVaccine(
            this.dotTiemVaccine.maDotTiemVaccine,
            this.dotTiemVaccine
          )
          .subscribe(
            (data) => {
              this.getDotTiemVaccinesByNienHoc();
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

  onVaccineChange(event: any): void {
    const vaccine: Vaccine = event;
    this.selectedVaccine = vaccine;
  }

  private checkValid(dotTiemVaccine: DotTiemVaccine): boolean {
    if (!dotTiemVaccine.tenDotTiemVaccine.trim()) return false;
    if (!dotTiemVaccine.ngayTiemVaccine) return false;
    return true;
  }
}
