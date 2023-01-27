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

  public loading = true;
  public dotTiemVaccineDialog: boolean = false;

  public dotTiemVaccines: DotTiemVaccine[] = [];

  public dotTiemVaccine: DotTiemVaccine = Object.assign(
    {},
    this.dataService.newDotTiemVaccine
  );

  vaccines: Vaccine[] = [];
  selectedVaccine: Vaccine | undefined;
  submitted: boolean = false;
  _ngayTiemVaccine: Date = new Date();
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  public cols: any[] | undefined;

  public exportColumns: any[] | undefined;

  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getDotTiemVaccinesByNienHoc();
  }

  public exportExcel() {
    // const exportData: any[] = [];
    // this.dotTiemDotTiemVaccines.forEach((table) => {
    //   exportData.push({
    //     TenDotTiemVaccine: table.tenDotTiemVaccine,
    //     GhiChu: table.ghiChu,
    //   });
    // });
    // this.exportService.exportExcel(exportData, 'DotTiemVaccine');
  }

  public exportPdf() {
    // const exportData: any[] = [];
    // this.dotTiemDotTiemVaccines.forEach((table) => {
    //   exportData.push({
    //     tenDotTiemVaccine: table.tenDotTiemVaccine,
    //     ghiChu: table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     tenDotTiemVaccine: 'Tên dotTiemDotTiemVaccine',
    //     ghiChu: 'Ghi Chú',
    //   },
    //   exportData,
    //   'DotTiemVaccine'
    // );
  }

  getVaccines(): void {
    this.dataService.getVaccines().subscribe(
      (success) => {
        this.vaccines = success;
      },
      (error) => console.log(error)
    );
  }

  // getDotTiemVaccines(): void {
  //   this.loading = true;
  //   this.dataService.getDotTiemVaccines().subscribe((data) => {
  //     this.dotTiemVaccines = data;
  //     console.log(this.dotTiemVaccines);
  //     this.loading = false;
  //   });
  // }

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

  public openNew(): void {
    this.dotTiemVaccine = Object.assign({}, this.dataService.newDotTiemVaccine);
    this.submitted = false;
    this.dotTiemVaccineDialog = true;
    this._ngayTiemVaccine = new Date();
    this.getVaccines();
  }

  public editDotTiemVaccine(dotTiemDotTiemVaccine: DotTiemVaccine): void {
    console.log('edit dotTiemDotTiemVaccine:', dotTiemDotTiemVaccine);
    this.dotTiemVaccine = dotTiemDotTiemVaccine;
    this.dotTiemVaccineDialog = true;
    this._ngayTiemVaccine = new Date(dotTiemDotTiemVaccine.ngayTiemVaccine);
    this.getVaccines();
    this.selectedVaccine = dotTiemDotTiemVaccine.vaccine;
  }

  public deleteDotTiemVaccine(dotTiemDotTiemVaccine: DotTiemVaccine) {
    console.log('delete danh muc thuc don', dotTiemDotTiemVaccine);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa đợt tiêm?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDotTiemVaccine(dotTiemDotTiemVaccine.maDotTiemVaccine)
          .subscribe((data) => {
            this.getDotTiemVaccinesByNienHoc();
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
    this.dotTiemVaccineDialog = false;
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

  public saveDotTiemVaccine() {
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
    this.dotTiemVaccine.ngayTiemVaccine = this._ngayTiemVaccine;
    if (this.selectedVaccine) {
      this.dotTiemVaccine.maVaccine = this.selectedVaccine.maVaccine;
    }
    if (this.selectedNienHoc) {
      this.dotTiemVaccine.maNienHoc = this.selectedNienHoc.maNienHoc;
    }
    console.log('saveDotTiemVaccine: ', this.dotTiemVaccine);
    if (this.checkValid(this.dotTiemVaccine)) {
      if (this.dotTiemVaccine.maDotTiemVaccine === 0) {
        this.dataService.addDotTiemVaccine(this.dotTiemVaccine).subscribe(
          (data) => {
            console.log('return data = ', data);
            this.getDotTiemVaccinesByNienHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log('error');
            this.hideDialog(false, false);
          }
        );
      } else {
        console.log('ma', this.dotTiemVaccine.maDotTiemVaccine);
        this.dataService
          .updateDotTiemVaccine(
            this.dotTiemVaccine.maDotTiemVaccine,
            this.dotTiemVaccine
          )
          .subscribe(
            (data) => {
              console.log('return data = ', data);
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

  checkValid(dotTiemVaccine: DotTiemVaccine): boolean {
    if (!dotTiemVaccine.tenDotTiemVaccine.trim()) return false;
    if (
      !dotTiemVaccine.ngayTiemVaccine ||
      dotTiemVaccine.ngayTiemVaccine < new Date(Date.now())
    )
      return false;
    return true;
  }
}
