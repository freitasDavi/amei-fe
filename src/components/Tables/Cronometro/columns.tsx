import { Cronometro } from "@/@types/Cronometro";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { baseApi } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";


export const columns: ColumnDef<Cronometro>[] = [
    {
        accessorKey: "nome",
        header: "Nome"

    },
    {
        accessorFn: (row) => format(new Date(row.inicio), "dd/MM/yyyy HH:mm", { locale: ptBR }),
        header: "Início"
    },
    {
        accessorFn: (row) => format(new Date(row.fim), "dd/MM/yyyy HH:mm", { locale: ptBR }),
        header: "Fim"
    },
    {
        accessorKey: "completo",
        cell: (props) => {
            if (props.getValue()) return <p className="px-2 py-1 bg-green-200 text-slate-500 rounded-lg w-16 flex justify-center">Sim</p>;

            return <p className="px-2 py-1 bg-red-200 text-slate-500 rounded-lg w-16 flex justify-center">Não</p>;
        },
        header: "Completo"
    },
    {
        header: 'Actions',
        accessorKey: "id",
        cell: (props) => {
            const queryClient = useQueryClient();

            if (props.row.getValue('completo')) return null;

            const onClickStop = async () => {
                await baseApi.put(`/cronometro/pararCronometro/${props.getValue()}`);

                queryClient.invalidateQueries({
                    predicate: (query) => {
                        return ['CronometrosAtivos', 'Cronometros'].includes(query.queryKey[0] as string);
                    }
                });
            }

            return (
                <div className="flex gap-2">
                    <Button variant="destructive" onClick={onClickStop} size="sm">
                        Parar
                    </Button>
                </div>
            )
        }
    }
]