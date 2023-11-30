import { CadastroCronometro } from "@/components/Forms/Cronometro/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Cronometro/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/title-component";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";

async function fetchCronometros(codigoUsuario: number) {
    const response = await baseApi.get(`/cronometro/${codigoUsuario}`);

    return response.data;
}

export function CronometroPage() {
    const userData = useAuthStore(state => state.userData);

    if (!userData) return null;

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["Cronometros"],
        queryFn: () => fetchCronometros(userData.id),
        refetchOnWindowFocus: false
    })

    if (isFetching) return <div>Carregando...</div>

    return (
        <div className="w-full h-full px-10">
            <PageTitle titulo="Relógios executados" />
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da lista">
                <Button variant="default" type="button" onClick={() => refetch()}>Pesquisar</Button>
                <CadastroCronometro />
            </div>
            {isFetching ? (
                <div className="flex-1 flex justify-center"><Loading /></div>
            ) : data && (
                <section>
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </section>
            )}
        </div>
    )
}