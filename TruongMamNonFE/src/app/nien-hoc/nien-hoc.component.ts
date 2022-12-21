import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NienHoc } from '../models/nien-hoc.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nien-hoc',
  templateUrl: './nien-hoc.component.html',
  styleUrls: ['./nien-hoc.component.scss']
})
export class NienHocComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  public loading = true;
  public nienHocDialog = false;
  public nienHocs: NienHoc[] = [];  
  public nienHoc:NienHoc=Object.assign({}, this.dataService.newNienHoc);
  public submitted: boolean = false;
  public selectedBatDauHK1:Date|undefined;
  
  public ngOnInit(): void {
    this.getNienHocs();
  }

  public getNienHocs():void{
    this.dataService.getNienHocs().subscribe((data) => {
      this.nienHocs = data;
      this.loading=false;
    });
  }

  public openNew(): void {
    this.nienHoc = Object.assign({}, this.nienHoc);
    this.submitted = false;
    this.nienHocDialog = true;
  }

  public editNienHoc(nienHoc: NienHoc): void {
    console.log('edit danhMucThucDon:', nienHoc);
    this.nienHoc = nienHoc;
    if(this.selectedBatDauHK1){

      this.selectedBatDauHK1=this.nienHoc.batDauHK1;
    }
    this.nienHocDialog = true;
  }

  public deleteNienHoc(nienHoc: NienHoc) {
    console.log('delete nien hoc', nienHoc);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + nienHoc.tenNienHoc + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteNienHoc(nienHoc.maNienHoc).subscribe((data)=>{
          this.getNienHocs();
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
    this.nienHocDialog = false;
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

  public saveNienHoc() {
    console.log('saveNienHoc: ', this.nienHoc);
    if (this.nienHoc.maNienHoc === 0) {
      this.dataService.postNienHoc(this.nienHoc).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.nienHocs.push(data);
          this.hideDialog(false, true);
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      this.dataService.putNienHoc(this.nienHoc.maNienHoc, this.nienHoc).subscribe(
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
