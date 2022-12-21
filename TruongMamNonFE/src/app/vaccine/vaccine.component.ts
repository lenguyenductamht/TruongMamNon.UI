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

  public loading = true;
  public vaccineDialog: boolean = false;

  public vaccines: Vaccine[] = [];

  
  public vaccine:Vaccine=Object.assign({},this.dataService.newVaccine);
  public submitted: boolean = false; 
  public cols: any[]|undefined;

  public exportColumns: any[]|undefined;
  public ngOnInit(): void {
    this.getVaccines();
  }

  public exportExcel(){
    const exportData:any[]=[];
    this.vaccines.forEach((table)=>{
      exportData.push({
        TenVaccine: table.tenVaccine,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'Vaccine');
  }

  public exportPdf(){
    const exportData:any[]=[];
    this.vaccines.forEach((table)=>{
      exportData.push({
        tenVaccine: table.tenVaccine,
        ghiChu:table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        tenVaccine: "Tên vaccine", 
        ghiChu: "Ghi Chú", 
      },
      exportData, 
      'Vaccine'
    );
  }

  public getVaccines():void{
    this.loading=true;
    this.dataService.getVaccines().subscribe((data) => {
      this.vaccines = data;
      this.loading=false;
    });
  }

  public openNew(): void {
    this.vaccine = Object.assign({}, this.dataService.newVaccine);
    this.submitted = false;
    this.vaccineDialog = true;
  }

  public editVaccine(vaccine: Vaccine): void {
    console.log('edit vaccine:', vaccine);
    this.vaccine = vaccine;
    this.vaccineDialog = true;
  }

  public deleteVaccine(vaccine: Vaccine) {
    console.log('delete danh muc thuc don', vaccine);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + vaccine.tenVaccine + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteVaccine(vaccine.maVaccine).subscribe((data)=>{
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

  public hideDialog(cancel = true, success = true): void {
    console.log('hideDialog: ');
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

  public saveVaccine() {
    this.submitted = true;
    console.log('saveVaccine: ', this.vaccine);
    if (this.vaccine.maVaccine === 0) {
      this.dataService.postVaccine(this.vaccine).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getVaccines();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      console.log('ma', this.vaccine.maVaccine);
      this.dataService.putVaccine(this.vaccine.maVaccine, this.vaccine).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getVaccines()
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    }
  }
}

