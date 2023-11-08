

import { Clientes } from "@/@types/Clients";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { maskCnpj, maskPhone } from "@/utils/masks";
import { Pen } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";


export const columns: ColumnDef<Clientes>[] = [
    {
        accessorKey: "nomeCliente",
        header: "Nome"
    },
    {
        accessorFn: (row) => maskCnpj(row.cnpjCliente),
        header: "CNPJ"
    },
    {
        accessorFn: (row) => maskPhone(row.telefoneCliente),
        header: "Telefone",

    },
    {
        accessorKey: "emailCliente",
        header: "Email"
    },
    {
        accessorKey: "id",
        header: 'Ações',
        cell: (props) => (
            <div>
                {/* <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Selecionar serviço"
                /> */}
                <Link to={`/clientes?id=${props.getValue()}`} className="text-primary-logo hover:text-primary-logo-dark">
                    <Pen size={20} weight="fill" />
                </Link>
            </div>
        ),
        enableSorting: false,
        enableHiding: false
    },
]