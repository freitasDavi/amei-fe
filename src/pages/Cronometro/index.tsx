import { CadastroCronometro } from "@/components/Forms/Cronometro/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Cronometro/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/ui/search-filter";
import { PageTitle } from "@/components/ui/title-component";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchCronometros(codigoUsuario: number, filtro: string) {

    var filtroNome = "";

    if (filtro) {
        filtroNome = `?filter=nome%2Blike%2B${filtro.toLowerCase()}`
    }

    // TODO: Ajustar findAll no back

    const response = await baseApi.get(`/cronometro/${codigoUsuario}`);

    return response.data;
}

export function CronometroPage() {
    const [filtro, setFiltro] = useState("");
    const userData = useAuthStore(state => state.userData);

    if (!userData) return null;

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["Cronometros"],
        queryFn: () => fetchCronometros(userData.id, filtro),
        refetchOnWindowFocus: false
    })

    if (isFetching) return <div>Carregando...</div>

    return (
        <div className="w-full h-full px-10">
            <PageTitle titulo="Relógios executados" />
            <div className="w-full flex items-baseline justify-between my-10">
                <SearchFilter
                    value={filtro} setValue={setFiltro} pesquisar={refetch} placeholder="Nome"
                />
                <div className="w-full flex justify-end gap-4" id="list-bar" aria-label="Navegação da lista">
                    <CadastroCronometro />
                </div>
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