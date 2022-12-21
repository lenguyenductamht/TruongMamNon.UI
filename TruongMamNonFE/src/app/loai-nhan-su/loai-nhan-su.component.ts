import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-loai-nhan-su',
  templateUrl: './loai-nhan-su.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./loai-nhan-su.component.scss'],
})
export class LoaiNhanSuComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = true;
  public loaiNhanSuDialog: boolean = false;

  public loaiNhanSus: LoaiNhanSu[] = [];

  
  public loaiNhanSu:LoaiNhanSu=Object.assign({},this.dataService.newLoaiNhanSu);
  public submitted: boolean = false; 
  public cols: any[]|undefined;

  public exportColumns: any[]|undefined;
  public ngOnInit(): void {
    this.getLoaiNhanSus();
  }

  public exportExcel(){
    const exportData:any[]=[];
    this.loaiNhanSus.forEach((table)=>{
      exportData.push({
        TenLoaiNhanSu: table.tenLoaiNhanSu,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'LoaiNhanSu');
  }

  public exportPdf(){
    const exportData:any[]=[];
    this.loaiNhanSus.forEach((table)=>{
      exportData.push({
        TenLoaiNhanSu: table.tenLoaiNhanSu,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenLoaiNhanSu: "Tên LoaiNhanSu", 
        GhiChu: "Ghi Chú", 
      },
      exportData, 
      'LoaiNhanSu'
    );
  }

  public getLoaiNhanSus():void{
    this.loading=true;
    this.dataService.getLoaiNhanSus().subscribe((data) => {
      this.loaiNhanSus = data;
      this.loading=false;
    });
  }

  public openNew(): void {
    this.loaiNhanSu = Object.assign({}, this.dataService.newLoaiNhanSu);
    this.submitted = false;
    this.loaiNhanSuDialog = true;
  }

  public editLoaiNhanSu(loaiNhanSu: LoaiNhanSu): void {
    console.log('edit loaiNhanSu:', loaiNhanSu);
    this.loaiNhanSu = loaiNhanSu;
    this.loaiNhanSuDialog = true;
  }

  public deleteLoaiNhanSu(loaiNhanSu: LoaiNhanSu) {
    console.log('delete danh muc thuc don', loaiNhanSu);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + loaiNhanSu.tenLoaiNhanSu + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteLoaiNhanSu(loaiNhanSu.maLoaiNhanSu).subscribe((data)=>{
          this.getLoaiNhanSus();
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
    this.loaiNhanSuDialog = false;
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

  public saveLoaiNhanSu() {
    this.submitted = true;
    console.log('saveLoaiNhanSu: ', this.loaiNhanSu);
    if (this.loaiNhanSu.maLoaiNhanSu === 0) {
      this.dataService.postLoaiNhanSu(this.loaiNhanSu).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getLoaiNhanSus();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      console.log('ma', this.loaiNhanSu.maLoaiNhanSu);
      this.dataService.putLoaiNhanSu(this.loaiNhanSu.maLoaiNhanSu, this.loaiNhanSu).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getLoaiNhanSus();
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
