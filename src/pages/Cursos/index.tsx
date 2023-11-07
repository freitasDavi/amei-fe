import { Cursos } from "@/@types/Cursos";
import { CadastroCurso } from "@/components/Forms/Cursos/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Cursos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

async function fetchCursos(userId: number | undefined) {
    if (!userId) return;

    const res = await baseApi.get('/cursos');

    return res.data;
}

export function CursosPage() {
    const user = useAuthStore(state => state.userData);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["cursos"],
        queryFn: () => fetchCursos(user?.id),
    })

    return (
        <main className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Cursos</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da página de cursos">
                <Button onClick={() => refetch()} variant="default">Pesquisar</Button>
                <CadastroCurso pesquisar={refetch} />
            </div>
            <section>
                <section className="mt-10">
                    {isFetching ? (
                        <div className="flex-1 flex justify-center"><Loading /></div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={data ? data.content : []}
                        />
                    )}
                </section>
            </section>
        </main>
    )
}