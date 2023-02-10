import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrls: ['./dang-nhap.component.scss'],
})
export class DangNhapComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  noiDung: any = { maNhanSu: '', matKhau: '' };
  result = 0;
  submitted = false;
  ngOnInit(): void {}

  dangNhap(): void {
    this.submitted = true;
    if (this.checkValid()) {
      this.dataService.nhanSuDangNhap(this.noiDung).subscribe((data) => {
        this.result = data;

        if (this.result === 1) {
          this.authService.dangNhap(this.noiDung.maNhanSu);
        } else {
          alert('Thông tin đăng nhập không hợp lệ');
        }
      });
    }
  }

  checkValid(): boolean {
    if (
      !this.noiDung.maNhanSu ||
      this.noiDung.maNhanSu < 0 ||
      this.noiDung.maNhanSu === null
    )
      return false;
    if (!this.noiDung.matKhau) return false;
    return true;
  }
}
