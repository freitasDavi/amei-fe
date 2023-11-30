import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from '@/lib/pdf/vfs_fonts';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getFiltro, getTitulo, header, rodape } from "./index";
import { maskCnpj, maskPhone } from "@/utils/masks";

type Report = {
    filtro: {
        periodo?: string
    }
    data: DadosRel[]
}

export type DadosRel = {
    cnpjCliente: string,
    nomeCliente: string,
    telefoneCliente: string,
    totalAgendamentos: number
}


(pdfMake as any).vfs = pdfFonts.default;

export async function AgendamentosPDF({ data, filtro }: Report) {
    // (pdfMake as any).vfs = pdfMake.vfs;

    const dados = data?.map((agendamento) => {
        return [
            { text: agendamento.nomeCliente, fontSize: 9, margin: [0, 2, 0, 2] },
            // { text: format(new Date(agendamento.dataAgendamento), 'dd/MM/yyyy', { locale: ptBR }), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: maskCnpj(agendamento.cnpjCliente), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: maskPhone(agendamento.telefoneCliente), fontSize: 9, margin: [0, 2, 0, 2] },
            { text: agendamento.totalAgendamentos, fontSize: 9, margin: [0, 2, 20, 2] }
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
                        { text: 'Nome', style: 'tableHeader', fontSize: 10, },
                        { text: 'CNPJ', style: 'tableHeader', fontSize: 10 },
                        { text: 'Telefone', style: 'tableHeader', fontSize: 10 },
                        { text: 'Total de agendamentos', style: 'tableHeader', fontSize: 10 }
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
            title: `RelatórioDeAgendamentos-${new Date()}`
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
        content: [getTitulo('Agendamentos por clientes'), filtro && getFiltro(filtro.periodo!), tabela],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).download(`RelatórioDeAgendamentos-${format(new Date(), 'dd-MM-yyyy', { locale: ptBR })}`);
}