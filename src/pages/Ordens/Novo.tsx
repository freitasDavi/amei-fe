import { OrdemServicoCad } from "@/@types/OrdemServico";
import { OrdensForm } from "@/components/Forms/Ordens/OrdensForm";
import { PageTitle } from "@/components/ui/title-component";
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

    let tituloDaPagina = id ? 'Edição de ordem de serviço' : 'Nova ordem de serviço';

    return (
        <div className="p-10">
            <PageTitle
                titulo={tituloDaPagina}
                link="/ordens"
            />
            <section>
                <OrdensForm ordem={data} />
            </section>
        </div>
    )
}