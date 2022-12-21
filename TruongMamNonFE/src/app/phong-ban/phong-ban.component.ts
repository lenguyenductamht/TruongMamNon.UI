import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhongBan } from '../models/phong-ban.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-phong-ban',
  templateUrl: './phong-ban.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./phong-ban.component.scss'],
})
export class PhongBanComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = true;
  public phongBanDialog: boolean = false;

  public phongBans: PhongBan[] = [];

  
  public phongBan:PhongBan=Object.assign({},this.dataService.newPhongBan);
  public submitted: boolean = false; 
  public cols: any[]|undefined;

  public exportColumns: any[]|undefined;
  public ngOnInit(): void {
    this.getPhongBans();
  }

  public exportExcel(){
    const exportData:any[]=[];
    this.phongBans.forEach((table)=>{
      exportData.push({
        TenPhongBan: table.tenPhongBan,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'PhongBan');
  }

  public exportPdf(){
    const exportData:any[]=[];
    this.phongBans.forEach((table)=>{
      exportData.push({
        TenPhongBan: table.tenPhongBan,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenPhongBan: "Tên phòng ban", 
        GhiChu: "Ghi Chú", 
      },
      exportData, 
      'PhongBan'
    );
  }

  public getPhongBans():void{
    this.dataService.getPhongBans().subscribe((data) => {
      this.phongBans = data;
      this.loading=false;
    });
  }

  public openNew(): void {
    this.phongBan = Object.assign({}, this.dataService.newPhongBan);
    this.submitted = false;
    this.phongBanDialog = true;
  }

  public editPhongBan(phongBan: PhongBan): void {
    console.log('edit phongBan:', phongBan);
    this.phongBan = phongBan;
    this.phongBanDialog = true;
  }

  public deletePhongBan(phongBan: PhongBan) {
    console.log('delete danh muc thuc don', phongBan);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + phongBan.tenPhongBan + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deletePhongBan(phongBan.maPhongBan).subscribe((data)=>{
          this.getPhongBans();
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
    this.phongBanDialog = false;
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

  public savePhongBan() {
    this.submitted = true;
    console.log('savePhongBan: ', this.phongBan);
    if (this.phongBan.maPhongBan === 0) {
      this.dataService.postPhongBan(this.phongBan).subscribe(
        (data) => {
          console.log('return data = ', data);
          // this.phongBans.push(data);
          this.getPhongBans();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      console.log('ma', this.phongBan.maPhongBan);
      this.dataService.putPhongBan(this.phongBan.maPhongBan, this.phongBan).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getPhongBans();
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
