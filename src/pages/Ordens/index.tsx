import { EmissaoOrdem, OrdemServico } from "@/@types/OrdemServico";
import { PaginationType } from "@/@types/Pagination";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/OrdemServico/columns";
import { DataTable } from "@/components/Tables/CheckBoxDataTable";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { OrdensPDF } from "@/reports/ordens/OrdensEx";
import { PageTitle } from "@/components/ui/title-component";
import { ParametrosOrdemRel } from "@/reports/forms/ParametrosOrdemRel";
import { SearchFilter } from "@/components/ui/search-filter";

async function fetchOrdens(filtro: string) {

    var filtroNome = "";

    // TODO: Falar com o bruno sobre as associações querydsl cliente.NomeCliente
    if (filtro) {
        filtroNome = `?filter=observacoesOrcamento%2Blike%2B${filtro.toLowerCase()}`
    }


    const response = await baseApi.get<PaginationType<OrdemServico>>("ordemServico")

    return response.data;
}

export function OrdemServicoLista() {
    const [filtro, setFiltro] = useState("");
    const [dialogText, setDialogText] = useState("Selecione uma ordem de serviço para emitir nota fiscal");
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState<OrdemServico | null>(null);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["OrdensServico"],
        queryFn: () => fetchOrdens(filtro),
        refetchOnWindowFocus: false
    });

    const onClickEmitirNf = () => {
        if (selectedRow) {
            navigate(`/ordens/emissaoNF/${selectedRow.id}`)

            return;
        }

        setDialogText("Selecione uma ordem de serviço para emitir nota fiscal");
        setOpenDialog(true);
    }

    const onClickExportarOrdedm = async () => {
        if (selectedRow) {
            const res = await baseApi.get<EmissaoOrdem>(`/ordemServico/emitirOrdem/${selectedRow.id}`);

            OrdensPDF({
                data: res.data
            })

            return;
        }

        setDialogText("Selecione uma ordem de serviço para exportar");
        setOpenDialog(true);
    }

    return (
        <main className="w-full h-full px-10">
            <PageTitle titulo="Ordens de serviço" />
            <div className="w-full flex items-baseline justify-between my-10">
                <SearchFilter
                    value={filtro} setValue={setFiltro} pesquisar={refetch} placeholder="Nome"
                />
                <div className="w-full flex justify-end gap-4" id="list-bar" aria-label="Navegação da lisat">
                    <Link to="/ordens/novo"><Button>Novo</Button></Link>
                    <Button onClick={onClickEmitirNf} type="button">Emitir nota fiscal</Button>
                    <Button type="button" onClick={onClickExportarOrdedm}>Exportar dados</Button>
                    <ParametrosOrdemRel />
                </div>
            </div>
            {isFetching ? (
                <div className="flex-1 flex justify-center"><Loading /></div>
            ) : data && (
                <section>
                    <DataTable
                        setSelectedRow={setSelectedRow}
                        columns={columns}
                        data={data.content}
                    />
                </section>
            )}
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Opa</AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogText}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction>Selecionar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    )
}