import { Agendamentos } from "@/@types/Agendamentos";
import { MagnifyingGlass, Pen } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";



export const columns: ColumnDef<Agendamentos>[] = [
    {
        accessorKey: "responsavelAgendamento",
        header: "Responsável"
    },

    {
        accessorKey: "nomeAgendamento",
        header: "Descrição"
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
    {
        accessorKey: "id",
        header: 'Ações',
        cell: (props) => (
            <div>
                <Link to={`/agendamentos?id=${props.getValue()}`} className="text-primary-logo hover:text-primary-logo-dark">
                    <Pen size={20} weight="fill" />
                </Link>
            </div>
        ),
        enableSorting: false,
        enableHiding: false
    }
]


export const columnsHome: ColumnDef<Agendamentos>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <p>Visualizar</p>
        ),
        accessorKey: "id",
        cell: (props) => (
            <Link to={`/agendamentos/?id=${props.getValue()}`}>
                <MagnifyingGlass className="text-primary-logo hover:text-primary-logo-dark dark:text-white dark:hover:text-slate-300" size={20} weight="bold" />
            </Link>
        ),
    },
    {
        accessorKey: "responsavelAgendamento",
        header: "Responsável"
    },
    {
        accessorFn: (row) => format(new Date(row.dataAgendamento), "dd/MM/yyyy", { locale: ptBR }),

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