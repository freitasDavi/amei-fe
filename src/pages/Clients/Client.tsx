import { Clientes } from "@/@types/Clients"
import { PaginationType } from "@/@types/Pagination";
import { CadastroCliente } from "@/components/Forms/Clientes/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Clients/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

async function fetchClientes(id: number | undefined) {
    if (!id) return;

    const response = await baseApi.get<PaginationType<Clientes>>("clientes");

    return response.data;
}

export function Client() {
    const [open, setOpen] = useState(false);
    const user = useAuthStore(state => state.userData);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ['Clientes'],
        queryFn: () => fetchClientes(user?.id),
        refetchOnWindowFocus: false,
    })
    const [searchParams] = useSearchParams();
    const [clienteSelecionado, setClienteSelecionado] = useState<Clientes | undefined>(undefined);
    let idSelecionado = searchParams.get('id');

    useEffect(() => {
        if (data && idSelecionado && !open) {
            let current = data.content.find(x => x.id == Number(idSelecionado));

            if (current) {
                setClienteSelecionado(current);
                setOpen(true);
            }
        }
    }, [idSelecionado]);

    return (
        <main className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Clientes</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da lista">
                <Button onClick={() => refetch()} variant="default" type="button">Pesquisar</Button>
                <CadastroCliente pesquisar={refetch} open={open} setOpen={setOpen} data={clienteSelecionado} />
            </div>
            {isFetching ? (
                <div className="flex-1 flex justify-center">
                    <Loading />
                </div>
            )
                : data && (
                    <section>
                        <DataTable
                            columns={columns}
                            data={data.content}
                        />
                    </section>
                )}
        </main>
    )
}