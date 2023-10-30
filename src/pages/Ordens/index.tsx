import { OrdemServico } from "@/@types/OrdemServico";
import { PaginationType } from "@/@types/Pagination";
import { columns } from "@/components/Tables/OrdemServico/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function fetchOrdens() {
    const response = await baseApi.get<PaginationType<OrdemServico>>("ordemServico")

    return response.data;
}

export function OrdemServicoLista() {
    const { data, refetch } = useQuery({
        queryKey: ["OrdensServico"],
        queryFn: () => fetchOrdens()
    });

    return (
        <main className="w-full h-full p-10">
            <h1 className="font-medium text-3xl text-primary-logo">Ordens de Serviço</h1>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da lisat">
                <Button onClick={() => refetch()} >Pesquisar</Button>

            </div>
            {data && (
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