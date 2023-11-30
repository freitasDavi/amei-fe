import { baseApi } from "@/lib/api";


export async function exportCSV() {
    const response = await baseApi.get('/ordemServico/downloadCsv/');

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ordemServico.csv');
    link.click();
}

export async function exportCSVComPeriodo(
    { dataInicio, dataFim }:
        { dataInicio: Date, dataFim: Date }
) {
    const response = await baseApi.post('/ordemServico/downloadCsvPorDatas/', {
        dataInicio: dataInicio,
        dataFim: dataFim
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ordemServico.csv');
    link.click();
}