import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhieuXuatThucPham } from '../models/phieu-xuat-thuc-pham.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { LopHoc } from '../models/lop-hoc.model';
import { Vaccine } from '../models/vaccine.model';
import { HocSinh } from '../models/hoc-sinh.model';
import { DotTiemVaccine } from '../models/dot-tiem-vaccine.model';
import { NhanSu } from '../models/nhan-su.model';
import { ChiTietPhieuXuatThucPham } from '../models/chi-tiet-phieu-xuat-thuc-pham.model';
import { ThucPham } from '../models/thuc-pham.model';

@Component({
  selector: 'app-chuc-vu',
  templateUrl: './phieu-xuat-thuc-pham.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./phieu-xuat-thuc-pham.component.scss'],
})
export class PhieuXuatThucPhamComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = false;
  phieuXuatThucPhamDialog: boolean = false;

  phieuXuatThucPhams: PhieuXuatThucPham[] = [];

  phieuXuatThucPham: PhieuXuatThucPham = Object.assign(
    {},
    this.dataService.newPhieuXuatThucPham
  );
  _ngayXuat = new Date();
  nguoiXuats: NhanSu[] = [];
  selectedNguoiXuat: NhanSu | undefined;
  chiTietPhieuXuatThucPhams: ChiTietPhieuXuatThucPham[] = [];
  thucPhams: ThucPham[] = [];
  selectedThucPham: ThucPham | undefined;
  chiTietPhieuXuatThucPham: ChiTietPhieuXuatThucPham = Object.assign(
    {},
    this.dataService.newChiTietPhieuXuatThucPham
  );
  submitted: boolean = false;
  cols: any[] | undefined;

  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getPhieuXuatThucPhams();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.phieuXuatThucPhams.forEach((table) => {
      exportData.push({
        MaPhieuXuat: table.maPhieuXuatThucPham,
        NgayXuat: table.ngayXuat,
        NguoiXuat: table.nguoiXuat.ho + ' ' + table.nguoiXuat.ten,
        GhiChu: table.ghiChu,
        TrangThai: table.trangThai,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachPhieuXuatThucPham');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.phieuXuatThucPhams.forEach((table) => {
      exportData.push({
        MaPhieuXuat: table.maPhieuXuatThucPham,
        NgayXuat: table.ngayXuat,
        NguoiXuat: table.nguoiXuat.ho + ' ' + table.nguoiXuat.ten,
        GhiChu: table.ghiChu,
        TrangThai: table.trangThai,
      });
    });
    this.exportService.exportPdf(
      {
        MaPhieuXuat: 'Mã phiếu xuất',
        NgayXuat: 'Ngày xuất',
        NguoiXuat: 'Người xuất',
        GhiChu: 'Ghi chú',
        TrangThai: 'Trạng thái',
      },
      exportData,
      'DanhSachPhieuXuatThucPham'
    );
  }

  getPhieuXuatThucPhams(): void {
    this.loading = true;
    this.dataService.getPhieuXuatThucPhams().subscribe((data) => {
      this.phieuXuatThucPhams = data;
      this.loading = false;
    });
  }

  getNguoiXuats(): void {
    this.dataService
      .getNhanSus()
      .subscribe((success) => (this.nguoiXuats = success));
  }

  getThucPhams(): void {
    this.dataService
      .getThucPhams()
      .subscribe((success) => (this.thucPhams = success));
  }

  getChiTietPhieuXuatThucPhamByMaPhieuXuatThucPham(): void {
    this.dataService
      .getChiTietPhieuXuatThucPhamsByMaPhieuXuatThucPham(
        this.phieuXuatThucPham.maPhieuXuatThucPham
      )
      .subscribe((success) => (this.chiTietPhieuXuatThucPhams = success));
  }

  openNew(): void {
    this.dialogHeader = 'Thêm phiếu xuất thực phẩm';
    this.phieuXuatThucPham = Object.assign(
      {},
      this.dataService.newPhieuXuatThucPham
    );
    this.chiTietPhieuXuatThucPhams = [];
    this._ngayXuat = new Date();
    this.getNguoiXuats();
    this.getThucPhams();
    this.submitted = false;
    this.phieuXuatThucPhamDialog = true;
  }

  editPhieuXuatThucPham(phieuXuatThucPham: PhieuXuatThucPham): void {
    this.dialogHeader = 'Sửa phiếu xuất thực phẩm';
    this.phieuXuatThucPham = phieuXuatThucPham;
    this._ngayXuat = new Date(this.phieuXuatThucPham.ngayXuat);
    this.selectedNguoiXuat = this.phieuXuatThucPham.nguoiXuat;
    this.phieuXuatThucPhamDialog = true;
    this.getNguoiXuats();
    this.getThucPhams();
    this.getChiTietPhieuXuatThucPhamByMaPhieuXuatThucPham();
  }

  deletePhieuXuatThucPham(phieuXuatThucPham: PhieuXuatThucPham) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa phiếu xuất thực phẩm này?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deletePhieuXuatThucPham(phieuXuatThucPham.maPhieuXuatThucPham)
          .subscribe((data) => {
            console.log(data);
            this.getPhieuXuatThucPhams();
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
    this.phieuXuatThucPhamDialog = false;
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

  savePhieuXuatThucPham() {
    this.submitted = true;
    this.phieuXuatThucPham.ngayXuat = this._ngayXuat;
    if (this.selectedNguoiXuat) {
      this.phieuXuatThucPham.maNguoiXuat = this.selectedNguoiXuat.maNhanSu;
    }

    if (this.checkValid(this.phieuXuatThucPham) && this.checkValid2()) {
      if (this.phieuXuatThucPham.maPhieuXuatThucPham === 0) {
        this.phieuXuatThucPham.trangThai = 'Đề xuất';
        this.dataService.addPhieuXuatThucPham(this.phieuXuatThucPham).subscribe(
          (data) => {
            this.chiTietPhieuXuatThucPhams.forEach((element) => {
              element.maPhieuXuatThucPham = data.maPhieuXuatThucPham;
              this.dataService.addChiTietPhieuXuatThucPham(element).subscribe();
              this.dataService
                .giamSoLuong(element.maThucPham, element.soLuong)
                .subscribe();
            });
            this.getPhieuXuatThucPhams();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updatePhieuXuatThucPham(
            this.phieuXuatThucPham.maPhieuXuatThucPham,
            this.phieuXuatThucPham
          )
          .subscribe(
            (data) => {
              this.getPhieuXuatThucPhams();
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

  onNguoiXuatChange(event: any) {
    const nguoiXuat: NhanSu = event;
    this.selectedNguoiXuat = nguoiXuat;
  }

  onThucPhamChange(event: any) {
    const thucPham: ThucPham = event;
    let thucPhamExists = false;
    let thucPhamHetHang = false;
    for (let i in this.chiTietPhieuXuatThucPhams) {
      if (
        this.chiTietPhieuXuatThucPhams[i].maThucPham === thucPham.maThucPham
      ) {
        thucPhamExists = true;
        break;
      }
    }
    if (thucPham.tonKho === 0) {
      thucPhamHetHang = true;
    }
    if (!thucPhamExists && !thucPhamHetHang) {
      let chiTietPhieuXuatThucPham = Object.assign(
        {},
        this.dataService.newChiTietPhieuXuatThucPham
      );
      chiTietPhieuXuatThucPham.maThucPham = thucPham.maThucPham;
      chiTietPhieuXuatThucPham.donGia = 0;
      chiTietPhieuXuatThucPham.soLuong = 0;
      chiTietPhieuXuatThucPham.thucPham = thucPham;
      this.chiTietPhieuXuatThucPhams.push(chiTietPhieuXuatThucPham);
    }
  }

  deleteChiTietPhieuXuatThucPham(
    chiTietPhieuXuatThucPham: ChiTietPhieuXuatThucPham
  ) {
    this.chiTietPhieuXuatThucPhams = this.chiTietPhieuXuatThucPhams.filter(
      (item) => item.maThucPham !== chiTietPhieuXuatThucPham.maThucPham
    );
  }

  checkValid(phieuXuatThucPham: PhieuXuatThucPham): boolean {
    if (!phieuXuatThucPham.ngayXuat) return false;
    if (!phieuXuatThucPham.maNguoiXuat) return false;
    return true;
  }

  checkValid2(): boolean {
    if (this.chiTietPhieuXuatThucPhams.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn thực phẩm',
        life: 3000,
      });
      return false;
    }
    for (let i in this.chiTietPhieuXuatThucPhams) {
      if (this.chiTietPhieuXuatThucPhams[i].soLuong <= 0) {
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
