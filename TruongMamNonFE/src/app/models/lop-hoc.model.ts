import { KhoiLop } from "./khoi-lop.model";
import { NienHoc } from "./nien-hoc.model";

export interface LopHoc{
    maLop:number;
    tenLop:string;
    maKhoiLop:number;
    hocPhi: number;
    maNienHoc:number;
    khoiLop:KhoiLop;
    nienHoc: NienHoc;
}