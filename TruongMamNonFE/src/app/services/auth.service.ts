import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  maNhanSuDangNhap$: number = 0;
  constructor(private router: Router) {}

  dangXuat(): void {
    console.log('Da dang xuat');
    this.loggedIn.next(false);
    this.router.navigate(['/DangNhap']);
  }

  dangNhap(maNhanSuDangNhap: number): void {
    this.maNhanSuDangNhap$ = maNhanSuDangNhap;
    this.loggedIn.next(true);
    this.router.navigate(['/Home']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
