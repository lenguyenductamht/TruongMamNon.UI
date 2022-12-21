import { KhoiLop } from "./khoi-lop.model";
import { LopHoc } from "./lop-hoc.model";

export interface HocSinh{
    maHocSinh:string;
    ho:string;
    ten:string;
    gioiTinh:string;
    maKhoiLop:number;
    maLopHoc:number;
    ngayNhapHoc:Date;
    trangThaiHoc:string;
    lyDoNghiHoc:string;
    ngayCapNhat:Date;
    ngaySinh:Date;
    noiSinh:string;
    danToc:string;
    tonGiao:string;
    quocTich:string;
    ghiChu:string;
    hoKhau:string;
    diaChi:string;
    hinhAnh:string;
    matKhau:string;
    trangThaiTaiKhoan:string;

    hoTenPhuHuynh:string;
    namSinhPhuHuynh:Date;
    cmndPhuHuynh:string;
    sdtPhuHuynh:string;
    ngheNghiepPhuHuynh:string;
    emailPhuHuynh:string;
    diaChiPhuHuynh:string;

    khoiLop:KhoiLop;
    lopHoc:LopHoc;
}