import { Servicos } from "@/@types/Servicos";
import { Pen } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";


export const columns: ColumnDef<Servicos>[] = [
    {
        accessorKey: "descricaoServico",
        header: "Descrição"
    },
    {
        accessorKey: "valorServico",
        header: "Valor"
    },
    {
        accessorKey: "codigoCNAE",
        header: "CNAE"
    },
    {
        accessorKey: "id",
        header: 'Ações',
        cell: (props) => (
            <div>
                <Link to={`/servicos?id=${props.getValue()}`} className="text-primary-logo hover:text-primary-logo-dark">
                    <Pen size={20} weight="fill" />
                </Link>
            </div>
        ),
        enableSorting: false,
        enableHiding: false
    }
]