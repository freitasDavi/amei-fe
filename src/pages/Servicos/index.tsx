import { Servicos } from "@/@types/Servicos";
import { CadastroServico } from "@/components/Forms/Servicos/Cadastro";
import { columns } from "@/components/Tables/Servicos/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import { useEffect, useState } from "react"



export function ListarServicos() {
    const { toast } = useToast();
    const [data, setData] = useState<Servicos[]>();

    useEffect(() => {
        async function recuperarServicos() {
            try {
                const res = await baseApi.get('/servicos');

                setData(res.data);
                toast({
                    title: "Sucesso",
                    variant: "success",
                    description: "Registros recuperados com sucesso",
                    duration: 5000
                });

            } catch (err) {
                toast({
                    title: 'Ops',
                    variant: "destructive",
                    description: "Algo não saiu como planejado"
                })
            }
        }

        recuperarServicos();
    }, []);

    async function onClickPesquisar() {
        try {
            const res = await baseApi.get('/servicos');

            setData(res.data);
            toast({
                title: "Sucesso",
                variant: "success",
                description: "Registros recuperados com sucesso",
                duration: 5000
            });

        } catch (err) {
            toast({
                title: 'Ops',
                variant: "destructive",
                description: "Algo não saiu como planejado"
            })
        }
    }

    return (
        <div className="w-full h-full px-10 py-10">
            <h1 className="font-medium text-3xl text-primary-logo">Listagem de serviços</h1>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da Lista">
                <Button variant="default" type="button" onClick={onClickPesquisar}>Pesquisar</Button>
                <CadastroServico />
            </div>
            <section>
                {data && (
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