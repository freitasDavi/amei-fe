import { OrcamentoForm } from "@/components/Forms/Orcamento/OrcamentoForm";



export function NovoOrcamento() {
    return (
        <div className="p-10">
            <h1 className="font-sans font-medium text-3xl text-primary-logo">Novo orçamento</h1>
            <section>
                <OrcamentoForm />
            </section>
        </div>
    )
}