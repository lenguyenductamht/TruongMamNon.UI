import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { NhanSu } from '../models/nhan-su.model';
import { NienHoc } from '../models/nien-hoc.model';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) {}
  items: MenuItem[] = [];

  nienHocs: NienHoc[] = [];
  selectedNienHoc: NienHoc | undefined;

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  maNhanSuDangNhap = 0;

  nhanSu: NhanSu | undefined;
  ten = 'abc';
  ngOnInit(): void {
    if (this.getNhanSu()) {
      if (this.nhanSu) {
        this.ten = this.nhanSu.ho;
      }
      this.isLoggedIn$ = this.authService.isLoggedIn();
      this.getNienHocs();
      this.items = [
        {
          icon: 'pi pi-home',
          //command:()=>this.router.navigate(['/'])
          routerLink: ['/'],
        },
        {
          icon: 'pi pi-search',
        },
        {
          label: 'Hệ thống',
          items: [
            {
              label: 'Quản lý trường',
              items: [
                {
                  label: 'Cấu hình học kỳ',
                  routerLink: ['/CauHinhNienHoc'],
                },
              ],
            },
          ],
        },
        {
          label: 'Trường học',
          items: [
            {
              label: 'Phòng ban trường',
              routerLink: ['/PhongBan'],
            },
            {
              label: 'Quản lý chức vụ',
              routerLink: ['/ChucVu'],
            },
          ],
        },
        {
          label: 'Nhân sự',
          items: [
            {
              label: 'Loại nhân sự',
              routerLink: ['/LoaiNhanSu'],
            },
            {
              label: 'Quản lý nhân sự',
              routerLink: ['/TraCuuNhanSu'],
            },
          ],
        },
        {
          label: 'Mầm non',
          items: [
            {
              label: 'Quản lý lớp học - học sinh',
              items: [
                {
                  label: 'Danh sách lớp học',
                  routerLink: ['/DanhSachLopHoc'],
                },
                {
                  label: 'Hồ sơ học sinh',
                  routerLink: ['/HoSoHocSinh'],
                },
              ],
            },

            {
              label: 'Điểm danh',
              routerLink: ['/DiemDanh'],
            },
          ],
        },
        {
          label: 'Y tế học đường',
          items: [
            {
              label: 'Sức khỏe',
              items: [
                {
                  label: 'Đợt khám sức khỏe',
                  routerLink: ['/DotKhamSucKhoe'],
                },
                {
                  label: 'Phiếu khám sức khỏe',
                  routerLink: ['/PhieuKhamSucKhoe'],
                },
              ],
            },
            {
              label: 'Quản lý tiêm chủng',
              items: [
                {
                  label: 'Danh mục vaccine',
                  routerLink: ['/DanhMucVaccine'],
                },

                {
                  label: 'Đợt tiêm vaccine',
                  routerLink: ['/DotTiemVaccine'],
                },
                {
                  label: 'Phiếu tiêm vaccine',
                  routerLink: ['/PhieuTiemVaccine'],
                },
              ],
            },
            {
              label: 'Quản lý sổ giun',
              items: [
                {
                  label: 'Danh mục thuốc sổ giun',
                  routerLink: ['/DanhMucThuocSoGiun'],
                },
                {
                  label: 'Đợt sổ giun',
                  routerLink: ['/DotSoGiun'],
                },
                {
                  label: 'Phiếu sổ giun',
                  routerLink: ['/PhieuSoGiun'],
                },
              ],
            },
            {
              label: 'Quản lý uống vitamin',
              items: [
                {
                  label: 'Danh mục vitamin',
                  routerLink: ['/DanhMucVitamin'],
                },
                {
                  label: 'Đợt uống vitamin',
                  routerLink: ['/DotUongVitamin'],
                },
                {
                  label: 'Phiếu uống vitamin',
                  routerLink: ['/PhieuUongVitamin'],
                },
              ],
            },
          ],
        },
        {
          label: 'Nhà bếp',
          items: [
            {
              label: 'Thực phẩm',
              routerLink: ['/ThucPham'],
            },
            {
              label: ' Nhập thực phẩm',
              routerLink: ['/NhapThucPham'],
            },
            {
              label: 'Xuất thực phẩm',
              routerLink: ['/XuatThucPham'],
            },
            {
              label: 'Thực đơn',
              items: [
                {
                  label: 'Danh mục thực đơn',
                  // command:()=>this.router.navigate(['/DanhMucThucDon']),
                  routerLink: ['/DanhMucThucDon'],
                },
                {
                  label: 'Danh mục món ăn',
                  routerLink: ['/MonAn'],
                },
                {
                  label: 'Thực đơn mầm non',
                  routerLink: ['/ThucDon'],
                },
              ],
            },
          ],
        },
      ];
      console.log(this.nhanSu);
    }
  }

  getNhanSu(): boolean {
    this.maNhanSuDangNhap = this.authService.maNhanSuDangNhap$;
    if (this.maNhanSuDangNhap !== 0) {
      this.dataService.getNhanSu(this.maNhanSuDangNhap).subscribe((success) => {
        this.nhanSu = success;
        console.log('1', this.nhanSu);
      });
    }
    return true;
  }

  getNienHocs(): void {
    this.dataService.getNienHocs().subscribe((data) => {
      this.nienHocs = data;
    });
  }

  onNienHocChange(event: any): void {
    const nienHoc: NienHoc = event;
    this.dataService.selectedNienHoc$.next(nienHoc);
  }

  dangXuat(): void {
    this.authService.dangXuat();
  }
}
