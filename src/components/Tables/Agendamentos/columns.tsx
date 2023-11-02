import { Agendamentos } from "@/@types/Agendamentos";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";



export const columns: ColumnDef<Agendamentos>[] = [
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
        accessorKey: "responsavelAgendamento",
        header: "Responsável"
    },
    {
        accessorFn: (row) => format(new Date(row.dataAgendamento), "dd/MM/yyyy HH:mm", { locale: ptBR }),

        header: "Data agendamento"
    },
    {
        accessorKey: "enderecoAgendamento",
        header: "Endereço"
    },
    {
        accessorFn: (row) => row.agendamentoCidade.nomeCidade,
        header: "Cidade"
    },
    // {
    // accessorFn: (row) => row.clienteAgendamento.nomeCliente,
    // header: "Cliente?"
    // }
]


export const columnsHome: ColumnDef<Agendamentos>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <p>Visualizar</p>
        ),
        accessorKey: "id",
        cell: (props) => (
            <Link to={`/agendamentos/${props.getValue()}`}>
                <MagnifyingGlass className="text-primary-logo hover:text-primary-logo-dark" size={20} weight="bold" />
            </Link>
        ),
    },
    {
        accessorKey: "responsavelAgendamento",
        header: "Responsável"
    },
    {
        accessorFn: (row) => format(new Date(row.dataAgendamento), "dd/MM/yyyy HH:mm", { locale: ptBR }),

        header: "Data agendamento"
    },
    {
        accessorKey: "enderecoAgendamento",
        header: "Endereço"
    },
    {
        accessorFn: (row) => row.agendamentoCidade.nomeCidade,
        header: "Cidade"
    }
]