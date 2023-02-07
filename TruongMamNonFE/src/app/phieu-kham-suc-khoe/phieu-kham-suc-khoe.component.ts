import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhieuKhamSucKhoe } from '../models/phieu-kham-suc-khoe.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { LopHoc } from '../models/lop-hoc.model';
import { Vaccine } from '../models/vaccine.model';
import { HocSinh } from '../models/hoc-sinh.model';
import { DotKhamSucKhoe } from '../models/dot-kham-suc-khoe.model';

@Component({
  selector: 'app-phieu-kham-suc-khoe',
  templateUrl: './phieu-kham-suc-khoe.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./phieu-kham-suc-khoe.component.scss'],
})
export class PhieuKhamSucKhoeComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  loading = false;
  phieuKhamSucKhoeDialog: boolean = false;

  phieuKhamSucKhoes: PhieuKhamSucKhoe[] = [];

  phieuKhamSucKhoe: PhieuKhamSucKhoe = Object.assign(
    {},
    this.dataService.newPhieuKhamSucKhoe
  );
  submitted: boolean = false;
  cols: any[] | undefined;

  khoiLops: KhoiLop[] = [];
  selectedKhoiLop: KhoiLop | undefined;
  lopHocs: LopHoc[] = [];
  selectedLopHoc: LopHoc | undefined;

  dotKhamSucKhoes: DotKhamSucKhoe[] = [];
  selectedDotKhamSucKhoe: DotKhamSucKhoe | undefined;

  selectedNienHoc: NienHoc | undefined;

  hocSinhs: HocSinh[] = [];
  selectedHocSinh: HocSinh | undefined;

  exportColumns: any[] | undefined;
  public ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getPhieuKhamSucKhoesByNienHoc();
  }

  public exportExcel() {
    // const exportData:any[]=[];
    // this.phieuKhamSucKhoes.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuKhamSucKhoe: table.tenPhieuKhamSucKhoe,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    //this.exportService.exportExcel(exportData, 'PhieuKhamSucKhoe');
  }

  public exportPdf() {
    // const exportData:any[]=[];
    // this.phieuKhamSucKhoes.forEach((table)=>{
    //   exportData.push({
    //     TenPhieuKhamSucKhoe: table.tenPhieuKhamSucKhoe,
    //     GhiChu:table.ghiChu,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     TenPhieuKhamSucKhoe: "Tên PhieuKhamSucKhoe",
    //     GhiChu: "Ghi Chú",
    //   },
    //   exportData,
    //   'PhieuKhamSucKhoe'
    // );
  }
  // public getPhieuKhamSucKhoes(): void {
  //   this.loading = true;
  //   this.dataService.getPhieuKhamSucKhoes().subscribe((data) => {
  //     this.phieuKhamSucKhoes = data;
  //     this.loading = false;
  //   });
  // }

  public getPhieuKhamSucKhoesByNienHoc(): void {
    this.loading = true;
    if (this.selectedNienHoc) {
      this.dataService
        .getPhieuKhamSucKhoesByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe((data) => {
          this.phieuKhamSucKhoes = data;
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

  getDotKhamSucKhoesByNienHoc(): void {
    if (this.selectedNienHoc) {
      this.dataService
        .getDotKhamSucKhoesByNienHoc(this.selectedNienHoc.maNienHoc)
        .subscribe(
          (success) => {
            this.dotKhamSucKhoes = success;
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
    this.phieuKhamSucKhoe = Object.assign(
      {},
      this.dataService.newPhieuKhamSucKhoe
    );
    this.submitted = false;
    this.getDotKhamSucKhoesByNienHoc();
    this.getKhoiLops();
    this.getLopHocs();
    this.getHocSinhs();
    this.phieuKhamSucKhoeDialog = true;
  }

  public editPhieuKhamSucKhoe(phieuKhamSucKhoe: PhieuKhamSucKhoe): void {
    console.log('edit phieuKhamSucKhoe:', phieuKhamSucKhoe);
    this.phieuKhamSucKhoe = phieuKhamSucKhoe;
    this.phieuKhamSucKhoeDialog = true;
  }

  public deletePhieuKhamSucKhoe(phieuKhamSucKhoe: PhieuKhamSucKhoe) {
    console.log('delete phieu tiem vaccine', phieuKhamSucKhoe);
    this.confirmationService.confirm({
      message:
        'Bạn có muốn xóa phiếu tiêm của ' +
        phieuKhamSucKhoe.hocSinh.ho +
        ' ' +
        phieuKhamSucKhoe.hocSinh.ten +
        '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deletePhieuKhamSucKhoe(this.phieuKhamSucKhoe.maPhieuKhamSucKhoe)
          .subscribe((data) => {
            this.getPhieuKhamSucKhoesByNienHoc();
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
    this.phieuKhamSucKhoeDialog = false;
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

  public savePhieuKhamSucKhoe() {
    this.submitted = true;
    console.log('savePhieuKhamSucKhoe: ', this.phieuKhamSucKhoe);
    if (this.selectedDotKhamSucKhoe) {
      this.phieuKhamSucKhoe.maDotKhamSucKhoe =
        this.selectedDotKhamSucKhoe.maDotKhamSucKhoe;
    }
    if (this.selectedHocSinh) {
      this.phieuKhamSucKhoe.maHocSinh = this.selectedHocSinh.maHocSinh;
    }
    if (this.checkValid(this.phieuKhamSucKhoe)) {
      if (this.phieuKhamSucKhoe.maPhieuKhamSucKhoe === 0) {
        this.dataService.addPhieuKhamSucKhoe(this.phieuKhamSucKhoe).subscribe(
          (data) => {
            console.log('return data = ', data);
            this.getPhieuKhamSucKhoesByNienHoc();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService
          .updatePhieuKhamSucKhoe(
            this.phieuKhamSucKhoe.maPhieuKhamSucKhoe,
            this.phieuKhamSucKhoe
          )
          .subscribe(
            (data) => {
              console.log('return data = ', data);
              this.getPhieuKhamSucKhoesByNienHoc();
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

  onHocSinhChange(event: any) {
    const hocSinh: HocSinh = event;
    this.selectedHocSinh = hocSinh;
  }

  public onDotKhamSucKhoeChange(event: any) {
    const dotKhamSucKhoe: DotKhamSucKhoe = event;
    this.selectedDotKhamSucKhoe = dotKhamSucKhoe;
  }

  checkValid(phieuKhamSucKhoe: PhieuKhamSucKhoe): boolean {
    if (!phieuKhamSucKhoe.maDotKhamSucKhoe) return false;
    if (!phieuKhamSucKhoe.maHocSinh) return false;
    if (phieuKhamSucKhoe.chieuCao === null || phieuKhamSucKhoe.chieuCao <= 0)
      return false;
    if (phieuKhamSucKhoe.canNang === null || phieuKhamSucKhoe.canNang <= 0)
      return false;
    if (phieuKhamSucKhoe.BMI === null || phieuKhamSucKhoe.BMI <= 0)
      return false;
    if (phieuKhamSucKhoe.nhipTim === null || phieuKhamSucKhoe.nhipTim <= 0)
      return false;
    if (phieuKhamSucKhoe.tamThu === null || phieuKhamSucKhoe.tamThu <= 0)
      return false;
    if (phieuKhamSucKhoe.tamTruong === null || phieuKhamSucKhoe.tamTruong <= 0)
      return false;
    if (!phieuKhamSucKhoe.loaiTheLuc) return false;
    if (!phieuKhamSucKhoe.tuanHoan) return false;
    if (!phieuKhamSucKhoe.hoHap) return false;
    if (!phieuKhamSucKhoe.tieuHoa) return false;
    if (!phieuKhamSucKhoe.thanTietNieu) return false;
    if (!phieuKhamSucKhoe.thanKinhTamThan) return false;
    if (!phieuKhamSucKhoe.lamSangKhac) return false;
    if (
      phieuKhamSucKhoe.matPhaiKhongKinh === null ||
      phieuKhamSucKhoe.matPhaiKhongKinh <= 0
    )
      return false;
    if (
      phieuKhamSucKhoe.matTraiKhongKinh === null ||
      phieuKhamSucKhoe.matTraiKhongKinh <= 0
    )
      return false;
    if (
      phieuKhamSucKhoe.matPhaiCoKinh === null ||
      phieuKhamSucKhoe.matPhaiCoKinh <= 0
    )
      return false;
    if (
      phieuKhamSucKhoe.matTraiCoKinh === null ||
      phieuKhamSucKhoe.matTraiCoKinh <= 0
    )
      return false;
    if (
      phieuKhamSucKhoe.taiTraiNoiThuong === null ||
      phieuKhamSucKhoe.taiTraiNoiThuong <= 0
    )
      return false;
    if (
      phieuKhamSucKhoe.taiTraiNoiTham === null ||
      phieuKhamSucKhoe.taiTraiNoiTham <= 0
    )
      return false;
    if (
      phieuKhamSucKhoe.taiPhaiNoiThuong === null ||
      phieuKhamSucKhoe.taiPhaiNoiThuong <= 0
    )
      return false;
    if (
      phieuKhamSucKhoe.taiPhaiNoiTham === null ||
      phieuKhamSucKhoe.taiPhaiNoiTham <= 0
    )
      return false;
    if (!phieuKhamSucKhoe.hamTren) return false;
    if (!phieuKhamSucKhoe.hamDuoi) return false;
    return true;
  }
}
