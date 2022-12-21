import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DanhMucThucDon } from '../models/danh-muc-thuc-don.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-danh-muc-thuc-don',
  templateUrl: './danh-muc-thuc-don.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./danh-muc-thuc-don.component.scss'],
})
export class DanhMucThucDonComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = true;
  public danhMucThucDonDialog: boolean = false;

  public danhMucThucDons: DanhMucThucDon[] = [];

  
  public danhMucThucDon:DanhMucThucDon=Object.assign({},this.dataService.newDanhMucThucDon);
  public submitted: boolean = false; 
  public cols: any[]|undefined;

  public exportColumns: any[]|undefined;
  public ngOnInit(): void {
    this.getDanhMucThucDons();
  }

  public exportExcel(){
    const exportData:any[]=[];
    this.danhMucThucDons.forEach((table)=>{
      exportData.push({
        tenDanhMuc: table.tenDanhMuc,
        ghiChu:table.ghiChu,
        thoiGian:table.thoiGian,
        nangLuong:table.nangLuong,
        chatDam:table.chatDam,
        chatBeo:table.chatBeo,
        chatBot:table.chatBot
      });
    });
    this.exportService.exportExcel(exportData, 'DanhMucThucDon');
  }

  public exportPdf(){
    const exportData:any[]=[];
    this.danhMucThucDons.forEach((table)=>{
      exportData.push({
        tenDanhMuc: table.tenDanhMuc,
        ghiChu:table.ghiChu,
        thoiGian:table.thoiGian,
        nangLuong:table.nangLuong,
        chatDam:table.chatDam,
        chatBeo:table.chatBeo,
        chatBot:table.chatBot
      });
    });
    this.exportService.exportPdf(
      {
        tenDanhMuc: "Tên danh mục", 
        ghiChu: "Ghi Chú", 
        thoiGian: "Thời gian",
        nangLuong: "Năng lượng",
        chatDam:"Chất đạm", 
        chatBeo:"Chất béo", 
        chatBot: "Chất bột"
      },
      exportData, 
      'DanhMucThucDon'
    );
  }

  public getDanhMucThucDons():void{
    this.dataService.getDanhMucThucDons().subscribe((data) => {
      this.danhMucThucDons = data;
      this.loading=false;
    });
  }

  public openNew(): void {
    this.danhMucThucDon = Object.assign({}, this.dataService.newDanhMucThucDon);
    this.submitted = false;
    this.danhMucThucDonDialog = true;
  }

  public editDanhMucThucDon(danhMucThucDon: DanhMucThucDon): void {
    console.log('edit danhMucThucDon:', danhMucThucDon);
    this.danhMucThucDon = danhMucThucDon;
    this.danhMucThucDonDialog = true;
  }

  public deleteDanhMucThucDon(danhMucThucDon: DanhMucThucDon) {
    console.log('delete danh muc thuc don', danhMucThucDon);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + danhMucThucDon.tenDanhMuc + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteDanhMucThucDon(danhMucThucDon.maDanhMuc).subscribe((data)=>{
          this.getDanhMucThucDons();
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
    this.danhMucThucDonDialog = false;
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

  public saveDanhMucThucDon() {
    this.submitted = true;
    console.log('saveDanhMucThucDon: ', this.danhMucThucDon);
    if (this.danhMucThucDon.maDanhMuc === 0) {
      this.dataService.postDanhMucThucDon(this.danhMucThucDon).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.danhMucThucDons.push(data);
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      console.log('ma', this.danhMucThucDon.maDanhMuc);
      this.dataService.putDanhMucThucDon(this.danhMucThucDon.maDanhMuc, this.danhMucThucDon).subscribe(
        (data) => {
          console.log('return data = ', data);
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
