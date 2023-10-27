

import { Clientes } from "@/@types/Clients";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { maskCnpj, maskPhone } from "@/utils/masks";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";


export const columns: ColumnDef<Clientes>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="border-slate-400"
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
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
    }
]