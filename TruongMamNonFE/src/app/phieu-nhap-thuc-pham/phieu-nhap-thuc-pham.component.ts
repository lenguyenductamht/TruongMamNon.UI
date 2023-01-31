import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhieuNhapThucPham } from '../models/phieu-nhap-thuc-pham.model';
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
import { ChiTietPhieuNhapThucPham } from '../models/chi-tiet-phieu-nhap-thuc-pham.model';
import { ThucPham } from '../models/thuc-pham.model';

@Component({
  selector: 'app-chuc-vu',
  templateUrl: './phieu-nhap-thuc-pham.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./phieu-nhap-thuc-pham.component.scss'],
})
export class PhieuNhapThucPhamComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  loading = false;
  phieuNhapThucPhamDialog: boolean = false;

  phieuNhapThucPhams: PhieuNhapThucPham[] = [];

  phieuNhapThucPham: PhieuNhapThucPham = Object.assign(
    {},
    this.dataService.newPhieuNhapThucPham
  );
  _ngayNhap = new Date();
  nguoiNhaps: NhanSu[] = [];
  selectedNguoiNhap: NhanSu | undefined;
  chiTietPhieuNhapThucPhams: ChiTietPhieuNhapThucPham[] = [];
  thucPhams: ThucPham[] = [];
  selectedThucPham: ThucPham | undefined;
  chiTietPhieuNhapThucPham: ChiTietPhieuNhapThucPham = Object.assign(
    {},
    this.dataService.newChiTietPhieuNhapThucPham
  );
  tongTien = 0;
  submitted: boolean = false;
  cols: any[] | undefined;

  exportColumns: any[] | undefined;
  public ngOnInit(): void {
    this.getPhieuNhapThucPhams();
  }

  public exportExcel() {
    // const exportData:any[]=[];
    // this.phieuNhapThucPhams.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuNhapThucPham: table.tenPhieuNhapThucPham,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    //this.exportService.exportExcel(exportData, 'PhieuNhapThucPham');
  }

  public exportPdf() {
    // const exportData:any[]=[];
    // this.phieuNhapThucPhams.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuNhapThucPham: table.tenPhieuNhapThucPham,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     TenPhieuNhapThucPham: "Tên PhieuNhapThucPham",
    //     GhiChu: "Ghi Chú",
    //   },
    //   exportData,
    //   'PhieuNhapThucPham'
    // );
  }
  // public getPhieuNhapThucPhams(): void {
  //   this.loading = true;
  //   this.dataService.getPhieuNhapThucPhams().subscribe((data) => {
  //     this.phieuNhapThucPhams = data;
  //     this.loading = false;
  //   });
  // }

  getPhieuNhapThucPhams(): void {
    this.loading = true;
    this.dataService.getPhieuNhapThucPhams().subscribe((data) => {
      this.phieuNhapThucPhams = data;
      this.loading = false;
    });
  }

  getNguoiNhaps(): void {
    this.dataService
      .getNhanSus()
      .subscribe((success) => (this.nguoiNhaps = success));
  }

  getThucPhams(): void {
    this.dataService
      .getThucPhams()
      .subscribe((success) => (this.thucPhams = success));
  }

  getChiTietPhieuNhapThucPhamByMaPhieuNhapThucPham(): void {
    this.dataService
      .getChiTietPhieuNhapThucPhamsByMaPhieuNhapThucPham(
        this.phieuNhapThucPham.maPhieuNhapThucPham
      )
      .subscribe((success) => (this.chiTietPhieuNhapThucPhams = success));
  }

  public openNew(): void {
    this.phieuNhapThucPham = Object.assign(
      {},
      this.dataService.newPhieuNhapThucPham
    );
    this.chiTietPhieuNhapThucPhams = [];
    this._ngayNhap = new Date();
    this.getNguoiNhaps();
    this.getThucPhams();
    this.submitted = false;
    this.phieuNhapThucPhamDialog = true;
  }

  public editPhieuNhapThucPham(phieuNhapThucPham: PhieuNhapThucPham): void {
    console.log('edit phieuNhapThucPham:', phieuNhapThucPham);
    this.phieuNhapThucPham = phieuNhapThucPham;
    this._ngayNhap = new Date(this.phieuNhapThucPham.ngayNhap);
    this.selectedNguoiNhap = this.phieuNhapThucPham.nguoiNhap;
    this.phieuNhapThucPhamDialog = true;
    this.getNguoiNhaps();
    this.getThucPhams();
    this.getChiTietPhieuNhapThucPhamByMaPhieuNhapThucPham();
    console.log(this.getChiTietPhieuNhapThucPhamByMaPhieuNhapThucPham());
  }

  public deletePhieuNhapThucPham(phieuNhapThucPham: PhieuNhapThucPham) {
    console.log('delete phieu nhap thuc pham', phieuNhapThucPham);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa phiếu nhập thực phẩm này?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deletePhieuNhapThucPham(phieuNhapThucPham.maPhieuNhapThucPham)
          .subscribe((data) => {
            console.log(data);
            this.getPhieuNhapThucPhams();
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
    this.phieuNhapThucPhamDialog = false;
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

  public savePhieuNhapThucPham() {
    this.submitted = true;
    this.phieuNhapThucPham.ngayNhap = this._ngayNhap;
    if (this.selectedNguoiNhap) {
      this.phieuNhapThucPham.maNguoiNhap = this.selectedNguoiNhap.maNhanSu;
    }

    console.log('savePhieuNhapThucPham: ', this.phieuNhapThucPham);
    if (this.checkValid(this.phieuNhapThucPham) && this.checkValid2()) {
      if (this.phieuNhapThucPham.maPhieuNhapThucPham === 0) {
        this.phieuNhapThucPham.trangThai = 'Đề xuất';
        this.dataService.addPhieuNhapThucPham(this.phieuNhapThucPham).subscribe(
          (data) => {
            console.log('return data = ', data);
            this.chiTietPhieuNhapThucPhams.forEach((element) => {
              element.maPhieuNhapThucPham = data.maPhieuNhapThucPham;
              this.dataService
                .addChiTietPhieuNhapThucPham(element)
                .subscribe((success) => console.log(success));
              this.dataService
                .tangSoLuong(element.maThucPham, element.soLuong)
                .subscribe((success) => console.log(success));
              console.log(element);
            });
            this.getPhieuNhapThucPhams();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updatePhieuNhapThucPham(
            this.phieuNhapThucPham.maPhieuNhapThucPham,
            this.phieuNhapThucPham
          )
          .subscribe(
            (data) => {
              console.log('return data = ', data);
              this.getPhieuNhapThucPhams();
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

  onNguoiNhapChange(event: any) {
    const nguoiNhap: NhanSu = event;
    this.selectedNguoiNhap = nguoiNhap;
  }

  onThucPhamChange(event: any) {
    const thucPham: ThucPham = event;
    let thucPhamExists = false;
    for (let i in this.chiTietPhieuNhapThucPhams) {
      if (
        this.chiTietPhieuNhapThucPhams[i].maThucPham === thucPham.maThucPham
      ) {
        thucPhamExists = true;
        break;
      }
    }
    if (!thucPhamExists) {
      let chiTietPhieuNhapThucPham = Object.assign(
        {},
        this.dataService.newChiTietPhieuNhapThucPham
      );
      chiTietPhieuNhapThucPham.maThucPham = thucPham.maThucPham;
      chiTietPhieuNhapThucPham.donGia = 0;
      chiTietPhieuNhapThucPham.soLuong = 0;
      chiTietPhieuNhapThucPham.thucPham = thucPham;
      this.chiTietPhieuNhapThucPhams.push(chiTietPhieuNhapThucPham);
      console.log(thucPham.maThucPham);
      console.log(this.chiTietPhieuNhapThucPhams);
    }
  }

  deleteChiTietPhieuNhapThucPham(
    chiTietPhieuNhapThucPham: ChiTietPhieuNhapThucPham
  ) {
    this.chiTietPhieuNhapThucPhams = this.chiTietPhieuNhapThucPhams.filter(
      (item) => item.maThucPham !== chiTietPhieuNhapThucPham.maThucPham
    );
  }

  checkValid(phieuNhapThucPham: PhieuNhapThucPham): boolean {
    if (!phieuNhapThucPham.ngayNhap) return false;
    if (!phieuNhapThucPham.maNguoiNhap) return false;
    return true;
  }

  checkValid2(): boolean {
    if (this.chiTietPhieuNhapThucPhams.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn thực phẩm',
        life: 3000,
      });
      return false;
    }
    for (let i in this.chiTietPhieuNhapThucPhams) {
      if (this.chiTietPhieuNhapThucPhams[i].donGia <= 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Đơn giá không hợp lệ',
          life: 3000,
        });
        return false;
      } else if (this.chiTietPhieuNhapThucPhams[i].soLuong <= 0) {
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
