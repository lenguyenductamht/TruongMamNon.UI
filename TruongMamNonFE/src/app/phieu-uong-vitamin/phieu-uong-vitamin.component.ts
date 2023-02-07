import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhieuUongVitamin } from '../models/phieu-uong-vitamin.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { LopHoc } from '../models/lop-hoc.model';
import { Vaccine } from '../models/vaccine.model';
import { HocSinh } from '../models/hoc-sinh.model';
import { DotUongVitamin } from '../models/dot-uong-vitamin.model';

@Component({
  selector: 'app-chuc-vu',
  templateUrl: './phieu-uong-vitamin.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./phieu-uong-vitamin.component.scss'],
})
export class PhieuUongVitaminComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  loading = false;
  phieuUongVitaminDialog: boolean = false;

  phieuUongVitamins: PhieuUongVitamin[] = [];

  phieuUongVitamin: PhieuUongVitamin = Object.assign(
    {},
    this.dataService.newPhieuUongVitamin
  );
  submitted: boolean = false;
  cols: any[] | undefined;

  khoiLops: KhoiLop[] = [];
  selectedKhoiLop: KhoiLop | undefined;
  lopHocs: LopHoc[] = [];
  selectedLopHoc: LopHoc | undefined;

  dotUongVitamins: DotUongVitamin[] = [];
  selectedDotUongVitamin: DotUongVitamin | undefined;

  selectedNienHoc: NienHoc | undefined;

  hocSinhs: HocSinh[] = [];
  selectedHocSinhs: HocSinh[] = [];

  exportColumns: any[] | undefined;
  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getPhieuUongVitaminsByNienHoc();
  }

  public exportExcel() {
    // const exportData:any[]=[];
    // this.phieuUongVitamins.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuUongVitamin: table.tenPhieuUongVitamin,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    //this.exportService.exportExcel(exportData, 'PhieuUongVitamin');
  }

  public exportPdf() {
    // const exportData:any[]=[];
    // this.phieuUongVitamins.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuUongVitamin: table.tenPhieuUongVitamin,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     TenPhieuUongVitamin: "Tên PhieuUongVitamin",
    //     GhiChu: "Ghi Chú",
    //   },
    //   exportData,
    //   'PhieuUongVitamin'
    // );
  }
  // public getPhieuUongVitamins(): void {
  //   this.loading = true;
  //   this.dataService.getPhieuUongVitamins().subscribe((data) => {
  //     this.phieuUongVitamins = data;
  //     this.loading = false;
  //   });
  // }

  public getPhieuUongVitaminsByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getPhieuUongVitaminsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.phieuUongVitamins = data;
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

  getDotUongVitaminsByNienHoc(): void {
    if (this.selectedNienHoc) {
      this.dataService
        .getDotUongVitaminsByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe(
          (success) => {
            this.dotUongVitamins = success;
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
    this.phieuUongVitamin = Object.assign(
      {},
      this.dataService.newPhieuUongVitamin
    );
    this.submitted = false;
    this.getDotUongVitaminsByNienHoc();
    this.getKhoiLops();
    this.getLopHocs();
    this.getHocSinhs();
    this.phieuUongVitaminDialog = true;
  }

  public editPhieuUongVitamin(phieuUongVitamin: PhieuUongVitamin): void {
    console.log('edit phieuUongVitamin:', phieuUongVitamin);
    this.phieuUongVitamin = phieuUongVitamin;
    this.phieuUongVitaminDialog = true;
  }

  public deletePhieuUongVitamin(phieuUongVitamin: PhieuUongVitamin) {
    console.log('delete phieu tiem vaccine', phieuUongVitamin);
    this.confirmationService.confirm({
      message:
        'Bạn có muốn xóa phiếu tiêm của ' +
        phieuUongVitamin.hocSinh.ho +
        ' ' +
        phieuUongVitamin.hocSinh.ten +
        '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deletePhieuUongVitamin(this.phieuUongVitamin.maPhieuUongVitamin)
          .subscribe((data) => {
            this.getPhieuUongVitaminsByNienHoc();
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
    this.phieuUongVitaminDialog = false;
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

  public savePhieuUongVitamin() {
    this.submitted = true;
    console.log('savePhieuUongVitamin: ', this.phieuUongVitamin);
    if (this.selectedDotUongVitamin) {
      this.phieuUongVitamin.maDotUongVitamin =
        this.selectedDotUongVitamin.maDotUongVitamin;
    }
    if (this.checkValid(this.phieuUongVitamin)) {
      if (this.phieuUongVitamin.maPhieuUongVitamin === 0) {
        this.selectedHocSinhs.forEach((element) => {
          this.phieuUongVitamin.maHocSinh = element.maHocSinh;
          console.log(this.phieuUongVitamin);
          this.dataService.addPhieuUongVitamin(this.phieuUongVitamin).subscribe(
            (data) => {
              console.log('return data = ', data);
            },
            (error) => {
              console.log(error);
              this.hideDialog(false, false);
            }
          );
        });
        this.getPhieuUongVitaminsByNienHoc();
        this.hideDialog(false, true);
      } else {
        this.dataService
          .updatePhieuUongVitamin(
            this.phieuUongVitamin.maPhieuUongVitamin,
            this.phieuUongVitamin
          )
          .subscribe(
            (data) => {
              console.log('return data = ', data);
              this.getPhieuUongVitaminsByNienHoc();
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

  public onDotUongVitaminChange(event: any) {
    const dotUongVitamin: DotUongVitamin = event;
    this.selectedDotUongVitamin = dotUongVitamin;
  }

  checkValid(phieuUongVitamin: PhieuUongVitamin): boolean {
    if (!phieuUongVitamin.maDotUongVitamin) return false;
    return true;
  }
}
