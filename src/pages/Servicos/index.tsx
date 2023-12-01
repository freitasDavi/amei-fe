import { PaginationType } from "@/@types/Pagination";
import { Servicos } from "@/@types/Servicos";
import { CadastroServico } from "@/components/Forms/Servicos/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Servicos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/ui/search-filter";
import { PageTitle } from "@/components/ui/title-component";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

async function fetchServicos(userId: number | undefined, filtro: string) {
    if (!userId) return;

    var filtroNome = "";

    if (filtro) {
        filtroNome = `?filter=descricaoServico%2Blike%2B${filtro.toLowerCase()}`
    }


    const res = await baseApi.get<PaginationType<Servicos>>('/servicos' + filtroNome);

    return res.data;
}


export function ListarServicos() {
    const [filtro, setFiltro] = useState("");
    const [open, setOpen] = useState(false);
    const user = useAuthStore(state => state.userData);
    const { data, isFetching, refetch } = useQuery({
        queryKey: ['servicos'],
        queryFn: () => fetchServicos(user?.id, filtro)
    })
    const [searchParams] = useSearchParams();
    const [servicoSelecionado, setServicoSelecionado] = useState<Servicos | undefined>();
    let codigoServico = searchParams.get('id');

    useEffect(() => {
        if (codigoServico && data && !open) {
            let current = data.content.find(x => x.id == Number(codigoServico));

            if (current) {
                setServicoSelecionado(current);
                setOpen(true);
            }
        }
    }, [codigoServico]);

    return (
        <div className="w-full h-full px-10">
            <PageTitle titulo="Serviços" />
            <div className="w-full flex items-baseline justify-between my-10">
                <SearchFilter
                    value={filtro} setValue={setFiltro} pesquisar={refetch} placeholder="Nome"
                />
                <div className="w-full flex justify-end gap-4" id="list-bar" aria-label="Navegação da Lista">
                    <CadastroServico pesquisar={refetch} open={open} setOpen={setOpen} data={servicoSelecionado} />
                </div>
            </div>
            <section>
                {isFetching ? (
                    <div className="flex-1 flex justify-center"><Loading /></div>
                ) : data != undefined && (
                    <section className="mt-10">
                        <DataTable
                            columns={columns}
                            data={data.content}
                        />
                    </section>
                )}
            </section>
        </div>
    )
}