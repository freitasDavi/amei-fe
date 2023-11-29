import { EmissaoOrc, OrcamentosTable } from "@/@types/Orcamentos"
import { PaginationType } from "@/@types/Pagination";
import { exportCSV } from "@/api/Orcamento";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Orcamentos/columns";
import { DataTable } from "@/components/Tables/CheckBoxDataTable";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { OrcamentoPDF } from "@/reports/orcamento/OrcamentoEx";

async function fetchOrcamentos(userId: number | undefined) {
    if (!userId) return;

    const res = await baseApi.get<PaginationType<OrcamentosTable>>('/orcamentos');

    return res.data;
}

export function Orcamento() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<OrcamentosTable | null>(null);
    const user = useAuthStore(state => state.userData);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ['orcamentos'],
        queryFn: () => fetchOrcamentos(user?.id),
        refetchOnWindowFocus: false
    })

    const onClickExportarOrcamento = async () => {
        if (selectedRow) {
            const res = await baseApi.get<EmissaoOrc>(`/orcamentos/emitirOrc/${selectedRow.id}`);

            OrcamentoPDF({
                data: res.data
            })

            return;
        }

        setOpenDialog(true);
    }

    return (
        <div className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Orçamentos</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da Lista">
                <Button variant="default" type="button" onClick={() => refetch()}>Pesquisar</Button>
                <Link to="novo"><Button variant="default" type="button">Novo</Button></Link>
                <Button variant="default" type="button" onClick={onClickExportarOrcamento}>Gerar PDF</Button>
                <Button variant="default" type="button" onClick={() => exportCSV()}>Exportar dados</Button>
            </div>
            {isFetching ? (
                <div className="flex-1 flex justify-center"><Loading /></div>
            ) : (
                <section className="mt-10">
                    <DataTable
                        setSelectedRow={setSelectedRow}
                        columns={columns}
                        data={data ? data.content : []}
                    />
                </section>
            )}
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Opa</AlertDialogTitle>
                        <AlertDialogDescription>
                            Para emitir uma nota fiscal de serviço, é necessário selecionar um item da tabela.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction>Selecionar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}