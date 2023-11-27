import { CadastroCronometro } from "@/components/Forms/Cronometro/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Cronometro/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Cronômetros realizados</h1>
            </div>
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