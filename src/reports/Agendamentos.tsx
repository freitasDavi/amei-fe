import { Agendamentos } from "@/@types/Agendamentos";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"
import { TDocumentDefinitions, Content } from "pdfmake/interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getState } from "@/store/AuthStore";

type Report = {
    filtro: Object
    data: Agendamentos[]
}

export async function AgendamentosPDF({ data }: Report) {
    const client = getState().userData;
    var today = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle: Content = [
        {
            columns: [
                {
                    text: 'Criciúma, ' + today,
                    fontSize: 10,
                },
                {
                    text: client?.username!,
                    alignment: 'right',
                    bold: true,
                    fontSize: 12,
                }
            ],
            color: 'white',
            margin: [15, 20, 25, 200],
        }];

    const dados = data?.map((agendamento) => {
        return [
            { text: agendamento.responsavelAgendamento, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: format(new Date(agendamento.dataAgendamento), 'dd/MM/yyyy', { locale: ptBR }), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: agendamento.enderecoAgendamento, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: agendamento.agendamentoCidade.nomeCidade, fontSize: 9, margin: [0, 2, 0, 2] },

        ]
    });

    const details = [
        {
            marginTop: 20,
            marginRight: 15,
            marginBottom: 10,
            marginLeft: 15,
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
                columns: [
                    {
                        text: 'Emitido por amei - https://amei.onrender.com/',
                        margin: [10, 10, 0, 10],
                    },
                    {
                        text: `${currentPage.toString()} / ${totalPages.toString()}`,
                        alignment: 'right',
                        margin: [0, 10, 20, 0]
                    }
                ],
                color: 'white',
                fontSize: 9,
            }
        ]
    };

    const titulo: Content = {
        text: 'Relatório de agendamentos',
        alignment: 'center',
        color: "white",
        fontSize: 16,
        bold: true
    }

    const filtroRel: Content = {
        text: 'Filtro: 18/10/2023 - 25/12/2023',
        fontSize: 10,
        margin: [15, 20, 0, 0]
    };

    const docDefinitions: TDocumentDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        background: function () {
            return {
                canvas: [
                    {
                        type: 'rect',
                        x: 0, y: 0, w: 595.28, h: 80.89,
                        color: '#1e40af'
                    },
                    {
                        type: 'rect',
                        x: 0, y: 800, w: 595.28, h: 41.89,
                        color: '#1e40af'
                    }
                ]
            };
        },
        header: [reportTitle],
        content: [titulo, filtroRel, ...details],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).download();
}