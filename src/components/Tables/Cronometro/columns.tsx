import { Cronometro } from "@/@types/Cronometro";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";


export const columns: ColumnDef<Cronometro>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="border-slate-400"
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Selecionar todos"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Selecionar serviço"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Código
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
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
    }
]