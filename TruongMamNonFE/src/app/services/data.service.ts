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

  //#region Danh mục thực đơn
  public newDanhMucThucDon: DanhMucThucDon = {
    maDanhMuc: 0,
    tenDanhMuc: '',
    ghiChu: '',
    thoiGian: '',
    nangLuong: 0,
    chatDam: 0,
    chatBeo: 0,
    chatBot: 0,
  };

  public getDanhMucThucDons(): Observable<DanhMucThucDon[]> {
    const url = `${this.REST_API_SERVER}/DanhMucThucDons`;
    return this.httpClient.get<DanhMucThucDon[]>(url, this.httpOptions);
  }

  public postDanhMucThucDon(data: DanhMucThucDon): Observable<DanhMucThucDon> {
    const url = `${this.REST_API_SERVER}/DanhMucThucDons`;
    return this.httpClient.post<DanhMucThucDon>(url, data, this.httpOptions);
  }

  public putDanhMucThucDon(
    ma: number,
    data: DanhMucThucDon
  ): Observable<DanhMucThucDon> {
    const url = `${this.REST_API_SERVER}/DanhMucThucDons/${ma}`;
    return this.httpClient.put<DanhMucThucDon>(url, data, this.httpOptions);
  }

  public deleteDanhMucThucDon(ma: number): Observable<DanhMucThucDon> {
    const url = `${this.REST_API_SERVER}/DanhMucThucDons/${ma}`;
    return this.httpClient.delete<DanhMucThucDon>(url, this.httpOptions);
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

  //#region hoc sinh
  public newHocSinh: HocSinh = {
    maHocSinh: '',
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
      maHocSinh: hocSinhRequest.maHocSinh,
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
    maHocSinh: string,
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

  deleteHocSinh(maHocSinh: string): Observable<HocSinh> {
    return this.httpClient.delete<HocSinh>(
      this.baseApiUrl + '/HocSinhs/' + maHocSinh
    );
  }
  //#endregion

  //#region Thuoc so giun
  public newThuocSoGiun: ThuocSoGiun = {
    maThuocSoGiun: 0,
    tenThuocSoGiun: '',
    ghiChu: '',
  };
  public getThuocSoGiuns(): Observable<ThuocSoGiun[]> {
    const url = `${this.REST_API_SERVER}/ThuocSoGiuns`;
    return this.httpClient.get<ThuocSoGiun[]>(url, this.httpOptions);
  }

  public postThuocSoGiun(data: ThuocSoGiun): Observable<ThuocSoGiun> {
    const url = `${this.REST_API_SERVER}/ThuocSoGiuns`;
    return this.httpClient.post<ThuocSoGiun>(url, data, this.httpOptions);
  }

  public putThuocSoGiun(
    ma: number,
    data: ThuocSoGiun
  ): Observable<ThuocSoGiun> {
    const url = `${this.REST_API_SERVER}/ThuocSoGiuns/${ma}`;
    return this.httpClient.put<ThuocSoGiun>(url, data, this.httpOptions);
  }

  public deleteThuocSoGiun(ma: number): Observable<ThuocSoGiun> {
    const url = `${this.REST_API_SERVER}/ThuocSoGiuns/${ma}`;
    return this.httpClient.delete<ThuocSoGiun>(url, this.httpOptions);
  }
  //#endregion

  //#region Vitamin
  public newVitamin: Vitamin = {
    maVitamin: 0,
    tenVitamin: '',
    ghiChu: '',
  };
  public getVitamins(): Observable<Vitamin[]> {
    const url = `${this.REST_API_SERVER}/Vitamins`;
    return this.httpClient.get<Vitamin[]>(url, this.httpOptions);
  }

  public postVitamin(data: Vitamin): Observable<Vitamin> {
    const url = `${this.REST_API_SERVER}/Vitamins`;
    return this.httpClient.post<Vitamin>(url, data, this.httpOptions);
  }

  public putVitamin(ma: number, data: Vitamin): Observable<Vitamin> {
    const url = `${this.REST_API_SERVER}/Vitamins/${ma}`;
    return this.httpClient.put<Vitamin>(url, data, this.httpOptions);
  }

  public deleteVitamin(ma: number): Observable<Vitamin> {
    const url = `${this.REST_API_SERVER}/Vitamins/${ma}`;
    return this.httpClient.delete<Vitamin>(url, this.httpOptions);
  }
  //#endregion

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
  public getChucVus(maLoaiNhanSu: number): Observable<ChucVu[]> {
    const url = `${this.REST_API_SERVER}/ChucVus/LoaiNhanSu/${maLoaiNhanSu}`;
    return this.httpClient.get<ChucVu[]>(url, this.httpOptions);
  }

  public getAllChucVus(): Observable<ChucVu[]> {
    const url = `${this.REST_API_SERVER}/ChucVus`;
    return this.httpClient.get<ChucVu[]>(url, this.httpOptions);
  }

  public postChucVu(data: ChucVu): Observable<ChucVu> {
    const url = `${this.REST_API_SERVER}/ChucVus`;
    return this.httpClient.post<ChucVu>(url, data, this.httpOptions);
  }

  public putChucVu(ma: number, data: ChucVu): Observable<ChucVu> {
    const url = `${this.REST_API_SERVER}/ChucVus/${ma}`;
    return this.httpClient.put<ChucVu>(url, data, this.httpOptions);
  }

  public deleteChucVu(ma: number): Observable<ChucVu> {
    const url = `${this.REST_API_SERVER}/ChucVus/${ma}`;
    return this.httpClient.delete<ChucVu>(url, this.httpOptions);
  }
  //#endregion

  //#region Nhan su
  public newNhanSu: NhanSu = {
    maNhanSu: '',
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

  addNhanSu(nhanSuRequest: NhanSu): Observable<NhanSu> {
    const addNhanSuRequest: AddNhanSuRequest = {
      maNhanSu: nhanSuRequest.maNhanSu,
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
  updateNhanSu(maNhanSu: string, nhanSuRequest: NhanSu): Observable<NhanSu> {
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

  deleteNhanSu(maNhanSu: string): Observable<NhanSu> {
    return this.httpClient.delete<NhanSu>(
      this.baseApiUrl + '/NhanSus/' + maNhanSu
    );
  }
  //#endregion

  //#region Vaccine
  public newVaccine: Vaccine = {
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

  //#region phieu tiem vaccine
  public newPhieuTiemVaccine: PhieuTiemVaccine = {
    maPhieuTiemVaccine: 0,
    maDotTiemVaccine: 0,
    maHocSinh: '',
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

  //#region Diem danh
  newDiemDanh: DiemDanh = {
    maDiemDanh: 0,
    ngayDiemDanh: new Date(),
    maHocSinh: '',
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
    nangLuong: 0,
    chatDam: 0,
    chatBeo: 0,
    chatBot: 0,
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
      nangLuong: thucPhamRequest.nangLuong,
      chatDam: thucPhamRequest.chatDam,
      chatBeo: thucPhamRequest.chatBeo,
      chatBot: thucPhamRequest.chatBot,
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
      nangLuong: thucPhamRequest.nangLuong,
      chatDam: thucPhamRequest.chatDam,
      chatBeo: thucPhamRequest.chatBeo,
      chatBot: thucPhamRequest.chatBot,
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
    maNguoiNhap: '',
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
    phieuNhapThucPhamRequest: PhieuNhapThucPham
  ): Observable<PhieuNhapThucPham> {
    const addPhieuNhapThucPham: AddPhieuNhapThucPhamRequest = {
      ngayNhap: phieuNhapThucPhamRequest.ngayNhap,
      maNguoiNhap: phieuNhapThucPhamRequest.maNguoiNhap,
      ghiChu: phieuNhapThucPhamRequest.ghiChu,
      trangThai: phieuNhapThucPhamRequest.trangThai,
    };
    return this.httpClient.post<PhieuNhapThucPham>(
      this.baseApiUrl + '/PhieuNhapThucPhams',
      addPhieuNhapThucPham
    );
  }

  updatePhieuNhapThucPham(
    maPhieuNhapThucPham: number,
    phieuNhapThucPhamRequest: PhieuNhapThucPham
  ): Observable<PhieuNhapThucPham> {
    const updatePhieuNhapThucPham: UpdatePhieuNhapThucPhamRequest = {
      ngayNhap: phieuNhapThucPhamRequest.ngayNhap,
      maNguoiNhap: phieuNhapThucPhamRequest.maNguoiNhap,
      ghiChu: phieuNhapThucPhamRequest.ghiChu,
      trangThai: phieuNhapThucPhamRequest.trangThai,
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
    maNguoiXuat: '',
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
}
