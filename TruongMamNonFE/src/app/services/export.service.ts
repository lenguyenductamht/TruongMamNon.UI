import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import  autoTable  from 'jspdf-autotable';
import '../fonts/micross-normal.js';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  public exportPdf(headers: any, data:any[], exportName: string) {
    if(!data||data.length===0){
      return;
    }
    if(!headers){
      return;
    }
    const doc = new jsPDF();
    const exportData:any[]=[];
    data.forEach((d)=>{
      const row:any[]=[];
      Object.keys(headers).forEach((key)=>{
        row.push(d[key]);
      });
      exportData.push(row);
    });
    autoTable(doc,{
      head:[headers],
      body:exportData,
      styles:{
        font:'micross',
        fontStyle:'normal',
      },
    });
    doc.save(exportName+ '_' + new Date().getTime()+ '.pdf');  
  }

  public exportExcel(data:any[], exportName: string) {
    if(!data||data.length===0){
      return;
    }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, exportName);
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
