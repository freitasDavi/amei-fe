import { ItensOrcamento } from "@/@types/Orcamentos";
import { columns } from "@/components/Tables/Orcamentos/Itens/columns";
import { DataTable } from "@/components/Tables/Servicos/data-table";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod"

const schemaItemOrc = z.object({
    id: z.coerce.number().optional(),
    valorUnitario: z.coerce.number(),
    valorTotal: z.coerce.number().optional(),
    descricao: z.string(),
    quantidade: z.coerce.number(),
    codigoOrcamento: z.coerce.number().optional()
});

type itemOrcSchema = z.infer<typeof schemaItemOrc>;


type Props = {
    items: ItensOrcamento[],
    codigoOrcamento?: number;
    setItems: (item: ItensOrcamento) => void;
}

export function OrcamentoItemForm({ items, codigoOrcamento, setItems }: Props) {
    const [data, setData] = useState<itemOrcSchema>({} as itemOrcSchema);

    async function handleSalvarItemOrcamento() {
        var newItem: ItensOrcamento = {
            descricao: data.descricao,
            valorTotal: data.valorTotal!,
            valorUnitario: data.valorUnitario,
        }

        if (codigoOrcamento) {
            newItem.codigoOrcamento = codigoOrcamento;

            return;
        }

        setItems(newItem);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event?.target.name]: event.target.value
        });
    }

    // Calcula o valor total do item!
    useEffect(() => {
        if (data.quantidade && data.valorUnitario) {
            setData({
                ...data,
                valorTotal: data.quantidade * data.valorUnitario
            })
        }
    }, [data.quantidade, data.valorUnitario]);

    return (
        <section>
            <div className="flex justify-evenly gap-10 p5">

                <FormItem className="flex-1">
                    <FormLabel htmlFor="quantidade" >Quantidade</FormLabel>
                    <Input type="number" name="quantidade" id="quantidade" value={data.quantidade} onChange={(e) => handleInputChange(e)} />
                </FormItem>
                <FormItem className="flex-1">
                    <FormLabel htmlFor="valorUnitario" >Valor unitário</FormLabel>
                    <Input type="number" name="valorUnitario" id="valorUnitario" value={data.valorUnitario} onChange={(e) => handleInputChange(e)} />
                </FormItem>
                <FormItem className="flex-1">
                    <FormLabel htmlFor="valorTotal" >Valor total</FormLabel>
                    <Input type="number" name="valorTotal" id="valorTotal" value={data.valorTotal} onChange={(e) => handleInputChange(e)} />
                </FormItem>
            </div>
            <div className="my-4 grid grid-cols-3 gap-10 items-end">
                <FormItem className="col-span-2">
                    <FormLabel htmlFor="descricao" >Descrição</FormLabel>
                    <Input name="descricao" id="descricao" value={data.descricao} onChange={(e) => handleInputChange(e)} />
                </FormItem>
                <Button onClick={handleSalvarItemOrcamento} type="button" className="col-span-1">Adicionar</Button>
            </div>
            <div className="mt-10">
                <DataTable
                    data={items}
                    columns={columns}
                />
            </div>
        </section>
    )
}