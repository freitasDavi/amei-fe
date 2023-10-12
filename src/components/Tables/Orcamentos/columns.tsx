import { Orcamentos } from "@/@types/Orcamentos";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<Orcamentos>[] = [
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
                aria-label="Selecionar orçamento"
            />
        ),
        enableSorting: false,
        enableHiding: false
    }, {
        accessorKey: "dataEmissaoOrcamento",
        header: "Data de emissão"
    }, {
        accessorKey: "dataValidadeOrcamento",
        header: "Data de validade"
    }, {
        accessorKey: "observacoesOrcamento",
        header: "Observações"
    }, {
        accessorKey: "telefoneClienteOrcamento",
        header: "Telefone"
    }, {
        accessorKey: "valorTotalDoOrcamento",
        header: "Valor total"
    }
];