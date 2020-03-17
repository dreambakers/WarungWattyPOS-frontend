import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('hello world');

    window.scrollTo(0, 0); 


    var data = document.getElementById('print');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 15, 10)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });

  }


  //   printReceipt() {
  //     this.timestamp = Date.now();

  //     const documentDefinition = this.getDocumentDefinition();
  //     pdfMake.createPdf(documentDefinition).download();
  //   }

  //   getDocumentDefinition() {

  //     sessionStorage.setItem('record', JSON.stringify(this.record));
  //     return {

  //       info: {
  //         title: 'RECEIPT'
  //       },
  //       content: [
  //         {
  //           text: 'RECEIPT',
  //           bold: true,
  //           fontSize: 20,
  //           alignment: 'center',
  //           margin: [0, 0, 0, 20]
  //         },
  //         {
  //           columns: [
  //             [{
  //               text: this.record.restaurant,
  //               style: 'name'
  //             }
  //           ]
  //         }],
  //       styles: {
  //         name: {
  //           fontSize: 16,
  //           bold: true
  //         },
  //         header: {
  //           fontSize: 18,
  //           bold: true,
  //           margin: [0, 20, 0, 10],
  //           decoration: 'underline'
  //         }
  //       }
  //     };
  //   }

}
