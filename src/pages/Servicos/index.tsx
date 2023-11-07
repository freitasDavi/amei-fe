import { Servicos } from "@/@types/Servicos";
import { CadastroServico } from "@/components/Forms/Servicos/Cadastro";
import { Loading } from "@/components/Loading";
import { columns } from "@/components/Tables/Servicos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

async function fetchServicos(userId: number | undefined) {
    if (!userId) return [];

    const res = await baseApi.get<Servicos[]>('/servicos');

    return res.data;
}


export function ListarServicos() {
    const user = useAuthStore(state => state.userData);
    const { data, isFetching, refetch } = useQuery({
        queryKey: ['servicos'],
        queryFn: () => fetchServicos(user?.id)
    })

    return (
        <div className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Serviços</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da Lista">
                <Button variant="default" type="button" onClick={() => refetch()}>Pesquisar</Button>
                <CadastroServico />
            </div>
            <section>
                {isFetching ? (
                    <div className="flex-1 flex justify-center"><Loading /></div>
                ) : data && (
                    <section className="mt-10">
                        <DataTable
                            columns={columns}
                            data={data}
                        />
                    </section>
                )}
            </section>
        </div>
    )
}