import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { EmissaoOrdem } from "@/@types/OrdemServico";
import { getTitulo, rodape } from "..";
import { format } from "date-fns";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { ptBR } from "date-fns/locale";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export async function OrdensPDF({ data }: { data: EmissaoOrdem }) {


    const dados = data.itensOrdemServicos.map(i => {
        return [
            {
                text: i.descricaoItemOrdem, border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left'
            },
            {
                text: i.quantidade, border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left'
            },
            {
                text: 'R$ ' + i.valorUnitario + ',00', border: [false, false, false, true],
                fillColor: '#f5f5f5',
                alignment: 'right',
                margin: [0, 5, 0, 5]
            },
            {
                text: 'R$ ' + i.valorTotal + ',00', border: [false, false, false, true],
                fillColor: '#f5f5f5',
                alignment: 'right',
                margin: [0, 5, 0, 5]
            }
        ]
    });

    var header2: any = {
        columns: [
            {
                image: 'data:image/png;base64,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',
                width: 150,
            },
            [
                {
                    text: 'Ordem de serviço',
                    color: '#333333',
                    width: '*',
                    fontSize: 28,
                    bold: true,
                    alignment: 'right',
                    margin: [0, 0, 0, 15],
                },
                {
                    stack: [
                        {
                            columns: [
                                {
                                    text: 'Recibo nº.',
                                    color: '#aaaaab',
                                    bold: true,
                                    width: '*',
                                    fontSize: 12,
                                    alignment: 'right',
                                },
                                {
                                    text: '00001',
                                    bold: true,
                                    color: '#333333',
                                    fontSize: 12,
                                    alignment: 'right',
                                    width: 100,
                                },
                            ],
                        },
                        {
                            columns: [
                                {
                                    text: 'Date de emissão',
                                    color: '#aaaaab',
                                    bold: true,
                                    width: '*',
                                    fontSize: 12,
                                    alignment: 'right',
                                },
                                {
                                    text: format(new Date(data.dataEmissaoOrdemServico), 'dd/MM/yyyy', { locale: ptBR }),
                                    bold: true,
                                    color: '#333333',
                                    fontSize: 12,
                                    alignment: 'right',
                                    width: 100,
                                },
                            ],
                        }
                    ],
                },
            ],
        ],
    }

    const dePara: any = [{
        // DePara
        columns: [
            {
                text: 'De',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
            },
            {
                text: 'Para',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
            },
        ],
    },
    {
        columns: [
            {
                text: data.usuarioOrdem.razaoSocialUsuario,
                bold: true,
                color: '#333333',
                alignment: 'left',
            },
            {
                text: data.clienteOrdem.nomeCliente,
                bold: true,
                color: '#333333',
                alignment: 'left',
            },
        ],
    },
    {
        columns: [
            {
                text: 'Endereço',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
            },
            {
                text: 'Endereço',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
            },
        ],
    },
    {
        columns: [
            {
                text: `${data.usuarioOrdem.enderecoUsuario} - ${data.usuarioOrdem.numeroUsuario}`,
                style: 'invoiceBillingAddress',
            },
            {
                text: `${data.clienteOrdem.enderecoCliente} - ${data.clienteOrdem.numeroCliente}`,
                style: 'invoiceBillingAddress',
            },
        ],
    },
        '\n\n']

    const tabela2: any = {
        layout: {
            defaultBorder: false,
            hLineWidth: function (i: any, node: any) {
                return 1;
            },
            vLineWidth: function (i: any, node: any) {
                return 1;
            },
            hLineColor: function (i: any, node: any) {
                if (i === 1 || i === 0) {
                    return '#bfdde8';
                }
                return '#eaeaea';
            },
            vLineColor: function (i: any, node: any) {
                return '#eaeaea';
            },
            hLineStyle: function (i: any, node: any) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
            },
            // vLineStyle: function (i: any, node: any) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i: any, node: any) {
                return 10;
            },
            paddingRight: function (i: any, node: any) {
                return 10;
            },
            paddingTop: function (i: any, node: any) {
                return 2;
            },
            paddingBottom: function (i: any, node: any) {
                return 2;
            },
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
                return '#fff';
            },
        },
        table: {
            headerRows: 1,
            widths: ['*', '*', 80, 80],
            body: [
                [
                    {
                        text: 'Descrição',
                        fillColor: '#eaf2f5',
                        border: [false, true, false, true],
                        margin: [0, 5, 0, 5],
                        textTransform: 'uppercase',
                    },
                    {
                        text: 'Quantidade',
                        fillColor: '#eaf2f5',
                        border: [false, true, false, true],
                        margin: [0, 5, 0, 5],
                        textTransform: 'uppercase',
                    },
                    {
                        text: 'Valor unitário',
                        border: [false, true, false, true],
                        alignment: 'right',
                        fillColor: '#eaf2f5',
                        margin: [0, 5, 0, 5],
                        textTransform: 'uppercase',
                    },
                    {
                        text: 'Valor Total',
                        border: [false, true, false, true],
                        alignment: 'right',
                        fillColor: '#eaf2f5',
                        margin: [0, 5, 0, 5],
                        textTransform: 'uppercase',
                    },
                ],
                ...dados
            ],
        },
    }

    const total: any = ['\n',
        '\n\n',
        {
            layout: {
                defaultBorder: false,
                hLineWidth: function (i: any, node: any) {
                    return 1;
                },
                vLineWidth: function (i: any, node: any) {
                    return 1;
                },
                hLineColor: function (i: any, node: any) {
                    return '#eaeaea';
                },
                vLineColor: function (i: any, node: any) {
                    return '#eaeaea';
                },
                hLineStyle: function (i: any, node: any) {
                    // if (i === 0 || i === node.table.body.length) {
                    return null;
                    //}
                },
                // vLineStyle: function (i: any, node: any) { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: function (i: any, node: any) {
                    return 10;
                },
                paddingRight: function (i: any, node: any) {
                    return 10;
                },
                paddingTop: function (i: any, node: any) {
                    return 3;
                },
                paddingBottom: function (i: any, node: any) {
                    return 3;
                },
                fillColor: function (rowIndex: any, node: any, columnIndex: any) {
                    return '#fff';
                },
            },
            table: {
                headerRows: 1,
                widths: ['*', 'auto'],
                body: [
                    [
                        {
                            text: 'Valor total',
                            bold: true,
                            fontSize: 20,
                            alignment: 'right',
                            border: [false, false, false, true],
                            margin: [0, 5, 0, 5],
                        },
                        {
                            text: 'R$ ' + data.valorTotal + ',00',
                            bold: true,
                            fontSize: 20,
                            alignment: 'right',
                            border: [false, false, false, true],
                            fillColor: '#f5f5f5',
                            margin: [0, 5, 0, 5],
                        },
                    ],
                ],
            },
        },
        '\n\n']

    const docDefinitions: TDocumentDefinitions = {
        info: {
            title: `Orçamento-${new Date()}`
        },
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        background: function () {
            return {
                canvas: [
                    {
                        type: 'rect',
                        x: 0, y: 800, w: 595.28, h: 41.89,
                        color: '#1e40af'
                    }
                ]
            };
        },
        // header: [header],
        content: [getTitulo('Orçamento'), header2, dePara,
            tabela2, total],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).download(`Orçamento-${format(new Date(), 'dd-MM-yyyy', { locale: ptBR })}`);
}