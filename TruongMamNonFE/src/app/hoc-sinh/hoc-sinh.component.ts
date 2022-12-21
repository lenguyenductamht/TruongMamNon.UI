import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HocSinh } from '../models/hoc-sinh.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { ExportService } from '../services/export.service';
import { LopHoc } from '../models/lop-hoc.model';

@Component({
  selector: 'app-hoc-sinh',
  templateUrl: './hoc-sinh.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./hoc-sinh.component.scss'],

})
export class HocSinhComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = true;
  public hocSinhDialog = false;

  public hocSinhs: HocSinh[] = [];
  
  public hocSinh:HocSinh=Object.assign({},this.dataService.newHocSinh);
  public submitted: boolean = false;
  public gioiTinhs:any[]=[];
  public danTocs:any[]=this.dataService.danTocs;
  public tonGiaos:any[]=this.dataService.tonGiaos;
  public quocTichs:any[]=this.dataService.quocGias;
  public trangThaiHocs:any[]=[{name: "Đang học", key:0},{name:"Đã nghỉ", key:1}];
  public khoiLops:KhoiLop[]=[];
  public selectedKhoiLop:KhoiLop|undefined;
  public lopHocs:LopHoc[]=[];
  public selectedLopHoc:LopHoc|undefined;
  public selectedGioiTinh:any|undefined;
  public selectedNienHoc:NienHoc|undefined;
  public selectedTrangThaiHoc:any|undefined;
  public selectedDanToc:any|undefined;
  public selectedTonGiao:any|undefined;
  public selectedQuocTich:any|undefined;
  public nienHocs:NienHoc[]=[];
  
  public ngOnInit(): void {
    this.getHocSinhs();
    this.getKhoiLops();
    this.dataService.selectedNienHoc$.subscribe((nienHoc)=>{
      this.selectedNienHoc=nienHoc;
    });
    this.gioiTinhs=this.dataService.gioiTinhs;
  }

  public exportExcel(){
    // const exportData:any[]=[];
    // this.hocSinhs.forEach((table)=>{
    //   exportData.push({
    //     tenLop: table.tenLop,
    //     khoiLop:table.khoiLop.tenKhoiLop,
    //     hocPhi:table.hocPhi,
    //     nienHoc:table.nienHoc.tenNienHoc,
    //   });
    // });
    // this.exportService.exportExcel(exportData, 'DanhSachHocSinh');
  }

  public exportPdf(){
    // const exportData:any[]=[];
    // this.hocSinhs.forEach((table)=>{
    //   exportData.push({
    //     tenLop: table.tenLop,
    //     khoiLop:table.khoiLop.tenKhoiLop,
    //     hocPhi:table.hocPhi,
    //     nienHoc:table.nienHoc.tenNienHoc,
    //   });
    // });
    // this.exportService.exportPdf(
    //   {
    //     tenLop: "Tên lớp", 
    //     khoiLop: "Khối lớp", 
    //     hocPhi: "Học phí",
    //     nienHoc: "Niên học",
    //   },
    //   exportData, 
    //   'DanhSachHocSinh'
    // );
  }
  
  public getHocSinhs():void{
    this.loading=true;  
    this.dataService.getHocSinhs().subscribe((data)=>{
      this.hocSinhs=data;
      //this.displayHocSinhs=this.hocSinhs.filter((hocSinh)=>hocSinh.nienHoc.maNienHoc===this.selectedNienHoc?.maNienHoc);
      this.loading=false;
    });     
    
  }

  public getKhoiLops():void{
    // this.loading=true;
    this.dataService.getKhoiLops().subscribe((data)=>{
      this.khoiLops=data;
      // this.loading=false;
      //this.getHocSinhs();
    });
  }

  public getLopHocsByKhoiLop():void{
    // this.loading=true;
    if(this.selectedNienHoc && this.selectedKhoiLop){
      this.dataService.getLopHocsByNienHocKhoiLop(this.selectedNienHoc?.maNienHoc, this.selectedKhoiLop?.maKhoiLop).subscribe((data)=>{
        this.lopHocs=data;
        // this.loading=false;
        //this.getHocSinhs();
      });
    }
    
  }

  public openNew(): void {
    this.hocSinh = Object.assign({}, this.dataService.newHocSinh);
    this.submitted=false;
    this.hocSinhDialog = true;
    this.getKhoiLops();
  }

  public editHocSinh(hocSinh: HocSinh): void {
    console.log('edit hocSinh:', hocSinh);
    this.hocSinh = hocSinh;
    this.selectedKhoiLop=this.hocSinh.khoiLop;
    this.selectedLopHoc=this.hocSinh.lopHoc;
    this.selectedGioiTinh=this.hocSinh.gioiTinh;
    this.selectedTrangThaiHoc=this.hocSinh.trangThaiHoc;
    this.selectedDanToc=this.hocSinh.danToc;
    this.selectedTonGiao=this.hocSinh.tonGiao;
    this.selectedQuocTich=this.hocSinh.quocTich;
    this.hocSinhDialog = true;
    this.getKhoiLops();
    this.getLopHocsByKhoiLop();
  }

  public deleteHocSinh(hocSinh: HocSinh) {
    console.log('delete hoc sinh', hocSinh);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + hocSinh.ho + ' ' + hocSinh.ten +'?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteHocSinh(hocSinh.maHocSinh).subscribe((data)=>{
          this.getHocSinhs();
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
    this.hocSinhDialog = false;
    if (cancel) {
      // this.messageService.add({
      //   severity: 'info',
      //   summary: 'Hủy',
      //   detail: 'Đã hủy',
      //   life: 3000,
      // });
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

  public saveHocSinh() {
    this.submitted=true;
    console.log('saveHocSinh: ', this.hocSinh);
    if(!this.selectedKhoiLop){
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chưa chọn khối lớp',
        life: 3000,
      });
      return;
    }
    this.hocSinh.maKhoiLop=this.selectedKhoiLop.maKhoiLop;
    if(this.selectedLopHoc){
      this.hocSinh.maLopHoc=this.selectedLopHoc.maLop;
    }
    this.hocSinh.gioiTinh=this.selectedGioiTinh.name;
    this.hocSinh.trangThaiHoc=this.selectedTrangThaiHoc.name;
    this.hocSinh.danToc=this.selectedDanToc.TenDanToc;
    this.hocSinh.tonGiao=this.selectedTonGiao.TenTonGiao;
    this.hocSinh.quocTich=this.selectedQuocTich.TenQuocGia;

    console.log('saveHocSinh: ', this.hocSinh);
    console.log('ma khoi lop', this.selectedKhoiLop.maKhoiLop);
    console.log('ma lop', this.selectedLopHoc?.maLop);
    if (this.hocSinh.maHocSinh === "") {
      this.dataService.postHocSinh(this.hocSinh).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.hocSinhs.push(data);
          this.hideDialog(false, true);
          this.getHocSinhs();
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      this.dataService.putHocSinh(this.hocSinh.maHocSinh, this.hocSinh).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.hideDialog(false, true);
          this.getHocSinhs();
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    }
  }

  public onKhoiLopChange(event:any):void{
    const khopLop:KhoiLop=event;
    this.selectedKhoiLop=khopLop;
    this.getLopHocsByKhoiLop();
  }

  public onLopHocChange(event:any):void{
    const lopHoc:LopHoc=event;
    this.selectedLopHoc=lopHoc;
  }

  public onGioiTinhChange(event:any):void{
    const gioiTinh:any=event;
    this.selectedGioiTinh=gioiTinh;
  }

  public onTrangThaiHocChange(event:any):void{
    const trangThaiHoc:any=event;
    this.selectedTrangThaiHoc=trangThaiHoc;
  }

  public onDanTocChange(event:any):void{
    const danToc:any=event;
    this.selectedDanToc=danToc;
  }

  public onTonGiaoChange(event:any):void{
    const tonGiao:any=event;
    this.selectedTonGiao=tonGiao;
  }

  public onQuocTichChange(event:any):void{
    const quocTich:any=event;
    this.selectedQuocTich=quocTich;
  }

}
