import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getFiltro, getTitulo, header, rodape } from "../index";
import { maskPhone } from "@/utils/masks";
import { OrcamentosTable } from "@/@types/Orcamentos";

type Report = {
    filtro: {
        periodo?: string
    }
    data: OrcamentosTable[]
}

// const pdfFonts = {
//     // download default Roboto font from cdnjs.com
//     Roboto: {
//       normal:
//         "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf",
//       bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf",
//       italics:
//         "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf",
//       bolditalics:
//         "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf",
//     },
//   };


(pdfMake as any).vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

export async function OrcamentoPDF({ data, filtro }: Report) {

    const dados = data?.map((orcamento) => {
        return [
            { text: format(new Date(orcamento.dataEmissaoOrcamento!), 'dd/MM/yyyy', { locale: ptBR }), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: format(new Date(orcamento.dataValidadeOrcamento!), 'dd/MM/yyyy', { locale: ptBR }), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: orcamento.observacoesOrcamento, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: maskPhone(orcamento.telefoneCliente), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orcamento.valorTotalDoOrcamento), fontSize: 9, margin: [0, 2, 20, 2], alignment: 'right' },

        ]
    });

    const tabela = [
        {
            marginTop: 35,
            marginRight: 15,
            marginBottom: 10,
            marginLeft: 15,
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Emissão', style: 'tableHeader', fontSize: 10, },
                        { text: 'Validade', style: 'tableHeader', fontSize: 10 },
                        { text: 'Observações', style: 'tableHeader', fontSize: 10 },
                        { text: 'Telefone', style: 'tableHeader', fontSize: 10 },
                        { text: 'Valor total', style: 'tableHeader', fontSize: 10 },
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


    const docDefinitions: TDocumentDefinitions = {
        info: {
            title: `OrçamentosRealizados-${new Date()}`
        },
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
        header: [header],
        content: [getTitulo('Orçamentos realizados'), filtro && getFiltro(filtro.periodo!), tabela],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).download(`OrçamentosRealizados-${format(new Date(), 'dd-MM-yyyy', { locale: ptBR })}`);
}