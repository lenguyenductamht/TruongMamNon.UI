import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NhanSu } from '../models/nhan-su.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { KhoiLop } from '../models/khoi-lop.model';
import { NienHoc } from '../models/nien-hoc.model';
import { ExportService } from '../services/export.service';
import { LopHoc } from '../models/lop-hoc.model';
import { PhongBan } from '../models/phong-ban.model';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { ChucVu } from '../models/chuc-vu.model';

@Component({
  selector: 'app-nhan-su',
  templateUrl: './nhan-su.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./nhan-su.component.scss'],

})
export class NhanSuComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private exportService: ExportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public loading = true;
  public nhanSuDialog = false;

  public nhanSus: NhanSu[] = [];
  
  public nhanSu:NhanSu=Object.assign({},this.dataService.newNhanSu);
  public submitted: boolean = false;
  public gioiTinhs:any[]=[];
  public danTocs:any[]=this.dataService.danTocs;
  public tonGiaos:any[]=this.dataService.tonGiaos;
  public quocTichs:any[]=this.dataService.quocGias;
  public trangThaiLamViecs:any[]=[{name: "Đang làm", key:0},{name:"Đã nghỉ", key:1}];
  public khoiLops:KhoiLop[]=[];
  public selectedKhoiLop:KhoiLop|undefined;
  public lopHocs:LopHoc[]=[];
  public selectedLopHoc:LopHoc|undefined;
  public selectedGioiTinh:any|undefined;
  public selectedNienHoc:NienHoc|undefined;
  public selectedTrangThaiLamViec:any|undefined;
  public selectedDanToc:any|undefined;
  public selectedTonGiao:any|undefined;
  public selectedQuocTich:any|undefined;
  public nienHocs:NienHoc[]=[];
  public phongBans:PhongBan[]=[];
  public selectedPhongBan:PhongBan|undefined;

  public loaiNhanSus:LoaiNhanSu[]=[];
  public selectedLoaiNhanSu:LoaiNhanSu|undefined;

  public chucVus:ChucVu[]=[];
  public selectedChucVu:ChucVu|undefined;

  public ngOnInit(): void {
    this.getNhanSus();
    this.getKhoiLops();
    this.dataService.selectedNienHoc$.subscribe((nienHoc)=>{
      this.selectedNienHoc=nienHoc;
    });
    this.gioiTinhs=this.dataService.gioiTinhs;
  }

  public exportExcel(){
    // const exportData:any[]=[];
    // this.nhanSus.forEach((table)=>{
    //   exportData.push({
    //     tenLop: table.tenLop,
    //     khoiLop:table.khoiLop.tenKhoiLop,
    //     hocPhi:table.hocPhi,
    //     nienHoc:table.nienHoc.tenNienHoc,
    //   });
    // });
    // this.exportService.exportExcel(exportData, 'DanhSachNhanSu');
  }

  public exportPdf(){
    // const exportData:any[]=[];
    // this.nhanSus.forEach((table)=>{
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
    //   'DanhSachNhanSu'
    // );
  }
  
  public getPhongBans():void{
    this.dataService.getPhongBans().subscribe((data) => {
      this.phongBans = data;
    });
  }

  public getNhanSus():void{
    this.loading=true;  
    this.dataService.getNhanSus().subscribe((data)=>{
      this.nhanSus=data;
      //this.displayNhanSus=this.nhanSus.filter((nhanSu)=>nhanSu.nienHoc.maNienHoc===this.selectedNienHoc?.maNienHoc);
      this.loading=false;
    });     
    
  }

  public getLoaiNhanSus():void{
    this.dataService.getLoaiNhanSus().subscribe((data) => {
      this.loaiNhanSus = data;
    });
  }

  public getChucVus():void{
    if(this.selectedLoaiNhanSu){
      this.dataService.getChucVus(this.selectedLoaiNhanSu?.maLoaiNhanSu).subscribe((data) => {
        this.chucVus = data;
      });
    }   
  }

  public getKhoiLops():void{
    // this.loading=true;
    this.dataService.getKhoiLops().subscribe((data)=>{
      this.khoiLops=data;
      // this.loading=false;
      //this.getNhanSus();
    });
  }

  public getLopHocsByKhoiLop():void{
    // this.loading=true;
    if(this.selectedNienHoc && this.selectedKhoiLop){
      this.dataService.getLopHocsByNienHocKhoiLop(this.selectedNienHoc?.maNienHoc, this.selectedKhoiLop?.maKhoiLop).subscribe((data)=>{
        this.lopHocs=data;
        // this.loading=false;
        //this.getNhanSus();
      });
    }
    
  }

  public openNew(): void {
    this.nhanSu = Object.assign({}, this.dataService.newNhanSu);
    this.submitted=false;
    this.nhanSuDialog = true;
    this.getKhoiLops();
    this.getPhongBans();
    this.getLoaiNhanSus();
  }

  public editNhanSu(nhanSu: NhanSu): void {
    console.log('edit nhanSu:', nhanSu);
    this.nhanSu = nhanSu;
    // this.selectedKhoiLop=this.nhanSu.khoiLop;
    // this.selectedLopHoc=this.nhanSu.lopHoc;
    // this.selectedGioiTinh=this.nhanSu.gioiTinh;
    // this.selectedTrangThaiHoc=this.nhanSu.trangThaiHoc;
    // this.selectedDanToc=this.nhanSu.danToc;
    // this.selectedTonGiao=this.nhanSu.tonGiao;
    // this.selectedQuocTich=this.nhanSu.quocTich;
    this.nhanSuDialog = true;
    this.getKhoiLops();
    this.getLopHocsByKhoiLop();
  }

  public deleteNhanSu(nhanSu: NhanSu) {
    console.log('delete hoc sinh', nhanSu);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + nhanSu.ho + ' ' + nhanSu.ten +'?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteNhanSu(nhanSu.maNhanSu).subscribe((data)=>{
          this.getNhanSus();
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
    this.nhanSuDialog = false;
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

  public saveNhanSu() {
    this.submitted=true;
    console.log('saveNhanSu: ', this.nhanSu);

    this.nhanSu.gioiTinh=this.selectedGioiTinh.name;
    this.nhanSu.danToc=this.selectedDanToc.TenDanToc;
    this.nhanSu.tonGiao=this.selectedTonGiao.TenTonGiao;
    this.nhanSu.quocTich=this.selectedQuocTich.TenQuocGia;
    if(this.selectedPhongBan){
      this.nhanSu.maPhongBan=this.selectedPhongBan?.maPhongBan;
    }
    this.nhanSu.trangThaiLamViec=this.selectedTrangThaiLamViec.name;
    if(this.selectedLoaiNhanSu){
      this.nhanSu.maLoaiNhanSu=this.selectedLoaiNhanSu?.maLoaiNhanSu;
    }   
    if(this.selectedChucVu){
      this.nhanSu.maChucVu=this.selectedChucVu?.maChucVu;
    }
    
    if(this.selectedKhoiLop){
      this.nhanSu.maKhoiLop=this.selectedKhoiLop?.maKhoiLop;
    }
    

    console.log('saveNhanSu: ', this.nhanSu);
    if (this.nhanSu.maNhanSu === "") {
      this.dataService.postNhanSu(this.nhanSu).subscribe(
        (data) => {
          console.log('return data = ', data);
          // this.nhanSus.push(data);
          this.hideDialog(false, true);
          this.getNhanSus();
        },
        (error) => {
          console.log('error');
          this.hideDialog(false, false);
        }
      );
    } else {
      this.dataService.putNhanSu(this.nhanSu.maNhanSu, this.nhanSu).subscribe(
        (data) => {
          console.log('return data = ', data);
          this.hideDialog(false, true);
          this.getNhanSus();
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

  public onPhongBanChange(event:any):void{
    const phongBan:PhongBan=event;
    this.selectedPhongBan=phongBan;
  }

  public onLoaiNhanSuChange(event:any):void{
    const loaiNhanSu:LoaiNhanSu=event;
    this.selectedLoaiNhanSu=loaiNhanSu;
    this.getChucVus();
  }

  public onChucVuChange(event:any):void{
    const chucVu:ChucVu=event;
    this.selectedChucVu=chucVu;
  }

  public onGioiTinhChange(event:any):void{
    const gioiTinh:any=event;
    this.selectedGioiTinh=gioiTinh;
  }

  public onTrangThaiHocChange(event:any):void{
    const trangThaiHoc:any=event;
    this.selectedTrangThaiLamViec=trangThaiHoc;
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
