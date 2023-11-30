import { Agendamentos } from "@/@types/Agendamentos"
import { PaginationType } from "@/@types/Pagination";
import { CadastroAgendamento } from "@/components/Forms/Agendamentos/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Agendamentos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/ui/search-filter";
import { PageTitle } from "@/components/ui/title-component";
import { baseApi } from "@/lib/api";
import { ParametrosAgendamentoRel } from "@/reports/forms/ParametrosAgendamentoRel";
import useAuthStore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

async function fetchAgendamentos(userId: number | undefined, filtro?: string) {
    if (!userId) return;

    var filtroNome = "";

    if (filtro) {
        filtroNome = `?filter=nomeAgendamento%2Blike%2B${filtro.toLowerCase()}`
    }

    const res = await baseApi.get<PaginationType<Agendamentos>>('/agendamentos' + filtroNome);

    return res.data;
}

export function AgendamentosPage() {
    const [open, setOpen] = useState(false);
    const [filtro, setFiltro] = useState("");
    const user = useAuthStore(state => state.userData);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, refetch, isPending, isFetching } = useQuery({
        queryKey: ["agendamentos"],
        queryFn: () => fetchAgendamentos(user?.id, filtro),
        refetchOnWindowFocus: false
    });
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamentos | undefined>(undefined);

    let idSelecionado = searchParams.get('id');

    useEffect(() => {

        if (data && idSelecionado && !open) {
            let current = data.content.find(x => x.id == Number(searchParams.get('id')));

            if (current) {
                setAgendamentoSelecionado(current);
                setOpen(true);
            }

        }

    }, [idSelecionado]);

    const closeWindow = (newValue: boolean) => {
        setSearchParams("");
        setOpen(newValue);
    }

    return (
        <div className="w-full h-full px-10">
            <PageTitle titulo="Agendamentos" />
            <div className="w-full flex items-baseline justify-between my-10">
                <SearchFilter
                    value={filtro} setValue={setFiltro} pesquisar={refetch} placeholder="Nome"
                />
                <div className="w-full flex justify-end gap-4" id="list-bar" aria-label="Navegação do agendamento">
                    <CadastroAgendamento pesquisar={refetch} open={open} setOpen={closeWindow} data={agendamentoSelecionado} />
                    <ParametrosAgendamentoRel />
                </div>
            </div>
            <section className="mt-10">
                {isPending || isFetching ? (
                    <div className="w-full flex justify-center">
                        <Loading />
                    </div>
                ) : data != undefined && (
                    <DataTable
                        columns={columns}
                        data={data.content}
                    />
                )}

            </section>
        </div>
    )
}