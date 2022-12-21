import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { DataService } from './services/data.service';
import { NienHoc } from './models/nien-hoc.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TruongMamNonFE';
  constructor(private route:ActivatedRoute, private router:Router, private dataService:DataService) { }
  items: MenuItem[]=[];
  
  public nienHocs:NienHoc[]=[];
  public selectedNienHoc: NienHoc|undefined;

  ngOnInit(): void {
    this.getNienHocs(); 
    this.items = [
      {
        icon: 'pi pi-home',
        //command:()=>this.router.navigate(['/'])
        routerLink:['/'],
      },
      {
        icon: 'pi pi-search'
      },
      {
        label: 'Hệ thống',
        items:
        [
          {
              label:'Phân quyền',
              items:[
                {label:'Quản lý nhóm người dùng'},
                {label:'Quản lý người dùng'},
            ]
          },
          {
            label:'Quản lý trường',
            items:[
              {label:'Cấu hình trường'},
              {
                label:'Cấu hình học kỳ',
                routerLink:['/CauHinhNienHoc']
              }
            ]
          }
        ],    
      },
      {
        label:'Trường học',
        items:
        [
          {
            label:'Phòng ban trường',
            routerLink:['/PhongBan']
          },
          {
            label:'Quản lý chức vụ',
            routerLink:['/ChucVu']
          },
          {label:'Ban giám hiệu'},
          {
            label:'Quản lý thông báo',
            items:
            [
              {label:'Gửi thông báo cho cán bộ'},
              {label:'GVCN gửi thông báo cho phụ huynh'}
            ]
          },
        ]
      },
      {
        label:'Nhân sự',
        items:
        [
          {
            label:'Loại nhân sự',
            routerLink:['/LoaiNhanSu']
          },
          {
            label:'Quản lý nhân sự',
            routerLink:['/TraCuuNhanSu']
          },
          {
            label:'Thống kê',
            items:
            [
              {label:'Thống kê số lượng nhân sự đơn vị'},
              {label:'Thống kê nhân sự thiếu thông tin'},
              {label:'Thống kê số lượng nhân sự phòng ban'},

            ]
          }
        ]
      },
      {
        label: 'Mầm non',
        items:
        [
          {
              label:'Quản lý lớp học - học sinh',
              items:[
                {
                  label:'Danh sách lớp học',
                  routerLink:['/DanhSachLopHoc']
                },
                {
                  label:'Hồ sơ học sinh',
                  routerLink:['/HoSoHocSinh']
                },
                {label:'Tài khoản phụ huynh'},
                {label:'Danh sách học sinh của lớp'},

            ]
          },
          {
            label:'Quản lý biến động học sinh',
            items:[
              {label:'Chuyển lớp'},
              {label:'Danh sách học sinh thôi học'}
            ]
          },
          {
            label:'Chuyên cần',
            items:[
              {label:'Điểm danh'},
              {label:'Điểm danh tháng'}
            ]
          },
          
          
          {
            label:'Báo cáo Trường - Lớp',
            items:[
              {label:'Thống kê sĩ số lớp học'},
              {label:'Thống kê lớp học'},
            ]
          },
          {
            label:'Báo cáo học sinh',
            items:[
              {label:'Thống kê số lượng học sinh'},
              {label:'Thống kê Tổng hợp học sinh'},
              {label:'Báo cáo tổng hợp học sinh'},
            ]
          }
        ],    
      },
      {
        label:'Y tế học đường',
        items:
        [
          {
            label:'Sức khỏe',
            items:[
              {label:'Theo dõi sức khỏe mầm non'},
              {label:'Nhật ký sức khỏe'},
              {label:'Thống kê theo dõi sức khỏe mầm non'},
              {label:'Danh sách theo dõi trẻ suy dinh dưỡng'},
              {label:'Kết quả nuôi dưỡng'},
              {label:'Bảng tiêu chuẩn cân nặng'},
              {label:'Bảng tiêu chuẩn chiều cao'},
            ]
          },
          {
            label:'Quản lý Tiêm chủng - Sổ giun - Vitamin',
            items:
            [
              {
                label: 'Danh mục vaccine',
                routerLink:['/DanhMucVaccine']
              },
              {
                label: 'Danh mục thuốc sổ giun',
                routerLink:['/DanhMucThuocSoGiun']
              },
              {
                label: 'Danh mục vitamin',
                routerLink:['/DanhMucVitamin']
              },
              {
                label:'Quản lý tiêm chủng',
                routerLink:['/QuanLyTiemChung']
              },
              
              {label:'Quản lý sổ giun'},
              
              {label:'Quản lý uống vitamin'},

            ]
          },
          {
            label:'Theo dõi thể lực',
            items:
            [
              {label:'Danh sách theo dõi trẻ suy dinh dưỡng'},
              {label:'Thống kê theo dõi sức khỏe mầm non'},
            ]
          },
          {
            label:'Theo dõi bất thường',
            items:
            [
              {label:'Nhật ký sức khỏe'},
            ]
          },
          {
            label:'Khám chuyên khoa',
            items:
            [
              {label:'Khám sức khỏe theo chuyên khoa'},
              {label:'Thống kê học sinh mắc bệnh tim mạch'},
              {label:'Thống kê học sinh mắc bệnh về mắt'},
              {label:'Thống kê học sinh mắc bệnh về cơ xương khớp'},
              {label:'Thống kê học sinh mắc bệnh về răng hàm mặt'},
              {label:'Thống kê học sinh rối loạn sức khỏe tâm thần'},
              {label:'Thống kê học sinh mắc bệnh tim mạch'},
              {label:'Thống kê học sinh mắc bệnh tim mạch'},
              {label:'Thống kê học sinh mắc bệnh tim mạch'},
              {label:'Báo cáo công tác y tế học đường'},
            ]
          }
        ]
      },
      {
        label:'Tài chính học vụ'
      },
      {
        label:'Nhà bếp',
        items:[
          {label: 'Thực phẩm'},
          {
            label:'Thực đơn',
            items:[
              {
                label:'Danh mục thực đơn',
                // command:()=>this.router.navigate(['/DanhMucThucDon']),
                routerLink:['/DanhMucThucDon'],
              },
              {label:'Danh mục món ăn'},
              {label:'Thực đơn mầm non'},
            ]
          },
        ]
      }
    ]   
    
  }

  public getNienHocs():void{
    this.dataService.getNienHocs().subscribe((data) => {
      this.nienHocs = data;
    });
  }
  
  public onNienHocChange(event:any):void{
    const nienHoc:NienHoc = event;
    this.dataService.selectedNienHoc$.next(nienHoc);
  }
}
