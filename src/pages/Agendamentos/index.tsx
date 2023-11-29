import { Agendamentos } from "@/@types/Agendamentos"
import { PaginationType } from "@/@types/Pagination";
import { CadastroAgendamento } from "@/components/Forms/Agendamentos/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Agendamentos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import { ParametrosAgendamentoRel } from "@/reports/forms/ParametrosAgendamentoRel";
import useAuthStore from "@/store/AuthStore";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

async function fetchAgendamentos(userId: number | undefined) {
    if (!userId) return;

    const res = await baseApi.get<PaginationType<Agendamentos>>('/agendamentos?filter=usuarioAgendamento=' + userId);

    return res.data;
}

export function AgendamentosPage() {
    const [open, setOpen] = useState(false);
    const user = useAuthStore(state => state.userData);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, refetch, isPending, isFetching } = useQuery({
        queryKey: ["agendamentos"],
        queryFn: () => fetchAgendamentos(user?.id),
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
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Agendamentos</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação do agendamento">
                <Button variant="default" type="button" onClick={() => refetch()}>Pesquisar</Button>
                <CadastroAgendamento pesquisar={refetch} open={open} setOpen={closeWindow} data={agendamentoSelecionado} />
                <ParametrosAgendamentoRel />
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