import { OrdemServico } from "@/@types/OrdemServico";
import { PaginationType } from "@/@types/Pagination";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/OrdemServico/columns";
import { DataTable } from "@/components/Tables/CheckBoxDataTable";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

async function fetchOrdens() {
    const response = await baseApi.get<PaginationType<OrdemServico>>("ordemServico")

    return response.data;
}

export function OrdemServicoLista() {
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState<OrdemServico | null>(null);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["OrdensServico"],
        queryFn: () => fetchOrdens(),
        refetchOnWindowFocus: false
    });

    const onClickEmitirNf = () => {
        if (selectedRow) {
            navigate(`/ordens/emissaoNF/${selectedRow.id}`)

            return;
        }

        setOpenDialog(true);
    }

    return (
        <main className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Ordens de serviço</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da lisat">
                <Button onClick={() => refetch()} >Atualizar dados</Button>
                <Link to="/ordens/novo"><Button>Novo</Button></Link>
                <Button onClick={onClickEmitirNf} type="button">Emitir nota fiscal</Button>
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
                            Para emitir uma nota fiscal de serviço, é necessário selecionar um item da tabela.
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