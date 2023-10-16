import { ItensOrcamento } from "@/@types/Orcamentos";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<ItensOrcamento>[] = [
    {
        accessorKey: "id",
        header: "Código"
    },
    {
        accessorKey: "descricao",
        header: "Decrição"
    },
    {
        accessorKey: "valorUnitario",
        header: "Valor unitário"
    },
    {
        accessorKey: "valorTotal",
        header: "Valor total"
    },
]