import { Clients } from "@/@types/Clients"
import { columns } from "@/components/Tables/Clients/columns";
import { DataTable } from "@/components/Tables/Clients/data-table";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import { useEffect, useState } from "react"


export function Client() {
    const { toast } = useToast();
    const [data, setData] = useState<Clients[]>();

    useEffect(() => {

        baseApi.get("/testes")
            .then((response) => setData(response.data))
            .then(() => toast({
                title: "Sucesso",
                variant: "success",
                description: "Registros recuperados com sucesso",
                duration: 1000,
            }))
            .catch((err) => toast({
                title: "Ops",
                variant: "destructive",
                description: "Algo não saiu como planejado"
            }));



    }, []);


    return (
        <main className="flex flex-col w-[90%] h-screen text-white mx-auto p-20 gap-10">
            <h1 className="text-3xl font-black leading-tight text-indig-500">Clientes</h1>
            {data && (
                <section>
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </section>
            )}
        </main>
    )
}