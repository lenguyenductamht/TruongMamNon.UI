import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Vaccine } from '../models/vaccine.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./vaccine.component.scss'],
})
export class VaccineComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  dialogHeader = '';
  loading = true;
  vaccineDialog: boolean = false;

  vaccines: Vaccine[] = [];

  vaccine: Vaccine = Object.assign({}, this.dataService.newVaccine);
  submitted: boolean = false;
  cols: any[] | undefined;

  exportColumns: any[] | undefined;
  ngOnInit(): void {
    this.getVaccines();
  }

  exportExcel() {
    const exportData: any[] = [];
    this.vaccines.forEach((table) => {
      exportData.push({
        TenVaccine: table.tenVaccine,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'DanhSachVaccine');
  }

  public exportPdf() {
    const exportData: any[] = [];
    this.vaccines.forEach((table) => {
      exportData.push({
        TenVaccine: table.tenVaccine,
        GhiChu: table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenVaccine: 'Tên vaccine',
        GhiChu: 'Ghi Chú',
      },
      exportData,
      'DanhSachVaccine'
    );
  }

  getVaccines(): void {
    this.loading = true;
    this.dataService.getVaccines().subscribe((data) => {
      this.vaccines = data;
      this.loading = false;
    });
  }

  openNew(): void {
    this.dialogHeader = 'Thêm vaccine';
    this.vaccine = Object.assign({}, this.dataService.newVaccine);
    this.submitted = false;
    this.vaccineDialog = true;
  }

  editVaccine(vaccine: Vaccine): void {
    this.dialogHeader = 'Sửa vaccine';
    this.vaccine = vaccine;
    this.vaccineDialog = true;
  }

  deleteVaccine(vaccine: Vaccine) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + vaccine.tenVaccine + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteVaccine(vaccine.maVaccine).subscribe((data) => {
          this.getVaccines();
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
    this.vaccineDialog = false;
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

  saveVaccine() {
    this.submitted = true;
    if (this.checkValid(this.vaccine)) {
      if (this.vaccine.maVaccine === 0) {
        this.dataService.addVaccine(this.vaccine).subscribe(
          (data) => {
            this.getVaccines();
            this.hideDialog(false, true);
          },
          (error) => {
            console.log(error);
            this.hideDialog(false, false);
          }
        );
      } else {
        console.log('ma', this.vaccine.maVaccine);
        this.dataService
          .updateVaccine(this.vaccine.maVaccine, this.vaccine)
          .subscribe(
            (data) => {
              this.getVaccines();
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

  private checkValid(vaccine: Vaccine): boolean {
    if (!vaccine.tenVaccine) return false;
    return true;
  }
}
