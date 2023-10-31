import { Cursos } from "@/@types/Cursos";
import { CadastroCurso } from "@/components/Forms/Cursos/Cadastro";
import { columns } from "@/components/Tables/Cursos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        <main className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Cursos</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da página de cursos">
                <Button onClick={onClickPesquisar} variant="default">Pesquisar</Button>
                <CadastroCurso pesquisar={onClickPesquisar} />
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