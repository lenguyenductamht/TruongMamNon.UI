import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NhanSu } from '../models/nhan-su.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { ExportService } from '../services/export.service';
import { LopHoc } from '../models/lop-hoc.model';
import { PhongBan } from '../models/phong-ban.model';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { ChucVu } from '../models/chuc-vu.model';
import { DanToc } from '../models/dan-toc.model';
import { TonGiao } from '../models/ton-giao.model';
import { GioiTinh } from '../models/gioi-tinh.model';
import { QuocGia } from '../models/quoc-gia.model';
import { TrangThaiLamViec } from '../models/trang-thai-lam-viec.model';

@Component({
  selector: 'app-nhan-su',
  templateUrl: './nhan-su.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./nhan-su.component.scss'],
})
export class NhanSuComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = true;
  public nhanSuDialog = false;

  public nhanSus: NhanSu[] = [];

  public nhanSu: NhanSu = Object.assign({}, this.dataService.newNhanSu);
  public submitted: boolean = false;
  public gioiTinhs: GioiTinh[] = [];
  public danTocs: DanToc[] = [];
  public tonGiaos: TonGiao[] = [];
  public quocTichs: QuocGia[] = [];
  public trangThaiLamViecs: TrangThaiLamViec[] = [];
  public khoiLops: KhoiLop[] = [];
  public selectedKhoiLop: KhoiLop | undefined;
  public lopHocs: LopHoc[] = [];
  public selectedLopHoc: LopHoc | undefined;
  public selectedGioiTinh: GioiTinh | undefined;
  public selectedNienHoc: NienHoc | undefined;
  public selectedTrangThaiLamViec: TrangThaiLamViec | undefined;
  public selectedDanToc: DanToc | undefined;
  public selectedTonGiao: TonGiao | undefined;
  public selectedQuocTich: QuocGia | undefined;
  public nienHocs: NienHoc[] = [];
  public phongBans: PhongBan[] = [];
  public selectedPhongBan: PhongBan | undefined;

  public loaiNhanSus: LoaiNhanSu[] = [];
  public selectedLoaiNhanSu: LoaiNhanSu | undefined;

  public chucVus: ChucVu[] = [];
  public selectedChucVu: ChucVu | undefined;

  _ngaySinh = new Date();
  _ngayCap = new Date();
  _ngayVaoTruong = new Date();
  _ngayCapNhat = new Date();

  public ngOnInit(): void {
    this.getNhanSus();
    this.getKhoiLops();
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.gioiTinhs = this.dataService.gioiTinhs;
  }

  public exportExcel() {
    // const exportData:any[]=[];
    // this.nhanSus.forEach((table)=>{
    //   exportData.push({
    //     tenLop: table.tenLop,
    //     khoiLop:table.khoiLop.tenKhoiLop,
    //     hocPhi:table.hocPhi,
    //     nienHoc:table.nienHoc.tenNienHoc,
    //   });
    // });
    // this.exportService.exportExcel(exportData, 'DanhSachNhanSu');
  }

  public exportPdf() {
    // const exportData:any[]=[];
    // this.nhanSus.forEach((table)=>{
    //   exportData.push({
    //     tenLop: table.tenLop,
    //     khoiLop:table.khoiLop.tenKhoiLop,
    //     hocPhi:table.hocPhi,
    //     nienHoc:table.nienHoc.tenNienHoc,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     tenLop: "Tên lớp",
    //     khoiLop: "Khối lớp",
    //     hocPhi: "Học phí",
    //     nienHoc: "Niên học",
    //   },
    //   exportData,
    //   'DanhSachNhanSu'
    // );
  }

  public getPhongBans(): void {
    this.dataService.getPhongBans().subscribe(
      (success) => {
        this.phongBans = success;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getNhanSus(): void {
    this.loading = true;
    this.dataService.getNhanSus().subscribe(
      (data) => {
        this.nhanSus = data;
        //this.displayNhanSus=this.nhanSus.filter((nhanSu)=>nhanSu.nienHoc.maNienHoc===this.selectedNienHoc?.maNienHoc);
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getLoaiNhanSus(): void {
    this.dataService.getLoaiNhanSus().subscribe((data) => {
      this.loaiNhanSus = data;
    });
  }

  public getChucVus(): void {
    if (this.selectedLoaiNhanSu) {
      this.dataService
        .getChucVus(this.selectedLoaiNhanSu?.maLoaiNhanSu)
        .subscribe((data) => {
          this.chucVus = data;
        });
    }
  }

  public getKhoiLops(): void {
    this.dataService.getKhoiLops().subscribe((data) => {
      this.khoiLops = data;
    });
  }

  public getLopHocsByKhoiLop(): void {
    // this.loading=true;
    if (this.selectedNienHoc && this.selectedKhoiLop) {
      this.dataService
        .getLopHocsByNienHocKhoiLop(
          this.selectedNienHoc?.maNienHoc,
          this.selectedKhoiLop?.maKhoiLop
        )
        .subscribe((data) => {
          this.lopHocs = data;
          // this.loading=false;
          //this.getNhanSus();
        });
    }
  }

  public getGioiTinhs(): void {
    this.dataService.getGioiTinhs().subscribe((success) => {
      this.gioiTinhs = success;
    });
  }

  public getTrangThaiLamViecs(): void {
    this.dataService.getTrangThaiLamViecs().subscribe((success) => {
      this.trangThaiLamViecs = success;
    });
  }

  public getDanTocs(): void {
    this.dataService.getDanTocs().subscribe((success) => {
      this.danTocs = success;
    });
  }

  public getTonGiaos(): void {
    this.dataService.getTonGiaos().subscribe((success) => {
      this.tonGiaos = success;
    });
  }

  public getQuocGias(): void {
    this.dataService.getQuocGias().subscribe((success) => {
      this.quocTichs = success;
    });
  }

  public openNew(): void {
    this.nhanSu = Object.assign({}, this.dataService.newNhanSu);
    this.submitted = false;
    this.nhanSuDialog = true;
    this._ngaySinh = new Date();
    this._ngayCap = new Date();
    this._ngayVaoTruong = new Date();
    this._ngayCapNhat = new Date();
    this.getKhoiLops();
    this.getPhongBans();
    this.getLoaiNhanSus();
    this.getGioiTinhs();
    this.getTrangThaiLamViecs();
    this.getDanTocs();
    this.getTonGiaos();
    this.getQuocGias();
  }

  public editNhanSu(nhanSu: NhanSu): void {
    console.log('edit nhanSu:', nhanSu);
    this.nhanSu = nhanSu;
    this.selectedKhoiLop = this.nhanSu.khoiLop;
    this.selectedGioiTinh = this.nhanSu.gioiTinh;
    this.selectedTrangThaiLamViec = this.nhanSu.trangThaiLamViec;
    this.selectedDanToc = this.nhanSu.danToc;
    this.selectedTonGiao = this.nhanSu.tonGiao;
    this.selectedQuocTich = this.nhanSu.quocTich;
    this.selectedChucVu = this.nhanSu.chucVu;
    this.selectedKhoiLop = this.nhanSu.khoiLop;
    this.selectedPhongBan = this.nhanSu.phongBan;
    this.selectedLoaiNhanSu = this.nhanSu.loaiNhanSu;
    this._ngaySinh = new Date(nhanSu.ngaySinh);
    if (nhanSu.ngayCap) {
      this._ngayCap = new Date(nhanSu.ngayCap);
    }
    this._ngayVaoTruong = new Date(nhanSu.ngayVaoTruong);
    this._ngayCapNhat = new Date(nhanSu.ngayCapNhat);
    this.nhanSuDialog = true;
    this.getKhoiLops();
    this.getPhongBans();
    this.getLoaiNhanSus();
    this.getGioiTinhs();
    this.getTrangThaiLamViecs();
    this.getDanTocs();
    this.getTonGiaos();
    this.getQuocGias();
    this.getLopHocsByKhoiLop();
  }

  public deleteNhanSu(nhanSu: NhanSu) {
    console.log('delete hoc sinh', nhanSu);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + nhanSu.ho + ' ' + nhanSu.ten + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteNhanSu(nhanSu.maNhanSu).subscribe((data) => {
          this.getNhanSus();
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
    this.nhanSuDialog = false;
    if (cancel) {
      // this.messageService.add({
      //   severity: 'info',
      //   summary: 'Hủy',
      //   detail: 'Đã hủy',
      //   life: 3000,
      // });
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

  public saveNhanSu() {
    this.submitted = true;
    console.log('saveNhanSu: ', this.nhanSu);
    if (this.selectedGioiTinh) {
      this.nhanSu.maGioiTinh = this.selectedGioiTinh.maGioiTinh;
    }
    if (this.selectedDanToc) {
      this.nhanSu.maDanToc = this.selectedDanToc.maDanToc;
    }
    if (this.selectedTonGiao) {
      this.nhanSu.maTonGiao = this.selectedTonGiao.maTonGiao;
    }
    if (this.selectedQuocTich) {
      this.nhanSu.maQuocTich = this.selectedQuocTich.maQuocGia;
    }
    if (this.selectedTrangThaiLamViec) {
      this.nhanSu.maTrangThaiLamViec =
        this.selectedTrangThaiLamViec.maTrangThai;
    }
    if (this.selectedPhongBan) {
      this.nhanSu.maPhongBan = this.selectedPhongBan.maPhongBan;
    }
    if (this.selectedLoaiNhanSu) {
      this.nhanSu.maLoaiNhanSu = this.selectedLoaiNhanSu.maLoaiNhanSu;
    }
    if (this.selectedChucVu) {
      this.nhanSu.maChucVu = this.selectedChucVu.maChucVu;
    }
    if (this.selectedKhoiLop) {
      this.nhanSu.maKhoiLop = this.selectedKhoiLop.maKhoiLop;
    }
    if (this.selectedPhongBan) {
      this.nhanSu.maPhongBan = this.selectedPhongBan.maPhongBan;
    }
    if (this.selectedLoaiNhanSu) {
      this.nhanSu.maLoaiNhanSu = this.selectedLoaiNhanSu.maLoaiNhanSu;
    }
    this.nhanSu.ngayCap = this._ngayCap;
    this.nhanSu.ngaySinh = this._ngaySinh;
    this.nhanSu.ngayVaoTruong = this._ngayVaoTruong;
    this.nhanSu.ngayCapNhat = new Date();
    console.log('saveNhanSu: ', this.nhanSu);
    if (this.checkValid(this.nhanSu)) {
      if (this.nhanSu.maNhanSu === '') {
        this.nhanSu.maNhanSu = 'a';
        this.nhanSu.matKhau = 'Admin@123';
        this.nhanSu.maTrangThaiTaiKhoan = '0';
        this.dataService.addNhanSu(this.nhanSu).subscribe(
          (data) => {
            console.log('return data = ', data);
            this.hideDialog(false, true);
            this.getNhanSus();
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateNhanSu(this.nhanSu.maNhanSu, this.nhanSu)
          .subscribe(
            (data) => {
              console.log('return data = ', data);
              this.hideDialog(false, true);
              this.getNhanSus();
            },
            (error) => {
              console.log(error);
              this.hideDialog(false, false);
            }
          );
      }
    }
  }

  public onKhoiLopChange(event: any): void {
    const khopLop: KhoiLop = event;
    this.selectedKhoiLop = khopLop;
    this.getLopHocsByKhoiLop();
  }

  public onLopHocChange(event: any): void {
    const lopHoc: LopHoc = event;
    this.selectedLopHoc = lopHoc;
  }

  public onPhongBanChange(event: any): void {
    const phongBan: PhongBan = event;
    this.selectedPhongBan = phongBan;
  }

  public onLoaiNhanSuChange(event: any): void {
    const loaiNhanSu: LoaiNhanSu = event;
    this.selectedLoaiNhanSu = loaiNhanSu;
    this.getChucVus();
  }

  public onChucVuChange(event: any): void {
    const chucVu: ChucVu = event;
    this.selectedChucVu = chucVu;
  }

  public onGioiTinhChange(event: any): void {
    const gioiTinh: GioiTinh = event;
    this.selectedGioiTinh = gioiTinh;
  }

  public onTrangThaiLamViecChange(event: any): void {
    const trangThaiLamViec: TrangThaiLamViec = event;
    this.selectedTrangThaiLamViec = trangThaiLamViec;
  }

  public onDanTocChange(event: any): void {
    const danToc: DanToc = event;
    this.selectedDanToc = danToc;
  }

  public onTonGiaoChange(event: any): void {
    const tonGiao: TonGiao = event;
    this.selectedTonGiao = tonGiao;
  }

  public onQuocTichChange(event: any): void {
    const quocTich: QuocGia = event;
    this.selectedQuocTich = quocTich;
  }

  checkValid(nhanSu: NhanSu): boolean {
    if (!nhanSu.ho.trim()) return false;
    if (!nhanSu.ten.trim()) return false;
    if (!nhanSu.maGioiTinh) return false;
    if (!nhanSu.ngaySinh) return false;
    if (!nhanSu.cmnd) return false;
    if (!nhanSu.danToc) return false;
    if (!nhanSu.tonGiao) return false;
    if (!nhanSu.quocTich) return false;
    if (nhanSu.maPhongBan === 0) return false;
    if (!nhanSu.trangThaiLamViec) return false;
    if (nhanSu.maLoaiNhanSu === 0) return false;
    return true;
  }
}
