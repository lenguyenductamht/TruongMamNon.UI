import { ChucVu } from "./chuc-vu.model";
import { KhoiLop } from "./khoi-lop.model";
import { LoaiNhanSu } from "./loai-nhan-su.model";
import { PhongBan } from "./phong-ban.model";

export interface NhanSu{
    maNhanSu:string;
    ho:string;
    ten:string;
    gioiTinh:string;
    ngaySinh:Date;
    noiSinh:string;
    cmnd:string;
    ngayCap:Date;
    danToc:string;
    tonGiao:string;
    quocTich:string;
    ngayVaoTruong:Date;
    maPhongBan:number;
    trangThaiLamViec:string;
    lyDoThoiViec:string;
    ngayCapNhat:Date;
    maLoaiNhanSu:number;
    maChucVu:number;
    maKhoiLop:number;
    soDienThoai:string;
    email:string;
    hoKhau:string;
    diaChi:string;
    hinhAnh:string;
    matKhau:string;
    trangThaiTaiKhoan:string;

    phongBan:PhongBan;
    loaiNhanSu:LoaiNhanSu;
    chucVu:ChucVu;
    khoiLop:KhoiLop;
}