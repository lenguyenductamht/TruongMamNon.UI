import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MonAn } from '../models/mon-an.model';
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
import { MonAnThucPham } from '../models/mon-an-thuc-pham.model';
import { ThucPham } from '../models/thuc-pham.model';

@Component({
  selector: 'app-mon-an',
  templateUrl: './mon-an.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./mon-an.component.scss'],
})
export class MonAnComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = false;
  monAnDialog: boolean = false;

  monAns: MonAn[] = [];

  monAn: MonAn = Object.assign({}, this.dataService.newMonAn);
  monAnThucPhams: MonAnThucPham[] = [];
  thucPhams: ThucPham[] = [];
  selectedThucPham: ThucPham | undefined;
  monAnThucPham: MonAnThucPham = Object.assign(
    {},
    this.dataService.newMonAnThucPham
  );
  submitted: boolean = false;
  cols: any[] | undefined;

  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getMonAns();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.monAns.forEach((table) => {
      exportData.push({
        TenMonAn: table.tenMonAn,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachMonAn');
  }

  public exportPdf() {
    const exportData: any[] = [];
    this.monAns.forEach((table) => {
      exportData.push({
        TenMonAn: table.tenMonAn,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenMonAn: 'T??n m??n ??n',
        GhiChu: 'Ghi ch??',
      },
      exportData,
      'DanhSachMonAn'
    );
  }

  getMonAns(): void {
    this.loading = true;
    this.dataService.getMonAns().subscribe((data) => {
      this.monAns = data;
      this.loading = false;
    });
  }

  getThucPhams(): void {
    this.dataService
      .getThucPhams()
      .subscribe((success) => (this.thucPhams = success));
  }

  getMonAnThucPhamByMonAn(): void {
    this.dataService
      .getMonAnThucPhamsByMonAn(this.monAn.maMonAn)
      .subscribe((success) => (this.monAnThucPhams = success));
  }

  openNew(): void {
    this.dialogHeader = 'Th??m m??n ??n';
    this.monAn = Object.assign({}, this.dataService.newMonAn);
    this.monAnThucPhams = [];
    this.getThucPhams();
    this.submitted = false;
    this.monAnDialog = true;
  }

  editMonAn(monAn: MonAn): void {
    this.dialogHeader = 'S???a m??n ??n';
    this.monAn = monAn;
    this.monAnDialog = true;
    this.getThucPhams();
    this.getMonAnThucPhamByMonAn();
  }

  deleteMonAn(monAn: MonAn) {
    this.confirmationService.confirm({
      message: 'B???n c?? mu???n x??a ' + monAn.tenMonAn + '?',
      header: 'X??c nh???n',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteMonAn(monAn.maMonAn).subscribe((data) => {
          this.getMonAns();
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
    this.monAnDialog = false;
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

  public saveMonAn() {
    this.submitted = true;
    if (this.checkValid(this.monAn) && this.checkValid2()) {
      if (this.monAn.maMonAn === 0) {
        this.dataService.addMonAn(this.monAn).subscribe(
          (data) => {
            this.monAnThucPhams.forEach((element) => {
              element.maMonAn = data.maMonAn;
              this.dataService
                .addMonAnThucPham(element)
                .subscribe((success) => console.log(success));
            });
            this.getMonAns();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService.updateMonAn(this.monAn.maMonAn, this.monAn).subscribe(
          (data) => {
            this.getMonAns();
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

  onThucPhamChange(event: any) {
    const thucPham: ThucPham = event;
    let thucPhamExists = false;
    for (let i in this.monAnThucPhams) {
      if (this.monAnThucPhams[i].maThucPham === thucPham.maThucPham) {
        thucPhamExists = true;
        break;
      }
    }
    if (!thucPhamExists) {
      let monAnThucPham = Object.assign({}, this.dataService.newMonAnThucPham);
      monAnThucPham.maThucPham = thucPham.maThucPham;
      monAnThucPham.soLuong = 0;
      monAnThucPham.thucPham = thucPham;
      this.monAnThucPhams.push(monAnThucPham);
    }
  }

  deleteMonAnThucPham(monAnThucPham: MonAnThucPham) {
    this.monAnThucPhams = this.monAnThucPhams.filter(
      (item) => item.maThucPham !== monAnThucPham.maThucPham
    );
  }

  private checkValid(monAn: MonAn): boolean {
    if (!monAn.tenMonAn) return false;
    return true;
  }

  private checkValid2(): boolean {
    if (this.monAnThucPhams.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'L???i',
        detail: 'Ch??a ch???n th???c ph???m',
        life: 3000,
      });
      return false;
    }
    for (let i in this.monAnThucPhams) {
      if (this.monAnThucPhams[i].soLuong <= 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'L???i',
          detail: 'S??? l?????ng kh??ng h???p l???',
          life: 3000,
        });
        return false;
      }
    }
    return true;
  }
}
