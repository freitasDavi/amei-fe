import { OrcamentosTable } from "@/@types/Orcamentos";
import { Checkbox } from "@/components/ui/checkbox";
import { maskPhone } from "@/utils/masks";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


export const columns: ColumnDef<OrcamentosTable>[] = [
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
        accessorFn: (row) => format(new Date(row.dataEmissaoOrcamento!), "dd/MM/yyyy", { locale: ptBR }),
        header: "Data de emissão"
    }, {
        accessorKey: "dataValidadeOrcamento",
        accessorFn: (row) => format(new Date(row.dataValidadeOrcamento!), "dd/MM/yyyy", { locale: ptBR }),
        header: "Data de validade"
    }, {
        accessorKey: "observacoesOrcamento",
        header: "Observações"
    }, {
        accessorKey: "telefoneCliente",
        accessorFn: (row) => maskPhone(row.telefoneCliente),
        header: "Telefone"
    }, {
        accessorKey: "valorTotalDoOrcamento",
        header: "Valor total",
        accessorFn: (row) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.valorTotalDoOrcamento)
    }
];