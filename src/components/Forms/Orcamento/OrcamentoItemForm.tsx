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
    orcamento: z.coerce.number().optional()
});

type itemOrcSchema = z.infer<typeof schemaItemOrc>;


type Props = {
    items: ItensOrcamento[],
    codigoOrcamento?: number;
    setItems: (item: ItensOrcamento) => void;
    removeItem: (descricao: string) => void;
}

export function OrcamentoItemForm({ items, codigoOrcamento, setItems, removeItem }: Props) {
    const [data, setData] = useState<itemOrcSchema>({} as itemOrcSchema);

    async function handleSalvarItemOrcamento() {
        var newItem: ItensOrcamento = {
            descricao: data.descricao,
            valorTotal: data.valorTotal!,
            valorUnitario: data.valorUnitario,
            quantidade: data.quantidade,
            orcamento: codigoOrcamento ? codigoOrcamento : 0
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

    const onClickRemoveItem = (descricao: string) => {
        removeItem(descricao);
    }

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


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Descrição
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantidade
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Valor unitário
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Valor total
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Remover
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((i) => (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={i.descricao}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {i.descricao}
                                    </th>
                                    <td className="px-6 py-4">
                                        {i.quantidade}
                                    </td>
                                    <td className="px-6 py-4">
                                        {i.valorUnitario}
                                    </td>
                                    <td className="px-6 py-4">
                                        {i.valorTotal}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button onClick={() => onClickRemoveItem(i.descricao)}>
                                            Remover
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    )
}