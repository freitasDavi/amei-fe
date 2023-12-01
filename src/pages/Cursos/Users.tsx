import { Cursos } from "@/@types/Cursos";
import { PaginationType } from "@/@types/Pagination";
import { CursoCard } from "@/components/CursoCard";
import { Loading } from "@/components/Loading";
import { baseApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function fetchCursos() {

    const res = await baseApi.get<PaginationType<Cursos>>('/cursos');

    return res.data;
}


export function CursosUser() {
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["cursos"],
        queryFn: fetchCursos,
    })

    return (
        <section className="">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Cursos em destaque para MEIs!</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Confira abaixo alguns cursos profissionalizantes e gratuítos que selecionamos para você:</p>
                </div>
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                    {isFetching ? (
                        <Loading />
                    ) : (
                        data?.content.map(curso => (
                            <CursoCard
                                key={curso.id}
                                dataCurso={curso.data} descricao={curso.descricao} nomeCurso={curso.nome} urlCurso={curso.url}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}