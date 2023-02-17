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

  dialogHeader = '';
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
  ngOnInit(): void {
    this.dataService.selectedNienHoc$.subscribe((nienHoc) => {
      this.selectedNienHoc = nienHoc;
    });
    this.getPhieuKhamSucKhoesByNienHoc();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.phieuKhamSucKhoes.forEach((table) => {
      exportData.push({
        DotKhamSucKhoe: table.dotKhamSucKhoe?.tenDotKhamSucKhoe,
        MaHocSinh: table.hocSinh?.maHocSinh,
        Ho: table.hocSinh?.ho,
        Ten: table.hocSinh?.ten,
        NgaySinh: table.hocSinh?.ngaySinh,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachPhieuKhamSucKhoe');
  }

  exportPdf() {
    const exportData: any[] = [];
    this.phieuKhamSucKhoes.forEach((table) => {
      exportData.push({
        DotKhamSucKhoe: table.dotKhamSucKhoe?.tenDotKhamSucKhoe,
        MaHocSinh: table.hocSinh?.maHocSinh,
        Ho: table.hocSinh?.ho,
        Ten: table.hocSinh?.ten,
        NgaySinh: table.hocSinh?.ngaySinh,
      });
    });
    this.exportService.exportPdf(
      {
        DotKhamSucKhoe: 'Đợt khám sức khỏe',
        MaHocSinh: 'Mã học sinh',
        Ho: 'Họ',
        Ten: 'Tên',
        NgaySinh: 'Ngày sinh',
      },
      exportData,
      'DanhSachPhieuKhamSucKhoe'
    );
  }

  getPhieuKhamSucKhoesByNienHoc(): void {
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

  getKhoiLops(): void {
    this.dataService.getKhoiLops().subscribe((data) => {
      this.khoiLops = data;
    });
  }

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

  getHocSinhs(): void {
    if (this.selectedLopHoc) {
      this.dataService
        .getHocSinhsByLopHoc(this.selectedLopHoc.maLop)
        .subscribe((data) => {
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
    this.dialogHeader = 'Thêm phiếu khám sức khỏe';
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

  editPhieuKhamSucKhoe(phieuKhamSucKhoe: PhieuKhamSucKhoe): void {
    this.dialogHeader = 'Sửa phiếu khám sức khỏe';
    this.phieuKhamSucKhoe = phieuKhamSucKhoe;
    this.phieuKhamSucKhoeDialog = true;
  }

  deletePhieuKhamSucKhoe(phieuKhamSucKhoe: PhieuKhamSucKhoe) {
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

  hideDialog(cancel = true, success = true): void {
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

  savePhieuKhamSucKhoe() {
    this.submitted = true;
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

  onHocSinhChange(event: any) {
    const hocSinh: HocSinh = event;
    this.selectedHocSinh = hocSinh;
  }

  onDotKhamSucKhoeChange(event: any) {
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
