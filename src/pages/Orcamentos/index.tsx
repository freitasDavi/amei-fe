import { Orcamentos } from "@/@types/Orcamentos"
import { PaginationType } from "@/@types/Pagination";
import { exportCSV } from "@/api/Orcamento";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Orcamentos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

async function fetchOrcamentos(userId: number | undefined) {
    if (!userId) return;

    const res = await baseApi.get<PaginationType<Orcamentos>>('/orcamentos');

    return res.data;
}

export function Orcamento() {
    const user = useAuthStore(state => state.userData);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ['orcamentos'],
        queryFn: () => fetchOrcamentos(user?.id)
    })

    return (
        <div className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Orçamentos</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da Lista">
                <Button variant="default" type="button" onClick={() => refetch()}>Pesquisar</Button>
                <Link to="novo"><Button variant="default" type="button">Novo</Button></Link>
                <Button variant="default" type="button" onClick={() => exportCSV()}>Exportar CSV</Button>
            </div>
            {isFetching ? (
                <div className="flex-1 flex justify-center"><Loading /></div>
            ) : (
                <section className="mt-10">
                    <DataTable
                        columns={columns}
                        data={data ? data.content : []}
                    />
                </section>
            )}

        </div>
    )
}