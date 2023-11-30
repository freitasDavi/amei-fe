import { baseApi } from "@/lib/api";

export async function exportAgendamentosCSV() {
    const response = await baseApi.get('/agendamentos/downloadCsv');

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'agendamentos.csv');
    link.click();
}

export async function exportAgendamentosCSVComPeriodo({ dataInicio, dataFim }: { dataInicio: Date, dataFim: Date }) {
    const response = await baseApi.post('/agendamentos/downloadCsvPorDatas', {
        dataInicio: dataInicio.toISOString(),
        dataFim: dataFim.toISOString(),
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'agendamentos.csv');
    link.click();
}