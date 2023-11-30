import { getState } from "@/store/AuthStore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Content } from "pdfmake/interfaces";

const client = getState().userData;
var today = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

const header: Content = [
    {
        columns: [
            {
                text: 'Criciúma, ' + today,
                fontSize: 10,
            },
            {
                // text: client?.username!,
                text: "JOSEFINO",
                alignment: 'right',
                bold: true,
                fontSize: 12,
            }
        ],
        color: 'white',
        margin: [15, 20, 25, 200],
    }];

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

function getTitulo(tituloRel: string) {
    const titulo: Content = {
        text: `${tituloRel}`,
        alignment: 'center',
        color: "white",
        fontSize: 16,
        bold: true
    }

    return titulo;
}

function getFiltro(filtro: string) {

    if (!filtro) {
        return {} as Content
    }

    const filtroRel: Content = {
        text: `Período: ${filtro}`,
        fontSize: 10,
        margin: [15, 20, 0, 0]
    };

    return filtroRel;
}



export { rodape, getTitulo, header, getFiltro }