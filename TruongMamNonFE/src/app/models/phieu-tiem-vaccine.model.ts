import { HocSinh } from "./hoc-sinh.model";
import { Vaccine } from "./vaccine.model";

export interface PhieuTiemVaccine{
    maVaccine:number;
    maHocSinh:string;
    ngayTiem:Date;
    vaccine:Vaccine;
    hocSinh:HocSinh;
}