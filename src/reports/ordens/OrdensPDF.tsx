import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getFiltro, getTitulo, header, rodape } from "../index";
import { maskPhone } from "@/utils/masks";
import { OrdemServico } from "@/@types/OrdemServico";
import { ENUM_STATUS_EMISSAO } from "@/utils/enums";

type Report = {
    filtro: {
        periodo?: string
    }
    data: OrdemServico[]
}

(pdfMake as any).vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

export async function OrdensPDF({ data, filtro }: Report) {

    const dados = data?.map((ordem) => {
        return [
            { text: ENUM_STATUS_EMISSAO(ordem.statusOrdemServico), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: ordem.clienteOrdem.nome, fontSize: 9, margin: [0, 2, 0, 2] },
            { text: maskPhone(ordem.telefoneOrdem), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ordem.valorTotal), fontSize: 9, margin: [0, 2, 20, 2], alignment: 'right' },

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
                widths: ['*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Status', style: 'tableHeader', fontSize: 10, },
                        { text: 'Cliente', style: 'tableHeader', fontSize: 10 },
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
            title: `OrdensRealizadas-${new Date()}`
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
        content: [getTitulo('Ordens de serviço realizadas'), filtro && getFiltro(filtro.periodo!), tabela],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).download(`OrdensRealizadas-${format(new Date(), 'dd-MM-yyyy', { locale: ptBR })}`);
}