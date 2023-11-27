import { baseApi } from "@/lib/api";


export async function exportCSV() {
    const response = await baseApi.post('/orcamentos/downloadCsvPorDatas/', {
        dataInicio: new Date(2023, 10, 17),
        dataFim: new Date()
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orcamentos.csv');
    link.click();

}