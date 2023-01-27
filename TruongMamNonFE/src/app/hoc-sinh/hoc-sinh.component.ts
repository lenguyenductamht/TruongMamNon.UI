import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HocSinh } from '../models/hoc-sinh.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { ExportService } from '../services/export.service';
import { LopHoc } from '../models/lop-hoc.model';
import { GioiTinh } from '../models/gioi-tinh.model';
import { TrangThaiHoc } from '../models/trang-thai-hoc.model';
import { DanToc } from '../models/dan-toc.model';
import { TonGiao } from '../models/ton-giao.model';
import { QuocGia } from '../models/quoc-gia.model';
import { TrangThaiTaiKhoan } from '../models/trang-thai-tai-khoan.model';

@Component({
  selector: 'app-hoc-sinh',
  templateUrl: './hoc-sinh.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./hoc-sinh.component.scss'],
})
export class HocSinhComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = true;
  public hocSinhDialog = false;

  public hocSinhs: HocSinh[] = [];

  public hocSinh: HocSinh = Object.assign({}, this.dataService.newHocSinh);
  public submitted: boolean = false;
  public gioiTinhs: GioiTinh[] = [];
  public danTocs: DanToc[] = [];
  public tonGiaos: TonGiao[] = [];
  public quocTichs: QuocGia[] = [];
  public trangThaiHocs: TrangThaiHoc[] = [];
  public trangThaiTaiKhoans: TrangThaiTaiKhoan[] = [];
  public khoiLops: KhoiLop[] = [];
  public selectedKhoiLop: KhoiLop | undefined;
  public lopHocs: LopHoc[] = [];
  public selectedLopHoc: LopHoc | undefined;
  public selectedGioiTinh: GioiTinh | undefined;
  public selectedNienHoc: NienHoc | undefined;
  public selectedTrangThaiHoc: TrangThaiHoc | undefined;
  public selectedDanToc: DanToc | undefined;
  public selectedTonGiao: TonGiao | undefined;
  public selectedQuocTich: QuocGia | undefined;
  public nienHocs: NienHoc[] = [];
  public ngOnInit(): void {
    this.getHocSinhs();
    this.getKhoiLops();
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.gioiTinhs = this.dataService.gioiTinhs;
  }

  public exportExcel() {
    // const exportData:any[]=[];
    // this.hocSinhs.forEach((table)=>{
    //   exportData.push({
    //     tenLop: table.tenLop,
    //     khoiLop:table.khoiLop.tenKhoiLop,
    //     hocPhi:table.hocPhi,
    //     nienHoc:table.nienHoc.tenNienHoc,
    //   });
    // });
    // this.exportService.exportExcel(exportData, 'DanhSachHocSinh');
  }

  public exportPdf() {
    // const exportData:any[]=[];
    // this.hocSinhs.forEach((table)=>{
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
    //   'DanhSachHocSinh'
    // );
  }

  public getHocSinhs(): void {
    this.loading = true;
    this.dataService.getHocSinhs().subscribe((success) => {
      this.hocSinhs = success;
      console.log(this.hocSinh);
      //this.displayHocSinhs=this.hocSinhs.filter((hocSinh)=>hocSinh.nienHoc.maNienHoc===this.selectedNienHoc?.maNienHoc);
      this.loading = false;
    });
  }

  public getKhoiLops(): void {
    this.dataService.getKhoiLops().subscribe((success) => {
      this.khoiLops = success;
    });
  }

  public getLopHocsByNienHocKhoiLop(): void {
    if (this.selectedNienHoc && this.selectedKhoiLop) {
      this.dataService
        .getLopHocsByNienHocKhoiLop(
          this.selectedNienHoc?.maNienHoc,
          this.selectedKhoiLop?.maKhoiLop
        )
        .subscribe((data) => {
          this.lopHocs = data;
        });
    }
  }

  public getGioiTinhs(): void {
    this.dataService.getGioiTinhs().subscribe((success) => {
      this.gioiTinhs = success;
    });
  }

  public getTrangThaiHocs(): void {
    this.dataService.getTrangThaiHocs().subscribe((success) => {
      this.trangThaiHocs = success;
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

  // public getTrangThaiTaiKhoans(): void {
  //   this.dataService.getTrangThaiTaiKhoans().subscribe((success) => {
  //     this.trangThaiTaiKhoans = success;
  //   });
  // }

  public openNew(): void {
    this.hocSinh = Object.assign({}, this.dataService.newHocSinh);
    this.submitted = false;
    this.hocSinhDialog = true;
    this.getGioiTinhs();
    this.getKhoiLops();
    this.getTrangThaiHocs();
    this.getDanTocs();
    this.getTonGiaos();
    this.getQuocGias();
    // this.getTrangThaiTaiKhoans();
  }

  public editHocSinh(hocSinh: HocSinh): void {
    console.log('edit hocSinh:', hocSinh);
    this.hocSinh = hocSinh;
    this.selectedKhoiLop = this.hocSinh.khoiLop;
    this.selectedLopHoc = this.hocSinh.lopHoc;
    this.selectedGioiTinh = this.hocSinh.gioiTinh;
    this.selectedTrangThaiHoc = this.hocSinh.trangThaiHoc;
    this.selectedDanToc = this.hocSinh.danToc;
    this.selectedTonGiao = this.hocSinh.tonGiao;
    this.selectedQuocTich = this.hocSinh.quocTich;
    this.hocSinhDialog = true;
    this.getGioiTinhs();
    this.getKhoiLops();
    this.getTrangThaiHocs();
    this.getDanTocs();
    this.getTonGiaos();
    this.getQuocGias();
    this.getLopHocsByNienHocKhoiLop();
  }

  public deleteHocSinh(hocSinh: HocSinh) {
    console.log('delete hoc sinh', hocSinh);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + hocSinh.ho + ' ' + hocSinh.ten + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteHocSinh(hocSinh.maHocSinh).subscribe((data) => {
          this.getHocSinhs();
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
    this.hocSinhDialog = false;
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

  public saveHocSinh() {
    this.submitted = true;
    console.log('saveHocSinh: ', this.hocSinh);

    if (this.selectedKhoiLop) {
      this.hocSinh.maKhoiLop = this.selectedKhoiLop.maKhoiLop;
    }
    if (this.selectedLopHoc) {
      this.hocSinh.maLopHoc = this.selectedLopHoc.maLop;
    }
    if (this.selectedGioiTinh) {
      this.hocSinh.maGioiTinh = this.selectedGioiTinh.maGioiTinh;
    }
    if (this.selectedTrangThaiHoc) {
      this.hocSinh.maTrangThaiHoc = this.selectedTrangThaiHoc.maTrangThai;
    }
    if (this.selectedDanToc) {
      this.hocSinh.maDanToc = this.selectedDanToc.maDanToc;
    }
    if (this.selectedTonGiao) {
      this.hocSinh.maTonGiao = this.selectedTonGiao.maTonGiao;
    }
    if (this.selectedQuocTich) {
      this.hocSinh.maQuocTich = this.selectedQuocTich.maQuocGia;
    }

    console.log('saveHocSinh: ', this.hocSinh);
    if (this.checkValid(this.hocSinh)) {
      if (this.hocSinh.maHocSinh === '') {
        this.hocSinh.maHocSinh = 'a';
        this.hocSinh.matKhau = 'Student@123';
        this.hocSinh.maTrangThaiTaiKhoan = '0';
        console.log('saveHocSinh: ', this.hocSinh);
        this.dataService.addHocSinh(this.hocSinh).subscribe(
          (data) => {
            console.log('return data = ', data);
            this.hideDialog(false, true);
            this.getHocSinhs();
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateHocSinh(this.hocSinh.maHocSinh, this.hocSinh)
          .subscribe(
            (data) => {
              console.log('return data = ', data);
              this.hideDialog(false, true);
              this.getHocSinhs();
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
    this.getLopHocsByNienHocKhoiLop();
  }

  public onLopHocChange(event: any): void {
    const lopHoc: LopHoc = event;
    this.selectedLopHoc = lopHoc;
  }

  public onGioiTinhChange(event: any): void {
    const gioiTinh: GioiTinh = event;
    this.selectedGioiTinh = gioiTinh;
  }

  public onTrangThaiHocChange(event: any): void {
    const trangThaiHoc: TrangThaiHoc = event;
    this.selectedTrangThaiHoc = trangThaiHoc;
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

  checkValid(hocSinh: HocSinh): boolean {
    if (
      hocSinh.ho.trim() &&
      hocSinh.ten.trim() &&
      hocSinh.maGioiTinh &&
      hocSinh.maKhoiLop &&
      hocSinh.hoTenPhuHuynh.trim() &&
      hocSinh.ngaySinh
    ) {
      return true;
    }
    return false;
  }
}
