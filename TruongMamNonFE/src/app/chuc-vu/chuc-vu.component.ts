import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ChucVu } from '../models/chuc-vu.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';

@Component({
  selector: 'app-chuc-vu',
  templateUrl: './chuc-vu.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./chuc-vu.component.scss'],
})
export class ChucVuComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = false;
  public chucVuDialog: boolean = false;

  public chucVus: ChucVu[] = [];
  public loaiNhanSus:LoaiNhanSu[]=[];
  public filterSelectedLoaiNhanSu:LoaiNhanSu|undefined;
  public selectedLoaiNhanSu:LoaiNhanSu|undefined;

  public chucVu:ChucVu=Object.assign({},this.dataService.newChucVu);
  public submitted: boolean = false; 
  public cols: any[]|undefined;

  public exportColumns: any[]|undefined;
  public ngOnInit(): void {
    this.getLoaiNhanSus();
    this.getChucVus();
  }

  public exportExcel(){
    const exportData:any[]=[];
    this.chucVus.forEach((table)=>{
      exportData.push({
        TenChucVu: table.tenChucVu,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'ChucVu');
  }

  public exportPdf(){
    const exportData:any[]=[];
    this.chucVus.forEach((table)=>{
      exportData.push({
        TenChucVu: table.tenChucVu,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenChucVu: "Tên ChucVu", 
        GhiChu: "Ghi Chú", 
      },
      exportData, 
      'ChucVu'
    );
  }
  public getLoaiNhanSus():void{
    this.dataService.getLoaiNhanSus().subscribe((data) => {
      this.loaiNhanSus = data;
    });
  }
  public getChucVus():void{
    this.loading=true;
    if(this.filterSelectedLoaiNhanSu){
      this.dataService.getChucVus(this.filterSelectedLoaiNhanSu?.maLoaiNhanSu).subscribe((data) => {
        this.chucVus = data;
        this.loading=false;
      });
    }else{
      this.dataService.getAllChucVus().subscribe((data) => {
        this.chucVus = data;
        this.loading=false;
      });
    }
  }

  public openNew(): void {
    this.chucVu = Object.assign({}, this.dataService.newChucVu);
    this.submitted = false;
    this.chucVuDialog = true;
  }

  public editChucVu(chucVu: ChucVu): void {
    console.log('edit chucVu:', chucVu);
    this.chucVu = chucVu;
    this.selectedLoaiNhanSu=chucVu.loaiNhanSu;
    this.chucVuDialog = true;
    this.getLoaiNhanSus();
  }

  public deleteChucVu(chucVu: ChucVu) {
    console.log('delete danh muc thuc don', chucVu);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + chucVu.tenChucVu + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteChucVu(chucVu.maChucVu).subscribe((data)=>{
          this.getChucVus();
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
    this.chucVuDialog = false;
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

  public saveChucVu() {
    this.submitted = true;
    console.log('saveChucVu: ', this.chucVu);
    if(!this.selectedLoaiNhanSu){
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn loại nhân sự',
        life: 3000,
      });
      return;
    }
    this.chucVu.maLoaiNhanSu=this.selectedLoaiNhanSu.maLoaiNhanSu;
    if (this.chucVu.maChucVu === 0) {
      this.dataService.postChucVu(this.chucVu).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getChucVus();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      console.log('ma', this.chucVu.maChucVu);
      this.dataService.putChucVu(this.chucVu.maChucVu, this.chucVu).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getChucVus();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    }
  }

  public onFilterLoaiNhanSuChange(event:any):void{
    const loaiNhanSu:LoaiNhanSu=event;
    this.filterSelectedLoaiNhanSu=loaiNhanSu;
    this.getChucVus();
  }

  public onLoaiNhanSuChange(event:any):void{
    const loaiNhanSu:LoaiNhanSu=event;
    this.selectedLoaiNhanSu=loaiNhanSu;
  }
}
