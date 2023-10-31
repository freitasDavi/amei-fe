import { Orcamentos } from "@/@types/Orcamentos"
import { columns } from "@/components/Tables/Orcamentos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import { ArrowBendDownLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";



export function Orcamento() {
    const { toast } = useToast();
    const [data, setData] = useState<Orcamentos[]>([]);

    useEffect(() => {
        async function recuperarOrcamentos() {
            await onClickPesquisar();
        }

        recuperarOrcamentos();
    }, []);

    async function onClickPesquisar() {
        try {
            const res = await baseApi.get('/orcamentos');

            setData(res.data);
        } catch (err) {
            toast({
                title: 'Ops',
                variant: "destructive",
                description: "Algo não saiu como planejado"
            })
        }
    }

    return (
        <div className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <Link to="/home"><ArrowBendDownLeft size={20} weight="bold" className="text-primary-logo hover:text-primary-logo-dark" /></Link>
                <h1 className="font-medium text-3xl text-primary-logo">Orçamentos</h1>
            </div>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da Lista">
                <Button variant="default" type="button" onClick={onClickPesquisar}>Pesquisar</Button>
                <Link to="novo"><Button variant="default" type="button">Novo</Button></Link>
            </div>
            <section>
                {/* {data && ( */}
                <section className="mt-10">
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </section>
                {/* )} */}
            </section>
        </div>
    )
}