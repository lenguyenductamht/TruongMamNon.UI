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

  dialogHeader = '';
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
  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getPhieuUongVitaminsByNienHoc();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.phieuUongVitamins.forEach((table) => {
      exportData.push({
        DotUongVitamin: table.dotUongVitamin?.tenDotUongVitamin,
        MaHocSinh: table.hocSinh?.maHocSinh,
        Ho: table.hocSinh?.ho,
        Ten: table.hocSinh?.ten,
        NgaySinh: table.hocSinh?.ngaySinh,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachPhieuUongVitamin');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.phieuUongVitamins.forEach((table) => {
      exportData.push({
        DotUongVitamin: table.dotUongVitamin?.tenDotUongVitamin,
        MaHocSinh: table.hocSinh?.maHocSinh,
        Ho: table.hocSinh?.ho,
        Ten: table.hocSinh?.ten,
        NgaySinh: table.hocSinh?.ngaySinh,
      });
    });
    this.exportService.exportPdf(
      {
        DotUongVitamin: '?????t u???ng vitamin',
        MaHocSinh: 'M?? h???c sinh',
        Ho: 'H???',
        Ten: 'T??n',
        NgaySinh: 'Ng??y sinh',
      },
      exportData,
      'DanhSachPhieuUongVitamin'
    );
  }

  getPhieuUongVitaminsByNienHoc(): void {
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

  getKhoiLops(): void {
    this.dataService.getKhoiLops().subscribe((data) => {
      this.khoiLops = data;
    });
  }

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

  getHocSinhs(): void {
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
  getLopHocs(): void {
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

  openNew(): void {
    this.dialogHeader = 'Th??m phi???u u???ng vitamin';
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

  editPhieuUongVitamin(phieuUongVitamin: PhieuUongVitamin): void {
    this.dialogHeader = 'S???a phi???u u???ng vitamin';
    this.phieuUongVitamin = phieuUongVitamin;
    this.phieuUongVitaminDialog = true;
  }

  deletePhieuUongVitamin(phieuUongVitamin: PhieuUongVitamin) {
    this.confirmationService.confirm({
      message:
        'B???n c?? mu???n x??a phi???u ti??m c???a ' +
        phieuUongVitamin.hocSinh.ho +
        ' ' +
        phieuUongVitamin.hocSinh.ten +
        '?',
      header: 'X??c nh???n',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService
          .deletePhieuUongVitamin(this.phieuUongVitamin.maPhieuUongVitamin)
          .subscribe((data) => {
            this.getPhieuUongVitaminsByNienHoc();
            this.messageService.add({
              severity: 'success',
              summary: 'Th??nh c??ng',
              detail: 'X??a th??nh c??ng',
              life: 3000,
            });
          });
      },
    });
  }

  hideDialog(cancel = true, success = true): void {
    this.phieuUongVitaminDialog = false;
    if (cancel) {
      this.messageService.add({
        severity: 'info',
        summary: 'H???y',
        detail: 'Kh??ng mu???n th??m n???a',
        life: 3000,
      });
    } else if (success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Th??nh c??ng',
        detail: 'L??u th??nh c??ng',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'L???i',
        detail: 'L??u kh??ng th??nh c??ng',
        life: 3000,
      });
    }
    this.submitted = false;
  }

  savePhieuUongVitamin() {
    this.submitted = true;
    if (this.selectedDotUongVitamin) {
      this.phieuUongVitamin.maDotUongVitamin =
        this.selectedDotUongVitamin.maDotUongVitamin;
    }
    if (this.checkValid(this.phieuUongVitamin)) {
      if (this.phieuUongVitamin.maPhieuUongVitamin === 0) {
        this.selectedHocSinhs.forEach((element) => {
          this.phieuUongVitamin.maHocSinh = element.maHocSinh;
          this.dataService.addPhieuUongVitamin(this.phieuUongVitamin).subscribe(
            (data) => {},
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

  onKhoiLopChange(event: any) {
    const khoiLop: KhoiLop = event;
    this.selectedKhoiLop = khoiLop;
    this.getLopHocs();
    this.getHocSinhs();
  }

  onLopHocChange(event: any) {
    const lopHoc: LopHoc = event;
    this.selectedLopHoc = lopHoc;
    this.getHocSinhs();
  }

  onDotUongVitaminChange(event: any) {
    const dotUongVitamin: DotUongVitamin = event;
    this.selectedDotUongVitamin = dotUongVitamin;
  }

  private checkValid(phieuUongVitamin: PhieuUongVitamin): boolean {
    if (!phieuUongVitamin.maDotUongVitamin) return false;
    return true;
  }
}
