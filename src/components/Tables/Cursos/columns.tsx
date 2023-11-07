import { Cursos } from "@/@types/Cursos";
import { Pen } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";


export const columns: ColumnDef<Cursos>[] = [
    {
        accessorKey: "nome",
        header: "Nome"

    },
    {
        accessorKey: "descricao",
        header: "Descrição"
    },
    {
        accessorKey: "data",
        header: "Data"
    },
    {
        accessorKey: "nomeCidade",
        header: "Cidade"
    },
    {
        accessorKey: "id",
        header: 'Ações',
        cell: (props) => (
            <div>
                <Link to={`/cursos?id=${props.getValue()}`} className="text-primary-logo hover:text-primary-logo-dark">
                    <Pen size={20} weight="fill" />
                </Link>
            </div>
        ),
        enableSorting: false,
        enableHiding: false
    }
]