import { PaginationType } from "@/@types/Pagination";
import { Servicos } from "@/@types/Servicos";
import { CadastroServico } from "@/components/Forms/Servicos/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Servicos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";

async function fetchServicos(userId: number | undefined) {
    if (!userId) return;

    const res = await baseApi.get<PaginationType<Servicos>>(`/servicos?codigoUsuario=${userId}`);

    return res.data;
}


export function ListarServicos() {
    const [open, setOpen] = useState(false);
    const user = useAuthStore(state => state.userData);
    const { data, isFetching, refetch } = useQuery({
        queryKey: ['servicos'],
        queryFn: () => fetchServicos(user?.id)
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
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Serviços</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da Lista">
                <Button variant="default" type="button" onClick={() => refetch()}>Pesquisar</Button>
                <CadastroServico pesquisar={refetch} open={open} setOpen={setOpen} data={servicoSelecionado} />
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