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

  public loading = true;
  public dotUongVitaminDialog: boolean = false;

  public dotUongVitamins: DotUongVitamin[] = [];

  public dotUongVitamin: DotUongVitamin = Object.assign(
    {},
    this.dataService.newDotUongVitamin
  );

  vitamins: Vitamin[] = [];
  selectedVitamin: Vitamin | undefined;
  submitted: boolean = false;
  _ngayUongVitamin: Date = new Date();
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  public cols: any[] | undefined;

  public exportColumns: any[] | undefined;

  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getDotUongVitaminsByNienHoc();
  }

  public exportExcel() {
    // const exportData: any[] = [];
    // this.dotTiemDotUongVitamins.forEach((table) => {
    //   exportData.push({
    //     TenDotUongVitamin: table.tenDotUongVitamin,
    //     GhiChu: table.ghiChu,
    //   });
    // });
    // this.exportService.exportExcel(exportData, 'DotUongVitamin');
  }

  public exportPdf() {
    // const exportData: any[] = [];
    // this.dotTiemDotUongVitamins.forEach((table) => {
    //   exportData.push({
    //     tenDotUongVitamin: table.tenDotUongVitamin,
    //     ghiChu: table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     tenDotUongVitamin: 'Tên dotTiemDotUongVitamin',
    //     ghiChu: 'Ghi Chú',
    //   },
    //   exportData,
    //   'DotUongVitamin'
    // );
  }

  getVitamins(): void {
    this.dataService.getVitamins().subscribe(
      (success) => {
        this.vitamins = success;
      },
      (error) => console.log(error)
    );
  }

  // getDotUongVitamins(): void {
  //   this.loading = true;
  //   this.dataService.getDotUongVitamins().subscribe((data) => {
  //     this.dotUongVitamins = data;
  //     console.log(this.dotUongVitamins);
  //     this.loading = false;
  //   });
  // }

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

  public openNew(): void {
    this.dotUongVitamin = Object.assign({}, this.dataService.newDotUongVitamin);
    this.submitted = false;
    this.dotUongVitaminDialog = true;
    this._ngayUongVitamin = new Date();
    this.getVitamins();
  }

  public editDotUongVitamin(dotTiemDotUongVitamin: DotUongVitamin): void {
    console.log('edit dotTiemDotUongVitamin:', dotTiemDotUongVitamin);
    this.dotUongVitamin = dotTiemDotUongVitamin;
    this.dotUongVitaminDialog = true;
    this._ngayUongVitamin = new Date(dotTiemDotUongVitamin.ngayUongVitamin);
    this.getVitamins();
    this.selectedVitamin = this.dotUongVitamin.vitamin;
  }

  public deleteDotUongVitamin(dotTiemDotUongVitamin: DotUongVitamin) {
    console.log('delete danh muc thuc don', dotTiemDotUongVitamin);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa đợt tiêm?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDotUongVitamin(dotTiemDotUongVitamin.maDotUongVitamin)
          .subscribe((data) => {
            this.getDotUongVitaminsByNienHoc();
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
    this.dotUongVitaminDialog = false;
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

  public saveDotUongVitamin() {
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
    this.dotUongVitamin.ngayUongVitamin = this._ngayUongVitamin;
    if (this.selectedVitamin) {
      this.dotUongVitamin.maVitamin = this.selectedVitamin.maVitamin;
    }
    if (this.selectedNienHoc) {
      this.dotUongVitamin.maNienHoc = this.selectedNienHoc.maNienHoc;
    }
    console.log('saveDotUongVitamin: ', this.dotUongVitamin);
    if (this.checkValid(this.dotUongVitamin)) {
      if (this.dotUongVitamin.maDotUongVitamin === 0) {
        this.dataService.addDotUongVitamin(this.dotUongVitamin).subscribe(
          (data) => {
            console.log('return data = ', data);
            this.getDotUongVitaminsByNienHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log('error');
            this.hideDialog(false, false);
          }
        );
      } else {
        console.log('ma', this.dotUongVitamin.maDotUongVitamin);
        this.dataService
          .updateDotUongVitamin(
            this.dotUongVitamin.maDotUongVitamin,
            this.dotUongVitamin
          )
          .subscribe(
            (data) => {
              console.log('return data = ', data);
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

  checkValid(dotUongVitamin: DotUongVitamin): boolean {
    if (!dotUongVitamin.tenDotUongVitamin.trim()) return false;
    if (
      !dotUongVitamin.ngayUongVitamin ||
      dotUongVitamin.ngayUongVitamin < new Date(Date.now())
    )
      return false;
    return true;
  }
}