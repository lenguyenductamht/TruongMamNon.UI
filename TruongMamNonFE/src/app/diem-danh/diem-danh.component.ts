import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DiemDanh } from '../models/diem-danh.model';
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
import { TrangThaiDiemDanh } from '../models/trang-thai-diem-danh.model';

@Component({
  selector: 'app-diem-danh',
  templateUrl: './diem-danh.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./diem-danh.component.scss'],
})
export class DiemDanhComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  loading = false;
  diemDanhDialog: boolean = false;

  diemDanhs: DiemDanh[] = [];

  diemDanh: DiemDanh = Object.assign({}, this.dataService.newDiemDanh);
  submitted: boolean = false;
  cols: any[] | undefined;

  khoiLops: KhoiLop[] = [];
  selectedKhoiLop: KhoiLop | undefined;
  lopHocs: LopHoc[] = [];
  selectedLopHoc: LopHoc | undefined;
  trangThaiDiemDanhs: TrangThaiDiemDanh[] = [];
  selectedTrangThaiDiemDanh: TrangThaiDiemDanh | undefined;

  selectedNienHoc: NienHoc | undefined;

  hocSinhs: HocSinh[] = [];
  selectedHocSinh: HocSinh | undefined;
  fromDate = new Date();
  toDate = new Date();
  ngayDiemDanh = new Date();

  exportColumns: any[] | undefined;
  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getKhoiLops();
    this.getLopHocs();
    // this.getDiemDanhsByDateLopHoc();
  }

  public exportExcel() {
    // const exportData:any[]=[];
    // this.diemDanhs.forEach((table)=>{
    //   exportData.push({
    //     TenDiemDanh: table.tenDiemDanh,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    //this.exportService.exportExcel(exportData, 'DiemDanh');
  }

  public exportPdf() {
    // const exportData:any[]=[];
    // this.diemDanhs.forEach((table)=>{
    //   exportData.push({
    //     TenDiemDanh: table.tenDiemDanh,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     TenDiemDanh: "Tên DiemDanh",
    //     GhiChu: "Ghi Chú",
    //   },
    //   exportData,
    //   'DiemDanh'
    // );
  }
  // public getDiemDanhs(): void {
  //   this.loading = true;
  //   this.dataService.getDiemDanhs().subscribe((data) => {
  //     this.diemDanhs = data;
  //     this.loading = false;
  //   });
  // }

  getDiemDanhsByDateLopHoc(): void {
    if (this.selectedNienHoc && this.selectedLopHoc) {
      this.loading = true;
      this.dataService
        .getDiemDanhsByDateLopHoc(
          this.fromDate.toJSON(),
          this.toDate.toJSON(),
          this.selectedLopHoc.maLop
        )
        .subscribe((data) => {
          this.diemDanhs = data;
          console.log(this.diemDanh);
          console.log(this.fromDate.toJSON());
          console.log(this.toDate.toJSON());
          this.loading = false;
        });
    }
  }

  public getKhoiLops(): void {
    this.dataService.getKhoiLops().subscribe((data) => {
      this.khoiLops = data;
    });
  }

  // public getLopHocsByNienHoc():void{
  //   if(this.selectedNienHoc && this.selectedKhoiLop){
  //     this.dataService.getLopHocsByNienHoc(this.selectedNienHoc?.maNienHoc).subscribe((data)=>{
  //       this.lopHocs=data;
  //       console.log(data);
  //       //this.getHocSinhs();
  //     });
  //   }
  // }

  // getDotTiemVaccinesByNienHoc(): void {
  //   if (this.selectedNienHoc) {
  //     this.dataService
  //       .getDotTiemVaccinesByNienHoc(this.selectedNienHoc.maNienHoc)
  //       .subscribe(
  //         (success) => {
  //           this.dotTiemVaccines = success;
  //         },
  //         (error) => console.log(error)
  //       );
  //   }
  // }

  // public getLopHocsByNienHocKhoiLop():void{
  //   // this.loading=true;
  //   if(this.selectedNienHoc && this.selectedKhoiLop){
  //     this.dataService.getLopHocsByNienHocKhoiLop(this.selectedNienHoc?.maNienHoc, this.selectedKhoiLop?.maKhoiLop).subscribe((data)=>{
  //       this.lopHocs=data;
  //       // this.loading=false;
  //       console.log(data);
  //       //this.getHocSinhs();
  //     });
  //   }
  // }

  public getHocSinhsByLopHoc(): void {
    if (this.selectedLopHoc) {
      this.dataService
        .getHocSinhsByLopHoc(this.selectedLopHoc.maLop)
        .subscribe((data) => {
          this.hocSinhs = data;
        });
    }
  }
  public getLopHocs(): void {
    if (this.selectedNienHoc && !this.selectedKhoiLop) {
      this.dataService
        .getLopHocsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.lopHocs = data;
        });
    } else if (this.selectedNienHoc && this.selectedKhoiLop) {
      this.dataService
        .getLopHocsByNienHocKhoiLop(
          this.selectedNienHoc.maNienHoc,
          this.selectedKhoiLop.maKhoiLop
        )
        .subscribe((data) => {
          this.lopHocs = data;
        });
    }
  }

  getTrangThaiDiemDanhs(): void {
    this.dataService.getTrangThaiDiemDanhs().subscribe((success) => {
      this.trangThaiDiemDanhs = success;
    });
  }

  public openNew(): void {
    this.diemDanh = Object.assign({}, this.dataService.newDiemDanh);
    this.submitted = false;

    this.getTrangThaiDiemDanhs();
    this.diemDanhDialog = true;
  }

  public editDiemDanh(diemDanh: DiemDanh): void {
    console.log('edit diemDanh:', diemDanh);
    this.diemDanh = diemDanh;
    this.selectedHocSinh = this.diemDanh.hocSinh;
    this.diemDanhDialog = true;
    this.getTrangThaiDiemDanhs();
  }

  public deleteDiemDanh(diemDanh: DiemDanh) {
    console.log('delete phieu tiem vaccine', diemDanh);
    this.confirmationService.confirm({
      message:
        'Bạn có muốn xóa phiếu tiêm của ' +
        diemDanh.hocSinh.ho +
        ' ' +
        diemDanh.hocSinh.ten +
        '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deleteDiemDanh(this.diemDanh.maDiemDanh)
          .subscribe((data) => {
            this.getDiemDanhsByDateLopHoc();
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
    this.diemDanhDialog = false;
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

  public saveDiemDanh() {
    this.submitted = true;
    if (this.selectedHocSinh) {
      this.diemDanh.maHocSinh = this.selectedHocSinh.maHocSinh;
    }
    this.diemDanh.ngayDiemDanh = this.ngayDiemDanh;
    if (this.selectedTrangThaiDiemDanh) {
      this.diemDanh.maTrangThaiDiemDanh =
        this.selectedTrangThaiDiemDanh.maTrangThai;
    }
    console.log('saveDiemDanh: ', this.diemDanh);
    if (this.checkValid(this.diemDanh)) {
      if (this.diemDanh.maDiemDanh === 0) {
        this.dataService.addDiemDanh(this.diemDanh).subscribe(
          (data) => {
            console.log('return data = ', data);
            this.getDiemDanhsByDateLopHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updateDiemDanh(this.diemDanh.maDiemDanh, this.diemDanh)
          .subscribe(
            (data) => {
              console.log('return data = ', data);
              this.getDiemDanhsByDateLopHoc();
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

  public onKhoiLopChange(event: any) {
    const khoiLop: KhoiLop = event;
    this.selectedKhoiLop = khoiLop;
    this.getLopHocs();
  }

  public onLopHocChange(event: any) {
    const lopHoc: LopHoc = event;
    this.selectedLopHoc = lopHoc;
    this.getHocSinhsByLopHoc();
    this.getDiemDanhsByDateLopHoc();
  }

  public onHocSinhChange(event: any) {
    const hocSinh: HocSinh = event;
    this.selectedHocSinh = hocSinh;
  }

  onTrangThaiDiemDanhChange(event: any) {
    const trangThaiDiemDanh: TrangThaiDiemDanh = event;
    this.selectedTrangThaiDiemDanh = trangThaiDiemDanh;
  }

  checkValid(diemDanh: DiemDanh): boolean {
    // if (!diemDanh.maDotTiemVaccine) return false;
    return true;
  }
}
