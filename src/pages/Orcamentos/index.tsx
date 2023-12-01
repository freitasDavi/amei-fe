import { EmissaoOrc, OrcamentosTable } from "@/@types/Orcamentos"
import { PaginationType } from "@/@types/Pagination";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Orcamentos/columns";
import { DataTable } from "@/components/Tables/CheckBoxDataTable";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { OrcamentoPDF } from "@/reports/orcamento/OrcamentoEx";
import { PageTitle } from "@/components/ui/title-component";
import { ParametrosOrcamentoRel } from "@/reports/forms/ParametrosOrcamentoRel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { SearchFilter } from "@/components/ui/search-filter";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

async function fetchOrcamentos(userId: number | undefined, filtro?: string) {
    if (!userId) return;

    var filtroNome = "";

    if (filtro) {
        filtroNome = `?filter=observacoesOrcamento%2Blike%2B${filtro.toLowerCase()}`
    }

    const res = await baseApi.get<PaginationType<OrcamentosTable>>('/orcamentos' + filtroNome);

    return res.data;
}

export function Orcamento() {
    const [openDialog, setOpenDialog] = useState(false);
    const [filtroNome, setFiltroNome] = useState("");
    const [selectedRow, setSelectedRow] = useState<OrcamentosTable | null>(null);
    const user = useAuthStore(state => state.userData);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ['orcamentos'],
        queryFn: () => fetchOrcamentos(user?.id, filtroNome),
        refetchOnWindowFocus: false
    })
    const { toast } = useToast();
    const navigate = useNavigate();

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

    const onClickGerarOrdemDeServico = async () => {
        try {
            if (selectedRow) {
                const res = await baseApi.post<number>(`/ordemServico/gerarOrdem/${selectedRow.id}`);

                navigate(`/ordens/edit/${res.data}`);

                return;
            }

            setOpenDialog(true);

        } catch (err) {
            if (err instanceof AxiosError) {

                if (err.response?.data.message) {
                    toast({
                        title: 'Ops',
                        variant: "destructive",
                        description: err.response?.data.message
                    })

                    return;
                }

                toast({
                    title: 'Ops',
                    variant: "destructive",
                    description: err.message
                })

                return;
            }

            toast({
                title: 'Ops',
                variant: "destructive",
                description: "Algo não saiu como planejado"
            })
        }
    }

    return (
        <div className="w-full h-full px-10">
            <PageTitle titulo="Orçamentos" />
            <div className="w-full flex items-baseline justify-between my-10">
                <SearchFilter
                    value={filtroNome} setValue={setFiltroNome} pesquisar={refetch} placeholder="Observações"
                />
                <div className="w-full flex gap-4 justify-end" id="list-bar" aria-label="Navegação da Lista">
                    <Link to="novo"><Button variant="default" type="button">Novo</Button></Link>
                    <Button variant="default" type="button" onClick={onClickExportarOrcamento}>Gerar PDF</Button>
                    <ParametrosOrcamentoRel />
                    <Button variant="default" type="button" onClick={onClickGerarOrdemDeServico}>Gerar ordem</Button>
                </div>

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
                            Para realizar a ação, é necessário selecionar um item da tabela.
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