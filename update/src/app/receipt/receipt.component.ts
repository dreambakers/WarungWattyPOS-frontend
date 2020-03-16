import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
