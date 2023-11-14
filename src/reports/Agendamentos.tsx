import { Agendamentos } from "@/@types/Agendamentos";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"
import { TDocumentDefinitions, Content } from "pdfmake/interfaces";


type Report = {
    data: Agendamentos[]
}

export function AgendamentosPDF({ data }: Report) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle: Content = [
        {
            text: 'Agendamentos',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]
        }
    ];

    const dados = data?.map((agendamento) => {
        return [
            { text: agendamento.responsavelAgendamento, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: agendamento.dataAgendamento, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: agendamento.enderecoAgendamento, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: agendamento.agendamentoCidade.nomeCidade, fontSize: 9, margin: [0, 2, 0, 2] },

        ]
    });

    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Responsável', style: 'tableHeader', fontSize: 10, },
                        { text: 'Data agendamento', style: 'tableHeader', fontSize: 10 },
                        { text: 'Endereço', style: 'tableHeader', fontSize: 10 },
                        { text: 'Cidade', style: 'tableHeader', fontSize: 10 },
                    ],
                    ...dados
                ]
            },
            layout: 'lightHorizontalLines'
            // {
            //     fillColor: function (rowIndex: number) {
            //         if (rowIndex === 0) return "#1772C1";
            //         return (rowIndex % 2 === 0) ? "#CCCCCC" : null
            //     }
            // }
        }
    ];

    const rodape = function (currentPage: number, totalPages: number): Content {
        return [
            {
                text: `${currentPage.toString()} / ${totalPages.toString()}`,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]
            }
        ]
    };

    const docDefinitions: TDocumentDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).download();
}