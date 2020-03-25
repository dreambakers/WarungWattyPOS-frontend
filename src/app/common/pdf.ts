import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PDF {
    constructor() { }

    generatePdf(order) {
        const documentDefinition = this.getDocumentDefinition(order);
        pdfMake.createPdf(documentDefinition).download(order._id);
    }

    getDocumentDefinition(order) {

        return {
            content: [

                {
                    columns: [
                        {
                            text: "Warung Watty",
                            bold: true,
                        },
                        {
                            text: `Date: ${this.getParsedDate(order.createdAt)}`,
                            alignment: "right",
                        }
                    ]
                },
                '2135 Sunset Blvd',

                {
                    columns: [
                        {
                            text: "Los Angeles, CA 90026",
                        },
                        {
                            text: `OrderID: ${order._id}`,
                            alignment: "right",
                        }
                    ]
                },

                'P: (213) 484-6829',

                {
                    margin: [0, 20, 0, 20],
                    text: "Receipt",
                    bold: true,
                    fontSize: 20,
                },

                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['65%', '10%', '10%', '15%'],

                        body: this.getOrderDetails(order.items)
                    }
                },

            ]

        };
    }

    getOrderDetails(items) {
        let total = 0;

        let toReturn: any[] = [[{
            text: "Item",
            bold: true,
        },
        {
            text: "Quatity",
            bold: true,
        },
        {
            text: "Price",
            bold: true,
        },
        {
            text: "Total",
            bold: true,
        }]];

        for (const item of items) {
            const itemTotal = item.quantity * item.price;
            total += itemTotal;
            toReturn.push([item.name, item.quantity, `$${item.price}`, `$${itemTotal.toFixed(2)}`]);
        }

        toReturn.push(['', '', { text: 'Total', bold: true }, { text: `$${total.toFixed(2)}`, bold: true }]);

        return toReturn;
    }

    getParsedDate(date) {
        if (date) {
          return moment(date).format('MMMM Do YYYY, h:mm a');
        }
    }
}
