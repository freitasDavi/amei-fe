import { Clientes } from "@/@types/Clients"
import { PaginationType } from "@/@types/Pagination";
import { CadastroCliente } from "@/components/Forms/Clientes/Cadastro";
import { columns } from "@/components/Tables/Clients/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function fetchClientes() {
    const response = await baseApi.get<PaginationType<Clientes>>("clientes");

    return response.data;
}

export function Client() {
    const { data, refetch } = useQuery({
        queryKey: ['Clientes'],
        queryFn: () => fetchClientes()
    })


    return (
        <main className="w-full h-full p-10">
            <h1 className="font-medium text-3xl text-primary-logo">Clientes</h1>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da lista">
                <Button onClick={() => refetch()} variant="default" type="button">Pesquisar</Button>
                <CadastroCliente pesquisar={refetch} />
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