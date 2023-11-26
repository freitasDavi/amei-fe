import { OrdemServicoCad } from "@/@types/OrdemServico";
import { OrdensForm } from "@/components/Forms/Ordens/OrdensForm";
import { baseApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


async function fetchOrdem(id: number): Promise<undefined | OrdemServicoCad> {
    if (!id) return undefined;

    var response = await baseApi.get<OrdemServicoCad>(`/ordemServico/${id}`);

    return response.data;
}

export function NovaOrdem() {
    let { id } = useParams();
    const { data } = useQuery({
        queryKey: ['OrdemServico', Number(id)],
        queryFn: () => fetchOrdem(Number(id)),
        refetchOnWindowFocus: false,
    })

    return (
        <div className="p-10">
            <h1 className="font-sans font-medium text-3xl text-primary-logo">Nova ordem de serviço</h1>
            <section>
                <OrdensForm ordem={data} />
            </section>
        </div>
    )
}