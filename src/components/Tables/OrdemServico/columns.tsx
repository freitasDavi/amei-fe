import { OrdemServico } from "@/@types/OrdemServico";
import { Checkbox } from "@/components/ui/checkbox";
import { maskPhone } from "@/utils/masks";
import { Pen } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";


export const columns: ColumnDef<OrdemServico>[] = [
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
                aria-label="Selecionar ordem"
            />
        ),
        enableSorting: false,
        enableHiding: false
    }, {
        accessorKey: "id",
        header: "Código"
    }, {
        header: "Status",
        accessorFn: (row) => {
            if (row.statusOrdemServico == 1) return "Aguardando Emissão";

            return "Nota emitida";
        }
    }, {
        header: "Telefone responsável",
        accessorFn: (row) => maskPhone(row.telefoneOrdem)
    }, {
        accessorKey: "valorTotal",
        header: "Valor"
    }, {
        accessorFn: (row) => row.clienteOrdem.nome,
        header: "Cliente"
    }, {
        accessorKey: "id",
        header: 'Ações',
        cell: (props) => (
            <div>
                <Link to={`/ordens/edit/${props.getValue()}`} className="text-primary-logo hover:text-primary-logo-dark">
                    <Pen size={20} weight="fill" />
                </Link>
            </div>
        ),
        enableSorting: false,
        enableHiding: false
    }
];