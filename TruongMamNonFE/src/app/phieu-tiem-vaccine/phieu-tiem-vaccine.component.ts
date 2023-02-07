import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhieuTiemVaccine } from '../models/phieu-tiem-vaccine.model';
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

@Component({
  selector: 'app-chuc-vu',
  templateUrl: './phieu-tiem-vaccine.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./phieu-tiem-vaccine.component.scss'],
})
export class PhieuTiemVaccineComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  loading = false;
  phieuTiemVaccineDialog: boolean = false;

  phieuTiemVaccines: PhieuTiemVaccine[] = [];

  phieuTiemVaccine: PhieuTiemVaccine = Object.assign(
    {},
    this.dataService.newPhieuTiemVaccine
  );
  submitted: boolean = false;
  cols: any[] | undefined;

  khoiLops: KhoiLop[] = [];
  selectedKhoiLop: KhoiLop | undefined;
  lopHocs: LopHoc[] = [];
  selectedLopHoc: LopHoc | undefined;

  dotTiemVaccines: DotTiemVaccine[] = [];
  selectedDotTiemVaccine: DotTiemVaccine | undefined;

  selectedNienHoc: NienHoc | undefined;

  hocSinhs: HocSinh[] = [];
  selectedHocSinhs: HocSinh[] = [];

  exportColumns: any[] | undefined;
  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getPhieuTiemVaccinesByNienHoc();
  }

  public exportExcel() {
    // const exportData:any[]=[];
    // this.phieuTiemVaccines.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuTiemVaccine: table.tenPhieuTiemVaccine,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    //this.exportService.exportExcel(exportData, 'PhieuTiemVaccine');
  }

  public exportPdf() {
    // const exportData:any[]=[];
    // this.phieuTiemVaccines.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuTiemVaccine: table.tenPhieuTiemVaccine,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     TenPhieuTiemVaccine: "Tên PhieuTiemVaccine",
    //     GhiChu: "Ghi Chú",
    //   },
    //   exportData,
    //   'PhieuTiemVaccine'
    // );
  }
  // public getPhieuTiemVaccines(): void {
  //   this.loading = true;
  //   this.dataService.getPhieuTiemVaccines().subscribe((data) => {
  //     this.phieuTiemVaccines = data;
  //     this.loading = false;
  //   });
  // }

  public getPhieuTiemVaccinesByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getPhieuTiemVaccinesByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.phieuTiemVaccines = data;
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

  getDotTiemVaccinesByNienHoc(): void {
    if (this.selectedNienHoc) {
      this.dataService
        .getDotTiemVaccinesByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe(
          (success) => {
            this.dotTiemVaccines = success;
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
    this.phieuTiemVaccine = Object.assign(
      {},
      this.dataService.newPhieuTiemVaccine
    );
    this.submitted = false;
    this.getDotTiemVaccinesByNienHoc();
    this.getKhoiLops();
    this.getLopHocs();
    this.getHocSinhs();
    this.phieuTiemVaccineDialog = true;
  }

  public editPhieuTiemVaccine(phieuTiemVaccine: PhieuTiemVaccine): void {
    console.log('edit phieuTiemVaccine:', phieuTiemVaccine);
    this.phieuTiemVaccine = phieuTiemVaccine;
    this.phieuTiemVaccineDialog = true;
  }

  public deletePhieuTiemVaccine(phieuTiemVaccine: PhieuTiemVaccine) {
    console.log('delete phieu tiem vaccine', phieuTiemVaccine);
    this.confirmationService.confirm({
      message:
        'Bạn có muốn xóa phiếu tiêm của ' +
        phieuTiemVaccine.hocSinh.ho +
        ' ' +
        phieuTiemVaccine.hocSinh.ten +
        '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deletePhieuTiemVaccine(this.phieuTiemVaccine.maPhieuTiemVaccine)
          .subscribe((data) => {
            this.getPhieuTiemVaccinesByNienHoc();
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
    this.phieuTiemVaccineDialog = false;
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

  public savePhieuTiemVaccine() {
    this.submitted = true;
    console.log('savePhieuTiemVaccine: ', this.phieuTiemVaccine);
    if (this.selectedDotTiemVaccine) {
      this.phieuTiemVaccine.maDotTiemVaccine =
        this.selectedDotTiemVaccine.maDotTiemVaccine;
    }
    if (this.checkValid(this.phieuTiemVaccine)) {
      if (this.phieuTiemVaccine.maPhieuTiemVaccine === 0) {
        this.selectedHocSinhs.forEach((element) => {
          this.phieuTiemVaccine.maHocSinh = element.maHocSinh;
          console.log(this.phieuTiemVaccine);
          this.dataService.addPhieuTiemVaccine(this.phieuTiemVaccine).subscribe(
            (data) => {
              console.log('return data = ', data);
            },
            (error) => {
              console.log(error);
              this.hideDialog(false, false);
            }
          );
        });
        this.getPhieuTiemVaccinesByNienHoc();
        this.hideDialog(false, true);
      } else {
        this.dataService
          .updatePhieuTiemVaccine(
            this.phieuTiemVaccine.maPhieuTiemVaccine,
            this.phieuTiemVaccine
          )
          .subscribe(
            (data) => {
              console.log('return data = ', data);
              this.getPhieuTiemVaccinesByNienHoc();
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

  public onDotTiemVaccineChange(event: any) {
    const dotTiemVaccine: DotTiemVaccine = event;
    this.selectedDotTiemVaccine = dotTiemVaccine;
  }

  checkValid(phieuTiemVaccine: PhieuTiemVaccine): boolean {
    if (!phieuTiemVaccine.maDotTiemVaccine) return false;
    return true;
  }
}
