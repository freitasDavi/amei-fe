import { Cursos } from "@/@types/Cursos";
import { PaginationType } from "@/@types/Pagination";
import { CadastroCurso } from "@/components/Forms/Cursos/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Cursos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/title-component";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

async function fetchCursos(userId: number | undefined) {
    if (!userId) return;

    const res = await baseApi.get<PaginationType<Cursos>>('/cursos');

    return res.data;
}

export function CursosPage() {
    const [open, setOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const user = useAuthStore(state => state.userData);
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["cursos"],
        queryFn: () => fetchCursos(user?.id),
    })
    const [cursoSelecionado, setCursoSelecionado] = useState<Cursos | undefined>(undefined);

    let codigoCurso = searchParams.get('id');

    useEffect(() => {
        if (codigoCurso && data && !open) {
            const current = data.content.find(x => x.id == Number(codigoCurso));

            if (current) {
                setCursoSelecionado(current);
                setOpen(true);
            }
        }
    }, [codigoCurso]);

    return (
        <main className="w-full h-full px-10">
            <PageTitle titulo="Cursos" />
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da página de cursos">
                <Button onClick={() => refetch()} variant="default">Pesquisar</Button>
                <CadastroCurso pesquisar={refetch} data={cursoSelecionado} open={open} setOpen={setOpen} />
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