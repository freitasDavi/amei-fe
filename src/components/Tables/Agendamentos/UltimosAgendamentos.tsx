import { Agendamentos } from "@/@types/Agendamentos";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "./data-table";
import { columnsHome } from "./columns";
import { PaginationType } from "@/@types/Pagination";

async function fetchLastAgendamentos(codigoUsuario?: number) {
    if (!codigoUsuario) return;

    const response = await baseApi.get<PaginationType<Agendamentos>>(`/agendamentos/ultimos/${codigoUsuario}`);

    return response.data;
}

export function UltimosAgendamentos() {
    const userData = useAuthStore(state => state.userData);
    const { data, isLoading } = useQuery({
        queryKey: ["UltimosAgendamentos"],
        queryFn: () => fetchLastAgendamentos(userData?.id)
    })

    if (isLoading) return <div>Carregando...</div>

    return (
        <div className="p-4 flex flex-col gap-4">
            <h1 className="text-xl text-primary-logo font-semibold dark:text-white">Últimos Agendamentos</h1>
            <DataTable
                data={data ? data.content : []}
                columns={columnsHome}
            />
        </div>
    )
}