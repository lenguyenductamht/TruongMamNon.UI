import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AUNienHocRequest } from '../request-models/au-nien-hoc.request.model';
import { ChucVu } from '../models/chuc-vu.model';
import { DanToc } from '../models/dan-toc.model';
import { DanhMucThucDon } from '../models/danh-muc-thuc-don.model';
import { GioiTinh } from '../models/gioi-tinh.model';
import { HocSinh } from '../models/hoc-sinh.model';
import { KhoiLop } from '../models/khoi-lop.model';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { LopHoc } from '../models/lop-hoc.model';
import { NhanSu } from '../models/nhan-su.model';
import { NienHoc } from '../models/nien-hoc.model';
import { PhieuTiemVaccine } from '../models/phieu-tiem-vaccine.model';
import { PhongBan } from '../models/phong-ban.model';
import { QuocGia } from '../models/quoc-gia.model';
import { ThuocSoGiun } from '../models/thuoc-so-giun.model';
import { TonGiao } from '../models/ton-giao.model';
import { TrangThaiHoc } from '../models/trang-thai-hoc.model';
import { TrangThaiLamViec } from '../models/trang-thai-lam-viec.model';
import { TrangThaiTaiKhoan } from '../models/trang-thai-tai-khoan.model';
import { Vaccine } from '../models/vaccine.model';
import { Vitamin } from '../models/vitamin.model';
import { AddHocSinhRequest } from '../request-models/add-hoc-sinh.request.model';
import { UpdateHocSinhRequest } from '../request-models/update-hoc-sinh.request.model';
import { AddNhanSuRequest } from '../request-models/add-nhan-su.request.model';
import { UpdateNhanSuRequest } from '../request-models/update-nhan-su.request.model';
import { AUVaccineRequest } from '../request-models/au-vaccine.request.model';
import { DotTiemVaccine } from '../models/dot-tiem-vaccine.model';
import { AUDotTiemVaccineRequest } from '../request-models/au-dot-tiem-vaccine.request.model';
import { AUPhieuTiemVaccineRequest } from '../request-models/au-phieu-tiem-vaccine.request.model';
import { TrangThaiDiemDanh } from '../models/trang-thai-diem-danh.model';
import { DiemDanh } from '../models/diem-danh.model';
import { UpdateDiemDanhRequest } from '../request-models/update-diem-danh.request.model';
import { AddDiemDanhRequest } from '../request-models/add-diem-danh.request.model';
import { DanhMucThucPham } from '../models/danh-muc-thuc-pham.model';
import { ThucPham } from '../models/thuc-pham.model';
import { PhieuNhapThucPham } from '../models/phieu-nhap-thuc-pham.model';
import { ChiTietPhieuNhapThucPham } from '../models/chi-tiet-phieu-nhap-thuc-pham.model';
import { AddPhieuNhapThucPhamRequest } from '../request-models/add-phieu-nhap-thuc-pham.request.model';
import { UpdatePhieuNhapThucPhamRequest } from '../request-models/update-phieu-nhap-thuc-pham.request.model';
import { AddChiTietPhieuNhapThucPhamRequest } from '../request-models/add-chi-tiet-phieu-nhap-thuc-pham.request.model';
import { UpdateChiTietPhieuNhapThucPhamRequest } from '../request-models/update-chi-tiet-phieu-nhap-thuc-pham.request.model';
import { PhieuXuatThucPham } from '../models/phieu-xuat-thuc-pham.model';
import { AddPhieuXuatThucPhamRequest } from '../request-models/add-phieu-xuat-thuc-pham.request.model';
import { UpdatePhieuXuatThucPhamRequest } from '../request-models/update-phieu-xuat-thuc-pham.request.model';
import { ChiTietPhieuXuatThucPham } from '../models/chi-tiet-phieu-xuat-thuc-pham.model';
import { AddChiTietPhieuXuatThucPhamRequest } from '../request-models/add-chi-tiet-phieu-xuat-thuc-pham.request.model';
import { UpdateChiTietPhieuXuatThucPhamRequest } from '../request-models/update-chi-tiet-phieu-xuat-thuc-pham.request.model';
import { AUThucPhamRequest } from '../request-models/au-thuc-pham.request.model';
import { AUChucVuRequest } from '../request-models/au-chuc-vu.request.model';
import { AUThuocSoGiunRequest } from '../request-models/au-thuoc-so-giun.request.model';
import { AUVitaminRequest } from '../request-models/au-vitamin.request.model';
import { DotSoGiun } from '../models/dot-so-giun.model';
import { AUDotSoGiunRequest } from '../request-models/au-dot-so-giun.request.model';
import { DotUongVitamin } from '../models/dot-uong-vitamin.model';
import { AUDotUongVitaminRequest } from '../request-models/au-dot-uong-vitamin.request.model';
import { DotKhamSucKhoe } from '../models/dot-kham-suc-khoe.model';
import { AUDotKhamSucKhoeRequest } from '../request-models/au-dot-kham-suc-khoe.request.model';
import { PhieuSoGiun } from '../models/phieu-so-giun.model';
import { AUPhieuSoGiunRequest } from '../request-models/au-phieu-so-giun.request.model';
import { PhieuUongVitamin } from '../models/phieu-uong-vitamin.model';
import { AUPhieuUongVitaminRequest } from '../request-models/au-phieu-uong-vitamin.request.model';
import { PhieuKhamSucKhoe } from '../models/phieu-kham-suc-khoe.model';
import { AUPhieuKhamSucKhoeRequest } from '../request-models/au-phieu-kham-suc-khoe.request.model';
import { AUDanhMucThucDonRequest } from '../request-models/au-danh-muc-thuc-don.request.model';
import { MonAn } from '../models/mon-an.model';
import { AddMonAnRequest } from '../request-models/add-mon-an.request.model';
import { UpdateMonAnRequest } from '../request-models/update-mon-an.request.model';
import { MonAnThucPham } from '../models/mon-an-thuc-pham.model';
import { AddMonAnThucPhamRequest } from '../request-models/add-mon-an-thuc-pham.request.model';
import { UpdateMonAnThucPhamRequest } from '../request-models/update-mon-an-thuc-pham.request.model';
import { ThucDon } from '../models/thuc-don.model';
import { AddThucDonRequest } from '../request-models/add-thuc-don.request.model';
import { UpdateThucDonRequest } from '../request-models/update-thuc-don.request.model';
import { ThucDonMonAn } from '../models/thuc-don-mon-an.model';
import { AddThucDonMonAnRequest } from '../request-models/add-thuc-don-mon-an.request.model';
import { UpdateThucDonMonAnRequest } from '../request-models/update-thuc-don-mon-an.request.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private REST_API_SERVER = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public newNienHoc: NienHoc = {
    maNienHoc: 0,
    tenNienHoc: '',
    batDauHK1: new Date(),
    ketThucHK1: new Date(),
    batDauHK2: new Date(),
    ketThucHK2: new Date(),
  };
  public selectedNienHoc$ = new BehaviorSubject<NienHoc>(this.newNienHoc);

  private baseApiUrl = 'https://localhost:7057/api';

  constructor(private httpClient: HttpClient) {}

  public gioiTinhs: any[] = [
    { name: 'Nam', key: '0' },
    { name: 'Nữ', key: '1' },
    { name: 'Khác', key: '2' },
  ];

  public danTocs: any[] = [
    { MaDanToc: '01', TenDanToc: 'Kinh' },
    { MaDanToc: '17', TenDanToc: 'Chăm' },
    { MaDanToc: '21', TenDanToc: 'Ra-glai' },
    { MaDanToc: '12', TenDanToc: 'Ê-đê' },
    { MaDanToc: '18', TenDanToc: 'Sán Dìu' },
    { MaDanToc: '13', TenDanToc: 'Ba-na' },
    { MaDanToc: '19', TenDanToc: 'Hrê' },
    { MaDanToc: '36', TenDanToc: 'Chu-ru' },
    { MaDanToc: '04', TenDanToc: 'Hoa' },
    { MaDanToc: '54', TenDanToc: 'Rơ-măm' },
    { MaDanToc: '15', TenDanToc: 'Sán Chay' },
    { MaDanToc: '49', TenDanToc: 'Bố Y' },
    { MaDanToc: '35', TenDanToc: 'Hà Nhì' },
    { MaDanToc: '41', TenDanToc: 'La Hủ' },
    { MaDanToc: '45', TenDanToc: 'Mảng' },
    { MaDanToc: '11', TenDanToc: 'Ngái' },
    { MaDanToc: '40', TenDanToc: 'Phù Lá' },
    { MaDanToc: '06', TenDanToc: 'Mường' },
    { MaDanToc: '42', TenDanToc: 'Lự' },
    { MaDanToc: '37', TenDanToc: 'Lào' },
    { MaDanToc: '38', TenDanToc: 'La Chi' },
    { MaDanToc: '09', TenDanToc: 'Dao' },
    { MaDanToc: '29', TenDanToc: 'Khơ-mú' },
    { MaDanToc: '43', TenDanToc: 'Lô Lô' },
    { MaDanToc: '53', TenDanToc: 'Ơ Đu' },
    { MaDanToc: '51', TenDanToc: 'Pu Péo' },
    { MaDanToc: '05', TenDanToc: 'Khơ-me' },
    { MaDanToc: '33', TenDanToc: 'Kháng' },
    { MaDanToc: '46', TenDanToc: 'Pà Thẻn' },
    { MaDanToc: '32', TenDanToc: 'Chơ-ro' },
    { MaDanToc: '56', TenDanToc: 'Không Xác Định' },
    { MaDanToc: '28', TenDanToc: 'Mạ' },
    { MaDanToc: '07', TenDanToc: 'Nùng' },
    { MaDanToc: '55', TenDanToc: 'Người Nước Ngoài' },
    { MaDanToc: '08', TenDanToc: 'Hmông' },
    { MaDanToc: '20', TenDanToc: 'Mnông' },
    { MaDanToc: '52', TenDanToc: 'Brâu' },
    { MaDanToc: '23', TenDanToc: 'Bru-Vân Kiều' },
    { MaDanToc: '44', TenDanToc: 'Chứt' },
    { MaDanToc: '30', TenDanToc: 'Co' },
    { MaDanToc: '16', TenDanToc: 'Cơ-ho' },
    { MaDanToc: '47', TenDanToc: 'Cơ Lao' },
    { MaDanToc: '26', TenDanToc: 'Cơ-tu' },
    { MaDanToc: '48', TenDanToc: 'Cống' },
    { MaDanToc: '10', TenDanToc: 'Gia-rai' },
    { MaDanToc: '25', TenDanToc: 'Giáy' },
    { MaDanToc: '27', TenDanToc: 'Gié-Triêng' },
    { MaDanToc: '50', TenDanToc: 'Si La' },
    { MaDanToc: '31', TenDanToc: 'Ta-ôi' },
    { MaDanToc: '02', TenDanToc: 'Tày' },
    { MaDanToc: '03', TenDanToc: 'Thái' },
    { MaDanToc: '24', TenDanToc: 'Thổ' },
    { MaDanToc: '34', TenDanToc: 'Xinh-mun' },
    { MaDanToc: '14', TenDanToc: 'Xơ-đăng' },
    { MaDanToc: '22', TenDanToc: 'Xtiêng' },
  ];

  public tonGiaos: any[] = [
    { MaTonGiao: '99', TenTonGiao: 'Không' },
    { MaTonGiao: '01', TenTonGiao: 'Phật giáo' },
    { MaTonGiao: '02', TenTonGiao: 'Công giáo' },
    { MaTonGiao: '03', TenTonGiao: 'Phật giáo Hòa Hảo' },
    { MaTonGiao: '04', TenTonGiao: 'Hồi giáo' },
    { MaTonGiao: '05', TenTonGiao: 'Cao Đài' },
    { MaTonGiao: '06', TenTonGiao: 'Minh sư đạo' },
    { MaTonGiao: '07', TenTonGiao: 'Minh Lý đạo' },
    { MaTonGiao: '08', TenTonGiao: 'Tin Lành' },
    { MaTonGiao: '09', TenTonGiao: 'Tịnh độ cư sĩ Phật hồi Việt Nam' },
    { MaTonGiao: '10', TenTonGiao: 'Đạo tứ ấn hiếu nghĩa' },
    { MaTonGiao: '11', TenTonGiao: 'Bửu sơn Kỳ Hương' },
    { MaTonGiao: '12', TenTonGiao: "Ba Ha'i" },
    { MaTonGiao: '13', TenTonGiao: 'Tôn giáo khác' },
  ];

  public quocGias: any[] = [
    { MaQuocGia: '704', TenQuocGia: 'Việt Nam' },
    { MaQuocGia: '100', TenQuocGia: 'Bungari' },
    { MaQuocGia: '276', TenQuocGia: 'Cộng hoà LB Đức' },
    { MaQuocGia: '643', TenQuocGia: 'Cộng hoà LB Nga' },
    { MaQuocGia: '348', TenQuocGia: 'Hunggari' },
    { MaQuocGia: '703', TenQuocGia: 'Slovakia' },
    { MaQuocGia: '09', TenQuocGia: 'Tiệp Khắc' },
    { MaQuocGia: '156', TenQuocGia: 'Trung Quốc' },
    { MaQuocGia: '764', TenQuocGia: 'Thái Lan' },
    { MaQuocGia: '756', TenQuocGia: 'Thuỵ Sỹ' },
    { MaQuocGia: '250', TenQuocGia: 'Cộng hoà Pháp' },
    { MaQuocGia: '356', TenQuocGia: 'Ấn Độ' },
    { MaQuocGia: '418', TenQuocGia: 'Cộng hoà CHDCND Lào' },
    { MaQuocGia: '036', TenQuocGia: 'Australia' },
    { MaQuocGia: '158', TenQuocGia: 'Đài Loan' },
    { MaQuocGia: '392', TenQuocGia: 'Nhật Bản' },
    { MaQuocGia: '024', TenQuocGia: 'AngoLa' },
    { MaQuocGia: '840', TenQuocGia: 'Mỹ' },
    { MaQuocGia: '410', TenQuocGia: 'Hàn Quốc' },
    { MaQuocGia: '344', TenQuocGia: 'Hồng Kông' },
    { MaQuocGia: '528', TenQuocGia: 'Hà Lan' },
    { MaQuocGia: '702', TenQuocGia: 'Singapore' },
    { MaQuocGia: '124', TenQuocGia: 'Canada' },
    { MaQuocGia: '752', TenQuocGia: 'Thụy Điển' },
    { MaQuocGia: '352', TenQuocGia: 'BắC Ai Len' },
    { MaQuocGia: '75', TenQuocGia: 'Mỹ 2' },
  ];

  //#region Common
  public newGioiTinh: GioiTinh = {
    maGioiTinh: '',
    tenGioiTinh: '',
  };

  public getGioiTinhs(): Observable<GioiTinh[]> {
    return this.httpClient.get<GioiTinh[]>(
      this.baseApiUrl + '/Commons/GioiTinhs'
    );
  }

  public newDanToc: DanToc = {
    maDanToc: '',
    tenDanToc: '',
  };

  public getDanTocs(): Observable<DanToc[]> {
    return this.httpClient.get<DanToc[]>(this.baseApiUrl + '/Commons/DanTocs');
  }

  public newTonGiao: TonGiao = {
    maTonGiao: '',
    tenTonGiao: '',
  };

  public getTonGiaos(): Observable<TonGiao[]> {
    return this.httpClient.get<TonGiao[]>(
      this.baseApiUrl + '/Commons/TonGiaos'
    );
  }

  public newQuocGia: QuocGia = {
    maQuocGia: '',
    tenQuocGia: '',
  };

  public getQuocGias(): Observable<QuocGia[]> {
    return this.httpClient.get<QuocGia[]>(
      this.baseApiUrl + '/Commons/QuocGias'
    );
  }

  public newTrangThaiDiemDanh: TrangThaiDiemDanh = {
    maTrangThai: '',
    tenTrangThai: '',
  };

  public getTrangThaiDiemDanhs(): Observable<TrangThaiDiemDanh[]> {
    return this.httpClient.get<TrangThaiDiemDanh[]>(
      this.baseApiUrl + '/Commons/TrangThaiDiemDanhs'
    );
  }

  public newTrangThaiHoc: TrangThaiHoc = {
    maTrangThai: '',
    tenTrangThai: '',
  };

  public getTrangThaiHocs(): Observable<TrangThaiHoc[]> {
    return this.httpClient.get<TrangThaiHoc[]>(
      this.baseApiUrl + '/Commons/TrangThaiHocs'
    );
  }

  public newTrangThaiLamViec: TrangThaiLamViec = {
    maTrangThai: '',
    tenTrangThai: '',
  };

  public getTrangThaiLamViecs(): Observable<TrangThaiLamViec[]> {
    return this.httpClient.get<TrangThaiLamViec[]>(
      this.baseApiUrl + '/Commons/TrangThaiLamViecs'
    );
  }

  public newTrangThaiTaiKhoan: TrangThaiTaiKhoan = {
    maTrangThai: '',
    tenTrangThai: '',
  };

  public getTrangThaiTaiKhoans(): Observable<TrangThaiTaiKhoan[]> {
    return this.httpClient.get<TrangThaiTaiKhoan[]>(
      this.baseApiUrl + '/Commons/TrangThaiTaiKhoans'
    );
  }

  //#endregion

  //#region Niên học
  getNienHocs(): Observable<NienHoc[]> {
    return this.httpClient.get<NienHoc[]>(this.baseApiUrl + '/NienHocs');
  }

  updateNienHoc(
    maNienHoc: number,
    nienHocRequest: NienHoc
  ): Observable<NienHoc> {
    const updateNienHoctRequest: AUNienHocRequest = {
      tenNienHoc: nienHocRequest.tenNienHoc,
      batDauHK1: nienHocRequest.batDauHK1,
      ketThucHK1: nienHocRequest.ketThucHK1,
      batDauHK2: nienHocRequest.batDauHK2,
      ketThucHK2: nienHocRequest.ketThucHK2,
    };

    return this.httpClient.put<NienHoc>(
      this.baseApiUrl + '/NienHocs/' + maNienHoc,
      updateNienHoctRequest
    );
  }

  deleteNienHoc(maNienHoc: number): Observable<NienHoc> {
    return this.httpClient.delete<NienHoc>(
      this.baseApiUrl + '/NienHocs/' + maNienHoc
    );
  }

  addNienHoc(nienHocRequest: NienHoc): Observable<NienHoc> {
    const addNienHocRequest: AUNienHocRequest = {
      tenNienHoc: nienHocRequest.tenNienHoc,
      batDauHK1: nienHocRequest.batDauHK1,
      ketThucHK1: nienHocRequest.ketThucHK1,
      batDauHK2: nienHocRequest.batDauHK2,
      ketThucHK2: nienHocRequest.ketThucHK2,
    };

    return this.httpClient.post<NienHoc>(
      this.baseApiUrl + '/NienHocs',
      addNienHocRequest
    );
  }
  //#endregion

  //#region Phòng ban
  public newPhongBan: PhongBan = {
    maPhongBan: 0,
    tenPhongBan: '',
    ghiChu: '',
  };
  public getPhongBans(): Observable<PhongBan[]> {
    const url = `${this.REST_API_SERVER}/PhongBans`;
    return this.httpClient.get<PhongBan[]>(url, this.httpOptions);
  }

  public postPhongBan(data: PhongBan): Observable<PhongBan> {
    const url = `${this.REST_API_SERVER}/PhongBans`;
    return this.httpClient.post<PhongBan>(url, data, this.httpOptions);
  }

  public putPhongBan(ma: number, data: PhongBan): Observable<PhongBan> {
    const url = `${this.REST_API_SERVER}/PhongBans/${ma}`;
    return this.httpClient.put<PhongBan>(url, data, this.httpOptions);
  }

  public deletePhongBan(ma: number): Observable<PhongBan> {
    const url = `${this.REST_API_SERVER}/PhongBans/${ma}`;
    return this.httpClient.delete<PhongBan>(url, this.httpOptions);
  }
  //#endregion

  //#region Khoi lop
  public newKhoiLop: KhoiLop = {
    maKhoiLop: 0,
    tenKhoiLop: '',
    ghiChu: '',
  };
  public getKhoiLops(): Observable<KhoiLop[]> {
    return this.httpClient.get<KhoiLop[]>(this.baseApiUrl + '/KhoiLops');
  }
  //#endregion

  //#region Lop hoc
  public newLopHoc: LopHoc = {
    maLop: 0,
    tenLop: '',
    maKhoiLop: 0,
    hocPhi: 0,
    maNienHoc: 0,
    khoiLop: this.newKhoiLop,
    nienHoc: this.newNienHoc,
  };
  public getLopHocsByNienHoc(maNienHoc: number): Observable<LopHoc[]> {
    return this.httpClient.get<LopHoc[]>(
      this.baseApiUrl + '/LopHocs/NienHoc/' + maNienHoc
    );
  }

  public getLopHocsByNienHocKhoiLop(
    maNienHoc: number,
    maKhoiLop: number
  ): Observable<LopHoc[]> {
    return this.httpClient.get<LopHoc[]>(
      this.baseApiUrl +
        '/LopHocs/NienHoc/' +
        maNienHoc +
        '/KhoiLop/' +
        maKhoiLop,
      this.httpOptions
    );
  }

  public postLopHoc(data: LopHoc): Observable<LopHoc> {
    const url = `${this.REST_API_SERVER}/LopHocs`;
    return this.httpClient.post<LopHoc>(url, data, this.httpOptions);
  }

  public putLopHoc(ma: number, data: LopHoc): Observable<LopHoc> {
    const url = `${this.REST_API_SERVER}/LopHocs/${ma}`;
    return this.httpClient.put<LopHoc>(url, data, this.httpOptions);
  }

  public deleteLopHoc(ma: number): Observable<LopHoc> {
    const url = `${this.REST_API_SERVER}/LopHocs/${ma}`;
    return this.httpClient.delete<LopHoc>(url, this.httpOptions);
  }
  //#endregion

  //#region Hoc sinh
  public newHocSinh: HocSinh = {
    maHocSinh: 0,
    ho: '',
    ten: '',
    maGioiTinh: '',
    maKhoiLop: 0,
    maLopHoc: 0,
    ngayNhapHoc: new Date(Date.now()),
    maTrangThaiHoc: '',
    lyDoNghiHoc: '',
    ngayCapNhat: new Date(Date.now()),
    ngaySinh: new Date(),
    noiSinh: '',
    maDanToc: '',
    maTonGiao: '',
    maQuocTich: '',
    ghiChu: '',
    hoKhau: '',
    diaChi: '',
    hinhAnh: '',
    matKhau: '',
    maTrangThaiTaiKhoan: '',
    hoTenPhuHuynh: '',
    namSinhPhuHuynh: '',
    cmndPhuHuynh: '',
    sdtPhuHuynh: '',
    ngheNghiepPhuHuynh: '',
    emailPhuHuynh: '',
    diaChiPhuHuynh: '',
    khoiLop: this.newKhoiLop,
    lopHoc: this.newLopHoc,
    gioiTinh: this.newGioiTinh,
    danToc: this.newDanToc,
    tonGiao: this.newTonGiao,
    quocTich: this.newQuocGia,
    trangThaiHoc: this.newTrangThaiHoc,
    trangThaiTaiKhoan: this.newTrangThaiTaiKhoan,
  };
  getHocSinhs(): Observable<HocSinh[]> {
    return this.httpClient.get<HocSinh[]>(this.baseApiUrl + '/HocSinhs');
  }

  getHocSinhsByKhoiLop(maKhoiLop: number): Observable<HocSinh[]> {
    return this.httpClient.get<HocSinh[]>(
      this.baseApiUrl + '/HocSinhs/KhoiLop/' + maKhoiLop
    );
  }

  getHocSinhsByLopHoc(maLopHoc: number): Observable<HocSinh[]> {
    return this.httpClient.get<HocSinh[]>(
      this.baseApiUrl + '/HocSinhs/LopHoc/' + maLopHoc
    );
  }

  addHocSinh(hocSinhRequest: HocSinh): Observable<HocSinh> {
    const addHocSinhRequest: AddHocSinhRequest = {
      ho: hocSinhRequest.ho,
      ten: hocSinhRequest.ten,
      maGioiTinh: hocSinhRequest.maGioiTinh,
      maKhoiLop: hocSinhRequest.maKhoiLop,
      maLopHoc: hocSinhRequest.maLopHoc,
      ngayNhapHoc: hocSinhRequest.ngayNhapHoc,
      maTrangThaiHoc: hocSinhRequest.maTrangThaiHoc,
      lyDoNghiHoc: hocSinhRequest.lyDoNghiHoc,
      ngayCapNhat: hocSinhRequest.ngayCapNhat,
      ngaySinh: hocSinhRequest.ngaySinh,
      noiSinh: hocSinhRequest.noiSinh,
      maDanToc: hocSinhRequest.maDanToc,
      maTonGiao: hocSinhRequest.maTonGiao,
      maQuocTich: hocSinhRequest.maQuocTich,
      ghiChu: hocSinhRequest.ghiChu,
      hoKhau: hocSinhRequest.hoKhau,
      diaChi: hocSinhRequest.diaChi,
      matKhau: hocSinhRequest.matKhau,
      maTrangThaiTaiKhoan: hocSinhRequest.maTrangThaiTaiKhoan,

      hoTenPhuHuynh: hocSinhRequest.hoTenPhuHuynh,
      namSinhPhuHuynh: hocSinhRequest.namSinhPhuHuynh,
      cmndPhuHuynh: hocSinhRequest.cmndPhuHuynh,
      sdtPhuHuynh: hocSinhRequest.sdtPhuHuynh,
      ngheNghiepPhuHuynh: hocSinhRequest.ngheNghiepPhuHuynh,
      emailPhuHuynh: hocSinhRequest.emailPhuHuynh,
      diaChiPhuHuynh: hocSinhRequest.diaChiPhuHuynh,
    };

    return this.httpClient.post<HocSinh>(
      this.baseApiUrl + '/HocSinhs',
      addHocSinhRequest
    );
  }
  updateHocSinh(
    maHocSinh: number,
    hocSinhRequest: HocSinh
  ): Observable<HocSinh> {
    const updatetHocSinhRequest: UpdateHocSinhRequest = {
      ho: hocSinhRequest.ho,
      ten: hocSinhRequest.ten,
      maGioiTinh: hocSinhRequest.maGioiTinh,
      maKhoiLop: hocSinhRequest.maKhoiLop,
      maLopHoc: hocSinhRequest.maLopHoc,
      ngayNhapHoc: hocSinhRequest.ngayNhapHoc,
      maTrangThaiHoc: hocSinhRequest.maTrangThaiHoc,
      lyDoNghiHoc: hocSinhRequest.lyDoNghiHoc,
      ngayCapNhat: hocSinhRequest.ngayCapNhat,
      ngaySinh: hocSinhRequest.ngaySinh,
      noiSinh: hocSinhRequest.noiSinh,
      maDanToc: hocSinhRequest.maDanToc,
      maTonGiao: hocSinhRequest.maTonGiao,
      maQuocTich: hocSinhRequest.maQuocTich,
      ghiChu: hocSinhRequest.ghiChu,
      hoKhau: hocSinhRequest.hoKhau,
      diaChi: hocSinhRequest.diaChi,

      hoTenPhuHuynh: hocSinhRequest.hoTenPhuHuynh,
      namSinhPhuHuynh: hocSinhRequest.namSinhPhuHuynh,
      cmndPhuHuynh: hocSinhRequest.cmndPhuHuynh,
      sdtPhuHuynh: hocSinhRequest.sdtPhuHuynh,
      ngheNghiepPhuHuynh: hocSinhRequest.ngheNghiepPhuHuynh,
      emailPhuHuynh: hocSinhRequest.emailPhuHuynh,
      diaChiPhuHuynh: hocSinhRequest.diaChiPhuHuynh,
    };

    return this.httpClient.put<HocSinh>(
      this.baseApiUrl + '/HocSinhs/' + maHocSinh,
      updatetHocSinhRequest
    );
  }

  deleteHocSinh(maHocSinh: number): Observable<HocSinh> {
    return this.httpClient.delete<HocSinh>(
      this.baseApiUrl + '/HocSinhs/' + maHocSinh
    );
  }
  //#endregion

  // //#region Thuoc so giun
  // public newThuocSoGiun: ThuocSoGiun = {
  //   maThuocSoGiun: 0,
  //   tenThuocSoGiun: '',
  //   ghiChu: '',
  // };
  // public getThuocSoGiuns(): Observable<ThuocSoGiun[]> {
  //   const url = `${this.REST_API_SERVER}/ThuocSoGiuns`;
  //   return this.httpClient.get<ThuocSoGiun[]>(url, this.httpOptions);
  // }

  // public postThuocSoGiun(data: ThuocSoGiun): Observable<ThuocSoGiun> {
  //   const url = `${this.REST_API_SERVER}/ThuocSoGiuns`;
  //   return this.httpClient.post<ThuocSoGiun>(url, data, this.httpOptions);
  // }

  // public putThuocSoGiun(
  //   ma: number,
  //   data: ThuocSoGiun
  // ): Observable<ThuocSoGiun> {
  //   const url = `${this.REST_API_SERVER}/ThuocSoGiuns/${ma}`;
  //   return this.httpClient.put<ThuocSoGiun>(url, data, this.httpOptions);
  // }

  // public deleteThuocSoGiun(ma: number): Observable<ThuocSoGiun> {
  //   const url = `${this.REST_API_SERVER}/ThuocSoGiuns/${ma}`;
  //   return this.httpClient.delete<ThuocSoGiun>(url, this.httpOptions);
  // }
  // //#endregion

  //#region Loai nhan su
  public newLoaiNhanSu: LoaiNhanSu = {
    maLoaiNhanSu: 0,
    tenLoaiNhanSu: '',
    ghiChu: '',
  };
  public getLoaiNhanSus(): Observable<LoaiNhanSu[]> {
    const url = `${this.REST_API_SERVER}/LoaiNhanSus`;
    return this.httpClient.get<LoaiNhanSu[]>(url, this.httpOptions);
  }

  public postLoaiNhanSu(data: LoaiNhanSu): Observable<LoaiNhanSu> {
    const url = `${this.REST_API_SERVER}/LoaiNhanSus`;
    return this.httpClient.post<LoaiNhanSu>(url, data, this.httpOptions);
  }

  public putLoaiNhanSu(ma: number, data: LoaiNhanSu): Observable<LoaiNhanSu> {
    const url = `${this.REST_API_SERVER}/LoaiNhanSus/${ma}`;
    return this.httpClient.put<LoaiNhanSu>(url, data, this.httpOptions);
  }

  public deleteLoaiNhanSu(ma: number): Observable<LoaiNhanSu> {
    const url = `${this.REST_API_SERVER}/LoaiNhanSus/${ma}`;
    return this.httpClient.delete<LoaiNhanSu>(url, this.httpOptions);
  }
  //#endregion

  //#region Chuc vu
  public newChucVu: ChucVu = {
    maChucVu: 0,
    tenChucVu: '',
    ghiChu: '',
    maLoaiNhanSu: 0,
    loaiNhanSu: this.newLoaiNhanSu,
  };
  getChucVus(): Observable<ChucVu[]> {
    return this.httpClient.get<ChucVu[]>(this.baseApiUrl + '/ChucVus');
  }

  getChucVusByLoaiNhanSu(maLoaiNhanSu: number): Observable<ChucVu[]> {
    return this.httpClient.get<ChucVu[]>(
      this.baseApiUrl + '/ChucVus/LoaiNhanSu/' + maLoaiNhanSu
    );
  }

  updateChucVu(maChucVu: number, chucVuRequest: ChucVu): Observable<ChucVu> {
    const updateChucVutRequest: AUChucVuRequest = {
      tenChucVu: chucVuRequest.tenChucVu,
      ghiChu: chucVuRequest.ghiChu,
      maLoaiNhanSu: chucVuRequest.maLoaiNhanSu,
    };

    return this.httpClient.put<ChucVu>(
      this.baseApiUrl + '/ChucVus/' + maChucVu,
      updateChucVutRequest
    );
  }

  deleteChucVu(maChucVu: number): Observable<ChucVu> {
    return this.httpClient.delete<ChucVu>(
      this.baseApiUrl + '/ChucVus/' + maChucVu
    );
  }

  addChucVu(chucVuRequest: ChucVu): Observable<ChucVu> {
    const addChucVuRequest: AUChucVuRequest = {
      tenChucVu: chucVuRequest.tenChucVu,
      ghiChu: chucVuRequest.ghiChu,
      maLoaiNhanSu: chucVuRequest.maLoaiNhanSu,
    };

    return this.httpClient.post<ChucVu>(
      this.baseApiUrl + '/ChucVus',
      addChucVuRequest
    );
  }

  //#endregion

  //#region Nhan su
  public newNhanSu: NhanSu = {
    maNhanSu: 0,
    ho: '',
    ten: '',
    maGioiTinh: '',
    ngaySinh: new Date(),
    noiSinh: '',
    cmnd: '',
    ngayCap: new Date(),
    maDanToc: '',
    maTonGiao: '',
    maQuocTich: '',
    ngayVaoTruong: new Date(),
    maPhongBan: 0,
    maTrangThaiLamViec: '',
    lyDoThoiViec: null,
    ngayCapNhat: new Date(),
    maLoaiNhanSu: 0,
    maChucVu: null,
    maKhoiLop: null,
    soDienThoai: null,
    email: null,
    hoKhau: null,
    diaChi: null,
    hinhAnh: null,
    matKhau: '',
    maTrangThaiTaiKhoan: '',
    phongBan: this.newPhongBan,
    loaiNhanSu: this.newLoaiNhanSu,
    chucVu: this.newChucVu,
    khoiLop: this.newKhoiLop,
    gioiTinh: this.newGioiTinh,
    danToc: this.newDanToc,
    tonGiao: this.newTonGiao,
    quocTich: this.newQuocGia,
    trangThaiLamViec: this.newTrangThaiLamViec,
    trangThaiTaiKhoan: this.newTrangThaiTaiKhoan,
  };
  getNhanSus(): Observable<NhanSu[]> {
    return this.httpClient.get<NhanSu[]>(this.baseApiUrl + '/NhanSus');
  }

  getNhanSu(maNhanSu: number): Observable<NhanSu> {
    return this.httpClient.get<NhanSu>(
      this.baseApiUrl + '/NhanSus/' + maNhanSu
    );
  }

  addNhanSu(nhanSuRequest: NhanSu): Observable<NhanSu> {
    const addNhanSuRequest: AddNhanSuRequest = {
      ho: nhanSuRequest.ho,
      ten: nhanSuRequest.ten,
      maGioiTinh: nhanSuRequest.maGioiTinh,
      ngaySinh: nhanSuRequest.ngaySinh,
      noiSinh: nhanSuRequest.noiSinh,
      cmnd: nhanSuRequest.cmnd,
      ngayCap: nhanSuRequest.ngayCap,
      maDanToc: nhanSuRequest.maDanToc,
      maTonGiao: nhanSuRequest.maTonGiao,
      maQuocTich: nhanSuRequest.maQuocTich,
      ngayVaoTruong: nhanSuRequest.ngayVaoTruong,
      maPhongBan: nhanSuRequest.maPhongBan,
      maTrangThaiLamViec: nhanSuRequest.maTrangThaiLamViec,
      lyDoThoiViec: nhanSuRequest.lyDoThoiViec,
      ngayCapNhat: nhanSuRequest.ngayCapNhat,
      maLoaiNhanSu: nhanSuRequest.maLoaiNhanSu,
      maChucVu: nhanSuRequest.maChucVu,
      maKhoiLop: nhanSuRequest.maKhoiLop,
      soDienThoai: nhanSuRequest.soDienThoai,
      email: nhanSuRequest.email,
      hoKhau: nhanSuRequest.hoKhau,
      diaChi: nhanSuRequest.diaChi,
      matKhau: nhanSuRequest.matKhau,
      maTrangThaiTaiKhoan: nhanSuRequest.maTrangThaiTaiKhoan,
    };

    return this.httpClient.post<NhanSu>(
      this.baseApiUrl + '/NhanSus',
      addNhanSuRequest
    );
  }
  updateNhanSu(maNhanSu: number, nhanSuRequest: NhanSu): Observable<NhanSu> {
    const updateNhanSuRequest: UpdateNhanSuRequest = {
      ho: nhanSuRequest.ho,
      ten: nhanSuRequest.ten,
      maGioiTinh: nhanSuRequest.maGioiTinh,
      ngaySinh: nhanSuRequest.ngaySinh,
      noiSinh: nhanSuRequest.noiSinh,
      cmnd: nhanSuRequest.cmnd,
      ngayCap: nhanSuRequest.ngayCap,
      maDanToc: nhanSuRequest.maDanToc,
      maTonGiao: nhanSuRequest.maTonGiao,
      maQuocTich: nhanSuRequest.maQuocTich,
      ngayVaoTruong: nhanSuRequest.ngayVaoTruong,
      maPhongBan: nhanSuRequest.maPhongBan,
      maTrangThaiLamViec: nhanSuRequest.maTrangThaiLamViec,
      lyDoThoiViec: nhanSuRequest.lyDoThoiViec,
      ngayCapNhat: nhanSuRequest.ngayCapNhat,
      maLoaiNhanSu: nhanSuRequest.maLoaiNhanSu,
      maChucVu: nhanSuRequest.maChucVu,
      maKhoiLop: nhanSuRequest.maKhoiLop,
      soDienThoai: nhanSuRequest.soDienThoai,
      email: nhanSuRequest.email,
      hoKhau: nhanSuRequest.hoKhau,
      diaChi: nhanSuRequest.diaChi,
    };

    return this.httpClient.put<NhanSu>(
      this.baseApiUrl + '/NhanSus/' + maNhanSu,
      updateNhanSuRequest
    );
  }

  deleteNhanSu(maNhanSu: number): Observable<NhanSu> {
    return this.httpClient.delete<NhanSu>(
      this.baseApiUrl + '/NhanSus/' + maNhanSu
    );
  }

  nhanSuDangNhap(val: any): Observable<number> {
    return this.httpClient.post<number>(
      this.baseApiUrl + '/NhanSus/DangNhap',
      val
    );
  }
  //#endregion

  //#region Vaccine
  newVaccine: Vaccine = {
    maVaccine: 0,
    tenVaccine: '',
    ghiChu: '',
  };
  getVaccines(): Observable<Vaccine[]> {
    return this.httpClient.get<Vaccine[]>(this.baseApiUrl + '/Vaccines');
  }

  updateVaccine(
    maVaccine: number,
    vaccineRequest: Vaccine
  ): Observable<Vaccine> {
    const updateVaccineRequest: AUVaccineRequest = {
      tenVaccine: vaccineRequest.tenVaccine,
      ghiChu: vaccineRequest.ghiChu,
    };

    return this.httpClient.put<Vaccine>(
      this.baseApiUrl + '/Vaccines/' + maVaccine,
      updateVaccineRequest
    );
  }

  deleteVaccine(maVaccine: number): Observable<Vaccine> {
    return this.httpClient.delete<Vaccine>(
      this.baseApiUrl + '/Vaccines/' + maVaccine
    );
  }

  addVaccine(vaccineRequest: Vaccine): Observable<Vaccine> {
    const addVaccineRequest: AUVaccineRequest = {
      tenVaccine: vaccineRequest.tenVaccine,
      ghiChu: vaccineRequest.ghiChu,
    };

    return this.httpClient.post<Vaccine>(
      this.baseApiUrl + '/Vaccines',
      addVaccineRequest
    );
  }
  //#endregion

  //#region Thuoc so giun
  newThuocSoGiun: ThuocSoGiun = {
    maThuocSoGiun: 0,
    tenThuocSoGiun: '',
    ghiChu: '',
  };
  getThuocSoGiuns(): Observable<ThuocSoGiun[]> {
    return this.httpClient.get<ThuocSoGiun[]>(
      this.baseApiUrl + '/ThuocSoGiuns'
    );
  }

  updateThuocSoGiun(
    maThuocSoGiun: number,
    thuocSoGiunRequest: ThuocSoGiun
  ): Observable<ThuocSoGiun> {
    const updateThuocSoGiunRequest: AUThuocSoGiunRequest = {
      tenThuocSoGiun: thuocSoGiunRequest.tenThuocSoGiun,
      ghiChu: thuocSoGiunRequest.ghiChu,
    };

    return this.httpClient.put<ThuocSoGiun>(
      this.baseApiUrl + '/ThuocSoGiuns/' + maThuocSoGiun,
      updateThuocSoGiunRequest
    );
  }

  deleteThuocSoGiun(maThuocSoGiun: number): Observable<ThuocSoGiun> {
    return this.httpClient.delete<ThuocSoGiun>(
      this.baseApiUrl + '/ThuocSoGiuns/' + maThuocSoGiun
    );
  }

  addThuocSoGiun(thuocSoGiunRequest: ThuocSoGiun): Observable<ThuocSoGiun> {
    const addThuocSoGiunRequest: AUThuocSoGiunRequest = {
      tenThuocSoGiun: thuocSoGiunRequest.tenThuocSoGiun,
      ghiChu: thuocSoGiunRequest.ghiChu,
    };

    return this.httpClient.post<ThuocSoGiun>(
      this.baseApiUrl + '/ThuocSoGiuns',
      addThuocSoGiunRequest
    );
  }
  //#endregion

  //#region Vitamin
  newVitamin: Vitamin = {
    maVitamin: 0,
    tenVitamin: '',
    ghiChu: '',
  };
  getVitamins(): Observable<Vitamin[]> {
    return this.httpClient.get<Vitamin[]>(this.baseApiUrl + '/Vitamins');
  }

  updateVitamin(
    maVitamin: number,
    vitaminRequest: Vitamin
  ): Observable<Vitamin> {
    const updateVitaminRequest: AUVitaminRequest = {
      tenVitamin: vitaminRequest.tenVitamin,
      ghiChu: vitaminRequest.ghiChu,
    };

    return this.httpClient.put<Vitamin>(
      this.baseApiUrl + '/Vitamins/' + maVitamin,
      updateVitaminRequest
    );
  }

  deleteVitamin(maVitamin: number): Observable<Vitamin> {
    return this.httpClient.delete<Vitamin>(
      this.baseApiUrl + '/Vitamins/' + maVitamin
    );
  }

  addVitamin(vitaminRequest: Vitamin): Observable<Vitamin> {
    const addVitaminRequest: AUVitaminRequest = {
      tenVitamin: vitaminRequest.tenVitamin,
      ghiChu: vitaminRequest.ghiChu,
    };

    return this.httpClient.post<Vitamin>(
      this.baseApiUrl + '/Vitamins',
      addVitaminRequest
    );
  }
  //#endregion

  //#region Dot tiem vaccine
  public newDotTiemVaccine: DotTiemVaccine = {
    maDotTiemVaccine: 0,
    tenDotTiemVaccine: '',
    ngayTiemVaccine: new Date(),
    maVaccine: 0,
    maNienHoc: 0,
    vaccine: this.newVaccine,
    nienHoc: this.newNienHoc,
  };
  getDotTiemVaccines(): Observable<DotTiemVaccine[]> {
    return this.httpClient.get<DotTiemVaccine[]>(
      this.baseApiUrl + '/DotTiemVaccines'
    );
  }

  getDotTiemVaccinesByNienHoc(maNienHoc: number): Observable<DotTiemVaccine[]> {
    return this.httpClient.get<DotTiemVaccine[]>(
      this.baseApiUrl + '/DotTiemVaccines/NienHoc/' + maNienHoc
    );
  }

  updateDotTiemVaccine(
    maDotTiemVaccine: number,
    dotTiemVaccineRequest: DotTiemVaccine
  ): Observable<DotTiemVaccine> {
    const updateDotTiemVaccineRequest: AUDotTiemVaccineRequest = {
      tenDotTiemVaccine: dotTiemVaccineRequest.tenDotTiemVaccine,
      ngayTiemVaccine: dotTiemVaccineRequest.ngayTiemVaccine,
      maVaccine: dotTiemVaccineRequest.maVaccine,
      maNienHoc: dotTiemVaccineRequest.maNienHoc,
    };

    return this.httpClient.put<DotTiemVaccine>(
      this.baseApiUrl + '/DotTiemVaccines/' + maDotTiemVaccine,
      updateDotTiemVaccineRequest
    );
  }

  deleteDotTiemVaccine(maDotTiemVaccine: number): Observable<DotTiemVaccine> {
    return this.httpClient.delete<DotTiemVaccine>(
      this.baseApiUrl + '/DotTiemVaccines/' + maDotTiemVaccine
    );
  }

  addDotTiemVaccine(
    dotTiemVaccineRequest: DotTiemVaccine
  ): Observable<DotTiemVaccine> {
    const addDotTiemVaccineRequest: AUDotTiemVaccineRequest = {
      tenDotTiemVaccine: dotTiemVaccineRequest.tenDotTiemVaccine,
      ngayTiemVaccine: dotTiemVaccineRequest.ngayTiemVaccine,
      maVaccine: dotTiemVaccineRequest.maVaccine,
      maNienHoc: dotTiemVaccineRequest.maNienHoc,
    };

    return this.httpClient.post<DotTiemVaccine>(
      this.baseApiUrl + '/DotTiemVaccines',
      addDotTiemVaccineRequest
    );
  }
  //#endregion

  //#region Dot so giun
  public newDotSoGiun: DotSoGiun = {
    maDotSoGiun: 0,
    tenDotSoGiun: '',
    ngaySoGiun: new Date(),
    maThuocSoGiun: 0,
    maNienHoc: 0,
    thuocSoGiun: this.newThuocSoGiun,
    nienHoc: this.newNienHoc,
  };
  getDotSoGiuns(): Observable<DotSoGiun[]> {
    return this.httpClient.get<DotSoGiun[]>(this.baseApiUrl + '/DotSoGiuns');
  }

  getDotSoGiunsByNienHoc(maNienHoc: number): Observable<DotSoGiun[]> {
    return this.httpClient.get<DotSoGiun[]>(
      this.baseApiUrl + '/DotSoGiuns/NienHoc/' + maNienHoc
    );
  }

  updateDotSoGiun(
    maDotSoGiun: number,
    dotSoGiunRequest: DotSoGiun
  ): Observable<DotSoGiun> {
    const updateDotSoGiunRequest: AUDotSoGiunRequest = {
      tenDotSoGiun: dotSoGiunRequest.tenDotSoGiun,
      ngaySoGiun: dotSoGiunRequest.ngaySoGiun,
      maThuocSoGiun: dotSoGiunRequest.maThuocSoGiun,
      maNienHoc: dotSoGiunRequest.maNienHoc,
    };

    return this.httpClient.put<DotSoGiun>(
      this.baseApiUrl + '/DotSoGiuns/' + maDotSoGiun,
      updateDotSoGiunRequest
    );
  }

  deleteDotSoGiun(maDotSoGiun: number): Observable<DotSoGiun> {
    return this.httpClient.delete<DotSoGiun>(
      this.baseApiUrl + '/DotSoGiuns/' + maDotSoGiun
    );
  }

  addDotSoGiun(dotSoGiunRequest: DotSoGiun): Observable<DotSoGiun> {
    const addDotSoGiunRequest: AUDotSoGiunRequest = {
      tenDotSoGiun: dotSoGiunRequest.tenDotSoGiun,
      ngaySoGiun: dotSoGiunRequest.ngaySoGiun,
      maThuocSoGiun: dotSoGiunRequest.maThuocSoGiun,
      maNienHoc: dotSoGiunRequest.maNienHoc,
    };

    return this.httpClient.post<DotSoGiun>(
      this.baseApiUrl + '/DotSoGiuns',
      addDotSoGiunRequest
    );
  }
  //#endregion

  //#region Dot uong vitamin
  public newDotUongVitamin: DotUongVitamin = {
    maDotUongVitamin: 0,
    tenDotUongVitamin: '',
    ngayUongVitamin: new Date(),
    maVitamin: 0,
    maNienHoc: 0,
    vitamin: this.newVitamin,
    nienHoc: this.newNienHoc,
  };
  getDotUongVitamins(): Observable<DotUongVitamin[]> {
    return this.httpClient.get<DotUongVitamin[]>(
      this.baseApiUrl + '/DotUongVitamins'
    );
  }

  getDotUongVitaminsByNienHoc(maNienHoc: number): Observable<DotUongVitamin[]> {
    return this.httpClient.get<DotUongVitamin[]>(
      this.baseApiUrl + '/DotUongVitamins/NienHoc/' + maNienHoc
    );
  }

  updateDotUongVitamin(
    maDotUongVitamin: number,
    dotUongVitaminRequest: DotUongVitamin
  ): Observable<DotUongVitamin> {
    const updateDotUongVitaminRequest: AUDotUongVitaminRequest = {
      tenDotUongVitamin: dotUongVitaminRequest.tenDotUongVitamin,
      ngayUongVitamin: dotUongVitaminRequest.ngayUongVitamin,
      maVitamin: dotUongVitaminRequest.maVitamin,
      maNienHoc: dotUongVitaminRequest.maNienHoc,
    };

    return this.httpClient.put<DotUongVitamin>(
      this.baseApiUrl + '/DotUongVitamins/' + maDotUongVitamin,
      updateDotUongVitaminRequest
    );
  }

  deleteDotUongVitamin(maDotUongVitamin: number): Observable<DotUongVitamin> {
    return this.httpClient.delete<DotUongVitamin>(
      this.baseApiUrl + '/DotUongVitamins/' + maDotUongVitamin
    );
  }

  addDotUongVitamin(
    dotUongVitaminRequest: DotUongVitamin
  ): Observable<DotUongVitamin> {
    const addDotUongVitaminRequest: AUDotUongVitaminRequest = {
      tenDotUongVitamin: dotUongVitaminRequest.tenDotUongVitamin,
      ngayUongVitamin: dotUongVitaminRequest.ngayUongVitamin,
      maVitamin: dotUongVitaminRequest.maVitamin,
      maNienHoc: dotUongVitaminRequest.maNienHoc,
    };

    return this.httpClient.post<DotUongVitamin>(
      this.baseApiUrl + '/DotUongVitamins',
      addDotUongVitaminRequest
    );
  }
  //#endregion

  //#region Dot kham suc khoe
  public newDotKhamSucKhoe: DotKhamSucKhoe = {
    maDotKhamSucKhoe: 0,
    tenDotKhamSucKhoe: '',
    ngayKhamSucKhoe: new Date(),
    maNienHoc: 0,
    nienHoc: this.newNienHoc,
  };
  getDotKhamSucKhoes(): Observable<DotKhamSucKhoe[]> {
    return this.httpClient.get<DotKhamSucKhoe[]>(
      this.baseApiUrl + '/DotKhamSucKhoes'
    );
  }

  getDotKhamSucKhoesByNienHoc(maNienHoc: number): Observable<DotKhamSucKhoe[]> {
    return this.httpClient.get<DotKhamSucKhoe[]>(
      this.baseApiUrl + '/DotKhamSucKhoes/NienHoc/' + maNienHoc
    );
  }

  updateDotKhamSucKhoe(
    maDotKhamSucKhoe: number,
    dotKhamSucKhoeRequest: DotKhamSucKhoe
  ): Observable<DotKhamSucKhoe> {
    const updateDotKhamSucKhoeRequest: AUDotKhamSucKhoeRequest = {
      tenDotKhamSucKhoe: dotKhamSucKhoeRequest.tenDotKhamSucKhoe,
      ngayKhamSucKhoe: dotKhamSucKhoeRequest.ngayKhamSucKhoe,
      maNienHoc: dotKhamSucKhoeRequest.maNienHoc,
    };

    return this.httpClient.put<DotKhamSucKhoe>(
      this.baseApiUrl + '/DotKhamSucKhoes/' + maDotKhamSucKhoe,
      updateDotKhamSucKhoeRequest
    );
  }

  deleteDotKhamSucKhoe(maDotKhamSucKhoe: number): Observable<DotKhamSucKhoe> {
    return this.httpClient.delete<DotKhamSucKhoe>(
      this.baseApiUrl + '/DotKhamSucKhoes/' + maDotKhamSucKhoe
    );
  }

  addDotKhamSucKhoe(
    dotKhamSucKhoeRequest: DotKhamSucKhoe
  ): Observable<DotKhamSucKhoe> {
    const addDotKhamSucKhoeRequest: AUDotKhamSucKhoeRequest = {
      tenDotKhamSucKhoe: dotKhamSucKhoeRequest.tenDotKhamSucKhoe,
      ngayKhamSucKhoe: dotKhamSucKhoeRequest.ngayKhamSucKhoe,
      maNienHoc: dotKhamSucKhoeRequest.maNienHoc,
    };

    return this.httpClient.post<DotKhamSucKhoe>(
      this.baseApiUrl + '/DotKhamSucKhoes',
      addDotKhamSucKhoeRequest
    );
  }
  //#endregion

  //#region Phieu tiem vaccine
  public newPhieuTiemVaccine: PhieuTiemVaccine = {
    maPhieuTiemVaccine: 0,
    maDotTiemVaccine: 0,
    maHocSinh: 0,
    trangThai: '',
    dotTiemVaccine: this.newDotTiemVaccine,
    hocSinh: this.newHocSinh,
  };
  getPhieuTiemVaccines(): Observable<PhieuTiemVaccine[]> {
    return this.httpClient.get<PhieuTiemVaccine[]>(
      this.baseApiUrl + '/PhieuTiemVaccines'
    );
  }

  getPhieuTiemVaccinesByNienHoc(
    maNienHoc: number
  ): Observable<PhieuTiemVaccine[]> {
    return this.httpClient.get<PhieuTiemVaccine[]>(
      this.baseApiUrl + '/PhieuTiemVaccines/NienHoc/' + maNienHoc
    );
  }

  updatePhieuTiemVaccine(
    maPhieuTiemVaccine: number,
    phieuTiemVaccineRequest: PhieuTiemVaccine
  ): Observable<PhieuTiemVaccine> {
    const updatePhieuTiemVaccineRequest: AUPhieuTiemVaccineRequest = {
      maDotTiemVaccine: phieuTiemVaccineRequest.maDotTiemVaccine,
      maHocSinh: phieuTiemVaccineRequest.maHocSinh,
      trangThai: phieuTiemVaccineRequest.trangThai,
    };

    return this.httpClient.put<PhieuTiemVaccine>(
      this.baseApiUrl + '/PhieuTiemVaccines/' + maPhieuTiemVaccine,
      updatePhieuTiemVaccineRequest
    );
  }

  deletePhieuTiemVaccine(
    maPhieuTiemVaccine: number
  ): Observable<PhieuTiemVaccine> {
    return this.httpClient.delete<PhieuTiemVaccine>(
      this.baseApiUrl + '/PhieuTiemVaccines/' + maPhieuTiemVaccine
    );
  }

  addPhieuTiemVaccine(
    phieuTiemVaccineRequest: PhieuTiemVaccine
  ): Observable<PhieuTiemVaccine> {
    const addPhieuTiemVaccineRequest: AUPhieuTiemVaccineRequest = {
      maDotTiemVaccine: phieuTiemVaccineRequest.maDotTiemVaccine,
      maHocSinh: phieuTiemVaccineRequest.maHocSinh,
      trangThai: phieuTiemVaccineRequest.trangThai,
    };

    return this.httpClient.post<PhieuTiemVaccine>(
      this.baseApiUrl + '/PhieuTiemVaccines',
      addPhieuTiemVaccineRequest
    );
  }
  //#endregion

  //#region Phieu so giun
  public newPhieuSoGiun: PhieuSoGiun = {
    maPhieuSoGiun: 0,
    maDotSoGiun: 0,
    maHocSinh: 0,
    trangThai: '',
    dotSoGiun: this.newDotSoGiun,
    hocSinh: this.newHocSinh,
  };
  getPhieuSoGiuns(): Observable<PhieuSoGiun[]> {
    return this.httpClient.get<PhieuSoGiun[]>(
      this.baseApiUrl + '/PhieuSoGiuns'
    );
  }

  getPhieuSoGiunsByNienHoc(maNienHoc: number): Observable<PhieuSoGiun[]> {
    return this.httpClient.get<PhieuSoGiun[]>(
      this.baseApiUrl + '/PhieuSoGiuns/NienHoc/' + maNienHoc
    );
  }

  updatePhieuSoGiun(
    maPhieuSoGiun: number,
    phieuSoGiunRequest: PhieuSoGiun
  ): Observable<PhieuSoGiun> {
    const updatePhieuSoGiunRequest: AUPhieuSoGiunRequest = {
      maDotSoGiun: phieuSoGiunRequest.maDotSoGiun,
      maHocSinh: phieuSoGiunRequest.maHocSinh,
      trangThai: phieuSoGiunRequest.trangThai,
    };

    return this.httpClient.put<PhieuSoGiun>(
      this.baseApiUrl + '/PhieuSoGiuns/' + maPhieuSoGiun,
      updatePhieuSoGiunRequest
    );
  }

  deletePhieuSoGiun(maPhieuSoGiun: number): Observable<PhieuSoGiun> {
    return this.httpClient.delete<PhieuSoGiun>(
      this.baseApiUrl + '/PhieuSoGiuns/' + maPhieuSoGiun
    );
  }

  addPhieuSoGiun(phieuSoGiunRequest: PhieuSoGiun): Observable<PhieuSoGiun> {
    const addPhieuSoGiunRequest: AUPhieuSoGiunRequest = {
      maDotSoGiun: phieuSoGiunRequest.maDotSoGiun,
      maHocSinh: phieuSoGiunRequest.maHocSinh,
      trangThai: phieuSoGiunRequest.trangThai,
    };

    return this.httpClient.post<PhieuSoGiun>(
      this.baseApiUrl + '/PhieuSoGiuns',
      addPhieuSoGiunRequest
    );
  }
  //#endregion

  //#region Phieu uong vitamin
  public newPhieuUongVitamin: PhieuUongVitamin = {
    maPhieuUongVitamin: 0,
    maDotUongVitamin: 0,
    maHocSinh: 0,
    trangThai: '',
    dotUongVitamin: this.newDotUongVitamin,
    hocSinh: this.newHocSinh,
  };
  getPhieuUongVitamins(): Observable<PhieuUongVitamin[]> {
    return this.httpClient.get<PhieuUongVitamin[]>(
      this.baseApiUrl + '/PhieuUongVitamins'
    );
  }

  getPhieuUongVitaminsByNienHoc(
    maNienHoc: number
  ): Observable<PhieuUongVitamin[]> {
    return this.httpClient.get<PhieuUongVitamin[]>(
      this.baseApiUrl + '/PhieuUongVitamins/NienHoc/' + maNienHoc
    );
  }

  updatePhieuUongVitamin(
    maPhieuUongVitamin: number,
    phieuUongVitaminRequest: PhieuUongVitamin
  ): Observable<PhieuUongVitamin> {
    const updatePhieuUongVitaminRequest: AUPhieuUongVitaminRequest = {
      maDotUongVitamin: phieuUongVitaminRequest.maDotUongVitamin,
      maHocSinh: phieuUongVitaminRequest.maHocSinh,
      trangThai: phieuUongVitaminRequest.trangThai,
    };

    return this.httpClient.put<PhieuUongVitamin>(
      this.baseApiUrl + '/PhieuUongVitamins/' + maPhieuUongVitamin,
      updatePhieuUongVitaminRequest
    );
  }

  deletePhieuUongVitamin(
    maPhieuUongVitamin: number
  ): Observable<PhieuUongVitamin> {
    return this.httpClient.delete<PhieuUongVitamin>(
      this.baseApiUrl + '/PhieuUongVitamins/' + maPhieuUongVitamin
    );
  }

  addPhieuUongVitamin(
    phieuUongVitaminRequest: PhieuUongVitamin
  ): Observable<PhieuUongVitamin> {
    const addPhieuUongVitaminRequest: AUPhieuUongVitaminRequest = {
      maDotUongVitamin: phieuUongVitaminRequest.maDotUongVitamin,
      maHocSinh: phieuUongVitaminRequest.maHocSinh,
      trangThai: phieuUongVitaminRequest.trangThai,
    };

    return this.httpClient.post<PhieuUongVitamin>(
      this.baseApiUrl + '/PhieuUongVitamins',
      addPhieuUongVitaminRequest
    );
  }
  //#endregion

  //#region Phieu kham suc khoe
  public newPhieuKhamSucKhoe: PhieuKhamSucKhoe = {
    maPhieuKhamSucKhoe: 0,
    maDotKhamSucKhoe: 0,
    ketLuan: '',
    maHocSinh: 0,
    chieuCao: 0,
    canNang: 0,
    BMI: 0,
    nhipTim: 0,
    tamThu: 0,
    tamTruong: 0,
    loaiTheLuc: '',
    tuanHoan: '',
    hoHap: '',
    tieuHoa: '',
    thanTietNieu: '',
    thanKinhTamThan: '',
    lamSangKhac: '',
    matPhaiKhongKinh: 0,
    matTraiKhongKinh: 0,
    matPhaiCoKinh: 0,
    matTraiCoKinh: 0,
    cacBenhVeMat: '',
    taiTraiNoiThuong: 0,
    taiTraiNoiTham: 0,
    taiPhaiNoiThuong: 0,
    taiPhaiNoiTham: 0,
    cacBenhTaiMuiHong: '',
    hamTren: '',
    hamDuoi: '',
    cacBenhRangHamMat: '',
    dotKhamSucKhoe: this.newDotKhamSucKhoe,
    hocSinh: this.newHocSinh,
  };
  getPhieuKhamSucKhoes(): Observable<PhieuKhamSucKhoe[]> {
    return this.httpClient.get<PhieuKhamSucKhoe[]>(
      this.baseApiUrl + '/PhieuKhamSucKhoes'
    );
  }

  getPhieuKhamSucKhoesByNienHoc(
    maNienHoc: number
  ): Observable<PhieuKhamSucKhoe[]> {
    return this.httpClient.get<PhieuKhamSucKhoe[]>(
      this.baseApiUrl + '/PhieuKhamSucKhoes/NienHoc/' + maNienHoc
    );
  }

  updatePhieuKhamSucKhoe(
    maPhieuKhamSucKhoe: number,
    phieuKhamSucKhoeRequest: PhieuKhamSucKhoe
  ): Observable<PhieuKhamSucKhoe> {
    const updatePhieuKhamSucKhoeRequest: AUPhieuKhamSucKhoeRequest = {
      maDotKhamSucKhoe: phieuKhamSucKhoeRequest.maDotKhamSucKhoe,
      ketLuan: phieuKhamSucKhoeRequest.ketLuan,
      maHocSinh: phieuKhamSucKhoeRequest.maHocSinh,
      chieuCao: phieuKhamSucKhoeRequest.chieuCao,
      canNang: phieuKhamSucKhoeRequest.canNang,
      BMI: phieuKhamSucKhoeRequest.BMI,
      nhipTim: phieuKhamSucKhoeRequest.nhipTim,
      tamThu: phieuKhamSucKhoeRequest.tamThu,
      tamTruong: phieuKhamSucKhoeRequest.tamTruong,
      loaiTheLuc: phieuKhamSucKhoeRequest.loaiTheLuc,
      tuanHoan: phieuKhamSucKhoeRequest.tuanHoan,
      hoHap: phieuKhamSucKhoeRequest.hoHap,
      tieuHoa: phieuKhamSucKhoeRequest.tieuHoa,
      thanTietNieu: phieuKhamSucKhoeRequest.thanTietNieu,
      thanKinhTamThan: phieuKhamSucKhoeRequest.thanKinhTamThan,
      lamSangKhac: phieuKhamSucKhoeRequest.lamSangKhac,
      matPhaiKhongKinh: phieuKhamSucKhoeRequest.matPhaiKhongKinh,
      matTraiKhongKinh: phieuKhamSucKhoeRequest.matTraiKhongKinh,
      matPhaiCoKinh: phieuKhamSucKhoeRequest.matPhaiCoKinh,
      matTraiCoKinh: phieuKhamSucKhoeRequest.matTraiCoKinh,
      cacBenhVeMat: phieuKhamSucKhoeRequest.cacBenhVeMat,
      taiTraiNoiThuong: phieuKhamSucKhoeRequest.taiTraiNoiThuong,
      taiTraiNoiTham: phieuKhamSucKhoeRequest.taiTraiNoiTham,
      taiPhaiNoiThuong: phieuKhamSucKhoeRequest.taiPhaiNoiThuong,
      taiPhaiNoiTham: phieuKhamSucKhoeRequest.taiPhaiNoiTham,
      cacBenhTaiMuiHong: phieuKhamSucKhoeRequest.cacBenhTaiMuiHong,
      hamTren: phieuKhamSucKhoeRequest.hamTren,
      hamDuoi: phieuKhamSucKhoeRequest.hamDuoi,
      cacBenhRangHamMat: phieuKhamSucKhoeRequest.cacBenhRangHamMat,
    };

    return this.httpClient.put<PhieuKhamSucKhoe>(
      this.baseApiUrl + '/PhieuKhamSucKhoes/' + maPhieuKhamSucKhoe,
      updatePhieuKhamSucKhoeRequest
    );
  }

  deletePhieuKhamSucKhoe(
    maPhieuKhamSucKhoe: number
  ): Observable<PhieuKhamSucKhoe> {
    return this.httpClient.delete<PhieuKhamSucKhoe>(
      this.baseApiUrl + '/PhieuKhamSucKhoes/' + maPhieuKhamSucKhoe
    );
  }

  addPhieuKhamSucKhoe(
    phieuKhamSucKhoeRequest: PhieuKhamSucKhoe
  ): Observable<PhieuKhamSucKhoe> {
    const addPhieuKhamSucKhoeRequest: AUPhieuKhamSucKhoeRequest = {
      maDotKhamSucKhoe: phieuKhamSucKhoeRequest.maDotKhamSucKhoe,
      ketLuan: phieuKhamSucKhoeRequest.ketLuan,
      maHocSinh: phieuKhamSucKhoeRequest.maHocSinh,
      chieuCao: phieuKhamSucKhoeRequest.chieuCao,
      canNang: phieuKhamSucKhoeRequest.canNang,
      BMI: phieuKhamSucKhoeRequest.BMI,
      nhipTim: phieuKhamSucKhoeRequest.nhipTim,
      tamThu: phieuKhamSucKhoeRequest.tamThu,
      tamTruong: phieuKhamSucKhoeRequest.tamTruong,
      loaiTheLuc: phieuKhamSucKhoeRequest.loaiTheLuc,
      tuanHoan: phieuKhamSucKhoeRequest.tuanHoan,
      hoHap: phieuKhamSucKhoeRequest.hoHap,
      tieuHoa: phieuKhamSucKhoeRequest.tieuHoa,
      thanTietNieu: phieuKhamSucKhoeRequest.thanTietNieu,
      thanKinhTamThan: phieuKhamSucKhoeRequest.thanKinhTamThan,
      lamSangKhac: phieuKhamSucKhoeRequest.lamSangKhac,
      matPhaiKhongKinh: phieuKhamSucKhoeRequest.matPhaiKhongKinh,
      matTraiKhongKinh: phieuKhamSucKhoeRequest.matTraiKhongKinh,
      matPhaiCoKinh: phieuKhamSucKhoeRequest.matPhaiCoKinh,
      matTraiCoKinh: phieuKhamSucKhoeRequest.matTraiCoKinh,
      cacBenhVeMat: phieuKhamSucKhoeRequest.cacBenhVeMat,
      taiTraiNoiThuong: phieuKhamSucKhoeRequest.taiTraiNoiThuong,
      taiTraiNoiTham: phieuKhamSucKhoeRequest.taiTraiNoiTham,
      taiPhaiNoiThuong: phieuKhamSucKhoeRequest.taiPhaiNoiThuong,
      taiPhaiNoiTham: phieuKhamSucKhoeRequest.taiPhaiNoiTham,
      cacBenhTaiMuiHong: phieuKhamSucKhoeRequest.cacBenhTaiMuiHong,
      hamTren: phieuKhamSucKhoeRequest.hamTren,
      hamDuoi: phieuKhamSucKhoeRequest.hamDuoi,
      cacBenhRangHamMat: phieuKhamSucKhoeRequest.cacBenhRangHamMat,
    };

    return this.httpClient.post<PhieuKhamSucKhoe>(
      this.baseApiUrl + '/PhieuKhamSucKhoes',
      addPhieuKhamSucKhoeRequest
    );
  }
  //#endregion

  //#region Diem danh
  newDiemDanh: DiemDanh = {
    maDiemDanh: 0,
    ngayDiemDanh: new Date(),
    maHocSinh: 0,
    maTrangThaiDiemDanh: '',
    hocSinh: this.newHocSinh,
    trangThaiDiemDanh: this.newTrangThaiDiemDanh,
  };
  // getDiemDanhs(): Observable<DiemDanh[]> {
  //   return this.httpClient.get<DiemDanh[]>(
  //     this.baseApiUrl + '/DiemDanhs'
  //   );
  // }

  // getDiemDanhsByDate(from: string, to: string): Observable<DiemDanh[]> {
  //   return this.httpClient.get<DiemDanh[]>(
  //     this.baseApiUrl + '/DiemDanhs/from/' + from + '/to/' + to
  //   );
  // }

  getDiemDanhsByDateLopHoc(
    from: string,
    to: string,
    maLopHoc: number
  ): Observable<DiemDanh[]> {
    return this.httpClient.get<DiemDanh[]>(
      this.baseApiUrl +
        '/DiemDanhs/LopHoc/' +
        maLopHoc +
        '/from/' +
        from +
        '/to/' +
        to
    );
  }

  updateDiemDanh(
    maDiemDanh: number,
    diemDanhRequest: DiemDanh
  ): Observable<DiemDanh> {
    const updateDiemDanhRequest: UpdateDiemDanhRequest = {
      maTrangThaiDiemDanh: diemDanhRequest.maTrangThaiDiemDanh,
    };

    return this.httpClient.put<DiemDanh>(
      this.baseApiUrl + '/DiemDanhs/' + maDiemDanh,
      updateDiemDanhRequest
    );
  }

  deleteDiemDanh(maDiemDanh: number): Observable<DiemDanh> {
    return this.httpClient.delete<DiemDanh>(
      this.baseApiUrl + '/DiemDanhs/' + maDiemDanh
    );
  }

  addDiemDanh(diemDanhRequest: DiemDanh): Observable<DiemDanh> {
    const addDiemDanhRequest: AddDiemDanhRequest = {
      ngayDiemDanh: diemDanhRequest.ngayDiemDanh,
      maHocSinh: diemDanhRequest.maHocSinh,
      maTrangThaiDiemDanh: diemDanhRequest.maTrangThaiDiemDanh,
    };

    return this.httpClient.post<DiemDanh>(
      this.baseApiUrl + '/DiemDanhs',
      addDiemDanhRequest
    );
  }
  //#endregion

  //#region Danh muc thuc pham
  newDanhMucThucPham: DanhMucThucPham = {
    maDanhMuc: 0,
    tenDanhMuc: '',
    ghiChu: '',
  };

  getDanhMucThucPhams(): Observable<DanhMucThucPham[]> {
    return this.httpClient.get<DanhMucThucPham[]>(
      this.baseApiUrl + '/DanhMucThucPhams'
    );
  }
  //#endregion

  //#region Thuc pham
  newThucPham: ThucPham = {
    maThucPham: 0,
    tenThucPham: '',
    donViTinh: '',
    tonKho: 0,
    maDanhMuc: 0,
    danhMucThucPham: this.newDanhMucThucPham,
  };

  getThucPhams(): Observable<ThucPham[]> {
    return this.httpClient.get<ThucPham[]>(this.baseApiUrl + '/ThucPhams');
  }

  updateThucPham(
    maThucPham: number,
    thucPhamRequest: ThucPham
  ): Observable<ThucPham> {
    const updateThucPhamRequest: AUThucPhamRequest = {
      tenThucPham: thucPhamRequest.tenThucPham,
      donViTinh: thucPhamRequest.donViTinh,
      tonKho: thucPhamRequest.tonKho,
      maDanhMuc: thucPhamRequest.maDanhMuc,
    };

    return this.httpClient.put<ThucPham>(
      this.baseApiUrl + '/ThucPhams/' + maThucPham,
      updateThucPhamRequest
    );
  }

  deleteThucPham(maThucPham: number): Observable<ThucPham> {
    return this.httpClient.delete<ThucPham>(
      this.baseApiUrl + '/ThucPhams/' + maThucPham
    );
  }

  addThucPham(thucPhamRequest: ThucPham): Observable<ThucPham> {
    const addThucPhamRequest: AUThucPhamRequest = {
      tenThucPham: thucPhamRequest.tenThucPham,
      donViTinh: thucPhamRequest.donViTinh,
      tonKho: thucPhamRequest.tonKho,
      maDanhMuc: thucPhamRequest.maDanhMuc,
    };

    return this.httpClient.post<ThucPham>(
      this.baseApiUrl + '/ThucPhams',
      addThucPhamRequest
    );
  }

  tangSoLuong(maThucPham: number, soLuongTang: number): Observable<ThucPham> {
    return this.httpClient.put<ThucPham>(
      this.baseApiUrl +
        '/ThucPhams/' +
        maThucPham +
        '/TangSoLuong/' +
        soLuongTang,
      this.httpOptions
    );
  }

  giamSoLuong(maThucPham: number, soLuongGiam: number): Observable<ThucPham> {
    return this.httpClient.put<ThucPham>(
      this.baseApiUrl +
        '/ThucPhams/' +
        maThucPham +
        '/GiamSoLuong/' +
        soLuongGiam,
      this.httpOptions
    );
  }
  //#endregion

  //#region Phieu nhap thuc pham
  newPhieuNhapThucPham: PhieuNhapThucPham = {
    maPhieuNhapThucPham: 0,
    ngayNhap: new Date(),
    maNguoiNhap: 0,
    ghiChu: '',
    trangThai: '',
    nguoiNhap: this.newNhanSu,
  };

  getPhieuNhapThucPhams(): Observable<PhieuNhapThucPham[]> {
    return this.httpClient.get<PhieuNhapThucPham[]>(
      this.baseApiUrl + '/PhieuNhapThucPhams'
    );
  }

  addPhieuNhapThucPham(
    thucDonRequest: PhieuNhapThucPham
  ): Observable<PhieuNhapThucPham> {
    const addPhieuNhapThucPham: AddPhieuNhapThucPhamRequest = {
      ngayNhap: thucDonRequest.ngayNhap,
      maNguoiNhap: thucDonRequest.maNguoiNhap,
      ghiChu: thucDonRequest.ghiChu,
      trangThai: thucDonRequest.trangThai,
    };
    return this.httpClient.post<PhieuNhapThucPham>(
      this.baseApiUrl + '/PhieuNhapThucPhams',
      addPhieuNhapThucPham
    );
  }

  updatePhieuNhapThucPham(
    maPhieuNhapThucPham: number,
    thucDonRequest: PhieuNhapThucPham
  ): Observable<PhieuNhapThucPham> {
    const updatePhieuNhapThucPham: UpdatePhieuNhapThucPhamRequest = {
      ngayNhap: thucDonRequest.ngayNhap,
      maNguoiNhap: thucDonRequest.maNguoiNhap,
      ghiChu: thucDonRequest.ghiChu,
      trangThai: thucDonRequest.trangThai,
    };
    return this.httpClient.put<PhieuNhapThucPham>(
      this.baseApiUrl + '/PhieuNhapThucPhams/' + maPhieuNhapThucPham,
      updatePhieuNhapThucPham
    );
  }

  deletePhieuNhapThucPham(
    maPhieuNhapThucPham: number
  ): Observable<PhieuNhapThucPham> {
    return this.httpClient.delete<PhieuNhapThucPham>(
      this.baseApiUrl + '/PhieuNhapThucPhams/' + maPhieuNhapThucPham
    );
  }
  //#endregion

  //#region Chi tiet phieu nhap thuc pham
  newChiTietPhieuNhapThucPham: ChiTietPhieuNhapThucPham = {
    maPhieuNhapThucPham: 0,
    maThucPham: 0,
    donGia: 0,
    soLuong: 0,
    phieuNhapThucPham: this.newPhieuNhapThucPham,
    thucPham: this.newThucPham,
  };

  getChiTietPhieuNhapThucPhamsByMaPhieuNhapThucPham(
    maPhieuNhapThucPham: number
  ): Observable<ChiTietPhieuNhapThucPham[]> {
    return this.httpClient.get<ChiTietPhieuNhapThucPham[]>(
      this.baseApiUrl + '/ChiTietPhieuNhapThucPhams/' + maPhieuNhapThucPham
    );
  }

  addChiTietPhieuNhapThucPham(
    chiTietPhieuNhapThucPhamRequest: ChiTietPhieuNhapThucPham
  ): Observable<ChiTietPhieuNhapThucPham> {
    const addChiTietPhieuNhapThucPham: AddChiTietPhieuNhapThucPhamRequest = {
      maPhieuNhapThucPham: chiTietPhieuNhapThucPhamRequest.maPhieuNhapThucPham,
      maThucPham: chiTietPhieuNhapThucPhamRequest.maThucPham,
      donGia: chiTietPhieuNhapThucPhamRequest.donGia,
      soLuong: chiTietPhieuNhapThucPhamRequest.soLuong,
    };
    return this.httpClient.post<ChiTietPhieuNhapThucPham>(
      this.baseApiUrl + '/ChiTietPhieuNhapThucPhams',
      addChiTietPhieuNhapThucPham
    );
  }

  updateChiTietPhieuNhapThucPham(
    maPhieuNhapThucPham: number,
    maThucPham: number,
    chiTietPhieuNhapThucPhamRequest: ChiTietPhieuNhapThucPham
  ): Observable<ChiTietPhieuNhapThucPham> {
    const updateChiTietPhieuNhapThucPham: UpdateChiTietPhieuNhapThucPhamRequest =
      {
        donGia: chiTietPhieuNhapThucPhamRequest.donGia,
        soLuong: chiTietPhieuNhapThucPhamRequest.soLuong,
      };
    return this.httpClient.put<ChiTietPhieuNhapThucPham>(
      this.baseApiUrl +
        '/ChiTietPhieuNhapThucPhams/' +
        maPhieuNhapThucPham +
        '/' +
        maThucPham,
      updateChiTietPhieuNhapThucPham
    );
  }

  deleteChiTietPhieuNhapThucPham(
    maPhieuNhapThucPham: number,
    maThucPham: number
  ): Observable<ChiTietPhieuNhapThucPham> {
    return this.httpClient.delete<ChiTietPhieuNhapThucPham>(
      this.baseApiUrl +
        '/PhieuNhapThucPhams/' +
        maPhieuNhapThucPham +
        '/' +
        maThucPham
    );
  }
  //#endregion

  //#region Phieu xuat thuc pham
  newPhieuXuatThucPham: PhieuXuatThucPham = {
    maPhieuXuatThucPham: 0,
    ngayXuat: new Date(),
    maNguoiXuat: 0,
    ghiChu: '',
    trangThai: '',
    nguoiXuat: this.newNhanSu,
  };

  getPhieuXuatThucPhams(): Observable<PhieuXuatThucPham[]> {
    return this.httpClient.get<PhieuXuatThucPham[]>(
      this.baseApiUrl + '/PhieuXuatThucPhams'
    );
  }

  addPhieuXuatThucPham(
    phieuXuatThucPhamRequest: PhieuXuatThucPham
  ): Observable<PhieuXuatThucPham> {
    const addPhieuXuatThucPham: AddPhieuXuatThucPhamRequest = {
      ngayXuat: phieuXuatThucPhamRequest.ngayXuat,
      maNguoiXuat: phieuXuatThucPhamRequest.maNguoiXuat,
      ghiChu: phieuXuatThucPhamRequest.ghiChu,
      trangThai: phieuXuatThucPhamRequest.trangThai,
    };
    return this.httpClient.post<PhieuXuatThucPham>(
      this.baseApiUrl + '/PhieuXuatThucPhams',
      addPhieuXuatThucPham
    );
  }

  updatePhieuXuatThucPham(
    maPhieuXuatThucPham: number,
    phieuXuatThucPhamRequest: PhieuXuatThucPham
  ): Observable<PhieuXuatThucPham> {
    const updatePhieuXuatThucPham: UpdatePhieuXuatThucPhamRequest = {
      ngayXuat: phieuXuatThucPhamRequest.ngayXuat,
      maNguoiXuat: phieuXuatThucPhamRequest.maNguoiXuat,
      ghiChu: phieuXuatThucPhamRequest.ghiChu,
      trangThai: phieuXuatThucPhamRequest.trangThai,
    };
    return this.httpClient.put<PhieuXuatThucPham>(
      this.baseApiUrl + '/PhieuXuatThucPhams/' + maPhieuXuatThucPham,
      updatePhieuXuatThucPham
    );
  }

  deletePhieuXuatThucPham(
    maPhieuXuatThucPham: number
  ): Observable<PhieuXuatThucPham> {
    return this.httpClient.delete<PhieuXuatThucPham>(
      this.baseApiUrl + '/PhieuXuatThucPhams/' + maPhieuXuatThucPham
    );
  }
  //#endregion

  //#region Chi tiet phieu xuat thuc pham
  newChiTietPhieuXuatThucPham: ChiTietPhieuXuatThucPham = {
    maPhieuXuatThucPham: 0,
    maThucPham: 0,
    donGia: 0,
    soLuong: 0,
    phieuXuatThucPham: this.newPhieuXuatThucPham,
    thucPham: this.newThucPham,
  };

  getChiTietPhieuXuatThucPhamsByMaPhieuXuatThucPham(
    maPhieuXuatThucPham: number
  ): Observable<ChiTietPhieuXuatThucPham[]> {
    return this.httpClient.get<ChiTietPhieuXuatThucPham[]>(
      this.baseApiUrl + '/ChiTietPhieuXuatThucPhams/' + maPhieuXuatThucPham
    );
  }

  addChiTietPhieuXuatThucPham(
    chiTietPhieuXuatThucPhamRequest: ChiTietPhieuXuatThucPham
  ): Observable<ChiTietPhieuXuatThucPham> {
    const addChiTietPhieuXuatThucPham: AddChiTietPhieuXuatThucPhamRequest = {
      maPhieuXuatThucPham: chiTietPhieuXuatThucPhamRequest.maPhieuXuatThucPham,
      maThucPham: chiTietPhieuXuatThucPhamRequest.maThucPham,
      donGia: chiTietPhieuXuatThucPhamRequest.donGia,
      soLuong: chiTietPhieuXuatThucPhamRequest.soLuong,
    };
    return this.httpClient.post<ChiTietPhieuXuatThucPham>(
      this.baseApiUrl + '/ChiTietPhieuXuatThucPhams',
      addChiTietPhieuXuatThucPham
    );
  }

  updateChiTietPhieuXuatThucPham(
    maPhieuXuatThucPham: number,
    maThucPham: number,
    chiTietPhieuXuatThucPhamRequest: ChiTietPhieuXuatThucPham
  ): Observable<ChiTietPhieuXuatThucPham> {
    const updateChiTietPhieuXuatThucPham: UpdateChiTietPhieuXuatThucPhamRequest =
      {
        donGia: chiTietPhieuXuatThucPhamRequest.donGia,
        soLuong: chiTietPhieuXuatThucPhamRequest.soLuong,
      };
    return this.httpClient.put<ChiTietPhieuXuatThucPham>(
      this.baseApiUrl +
        '/ChiTietPhieuXuatThucPhams/' +
        maPhieuXuatThucPham +
        '/' +
        maThucPham,
      updateChiTietPhieuXuatThucPham
    );
  }

  deleteChiTietPhieuXuatThucPham(
    maPhieuXuatThucPham: number,
    maThucPham: number
  ): Observable<ChiTietPhieuXuatThucPham> {
    return this.httpClient.delete<ChiTietPhieuXuatThucPham>(
      this.baseApiUrl +
        '/PhieuXuatThucPhams/' +
        maPhieuXuatThucPham +
        '/' +
        maThucPham
    );
  }
  //#endregion

  //#region Danh muc thuc don
  newDanhMucThucDon: DanhMucThucDon = {
    maDanhMuc: 0,
    tenDanhMuc: '',
    ghiChu: '',
    thoiGian: '',
  };
  getDanhMucThucDons(): Observable<DanhMucThucDon[]> {
    return this.httpClient.get<DanhMucThucDon[]>(
      this.baseApiUrl + '/DanhMucThucDons'
    );
  }

  updateDanhMucThucDon(
    maDanhMuc: number,
    danhMucThucDonRequest: DanhMucThucDon
  ): Observable<DanhMucThucDon> {
    const updateDanhMucThucDonRequest: AUDanhMucThucDonRequest = {
      tenDanhMuc: danhMucThucDonRequest.tenDanhMuc,
      ghiChu: danhMucThucDonRequest.ghiChu,
      thoiGian: danhMucThucDonRequest.thoiGian,
    };

    return this.httpClient.put<DanhMucThucDon>(
      this.baseApiUrl + '/DanhMucThucDons/' + maDanhMuc,
      updateDanhMucThucDonRequest
    );
  }

  deleteDanhMucThucDon(maDanhMuc: number): Observable<DanhMucThucDon> {
    return this.httpClient.delete<DanhMucThucDon>(
      this.baseApiUrl + '/DanhMucThucDons/' + maDanhMuc
    );
  }

  addDanhMucThucDon(
    danhMucThucDonRequest: DanhMucThucDon
  ): Observable<DanhMucThucDon> {
    const addDanhMucThucDonRequest: AUDanhMucThucDonRequest = {
      tenDanhMuc: danhMucThucDonRequest.tenDanhMuc,
      ghiChu: danhMucThucDonRequest.ghiChu,
      thoiGian: danhMucThucDonRequest.thoiGian,
    };

    return this.httpClient.post<DanhMucThucDon>(
      this.baseApiUrl + '/DanhMucThucDons',
      addDanhMucThucDonRequest
    );
  }
  //#endregion

  //#region Mon an
  newMonAn: MonAn = {
    maMonAn: 0,
    tenMonAn: '',
    ghiChu: '',
  };

  getMonAns(): Observable<MonAn[]> {
    return this.httpClient.get<MonAn[]>(this.baseApiUrl + '/MonAns');
  }

  addMonAn(monAnRequest: MonAn): Observable<MonAn> {
    const addMonAn: AddMonAnRequest = {
      tenMonAn: monAnRequest.tenMonAn,
      ghiChu: monAnRequest.ghiChu,
    };
    return this.httpClient.post<MonAn>(this.baseApiUrl + '/MonAns', addMonAn);
  }

  updateMonAn(maMonAn: number, monAnRequest: MonAn): Observable<MonAn> {
    const updateMonAn: UpdateMonAnRequest = {
      tenMonAn: monAnRequest.tenMonAn,
      ghiChu: monAnRequest.ghiChu,
    };
    return this.httpClient.put<MonAn>(
      this.baseApiUrl + '/MonAns/' + maMonAn,
      updateMonAn
    );
  }

  deleteMonAn(maMonAn: number): Observable<MonAn> {
    return this.httpClient.delete<MonAn>(
      this.baseApiUrl + '/MonAns/' + maMonAn
    );
  }
  //#endregion

  //#region Mon an thuc pham
  newMonAnThucPham: MonAnThucPham = {
    maMonAn: 0,
    maThucPham: 0,
    soLuong: 0,
    monAn: this.newMonAn,
    thucPham: this.newThucPham,
  };

  getMonAnThucPhamsByMonAn(maMonAn: number): Observable<MonAnThucPham[]> {
    return this.httpClient.get<MonAnThucPham[]>(
      this.baseApiUrl + '/MonAnThucPhams/' + maMonAn
    );
  }

  addMonAnThucPham(
    monAnThucPhamRequest: MonAnThucPham
  ): Observable<MonAnThucPham> {
    const addMonAnThucPham: AddMonAnThucPhamRequest = {
      maMonAn: monAnThucPhamRequest.maMonAn,
      maThucPham: monAnThucPhamRequest.maThucPham,
      soLuong: monAnThucPhamRequest.soLuong,
    };
    return this.httpClient.post<MonAnThucPham>(
      this.baseApiUrl + '/MonAnThucPhams',
      addMonAnThucPham
    );
  }

  updateMonAnThucPham(
    maMonAn: number,
    maThucPham: number,
    monAnThucPhamRequest: MonAnThucPham
  ): Observable<MonAnThucPham> {
    const updateMonAnThucPham: UpdateMonAnThucPhamRequest = {
      soLuong: monAnThucPhamRequest.soLuong,
    };
    return this.httpClient.put<MonAnThucPham>(
      this.baseApiUrl + '/MonAnThucPhams/' + maMonAn + '/' + maThucPham,
      updateMonAnThucPham
    );
  }

  deleteMonAnThucPham(
    maMonAn: number,
    maThucPham: number
  ): Observable<MonAnThucPham> {
    return this.httpClient.delete<MonAnThucPham>(
      this.baseApiUrl + '/MonAnThucPhams/' + maMonAn + '/' + maThucPham
    );
  }
  //#endregion

  //#region Thuc don
  newThucDon: ThucDon = {
    maThucDon: 0,
    ngayTao: new Date(),
    ngayApDung: new Date(),
    maDanhMuc: 0,
    danhMucThucDon: this.newDanhMucThucDon,
  };

  getThucDons(): Observable<ThucDon[]> {
    return this.httpClient.get<ThucDon[]>(this.baseApiUrl + '/ThucDons');
  }

  addThucDon(thucDonRequest: ThucDon): Observable<ThucDon> {
    const addThucDon: AddThucDonRequest = {
      ngayTao: thucDonRequest.ngayTao,
      ngayApDung: thucDonRequest.ngayApDung,
      maDanhMuc: thucDonRequest.maDanhMuc,
    };
    return this.httpClient.post<ThucDon>(
      this.baseApiUrl + '/ThucDons',
      addThucDon
    );
  }

  updateThucDon(
    maThucDon: number,
    thucDonRequest: ThucDon
  ): Observable<ThucDon> {
    const updateThucDon: UpdateThucDonRequest = {
      ngayApDung: thucDonRequest.ngayApDung,
      maDanhMuc: thucDonRequest.maDanhMuc,
    };
    return this.httpClient.put<ThucDon>(
      this.baseApiUrl + '/ThucDons/' + maThucDon,
      updateThucDon
    );
  }

  deleteThucDon(maThucDon: number): Observable<ThucDon> {
    return this.httpClient.delete<ThucDon>(
      this.baseApiUrl + '/ThucDons/' + maThucDon
    );
  }
  //#endregion

  //#region Thuc don mon an
  newThucDonMonAn: ThucDonMonAn = {
    maThucDon: 0,
    maMonAn: 0,
    soLuong: 0,
    thucDon: this.newThucDon,
    monAn: this.newMonAn,
  };

  getThucDonMonAnsByThucDon(maThucDon: number): Observable<ThucDonMonAn[]> {
    return this.httpClient.get<ThucDonMonAn[]>(
      this.baseApiUrl + '/ThucDonMonAns/' + maThucDon
    );
  }

  addThucDonMonAn(thucDonMonAnRequest: ThucDonMonAn): Observable<ThucDonMonAn> {
    const addThucDonMonAn: AddThucDonMonAnRequest = {
      maThucDon: thucDonMonAnRequest.maThucDon,
      maMonAn: thucDonMonAnRequest.maMonAn,
      soLuong: thucDonMonAnRequest.soLuong,
    };
    return this.httpClient.post<ThucDonMonAn>(
      this.baseApiUrl + '/ThucDonMonAns',
      addThucDonMonAn
    );
  }

  updateThucDonMonAn(
    maThucDon: number,
    maMonAn: number,
    thucDonMonAnRequest: ThucDonMonAn
  ): Observable<ThucDonMonAn> {
    const updateThucDonMonAn: UpdateThucDonMonAnRequest = {
      soLuong: thucDonMonAnRequest.soLuong,
    };
    return this.httpClient.put<ThucDonMonAn>(
      this.baseApiUrl + '/ThucDonMonAns/' + maThucDon + '/' + maMonAn,
      updateThucDonMonAn
    );
  }

  deleteThucDonMonAn(
    maThucDon: number,
    maMonAn: number
  ): Observable<ThucDonMonAn> {
    return this.httpClient.delete<ThucDonMonAn>(
      this.baseApiUrl + '/ThucDonMonAns/' + maThucDon + '/' + maMonAn
    );
  }
  //#endregion
}
