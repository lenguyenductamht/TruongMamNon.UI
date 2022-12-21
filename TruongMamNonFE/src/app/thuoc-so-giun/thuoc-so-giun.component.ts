import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ThuocSoGiun } from '../models/thuoc-so-giun.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-thuoc-so-giun',
  templateUrl: './thuoc-so-giun.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./thuoc-so-giun.component.scss'],
})
export class ThuocSoGiunComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = true;
  public thuocSoGiunDialog: boolean = false;

  public thuocSoGiuns: ThuocSoGiun[] = [];

  
  public thuocSoGiun:ThuocSoGiun=Object.assign({},this.dataService.newThuocSoGiun);
  public submitted: boolean = false; 
  public cols: any[]|undefined;

  public exportColumns: any[]|undefined;
  public ngOnInit(): void {
    this.getThuocSoGiuns();
  }

  public exportExcel(){
    const exportData:any[]=[];
    this.thuocSoGiuns.forEach((table)=>{
      exportData.push({
        TenThuocSoGiun: table.tenThuocSoGiun,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'ThuocSoGiun');
  }

  public exportPdf(){
    const exportData:any[]=[];
    this.thuocSoGiuns.forEach((table)=>{
      exportData.push({
        tenThuocSoGiun: table.tenThuocSoGiun,
        ghiChu:table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        tenThuocSoGiun: "Tên thuốc sổ giun", 
        ghiChu: "Ghi Chú", 
      },
      exportData, 
      'ThuocSoGiun'
    );
  }

  public getThuocSoGiuns():void{
    this.loading=true;
    this.dataService.getThuocSoGiuns().subscribe((data) => {
      this.thuocSoGiuns = data;
      this.loading=false;
    });
  }

  public openNew(): void {
    this.thuocSoGiun = Object.assign({}, this.dataService.newThuocSoGiun);
    this.submitted = false;
    this.thuocSoGiunDialog = true;
  }

  public editThuocSoGiun(thuocSoGiun: ThuocSoGiun): void {
    console.log('edit thuocSoGiun:', thuocSoGiun);
    this.thuocSoGiun = thuocSoGiun;
    this.thuocSoGiunDialog = true;
  }

  public deleteThuocSoGiun(thuocSoGiun: ThuocSoGiun) {
    console.log('delete danh muc thuc don', thuocSoGiun);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + thuocSoGiun.tenThuocSoGiun + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteThuocSoGiun(thuocSoGiun.maThuocSoGiun).subscribe((data)=>{
          this.getThuocSoGiuns();
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
    this.thuocSoGiunDialog = false;
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

  public saveThuocSoGiun() {
    this.submitted = true;
    console.log('saveThuocSoGiun: ', this.thuocSoGiun);
    if (this.thuocSoGiun.maThuocSoGiun === 0) {
      this.dataService.postThuocSoGiun(this.thuocSoGiun).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getThuocSoGiuns();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      console.log('ma', this.thuocSoGiun.maThuocSoGiun);
      this.dataService.putThuocSoGiun(this.thuocSoGiun.maThuocSoGiun, this.thuocSoGiun).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getThuocSoGiuns();
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
