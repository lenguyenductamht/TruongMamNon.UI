import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ThucDon } from '../models/thuc-don.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { ThucDonMonAn } from '../models/thuc-don-mon-an.model';
import { ThucPham } from '../models/thuc-pham.model';
import { MonAn } from '../models/mon-an.model';
import { DanhMucThucDon } from '../models/danh-muc-thuc-don.model';

@Component({
  selector: 'app-thuc-don',
  templateUrl: './thuc-don.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./thuc-don.component.scss'],
})
export class ThucDonComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = false;
  thucDonDialog: boolean = false;

  thucDons: ThucDon[] = [];

  thucDon: ThucDon = Object.assign({}, this.dataService.newThucDon);
  thucDonMonAns: ThucDonMonAn[] = [];
  monAns: MonAn[] = [];
  selectedMonAn: MonAn | undefined;
  thucDonMonAn: ThucDonMonAn = Object.assign(
    {},
    this.dataService.newThucDonMonAn
  );
  _ngayTao: Date = new Date();
  _ngayApDung: Date = new Date();
  danhMucThucDons: DanhMucThucDon[] = [];
  selectedDanhMucThucDon: DanhMucThucDon | undefined;
  submitted: boolean = false;
  cols: any[] | undefined;

  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getThucDons();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.thucDons.forEach((table) => {
      exportData.push({
        NgayTao: table.ngayTao,
        NgayApDung: table.ngayApDung,
        DanhMuc: table.danhMucThucDon?.tenDanhMuc,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachThucDon');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.thucDons.forEach((table) => {
      exportData.push({
        NgayTao: table.ngayTao,
        NgayApDung: table.ngayApDung,
        DanhMuc: table.danhMucThucDon?.tenDanhMuc,
      });
    });
    this.exportService.exportPdf(
      {
        NgayTao: 'Ngày tạo',
        NgayApDung: 'Ngày áp dụng',
        DanhMuc: 'Danh mục',
      },
      exportData,
      'DanhSachThucDon'
    );
  }

  getThucDons(): void {
    this.loading = true;
    this.dataService.getThucDons().subscribe((data) => {
      this.thucDons = data;
      this.loading = false;
    });
  }

  getMonAns(): void {
    this.dataService
      .getMonAns()
      .subscribe((success) => (this.monAns = success));
  }

  getThucDonMonAnsByThucDon(): void {
    this.dataService
      .getThucDonMonAnsByThucDon(this.thucDon.maThucDon)
      .subscribe((success) => (this.thucDonMonAns = success));
  }

  getDanhMucThucDons(): void {
    this.dataService.getDanhMucThucDons().subscribe((success) => {
      this.danhMucThucDons = success;
    });
  }

  openNew(): void {
    this.dialogHeader = 'Thêm thực đơn';
    this.thucDon = Object.assign({}, this.dataService.newThucDon);
    this.thucDonMonAns = [];
    this.getMonAns();
    this.getDanhMucThucDons();
    this.submitted = false;
    this.thucDonDialog = true;
    this._ngayTao = new Date();
    this._ngayApDung = new Date();
  }

  editThucDon(thucDon: ThucDon): void {
    this.dialogHeader = 'Sửa thực đơn';
    this.thucDon = thucDon;
    this.thucDonDialog = true;
    this.getMonAns();
    this.getThucDonMonAnsByThucDon();
    this._ngayTao = new Date(this.thucDon.ngayTao);
    this._ngayApDung = new Date(this.thucDon.ngayApDung);
    this.getDanhMucThucDons();
    this.selectedDanhMucThucDon = this.thucDon.danhMucThucDon;
  }

  deleteThucDon(thucDon: ThucDon) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa thực đơn này?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteThucDon(thucDon.maThucDon).subscribe((data) => {
          this.getThucDons();
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
    this.thucDonDialog = false;
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

  saveThucDon() {
    this.submitted = true;
    this.thucDon.ngayTao = this._ngayTao;
    this.thucDon.ngayApDung = this._ngayApDung;
    if (this.selectedDanhMucThucDon) {
      this.thucDon.maDanhMuc = this.selectedDanhMucThucDon.maDanhMuc;
    }

    if (this.checkValid(this.thucDon) && this.checkValid2()) {
      if (this.thucDon.maThucDon === 0) {
        this.dataService.addThucDon(this.thucDon).subscribe(
          (data) => {
            this.thucDonMonAns.forEach((element) => {
              element.maThucDon = data.maThucDon;
              this.dataService
                .addThucDonMonAn(element)
                .subscribe((success) => console.log(success));
            });
            this.getThucDons();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateThucDon(this.thucDon.maThucDon, this.thucDon)
          .subscribe(
            (data) => {
              this.getThucDons();
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
  onDanhMucThucDonChange(event: any): void {
    const danhMucThucDon: DanhMucThucDon = event;
    this.selectedDanhMucThucDon = danhMucThucDon;
  }

  onMonAnChange(event: any) {
    const monAn: MonAn = event;
    let monAnExists = false;
    for (let i in this.thucDonMonAns) {
      if (this.thucDonMonAns[i].maMonAn === monAn.maMonAn) {
        monAnExists = true;
        break;
      }
    }
    if (!monAnExists) {
      let thucDonMonAn = Object.assign({}, this.dataService.newThucDonMonAn);
      thucDonMonAn.maMonAn = monAn.maMonAn;
      thucDonMonAn.soLuong = 1;
      thucDonMonAn.monAn = monAn;
      this.thucDonMonAns.push(thucDonMonAn);
      console.log(monAn.maMonAn);
      console.log(this.thucDonMonAn);
    }
  }

  deleteThucDonMonAn(thucDonMonAn: ThucDonMonAn) {
    this.thucDonMonAns = this.thucDonMonAns.filter(
      (item) => item.maMonAn !== thucDonMonAn.maMonAn
    );
  }

  private checkValid(thucDon: ThucDon): boolean {
    if (!thucDon.ngayTao) return false;
    if (!thucDon.ngayApDung) return false;
    if (thucDon.maDanhMuc === 0) return false;
    return true;
  }

  private checkValid2(): boolean {
    if (this.thucDonMonAns.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn món ăn',
        life: 3000,
      });
      return false;
    }
    for (let i in this.thucDonMonAns) {
      if (this.thucDonMonAns[i].soLuong <= 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Số lượng không hợp lệ',
          life: 3000,
        });
        return false;
      }
    }
    return true;
  }
}
