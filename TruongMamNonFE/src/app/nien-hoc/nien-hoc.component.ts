import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { NienHoc } from '../models/nien-hoc.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-nien-hoc',
  templateUrl: './nien-hoc.component.html',
  styleUrls: ['./nien-hoc.component.scss'],
})
export class NienHocComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private exportService: ExportService
  ) {}
  loading = false;
  nienHocDialog = false;
  nienHocs: NienHoc[] = [];
  nienHoc: NienHoc = Object.assign({}, this.dataService.newNienHoc);
  submitted: boolean = false;
  dialogHeader = '';
  _batDauHK1 = new Date();
  _ketThucHK1 = new Date();
  _batDauHK2 = new Date();
  _ketThucHK2 = new Date();

  ngOnInit(): void {
    this.getNienHocs();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.nienHocs.forEach((table) => {
      exportData.push({
        TenNienHoc: table.tenNienHoc,
        BatDauHK1: table.batDauHK1,
        KetThucHK1: table.ketThucHK1,
        BatDauHK2: table.batDauHK2,
        KetThucHK2: table.ketThucHK2,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachNienHoc');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.nienHocs.forEach((table) => {
      exportData.push({
        TenNienHoc: table.tenNienHoc,
        BatDauHK1: table.batDauHK1,
        KetThucHK1: table.ketThucHK1,
        BatDauHK2: table.batDauHK2,
        KetThucHK2: table.ketThucHK2,
      });
    });
    this.exportService.exportPdf(
      {
        tenNienHoc: 'Tên niên học',
        batDauHK1: 'Bắt đầu học kỳ 1',
        ketThucHK1: 'Kết thúc học kỳ 1',
        batDauHK2: 'Bắt đầu học kỳ 2',
        ketThucHK2: 'Kết thúc học kỳ 2',
      },
      exportData,
      'DanhSachNienHoc'
    );
  }

  getNienHocs(): void {
    this.loading = true;
    this.dataService.getNienHocs().subscribe((data) => {
      this.nienHocs = data;
      this.loading = false;
    });
  }

  openNew(): void {
    this.submitted = false;
    this.nienHoc = Object.assign({}, this.dataService.newNienHoc);
    this._batDauHK1 = new Date();
    this._ketThucHK1 = new Date();
    this._batDauHK2 = new Date();
    this._ketThucHK2 = new Date();
    this.submitted = false;
    this.dialogHeader = 'Thêm niên học';
    this.nienHocDialog = true;
  }

  editNienHoc(nienHoc: NienHoc): void {
    console.log('edit nienHoc:', nienHoc);
    this._batDauHK1 = new Date(nienHoc.batDauHK1);
    this._ketThucHK1 = new Date(nienHoc.ketThucHK1);
    this._batDauHK2 = new Date(nienHoc.batDauHK2);
    this._ketThucHK2 = new Date(nienHoc.ketThucHK2);
    this.nienHoc = nienHoc;
    this.dialogHeader = 'Sửa niên học';
    this.nienHocDialog = true;
  }

  deleteNienHoc(nienHoc: NienHoc) {
    console.log('delete nien hoc', nienHoc);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + nienHoc.tenNienHoc + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteNienHoc(nienHoc.maNienHoc).subscribe((data) => {
          this.getNienHocs();
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

  hideDialog(cancel = true, success = true): void {
    this.nienHocDialog = false;
    if (cancel) {
      this.messageService.add({
        severity: 'info',
        summary: 'Hủy',
        detail: 'Đã hủy thao tác',
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

  saveNienHoc() {
    this.submitted = true;
    this.nienHoc.batDauHK1 = this._batDauHK1;
    this.nienHoc.ketThucHK1 = this._ketThucHK1;
    this.nienHoc.batDauHK2 = this._batDauHK2;
    this.nienHoc.ketThucHK2 = this._ketThucHK2;
    console.log('saveNienHoc: ', this.nienHoc);
    if (this.checkValid(this.nienHoc)) {
      if (this.nienHoc.maNienHoc === 0) {
        this.dataService.addNienHoc(this.nienHoc).subscribe(
          (success) => {
            this.hideDialog(false, true);
            this.getNienHocs();
          },
          (error) => {
            this.hideDialog(false, false);
            this.getNienHocs();
            console.log(error);
          }
        );
      } else {
        this.dataService
          .updateNienHoc(this.nienHoc.maNienHoc, this.nienHoc)
          .subscribe(
            (success) => {
              this.hideDialog(false, true);
              this.getNienHocs();
            },
            (error) => {
              console.log('error');
              this.hideDialog(false, false);
              this.getNienHocs();
            }
          );
      }
    }
  }

  private checkValid(nienHoc: NienHoc): boolean {
    if (
      !nienHoc.tenNienHoc.trim().length ||
      !nienHoc.batDauHK1 ||
      !nienHoc.ketThucHK1 ||
      !nienHoc.batDauHK2 ||
      !nienHoc.ketThucHK2
    ) {
      return false;
    }
    if (nienHoc.ketThucHK1 <= nienHoc.batDauHK1) return false;
    if (nienHoc.batDauHK2 <= nienHoc.ketThucHK1) return false;
    if (nienHoc.ketThucHK2 <= nienHoc.batDauHK2) return false;
    return true;
  }
}
