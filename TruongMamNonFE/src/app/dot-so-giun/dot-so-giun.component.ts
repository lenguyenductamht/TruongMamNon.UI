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

  public loading = true;
  public dotSoGiunDialog: boolean = false;

  public dotSoGiuns: DotSoGiun[] = [];

  public dotSoGiun: DotSoGiun = Object.assign(
    {},
    this.dataService.newDotSoGiun
  );

  thuocSoGiuns: ThuocSoGiun[] = [];
  selectedThuocSoGiun: ThuocSoGiun | undefined;
  submitted: boolean = false;
  _ngaySoGiun: Date = new Date();
  selectedNienHoc: NienHoc | undefined;
  nienHocs: NienHoc[] = [];
  public cols: any[] | undefined;

  public exportColumns: any[] | undefined;

  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getDotSoGiunsByNienHoc();
  }

  public exportExcel() {
    // const exportData: any[] = [];
    // this.dotTiemDotSoGiuns.forEach((table) => {
    //   exportData.push({
    //     TenDotSoGiun: table.tenDotSoGiun,
    //     GhiChu: table.ghiChu,
    //   });
    // });
    // this.exportService.exportExcel(exportData, 'DotSoGiun');
  }

  public exportPdf() {
    // const exportData: any[] = [];
    // this.dotTiemDotSoGiuns.forEach((table) => {
    //   exportData.push({
    //     tenDotSoGiun: table.tenDotSoGiun,
    //     ghiChu: table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     tenDotSoGiun: 'Tên dotTiemDotSoGiun',
    //     ghiChu: 'Ghi Chú',
    //   },
    //   exportData,
    //   'DotSoGiun'
    // );
  }

  getThuocSoGiuns(): void {
    this.dataService.getThuocSoGiuns().subscribe(
      (success) => {
        this.thuocSoGiuns = success;
      },
      (error) => console.log(error)
    );
  }

  // getDotSoGiuns(): void {
  //   this.loading = true;
  //   this.dataService.getDotSoGiuns().subscribe((data) => {
  //     this.dotSoGiuns = data;
  //     console.log(this.dotSoGiuns);
  //     this.loading = false;
  //   });
  // }

  getDotSoGiunsByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getDotSoGiunsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.dotSoGiuns = data;
          console.log(this.dotSoGiuns);
          this.loading = false;
        });
    }
  }

  public openNew(): void {
    this.dotSoGiun = Object.assign({}, this.dataService.newDotSoGiun);
    this.submitted = false;
    this.dotSoGiunDialog = true;
    this._ngaySoGiun = new Date();
    this.getThuocSoGiuns();
  }

  public editDotSoGiun(dotSoGiun: DotSoGiun): void {
    console.log('edit dotTiemDotSoGiun:', dotSoGiun);
    this.dotSoGiun = dotSoGiun;
    this.dotSoGiunDialog = true;
    this._ngaySoGiun = new Date(dotSoGiun.ngaySoGiun);
    this.getThuocSoGiuns();
    this.selectedThuocSoGiun = dotSoGiun.thuocSoGiun;
  }

  public deleteDotSoGiun(dotTiemDotSoGiun: DotSoGiun) {
    console.log('delete danh muc thuc don', dotTiemDotSoGiun);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa đợt tiêm?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDotSoGiun(dotTiemDotSoGiun.maDotSoGiun)
          .subscribe((data) => {
            this.getDotSoGiunsByNienHoc();
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
    this.dotSoGiunDialog = false;
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

  public saveDotSoGiun() {
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
    this.dotSoGiun.ngaySoGiun = this._ngaySoGiun;
    if (this.selectedThuocSoGiun) {
      this.dotSoGiun.maThuocSoGiun = this.selectedThuocSoGiun.maThuocSoGiun;
    }
    if (this.selectedNienHoc) {
      this.dotSoGiun.maNienHoc = this.selectedNienHoc.maNienHoc;
    }
    console.log('saveDotSoGiun: ', this.dotSoGiun);
    if (this.checkValid(this.dotSoGiun)) {
      if (this.dotSoGiun.maDotSoGiun === 0) {
        this.dataService.addDotSoGiun(this.dotSoGiun).subscribe(
          (data) => {
            console.log('return data = ', data);
            this.getDotSoGiunsByNienHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        console.log('ma', this.dotSoGiun.maDotSoGiun);
        this.dataService
          .updateDotSoGiun(this.dotSoGiun.maDotSoGiun, this.dotSoGiun)
          .subscribe(
            (data) => {
              console.log('return data = ', data);
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
    if (!dotSoGiun.ngaySoGiun || dotSoGiun.ngaySoGiun < new Date(Date.now()))
      return false;
    return true;
  }
}
