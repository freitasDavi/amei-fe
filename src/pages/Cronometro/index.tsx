import { CadastroCronometro } from "@/components/Forms/Cronometro/Cadastro";
import { columns } from "@/components/Tables/Cronometro/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
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

    const { data, isFetching } = useQuery({
        queryKey: ["Cronometros"],
        queryFn: () => fetchCronometros(userData.id)
    })

    if (isFetching) return <div>Carregando...</div>

    return (
        <div className="w-full h-full px-10">
            <h1 className="font-medium text-3xl text-primary-logo">Cronômetros realizados</h1>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da lista">
                <CadastroCronometro />
            </div>
            {data && (
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