export interface AddNhanSuRequest {
  maNhanSu: string;
  ho: string;
  ten: string;
  maGioiTinh: string;
  ngaySinh: Date;
  noiSinh: string | null;
  cmnd: string;
  ngayCap: Date | null;
  maDanToc: string;
  maTonGiao: string;
  maQuocTich: string;
  ngayVaoTruong: Date;
  maPhongBan: number;
  maTrangThaiLamViec: string;
  lyDoThoiViec: string | null;
  ngayCapNhat: Date;
  maLoaiNhanSu: number;
  maChucVu: number | null;
  maKhoiLop: number | null;
  soDienThoai: string | null;
  email: string | null;
  hoKhau: string | null;
  diaChi: string | null;
  matKhau: string;
  maTrangThaiTaiKhoan: string;
}
