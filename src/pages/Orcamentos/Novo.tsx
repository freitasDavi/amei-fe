import { Orcamentos } from "@/@types/Orcamentos";
import { OrcamentoForm } from "@/components/Forms/Orcamento/OrcamentoForm";
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

    return (
        <div className="p-10">
            <h1 className="font-sans font-medium text-3xl text-primary-logo">Novo orçamento</h1>
            <section>
                <OrcamentoForm orcamento={data} />
            </section>
        </div>
    )
}