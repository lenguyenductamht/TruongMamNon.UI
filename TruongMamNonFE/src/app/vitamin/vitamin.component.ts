import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Vitamin } from '../models/vitamin.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-vitamin',
  templateUrl: './vitamin.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./vitamin.component.scss'],
})
export class VitaminComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = true;
  public vitaminDialog: boolean = false;

  public vitamins: Vitamin[] = [];

  
  public vitamin:Vitamin=Object.assign({},this.dataService.newVitamin);
  public submitted: boolean = false; 
  public cols: any[]|undefined;

  public exportColumns: any[]|undefined;
  public ngOnInit(): void {
    this.getVitamins();
  }

  public exportExcel(){
    const exportData:any[]=[];
    this.vitamins.forEach((table)=>{
      exportData.push({
        TenVitamin: table.tenVitamin,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportExcel(exportData, 'Vitamin');
  }

  public exportPdf(){
    const exportData:any[]=[];
    this.vitamins.forEach((table)=>{
      exportData.push({
        TenVitamin: table.tenVitamin,
        GhiChu:table.ghiChu,
      });
    });
    this.exportService.exportPdf(
      {
        TenVitamin: "Tên Vitamin", 
        GhiChu: "Ghi Chú", 
      },
      exportData, 
      'Vitamin'
    );
  }

  public getVitamins():void{
    this.loading=true;
    this.dataService.getVitamins().subscribe((data) => {
      this.vitamins = data;
      this.loading=false;
    });
  }

  public openNew(): void {
    this.vitamin = Object.assign({}, this.dataService.newVitamin);
    this.submitted = false;
    this.vitaminDialog = true;
  }

  public editVitamin(vitamin: Vitamin): void {
    console.log('edit vitamin:', vitamin);
    this.vitamin = vitamin;
    this.vitaminDialog = true;
  }

  public deleteVitamin(vitamin: Vitamin) {
    console.log('delete danh muc thuc don', vitamin);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + vitamin.tenVitamin + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteVitamin(vitamin.maVitamin).subscribe((data)=>{
          this.getVitamins();
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
    this.vitaminDialog = false;
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

  public saveVitamin() {
    this.submitted = true;
    console.log('saveVitamin: ', this.vitamin);
    if (this.vitamin.maVitamin === 0) {
      this.dataService.postVitamin(this.vitamin).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getVitamins();
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      console.log('ma', this.vitamin.maVitamin);
      this.dataService.putVitamin(this.vitamin.maVitamin, this.vitamin).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.getVitamins();
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
