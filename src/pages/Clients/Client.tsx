import { Clientes } from "@/@types/Clients"
import { PaginationType } from "@/@types/Pagination";
import { CadastroCliente } from "@/components/Forms/Clientes/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Clients/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/ui/search-filter";
import { PageTitle } from "@/components/ui/title-component";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

async function fetchClientes(id: number | undefined, filtro?: string) {
    if (!id) return;

    var filtroNome = "";

    if (filtro) {
        filtroNome = `?filter=nomeCliente%2Blike%2B${filtro.toLowerCase()}`
    }

    const response = await baseApi.get<PaginationType<Clientes>>("clientes" + filtroNome);

    return response.data;
}

export function Client() {
    const [open, setOpen] = useState(false);
    const [filtro, setFiltro] = useState("");
    const user = useAuthStore(state => state.userData);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ['Clientes'],
        queryFn: () => fetchClientes(user?.id, filtro),
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
            <PageTitle titulo="Clientes" />
            <div className="w-full flex items-baseline justify-between my-10">
                <SearchFilter
                    value={filtro} setValue={setFiltro} pesquisar={refetch} placeholder="Nome"
                />
                <div className="w-full flex justify-end gap-4" id="list-bar" aria-label="Navegação da lista">
                    <CadastroCliente pesquisar={refetch} open={open} setOpen={setOpen} data={clienteSelecionado} />
                </div>
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