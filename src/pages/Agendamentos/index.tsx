import { Agendamentos } from "@/@types/Agendamentos"
import { PaginationType } from "@/@types/Pagination";
import { CadastroAgendamento } from "@/components/Forms/Agendamentos/Cadastro";
import { columns } from "@/components/Tables/Agendamentos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import { useEffect, useState } from "react"

export function AgendamentosPage() {
    const { toast } = useToast();
    const [data, setData] = useState<Agendamentos[]>([]);

    useEffect(() => {
        async function recuperarAgendamentos() {
            onClickPesquisar()
        }

        recuperarAgendamentos();
    }, []);

    async function onClickPesquisar() {
        try {
            const res = await baseApi.get<PaginationType<Agendamentos>>('/agendamentos');

            setData(res.data.content);

        } catch (err) {
            toast({
                title: "Ops",
                variant: "destructive",
                description: "Algo não saiu como planejado"
            });
        }
    }

    return (
        <div className="w-full h-full px-10">
            <h1 className="font-medium text-3xl text-primary-logo">Agendamentos</h1>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação do agendamento">
                <Button variant="default" type="button" onClick={onClickPesquisar}>Pesquisar</Button>
                <CadastroAgendamento pesquisar={onClickPesquisar} />
            </div>
            <section className="mt-10">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </section>
        </div>
    )
}