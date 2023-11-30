import { Orcamentos } from "@/@types/Orcamentos";
import { OrcamentoForm } from "@/components/Forms/Orcamento/OrcamentoForm";
import { PageTitle } from "@/components/ui/title-component";
import { baseApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

async function fetchOrcamento(id: number): Promise<undefined | Orcamentos> {
    if (!id) return undefined;

    var response = await baseApi.get<Orcamentos>(`/orcamentos/${id}`);

    return response.data;

}

export function NovoOrcamento() {
    let { id } = useParams();
    const { data } = useQuery({
        queryKey: ['Orcamentos', Number(id)],
        queryFn: () => fetchOrcamento(Number(id))
    })

    let tituloDaPagina = id ? 'Edição do orçamento' : 'Novo orçamento';

    return (
        <div className="p-10">
            <PageTitle titulo={tituloDaPagina} link="/orcamentos" />
            <section>
                <OrcamentoForm orcamento={data} />
            </section>
        </div>
    )
}