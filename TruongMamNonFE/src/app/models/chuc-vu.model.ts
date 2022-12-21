import { LoaiNhanSu } from "./loai-nhan-su.model";

export interface ChucVu{
    maChucVu:number;
    tenChucVu:string;
    ghiChu:string;
    maLoaiNhanSu:number;

    loaiNhanSu:LoaiNhanSu;
}