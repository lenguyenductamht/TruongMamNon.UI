import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ChucVu } from '../models/chuc-vu.model';
import { DanhMucThucDon } from '../models/danh-muc-thuc-don.model';
import { HocSinh } from '../models/hoc-sinh.model';
import { KhoiLop } from '../models/khoi-lop.model';
import { LoaiNhanSu } from '../models/loai-nhan-su.model';
import { LopHoc } from '../models/lop-hoc.model';
import { NhanSu } from '../models/nhan-su.model';
import { NienHoc } from '../models/nien-hoc.model';
import { PhieuTiemVaccine } from '../models/phieu-tiem-vaccine.model';
import { PhongBan } from '../models/phong-ban.model';
import { ThuocSoGiun } from '../models/thuoc-so-giun.model';
import { Vaccine } from '../models/vaccine.model';
import { Vitamin } from '../models/vitamin.model';

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
    maNienHoc:0,
    tenNienHoc:'',
    batDauHK1:new Date(Date.now()),
    ketThucHK1:new Date(),
    batDauHK2:new Date(),
    ketThucHK2:new Date()
  };
  public selectedNienHoc$ = new BehaviorSubject<NienHoc>(
    this.newNienHoc
  );
  constructor(private httpClient: HttpClient) {}
  public gioiTinhs:any[]=[{name: "Nam", key:"0"},{name:"Nữ", key:"1"}, {name:"Khác", key:"2"}];
  public danTocs:any[]=[{"MaDanToc": "01","TenDanToc": "Kinh"},
                        {"MaDanToc": "17","TenDanToc": "Chăm"},
                        {"MaDanToc": "21", "TenDanToc": "Ra-glai"},
                        {"MaDanToc": "12", "TenDanToc": "Ê-đê"},
                        {"MaDanToc": "18", "TenDanToc": "Sán Dìu"},
                        {"MaDanToc": "13", "TenDanToc": "Ba-na"},
                        {"MaDanToc": "19", "TenDanToc": "Hrê"},
                        {"MaDanToc": "36", "TenDanToc": "Chu-ru"},
                        {"MaDanToc": "04", "TenDanToc": "Hoa"},
                        {"MaDanToc": "54", "TenDanToc": "Rơ-măm"},
                        {"MaDanToc": "15", "TenDanToc": "Sán Chay"},
                        {"MaDanToc": "49", "TenDanToc": "Bố Y"},
                        {"MaDanToc": "35", "TenDanToc": "Hà Nhì"},
                        {"MaDanToc": "41", "TenDanToc": "La Hủ"},
                        {"MaDanToc": "45", "TenDanToc": "Mảng"},
                        {"MaDanToc": "11", "TenDanToc": "Ngái"},
                        {"MaDanToc": "40", "TenDanToc": "Phù Lá"},
                        {"MaDanToc": "06", "TenDanToc": "Mường"},
                        {"MaDanToc": "42", "TenDanToc": "Lự"},
                        {"MaDanToc": "37", "TenDanToc": "Lào"},
                        {"MaDanToc": "38", "TenDanToc": "La Chi"},
                        {"MaDanToc": "09", "TenDanToc": "Dao"},
                        {"MaDanToc": "29", "TenDanToc": "Khơ-mú"},
                        {"MaDanToc": "43", "TenDanToc": "Lô Lô"},
                        {"MaDanToc": "53", "TenDanToc": "Ơ Đu"},
                        {"MaDanToc": "51", "TenDanToc": "Pu Péo"},
                        {"MaDanToc": "05", "TenDanToc": "Khơ-me"},
                        {"MaDanToc": "33", "TenDanToc": "Kháng"},
                        {"MaDanToc": "46", "TenDanToc": "Pà Thẻn"},
                        {"MaDanToc": "32", "TenDanToc": "Chơ-ro"},
                        {"MaDanToc": "56", "TenDanToc": "Không Xác Định"},
                        {"MaDanToc": "28", "TenDanToc": "Mạ"},
                        {"MaDanToc": "07", "TenDanToc": "Nùng"},
                        {"MaDanToc": "55", "TenDanToc": "Người Nước Ngoài"},
                        {"MaDanToc": "08", "TenDanToc": "Hmông"},
                        {"MaDanToc": "20", "TenDanToc": "Mnông"},
                        {"MaDanToc": "52", "TenDanToc": "Brâu"},
                        {"MaDanToc": "23", "TenDanToc": "Bru-Vân Kiều"},
                        {"MaDanToc": "44", "TenDanToc": "Chứt"},
                        {"MaDanToc": "30", "TenDanToc": "Co"},
                        {"MaDanToc": "16", "TenDanToc": "Cơ-ho"},
                        {"MaDanToc": "47", "TenDanToc": "Cơ Lao"},
                        {"MaDanToc": "26", "TenDanToc": "Cơ-tu"},
                        {"MaDanToc": "48", "TenDanToc": "Cống"},
                        {"MaDanToc": "10", "TenDanToc": "Gia-rai"},
                        {"MaDanToc": "25", "TenDanToc": "Giáy"},
                        {"MaDanToc": "27", "TenDanToc": "Gié-Triêng"},
                        {"MaDanToc": "50", "TenDanToc": "Si La"},
                        {"MaDanToc": "31", "TenDanToc": "Ta-ôi"},
                        {"MaDanToc": "02", "TenDanToc": "Tày"},
                        {"MaDanToc": "03", "TenDanToc": "Thái"},
                        {"MaDanToc": "24", "TenDanToc": "Thổ"},
                        {"MaDanToc": "34", "TenDanToc": "Xinh-mun"},
                        {"MaDanToc": "14", "TenDanToc": "Xơ-đăng"},
                        {"MaDanToc": "22", "TenDanToc": "Xtiêng"}];

  public tonGiaos:any[]=[{"MaTonGiao": "99", "TenTonGiao": "Không"},
                         {"MaTonGiao": "01", "TenTonGiao": "Phật giáo"},
                         {"MaTonGiao": "02", "TenTonGiao": "Công giáo"},
                         {"MaTonGiao": "03", "TenTonGiao": "Phật giáo Hòa Hảo"},
                         {"MaTonGiao": "04", "TenTonGiao": "Hồi giáo"},
                         {"MaTonGiao": "05", "TenTonGiao": "Cao Đài"},
                         {"MaTonGiao": "06", "TenTonGiao": "Minh sư đạo"},
                         {"MaTonGiao": "07", "TenTonGiao": "Minh Lý đạo"},
                         {"MaTonGiao": "08", "TenTonGiao": "Tin Lành"},
                         {"MaTonGiao": "09", "TenTonGiao": "Tịnh độ cư sĩ Phật hồi Việt Nam"},
                         {"MaTonGiao": "10", "TenTonGiao": "Đạo tứ ấn hiếu nghĩa"},
                         {"MaTonGiao": "11", "TenTonGiao": "Bửu sơn Kỳ Hương"},
                         {"MaTonGiao": "12", "TenTonGiao": "Ba Ha'i"},
                         {"MaTonGiao": "13", "TenTonGiao": "Tôn giáo khác"}];  
                                                  
  public quocGias:any[]=[{"MaQuocGia": "704", "TenQuocGia": "Việt Nam"},
                         {"MaQuocGia": "100", "TenQuocGia": "Bungari"},                        
                         {"MaQuocGia": "276", "TenQuocGia": "Cộng hoà DC Đức"},
                         {"MaQuocGia": "276", "TenQuocGia": "Cộng hoà LB Đức"},
                         {"MaQuocGia": "643", "TenQuocGia": "Cộng hoà LB Nga"},
                         {"MaQuocGia": "348", "TenQuocGia": "Hunggari"},
                         {"MaQuocGia": "643", "TenQuocGia": "Liên Xô (cũ)"},
                         {"MaQuocGia": "703", "TenQuocGia": "Slovakia"},
                         {"MaQuocGia": "09", "TenQuocGia": "Tiệp Khắc"},
                         {"MaQuocGia": "156", "TenQuocGia": "Trung Quốc"},
                         {"MaQuocGia": "764", "TenQuocGia": "Thái Lan"},
                         {"MaQuocGia": "756", "TenQuocGia": "Thuỵ Sỹ"},
                         {"MaQuocGia": "250", "TenQuocGia": "Cộng hoà Pháp"},
                         {"MaQuocGia": "356", "TenQuocGia": "Ấn Độ"},
                         {"MaQuocGia": "418", "TenQuocGia": "Cộng hoà CHDCND Lào"},
                         {"MaQuocGia": "036", "TenQuocGia": "Australia"},
                         {"MaQuocGia": "158", "TenQuocGia": "Đài Loan"},
                         {"MaQuocGia": "392", "TenQuocGia": "Nhật Bản"},
                         {"MaQuocGia": "024", "TenQuocGia": "AngoLa"},
                         {"MaQuocGia": "840", "TenQuocGia": "Mỹ"},
                         {"MaQuocGia": "410", "TenQuocGia": "Hàn Quốc"},
                         {"MaQuocGia": "344", "TenQuocGia": "Hồng Kông"},
                         {"MaQuocGia": "528", "TenQuocGia": "Hà Lan"},
                         {"MaQuocGia": "702", "TenQuocGia": "Singapore"},
                         {"MaQuocGia": "124", "TenQuocGia": "Canada"},
                         {"MaQuocGia": "752", "TenQuocGia": "Thụy Điển"},
                         {"MaQuocGia": "352", "TenQuocGia": "BắC Ai Len"},
                         {"MaQuocGia": "75", "TenQuocGia": "Mỹ 2"}];                      
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

  public postDanhMucThucDon(
    data: DanhMucThucDon
  ): Observable<DanhMucThucDon> {
    const url = `${this.REST_API_SERVER}/DanhMucThucDons`;
    return this.httpClient.post<DanhMucThucDon>(url, data,this.httpOptions);
  }

  public putDanhMucThucDon(ma:number,
    data: DanhMucThucDon
  ): Observable<DanhMucThucDon> {
    const url = `${this.REST_API_SERVER}/DanhMucThucDons/${ma}`;
    return this.httpClient.put<DanhMucThucDon>(url, data,this.httpOptions);
  }

  public deleteDanhMucThucDon(ma:number,
  ): Observable<DanhMucThucDon> {
    const url = `${this.REST_API_SERVER}/DanhMucThucDons/${ma}`;
    return this.httpClient.delete<DanhMucThucDon>(url,this.httpOptions);
  }
  //#endregion

  //#region Niên học

  public getNienHocs(): Observable<NienHoc[]> {
    const url = `${this.REST_API_SERVER}/NienHocs`;
    return this.httpClient.get<NienHoc[]>(url, this.httpOptions);
  }

  public postNienHoc(
    data: NienHoc
  ): Observable<NienHoc> {
    const url = `${this.REST_API_SERVER}/NienHocs`;
    return this.httpClient.post<NienHoc>(url, data,this.httpOptions);
  }

  public putNienHoc(ma:number,
    data: NienHoc
  ): Observable<NienHoc> {
    const url = `${this.REST_API_SERVER}/NienHocs/${ma}`;
    return this.httpClient.put<NienHoc>(url, data,this.httpOptions);
  }

  public deleteNienHoc(ma:number,
  ): Observable<NienHoc> {
    const url = `${this.REST_API_SERVER}/NienHocs/${ma}`;
    return this.httpClient.delete<NienHoc>(url,this.httpOptions);
  }
  
  //#endregion

  //#region Phòng ban
  public newPhongBan: PhongBan = {
    maPhongBan:0,
    tenPhongBan:"",
    ghiChu:""
  };
  public getPhongBans(): Observable<PhongBan[]> {
    const url = `${this.REST_API_SERVER}/PhongBans`;
    return this.httpClient.get<PhongBan[]>(url, this.httpOptions);
  }

  public postPhongBan(
    data: PhongBan
  ): Observable<PhongBan> {
    const url = `${this.REST_API_SERVER}/PhongBans`;
    return this.httpClient.post<PhongBan>(url, data,this.httpOptions);
  }

  public putPhongBan(ma:number,
    data: PhongBan
  ): Observable<PhongBan> {
    const url = `${this.REST_API_SERVER}/PhongBans/${ma}`;
    return this.httpClient.put<PhongBan>(url, data,this.httpOptions);
  }

  public deletePhongBan(ma:number
  ): Observable<PhongBan> {
    const url = `${this.REST_API_SERVER}/PhongBans/${ma}`;
    return this.httpClient.delete<PhongBan>(url,this.httpOptions);
  }
  //#endregion

  //#region Khoi lop
  public newKhoiLop: KhoiLop = {
    maKhoiLop:0,
    tenKhoiLop:"",
    ghiChu:""
  };
  public getKhoiLops(): Observable<KhoiLop[]> {
    const url = `${this.REST_API_SERVER}/KhoiLops`;
    return this.httpClient.get<KhoiLop[]>(url, this.httpOptions);
  }

  public postKhoiLop(
    data: KhoiLop
  ): Observable<KhoiLop> {
    const url = `${this.REST_API_SERVER}/KhoiLops`;
    return this.httpClient.post<KhoiLop>(url, data,this.httpOptions);
  }

  public putKhoiLop(ma:number,
    data: KhoiLop
  ): Observable<KhoiLop> {
    const url = `${this.REST_API_SERVER}/KhoiLops/${ma}`;
    return this.httpClient.put<KhoiLop>(url, data,this.httpOptions);
  }

  public deleteKhoiLop(ma:number
  ): Observable<KhoiLop> {
    const url = `${this.REST_API_SERVER}/KhoiLops/${ma}`;
    return this.httpClient.delete<KhoiLop>(url,this.httpOptions);
  }
  //#endregion

  //#region Lop hoc
  public newLopHoc: LopHoc = {
    maLop:0,
    tenLop:"",
    maKhoiLop:0,
    hocPhi:0,
    maNienHoc:0,
    khoiLop: this.newKhoiLop,
    nienHoc:this.newNienHoc 
  };
  public getLopHocsByNienHoc(maNienHoc:number): Observable<LopHoc[]> {
    const url = `${this.REST_API_SERVER}/LopHocs/NienHoc/${maNienHoc}`;
    return this.httpClient.get<LopHoc[]>(url, this.httpOptions);
  }

  public getLopHocsByNienHocKhoiLop(maNienHoc:number, maKhoiLop:number): Observable<LopHoc[]> {
    const url = `${this.REST_API_SERVER}/LopHocs/NienHoc/${maNienHoc}/${maKhoiLop}`;
    return this.httpClient.get<LopHoc[]>(url, this.httpOptions);
  }

  public postLopHoc(
    data: LopHoc
  ): Observable<LopHoc> {
    const url = `${this.REST_API_SERVER}/LopHocs`;
    return this.httpClient.post<LopHoc>(url, data,this.httpOptions);
  }

  public putLopHoc(ma:number,
    data: LopHoc
  ): Observable<LopHoc> {
    const url = `${this.REST_API_SERVER}/LopHocs/${ma}`;
    return this.httpClient.put<LopHoc>(url, data,this.httpOptions);
  }

  public deleteLopHoc(ma:number
  ): Observable<LopHoc> {
    const url = `${this.REST_API_SERVER}/LopHocs/${ma}`;
    return this.httpClient.delete<LopHoc>(url,this.httpOptions);
  }
  //#endregion

  //#region hoc sinh
  public newHocSinh: HocSinh = {
    maHocSinh:"",
    ho:"",
    ten:"",
    gioiTinh:"",
    maKhoiLop:0,
    maLopHoc:0,
    ngayNhapHoc:new Date(Date.now()),
    trangThaiHoc:"",
    lyDoNghiHoc:"",
    ngayCapNhat:new Date(Date.now()),
    ngaySinh:new Date(),
    noiSinh:"",
    danToc:"",
    tonGiao:"",
    quocTich:"",
    ghiChu:"",
    hoKhau:"",
    diaChi:"",
    hinhAnh:"",
    matKhau:"",
    trangThaiTaiKhoan:"",
    hoTenPhuHuynh:"",
    namSinhPhuHuynh:new Date(),
    cmndPhuHuynh:"",
    sdtPhuHuynh:"",
    ngheNghiepPhuHuynh:"",
    emailPhuHuynh:"",
    diaChiPhuHuynh:"",
    khoiLop:this.newKhoiLop,
    lopHoc:this.newLopHoc,

  };
  public getHocSinhs(): Observable<HocSinh[]> {
    const url = `${this.REST_API_SERVER}/HocSinhs`;
    return this.httpClient.get<HocSinh[]>(url, this.httpOptions);
  }

  public getHocSinhsByKhoiLop(maKhoiLop:number): Observable<HocSinh[]> {
    const url = `${this.REST_API_SERVER}/HocSinhs/KhoiLop/${maKhoiLop}`;
    return this.httpClient.get<HocSinh[]>(url, this.httpOptions);
  }

  public getHocSinhsByLopHoc(maLopHoc:number): Observable<HocSinh[]> {
    const url = `${this.REST_API_SERVER}/HocSinhs/LopHoc/${maLopHoc}`;
    return this.httpClient.get<HocSinh[]>(url, this.httpOptions);
  }

  public postHocSinh(
    data: HocSinh
  ): Observable<HocSinh> {
    const url = `${this.REST_API_SERVER}/HocSinhs`;
    return this.httpClient.post<HocSinh>(url, data,this.httpOptions);
  }

  public putHocSinh(ma:string,
    data: HocSinh
  ): Observable<HocSinh> {
    const url = `${this.REST_API_SERVER}/HocSinhs/${ma}`;
    return this.httpClient.put<HocSinh>(url, data,this.httpOptions);
  }

  public deleteHocSinh(ma:string
  ): Observable<HocSinh> {
    const url = `${this.REST_API_SERVER}/HocSinhs/${ma}`;
    return this.httpClient.delete<HocSinh>(url,this.httpOptions);
  }
  //#endregion

  //#region Thuoc so giun
  public newThuocSoGiun: ThuocSoGiun = {
    maThuocSoGiun:0,
    tenThuocSoGiun:"",
    ghiChu:""
  };
  public getThuocSoGiuns(): Observable<ThuocSoGiun[]> {
    const url = `${this.REST_API_SERVER}/ThuocSoGiuns`;
    return this.httpClient.get<ThuocSoGiun[]>(url, this.httpOptions);
  }

  public postThuocSoGiun(
    data: ThuocSoGiun
  ): Observable<ThuocSoGiun> {
    const url = `${this.REST_API_SERVER}/ThuocSoGiuns`;
    return this.httpClient.post<ThuocSoGiun>(url, data,this.httpOptions);
  }

  public putThuocSoGiun(ma:number,
    data: ThuocSoGiun
  ): Observable<ThuocSoGiun> {
    const url = `${this.REST_API_SERVER}/ThuocSoGiuns/${ma}`;
    return this.httpClient.put<ThuocSoGiun>(url, data,this.httpOptions);
  }

  public deleteThuocSoGiun(ma:number
  ): Observable<ThuocSoGiun> {
    const url = `${this.REST_API_SERVER}/ThuocSoGiuns/${ma}`;
    return this.httpClient.delete<ThuocSoGiun>(url,this.httpOptions);
  }
  //#endregion

  //#region Vaccine
  public newVaccine: Vaccine = {
    maVaccine:0,
    tenVaccine:"",
    ghiChu:""
  };
  public getVaccines(): Observable<Vaccine[]> {
    const url = `${this.REST_API_SERVER}/Vaccines`;
    return this.httpClient.get<Vaccine[]>(url, this.httpOptions);
  }

  public postVaccine(
    data: Vaccine
  ): Observable<Vaccine> {
    const url = `${this.REST_API_SERVER}/Vaccines`;
    return this.httpClient.post<Vaccine>(url, data,this.httpOptions);
  }

  public putVaccine(ma:number,
    data: Vaccine
  ): Observable<Vaccine> {
    const url = `${this.REST_API_SERVER}/Vaccines/${ma}`;
    return this.httpClient.put<Vaccine>(url, data,this.httpOptions);
  }

  public deleteVaccine(ma:number
  ): Observable<Vaccine> {
    const url = `${this.REST_API_SERVER}/Vaccines/${ma}`;
    return this.httpClient.delete<Vaccine>(url,this.httpOptions);
  }
  //#endregion

  //#region Vitamin
  public newVitamin: Vitamin = {
    maVitamin:0,
    tenVitamin:"",
    ghiChu:""
  };
  public getVitamins(): Observable<Vitamin[]> {
    const url = `${this.REST_API_SERVER}/Vitamins`;
    return this.httpClient.get<Vitamin[]>(url, this.httpOptions);
  }

  public postVitamin(
    data: Vitamin
  ): Observable<Vitamin> {
    const url = `${this.REST_API_SERVER}/Vitamins`;
    return this.httpClient.post<Vitamin>(url, data,this.httpOptions);
  }

  public putVitamin(ma:number,
    data: Vitamin
  ): Observable<Vitamin> {
    const url = `${this.REST_API_SERVER}/Vitamins/${ma}`;
    return this.httpClient.put<Vitamin>(url, data,this.httpOptions);
  }

  public deleteVitamin(ma:number
  ): Observable<Vitamin> {
    const url = `${this.REST_API_SERVER}/Vitamins/${ma}`;
    return this.httpClient.delete<Vitamin>(url,this.httpOptions);
  }
  //#endregion

  //#region Loai nhan su
  public newLoaiNhanSu: LoaiNhanSu = {
    maLoaiNhanSu:0,
    tenLoaiNhanSu:"",
    ghiChu:""
  };
  public getLoaiNhanSus(): Observable<LoaiNhanSu[]> {
    const url = `${this.REST_API_SERVER}/LoaiNhanSus`;
    return this.httpClient.get<LoaiNhanSu[]>(url, this.httpOptions);
  }

  public postLoaiNhanSu(
    data: LoaiNhanSu
  ): Observable<LoaiNhanSu> {
    const url = `${this.REST_API_SERVER}/LoaiNhanSus`;
    return this.httpClient.post<LoaiNhanSu>(url, data,this.httpOptions);
  }

  public putLoaiNhanSu(ma:number,
    data: LoaiNhanSu
  ): Observable<LoaiNhanSu> {
    const url = `${this.REST_API_SERVER}/LoaiNhanSus/${ma}`;
    return this.httpClient.put<LoaiNhanSu>(url, data,this.httpOptions);
  }

  public deleteLoaiNhanSu(ma:number
  ): Observable<LoaiNhanSu> {
    const url = `${this.REST_API_SERVER}/LoaiNhanSus/${ma}`;
    return this.httpClient.delete<LoaiNhanSu>(url,this.httpOptions);
  }
  //#endregion

  //#region Chuc vu
  public newChucVu: ChucVu = {
    maChucVu:0,
    tenChucVu:"",
    ghiChu:"",
    maLoaiNhanSu:0,
    loaiNhanSu:this.newLoaiNhanSu
  };
  public getChucVus(maLoaiNhanSu:number): Observable<ChucVu[]> {
    const url = `${this.REST_API_SERVER}/ChucVus/LoaiNhanSu/${maLoaiNhanSu}`;
    return this.httpClient.get<ChucVu[]>(url, this.httpOptions);
  }

  public getAllChucVus(): Observable<ChucVu[]> {
    const url = `${this.REST_API_SERVER}/ChucVus`;
    return this.httpClient.get<ChucVu[]>(url, this.httpOptions);
  }

  public postChucVu(
    data: ChucVu
  ): Observable<ChucVu> {
    const url = `${this.REST_API_SERVER}/ChucVus`;
    return this.httpClient.post<ChucVu>(url, data,this.httpOptions);
  }

  public putChucVu(ma:number,
    data: ChucVu
  ): Observable<ChucVu> {
    const url = `${this.REST_API_SERVER}/ChucVus/${ma}`;
    return this.httpClient.put<ChucVu>(url, data,this.httpOptions);
  }

  public deleteChucVu(ma:number
  ): Observable<ChucVu> {
    const url = `${this.REST_API_SERVER}/ChucVus/${ma}`;
    return this.httpClient.delete<ChucVu>(url,this.httpOptions);
  }
  //#endregion

  //#region Nhan su
  public newNhanSu: NhanSu = {
    maNhanSu:"",
    ho:"",
    ten:"",
    gioiTinh:"",
    ngaySinh:new Date(),
    noiSinh:"",
    cmnd:"",
    ngayCap:new Date(),
    danToc:"",
    tonGiao:"",
    quocTich:"",
    ngayVaoTruong:new Date(),
    maPhongBan:0,
    trangThaiLamViec:"",
    lyDoThoiViec:"",
    ngayCapNhat:new Date(),
    maLoaiNhanSu:0,
    maChucVu:0,
    maKhoiLop:0,
    soDienThoai:"",
    email:"",
    hoKhau:"",
    diaChi:"",
    hinhAnh:"",
    matKhau:"",
    trangThaiTaiKhoan:"",
    phongBan:this.newPhongBan,
    loaiNhanSu:this.newLoaiNhanSu,
    chucVu:this.newChucVu,
    khoiLop:this.newKhoiLop,
  };
  public getNhanSus(): Observable<NhanSu[]> {
    const url = `${this.REST_API_SERVER}/NhanSus`;
    return this.httpClient.get<NhanSu[]>(url, this.httpOptions);
  }

  public postNhanSu(
    data: NhanSu
  ): Observable<NhanSu> {
    const url = `${this.REST_API_SERVER}/NhanSus`;
    return this.httpClient.post<NhanSu>(url, data,this.httpOptions);
  }

  public putNhanSu(ma:string,
    data: NhanSu
  ): Observable<NhanSu> {
    const url = `${this.REST_API_SERVER}/NhanSus/${ma}`;
    return this.httpClient.put<NhanSu>(url, data,this.httpOptions);
  }

  public deleteNhanSu(ma:string
  ): Observable<NhanSu> {
    const url = `${this.REST_API_SERVER}/NhanSus/${ma}`;
    return this.httpClient.delete<NhanSu>(url,this.httpOptions);
  }
  //#endregion

  //#region Nhan su
  public newPhieuTiemVaccine: PhieuTiemVaccine = {
    maVaccine:0,
    maHocSinh:"",
    ngayTiem:new Date(),
    vaccine:this.newVaccine,
    hocSinh:this.newHocSinh,
  };
  public getPhieuTiemVaccines(): Observable<PhieuTiemVaccine[]> {
    const url = `${this.REST_API_SERVER}/PhieuTiemVaccines`;
    return this.httpClient.get<PhieuTiemVaccine[]>(url, this.httpOptions);
  }

  public postPhieuTiemVaccine(
    data: PhieuTiemVaccine
  ): Observable<PhieuTiemVaccine> {
    const url = `${this.REST_API_SERVER}/PhieuTiemVaccines`;
    return this.httpClient.post<PhieuTiemVaccine>(url, data,this.httpOptions);
  }

  public putPhieuTiemVaccine(maVaccine:number, maHocSinh:string, ngayTiem:Date,
    data: PhieuTiemVaccine
  ): Observable<PhieuTiemVaccine> {
    const url = `${this.REST_API_SERVER}/PhieuTiemVaccines/${maVaccine}/${maHocSinh}/${ngayTiem}`;
    return this.httpClient.put<PhieuTiemVaccine>(url, data,this.httpOptions);
  }

  public deletePhieuTiemVaccine(maVaccine:number, maHocSinh:string, ngayTiem:Date,
  ): Observable<PhieuTiemVaccine> {
    const url = `${this.REST_API_SERVER}/PhieuTiemVaccines/${maVaccine}/${maHocSinh}/${ngayTiem}`;
    return this.httpClient.delete<PhieuTiemVaccine>(url,this.httpOptions);
  }
  //#endregion
}
