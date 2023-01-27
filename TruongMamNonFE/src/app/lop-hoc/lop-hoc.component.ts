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

  public loading = true;
  public lopHocDialog = false;

  public lopHocs: LopHoc[] = [];
  public displayLopHocs: LopHoc[] = [];

  public lopHoc: LopHoc = Object.assign({}, this.dataService.newLopHoc);
  public submitted: boolean = false;
  public selectedKhoiLop: KhoiLop | undefined;
  public khoiLops: KhoiLop[] = [];

  public selectedNienHoc: NienHoc | undefined;
  public nienHocs: NienHoc[] = [];

  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });

    this.getLopHocs();
  }

  public exportExcel() {
    const exportData: any[] = [];
    this.lopHocs.forEach((table) => {
      exportData.push({
        tenLop: table.tenLop,
        khoiLop: table.khoiLop.tenKhoiLop,
        hocPhi: table.hocPhi,
        nienHoc: table.nienHoc.tenNienHoc,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachLopHoc');
  }

  public exportPdf() {
    const exportData: any[] = [];
    this.lopHocs.forEach((table) => {
      exportData.push({
        tenLop: table.tenLop,
        khoiLop: table.khoiLop.tenKhoiLop,
        hocPhi: table.hocPhi,
        nienHoc: table.nienHoc.tenNienHoc,
      });
    });
    this.exportService.exportPdf(
      {
        tenLop: 'Tên lớp',
        khoiLop: 'Khối lớp',
        hocPhi: 'Học phí',
        nienHoc: 'Niên học',
      },
      exportData,
      'DanhSachLopHoc'
    );
  }

  public getKhoiLops(): void {
    this.loading = true;
    this.dataService.getKhoiLops().subscribe((data) => {
      this.khoiLops = data;
      this.loading = false;
      this.getLopHocs();
    });
  }

  public getNienHocs(): void {
    this.dataService.getNienHocs().subscribe((data) => {
      this.nienHocs = data;
    });
  }

  public getLopHocs(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getLopHocsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.lopHocs = data;
          //this.displayLopHocs=this.lopHocs.filter((lopHoc)=>lopHoc.nienHoc.maNienHoc===this.selectedNienHoc?.maNienHoc);
          this.loading = false;
        });
    }
  }

  public openNew(): void {
    if (!this.selectedNienHoc) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn niên học',
        life: 3000,
      });
      return;
    }
    this.lopHoc = Object.assign({}, this.dataService.newLopHoc);
    this.lopHocDialog = true;
    this.getKhoiLops();
  }

  public editLopHoc(lopHoc: LopHoc): void {
    console.log('edit lopHoc:', lopHoc);
    this.lopHoc = lopHoc;
    this.selectedKhoiLop = this.lopHoc.khoiLop;
    this.lopHocDialog = true;
    this.getKhoiLops();
  }

  public deleteLopHoc(lopHoc: LopHoc) {
    console.log('delete danh muc thuc don', lopHoc);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + lopHoc.tenLop + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteLopHoc(lopHoc.maLop).subscribe((data) => {
          this.getLopHocs();
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
    this.lopHocDialog = false;
    if (cancel) {
      this.messageService.add({
        severity: 'info',
        summary: 'Hủy',
        detail: 'Đã hủy',
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

  public saveLopHoc() {
    console.log('saveLopHoc: ', this.lopHoc);
    if (!this.selectedKhoiLop) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn khối lớp',
        life: 3000,
      });
      return;
    }
    if (!this.selectedNienHoc) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn niên học',
        life: 3000,
      });
      return;
    }
    this.lopHoc.maKhoiLop = this.selectedKhoiLop.maKhoiLop;
    this.lopHoc.maNienHoc = this.selectedNienHoc.maNienHoc;
    console.log('saveLopHoc: ', this.lopHoc);

    if (this.lopHoc.maLop === 0) {
      this.dataService.postLopHoc(this.lopHoc).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.lopHocs.push(data);
          this.hideDialog(false, true);
          this.getLopHocs();
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      this.dataService.putLopHoc(this.lopHoc.maLop, this.lopHoc).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.hideDialog(false, true);
          this.getLopHocs();
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    }
  }

  public onKhoiLopChange(event: any): void {
    const khopLop: KhoiLop = event;
    this.selectedKhoiLop = khopLop;
  }
}
