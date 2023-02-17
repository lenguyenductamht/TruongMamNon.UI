import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ThucPham } from '../models/thuc-pham.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { DanhMucThucPham } from '../models/danh-muc-thuc-pham.model';

@Component({
  selector: 'app-thucPham',
  templateUrl: './thuc-pham.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./thuc-pham.component.scss'],
})
export class ThucPhamComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  dialogHeader = '';
  loading = true;
  thucPhamDialog: boolean = false;

  thucPhams: ThucPham[] = [];

  thucPham: ThucPham = Object.assign({}, this.dataService.newThucPham);
  submitted: boolean = false;
  danhMucThucPhams: DanhMucThucPham[] = [];
  selectedDanhMucThucPham: DanhMucThucPham | undefined;

  cols: any[] | undefined;

  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getThucPhams();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.thucPhams.forEach((table) => {
      exportData.push({
        TenThucPham: table.tenThucPham,
        DonViTinh: table.donViTinh,
        TonKho: table.tonKho,
        DanhMuc: table.danhMucThucPham?.tenDanhMuc,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachThucPham');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.thucPhams.forEach((table) => {
      exportData.push({
        TenThucPham: table.tenThucPham,
        DonViTinh: table.donViTinh,
        TonKho: table.tonKho,
        DanhMuc: table.danhMucThucPham?.tenDanhMuc,
      });
    });
    this.exportService.exportPdf(
      {
        TenThucPham: 'Tên thực phẩm',
        DonViTinh: 'Đơn vị tính',
        TonKho: 'Tồn kho',
        DanhMuc: 'Danh mục',
      },
      exportData,
      'DanhSachThucPham'
    );
  }

  getThucPhams(): void {
    this.loading = true;
    this.dataService.getThucPhams().subscribe((data) => {
      this.thucPhams = data;
      this.loading = false;
    });
  }

  getDanhMucThucPhams(): void {
    this.dataService
      .getDanhMucThucPhams()
      .subscribe((success) => (this.danhMucThucPhams = success));
  }

  openNew(): void {
    this.dialogHeader = 'Thêm thực phẩm';
    this.thucPham = Object.assign({}, this.dataService.newThucPham);
    this.submitted = false;
    this.thucPhamDialog = true;
    this.getDanhMucThucPhams();
  }

  editThucPham(thucPham: ThucPham): void {
    this.dialogHeader = 'Sửa thực phẩm';
    this.thucPham = thucPham;
    this.thucPhamDialog = true;
  }

  deleteThucPham(thucPham: ThucPham) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + thucPham.tenThucPham + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteThucPham(thucPham.maThucPham)
          .subscribe((data) => {
            this.getThucPhams();
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
    this.thucPhamDialog = false;
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

  saveThucPham() {
    this.submitted = true;
    if (this.selectedDanhMucThucPham) {
      this.thucPham.maDanhMuc = this.selectedDanhMucThucPham.maDanhMuc;
    }
    if (this.checkValid(this.thucPham)) {
      if (this.thucPham.maThucPham === 0) {
        this.dataService.addThucPham(this.thucPham).subscribe(
          (data) => {
            this.getThucPhams();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateThucPham(this.thucPham.maThucPham, this.thucPham)
          .subscribe(
            (data) => {
              this.getThucPhams();
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

  onDanhMucThucPhamChange(event: DanhMucThucPham): void {
    const danhMucThucPham: DanhMucThucPham = event;
    this.selectedDanhMucThucPham = danhMucThucPham;
  }

  checkValid(thucPham: ThucPham): boolean {
    if (!thucPham.tenThucPham || thucPham.tenThucPham.length > 200)
      return false;
    if (!thucPham.donViTinh) return false;
    if (thucPham.maDanhMuc === 0) return false;
    if (thucPham.tonKho < 0) return false;
    return true;
  }
}
