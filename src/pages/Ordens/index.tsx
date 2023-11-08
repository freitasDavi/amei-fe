import { OrdemServico } from "@/@types/OrdemServico";
import { PaginationType } from "@/@types/Pagination";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/OrdemServico/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

async function fetchOrdens() {
    const response = await baseApi.get<PaginationType<OrdemServico>>("ordemServico")

    return response.data;
}

export function OrdemServicoLista() {
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["OrdensServico"],
        queryFn: () => fetchOrdens()
    });

    return (
        <main className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Ordens de serviço</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da lisat">
                <Button onClick={() => refetch()} >Pesquisar</Button>

            </div>
            {isFetching ? (
                <div className="flex-1 flex justify-center"><Loading /></div>
            ) : data && (
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