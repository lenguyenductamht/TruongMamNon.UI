import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhieuSoGiun } from '../models/phieu-so-giun.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { LopHoc } from '../models/lop-hoc.model';
import { Vaccine } from '../models/vaccine.model';
import { HocSinh } from '../models/hoc-sinh.model';
import { DotSoGiun } from '../models/dot-so-giun.model';

@Component({
  selector: 'app-chuc-vu',
  templateUrl: './phieu-so-giun.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./phieu-so-giun.component.scss'],
})
export class PhieuSoGiunComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  loading = false;
  phieuSoGiunDialog: boolean = false;

  phieuSoGiuns: PhieuSoGiun[] = [];

  phieuSoGiun: PhieuSoGiun = Object.assign({}, this.dataService.newPhieuSoGiun);
  submitted: boolean = false;
  cols: any[] | undefined;

  khoiLops: KhoiLop[] = [];
  selectedKhoiLop: KhoiLop | undefined;
  lopHocs: LopHoc[] = [];
  selectedLopHoc: LopHoc | undefined;

  dotSoGiuns: DotSoGiun[] = [];
  selectedDotSoGiun: DotSoGiun | undefined;

  selectedNienHoc: NienHoc | undefined;

  hocSinhs: HocSinh[] = [];
  selectedHocSinhs: HocSinh[] = [];

  exportColumns: any[] | undefined;
  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getPhieuSoGiunsByNienHoc();
  }

  public exportExcel() {
    // const exportData:any[]=[];
    // this.phieuSoGiuns.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuSoGiun: table.tenPhieuSoGiun,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    //this.exportService.exportExcel(exportData, 'PhieuSoGiun');
  }

  public exportPdf() {
    // const exportData:any[]=[];
    // this.phieuSoGiuns.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuSoGiun: table.tenPhieuSoGiun,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     TenPhieuSoGiun: "Tên PhieuSoGiun",
    //     GhiChu: "Ghi Chú",
    //   },
    //   exportData,
    //   'PhieuSoGiun'
    // );
  }
  // public getPhieuSoGiuns(): void {
  //   this.loading = true;
  //   this.dataService.getPhieuSoGiuns().subscribe((data) => {
  //     this.phieuSoGiuns = data;
  //     this.loading = false;
  //   });
  // }

  public getPhieuSoGiunsByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getPhieuSoGiunsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.phieuSoGiuns = data;
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

  getDotSoGiunsByNienHoc(): void {
    if (this.selectedNienHoc) {
      this.dataService
        .getDotSoGiunsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe(
          (success) => {
            this.dotSoGiuns = success;
          },
          (error) => console.log(error)
        );
    }
  }

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

  public getHocSinhs(): void {
    if (this.selectedLopHoc) {
      this.dataService
        .getHocSinhsByLopHoc(this.selectedLopHoc.maLop)
        .subscribe((data) => {
          this.hocSinhs = data;
        });
    } else if (this.selectedKhoiLop) {
      this.dataService
        .getHocSinhsByKhoiLop(this.selectedKhoiLop?.maKhoiLop)
        .subscribe((data) => {
          this.hocSinhs = data;
        });
    } else {
      this.dataService.getHocSinhs().subscribe((data) => {
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

  public openNew(): void {
    this.phieuSoGiun = Object.assign({}, this.dataService.newPhieuSoGiun);
    this.submitted = false;
    this.getDotSoGiunsByNienHoc();
    this.getKhoiLops();
    this.getLopHocs();
    this.getHocSinhs();
    this.phieuSoGiunDialog = true;
  }

  public editPhieuSoGiun(phieuSoGiun: PhieuSoGiun): void {
    console.log('edit phieuSoGiun:', phieuSoGiun);
    this.phieuSoGiun = phieuSoGiun;
    this.phieuSoGiunDialog = true;
  }

  public deletePhieuSoGiun(phieuSoGiun: PhieuSoGiun) {
    console.log('delete phieu tiem vaccine', phieuSoGiun);
    this.confirmationService.confirm({
      message:
        'Bạn có muốn xóa phiếu tiêm của ' +
        phieuSoGiun.hocSinh.ho +
        ' ' +
        phieuSoGiun.hocSinh.ten +
        '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deletePhieuSoGiun(this.phieuSoGiun.maPhieuSoGiun)
          .subscribe((data) => {
            this.getPhieuSoGiunsByNienHoc();
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
    this.phieuSoGiunDialog = false;
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

  public savePhieuSoGiun() {
    this.submitted = true;
    console.log('savePhieuSoGiun: ', this.phieuSoGiun);
    if (this.selectedDotSoGiun) {
      this.phieuSoGiun.maDotSoGiun = this.selectedDotSoGiun.maDotSoGiun;
    }
    if (this.checkValid(this.phieuSoGiun)) {
      if (this.phieuSoGiun.maPhieuSoGiun === 0) {
        this.selectedHocSinhs.forEach((element) => {
          this.phieuSoGiun.maHocSinh = element.maHocSinh;
          console.log(this.phieuSoGiun);
          this.dataService.addPhieuSoGiun(this.phieuSoGiun).subscribe(
            (data) => {
              console.log('return data = ', data);
            },
            (error) => {
              console.log(error);
              this.hideDialog(false, false);
            }
          );
        });
        this.getPhieuSoGiunsByNienHoc();
        this.hideDialog(false, true);
      } else {
        this.dataService
          .updatePhieuSoGiun(this.phieuSoGiun.maPhieuSoGiun, this.phieuSoGiun)
          .subscribe(
            (data) => {
              console.log('return data = ', data);
              this.getPhieuSoGiunsByNienHoc();
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
    this.getHocSinhs();
  }

  public onLopHocChange(event: any) {
    const lopHoc: LopHoc = event;
    this.selectedLopHoc = lopHoc;
    this.getHocSinhs();
  }

  public onDotSoGiunChange(event: any) {
    const dotSoGiun: DotSoGiun = event;
    this.selectedDotSoGiun = dotSoGiun;
  }

  checkValid(phieuSoGiun: PhieuSoGiun): boolean {
    if (!phieuSoGiun.maDotSoGiun) return false;
    return true;
  }
}
