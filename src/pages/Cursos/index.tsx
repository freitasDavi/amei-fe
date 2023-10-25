import { Cursos } from "@/@types/Cursos";
import { CadastroCurso } from "@/components/Forms/Cursos/Cadastro";
import { columns } from "@/components/Tables/Cursos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import { useState } from "react";


export function CursosPage() {
    const { toast } = useToast();
    const [data, setData] = useState<Cursos[]>();

    async function onClickPesquisar() {
        try {
            const res = await baseApi.get('/cursos');

            setData(res.data.content);
        } catch (err) {
            toast({
                title: 'Ops',
                variant: "destructive",
                description: "Algo de errado não deu certo!"
            })
        }
    }

    return (
        <main className="w-full h-full px-10 py-10">
            <h1 className="font-medium text-3xl text-primary-logo">Cursos</h1>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da página de cursos">
                <Button onClick={onClickPesquisar} variant="default">Pesquisar</Button>
                <CadastroCurso />
                {/* TODO: Cadastro de cursos */}
            </div>
            <section>
                <section className="mt-10">
                    <DataTable
                        columns={columns}
                        data={data ? data : []}
                    />
                </section>
            </section>
        </main>
    )
}