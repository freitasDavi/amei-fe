import { ItensOrdem, OrdemServicoCad } from "@/@types/OrdemServico";
import { ComboClientes } from "@/components/Comboboxes/ComboClientes";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { maskPhone, removePhoneMask } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { OrdensItemForm } from "./OrdensItensForm";


const schemaOrdem = z.object({
    id: z.coerce.number().optional(),
    telefoneOrdem: z.string().max(15, 'O telefone deve ter no máximo 11 caractéres'),
    valorTotal: z.coerce.number(),
    dataEmissaoOrdemServico: z.date().optional(),
    usuarioOrdem: z.coerce.number(),
    clienteOrdem: z.coerce.number().optional(),
})

export type ordemSc = z.infer<typeof schemaOrdem>;

type OrdemFormProps = {
    ordem: OrdemServicoCad | undefined
}

export function OrdensForm({ ordem }: OrdemFormProps) {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.userData);
    const { toast } = useToast();
    const [items, setItems] = useState<ItensOrdem[]>([]);
    const form = useForm<ordemSc>({
        resolver: zodResolver(schemaOrdem),
        defaultValues: {
            clienteOrdem: 0,
            dataEmissaoOrdemServico: new Date(),
            telefoneOrdem: "",
            valorTotal: 0,
            usuarioOrdem: user?.id
        }
    });

    const phone = form.watch('telefoneOrdem');

    useEffect(() => {
        if (ordem) {
            form.setValue('id', ordem.id);
            form.setValue('clienteOrdem', ordem.clienteOrdem.id);
            form.setValue('dataEmissaoOrdemServico', new Date(ordem.dataEmissaoOrdemServico!));
            form.setValue('telefoneOrdem', ordem.telefoneOrdem);
            form.setValue('usuarioOrdem', ordem.usuarioOrdem);
            form.setValue('valorTotal', ordem.valorTotal);

            var itemsOrdem: ItensOrdem[] = [];

            ordem.itensOrdemServicos!.forEach(i => {
                itemsOrdem.push({
                    id: i.id,
                    quantidade: i.quantidade,
                    descricaoItemOrdem: i.descricaoItemOrdem,
                    valorUnitario: i.valorUnitario,
                    valorTotal: i.valorTotal,
                })
            });

            setItems(itemsOrdem);
        }
    }, [ordem]);

    useEffect(() => {
        if (user) {
            form.setValue("usuarioOrdem", user.id);
        }
    }, [user]);

    useEffect(() => {
        form.setValue("telefoneOrdem", maskPhone(phone));
    }, [phone]);

    async function handleNovaOrdem(data: ordemSc) {
        try {

            if (data.id) {
                await baseApi.put(`/ordemServico/${data.id}`, {
                    ...data,
                    telefoneOrdem: removePhoneMask(data.telefoneOrdem),
                    itensOrdemServicos: items
                });

            } else {
                await baseApi.post("/ordemServico", {
                    ...data,
                    telefoneOrdem: removePhoneMask(data.telefoneOrdem),
                    itensOrdemServicos: items
                });

            }


            toast({
                title: "Sucesso",
                variant: "success",
                description: "Ordem realizada com sucesso",
            })

            setTimeout(() => {
                navigate("/ordens");
            }, 1500);


        } catch (err) {
            if (err instanceof AxiosError) {
                toast({
                    title: 'Ops',
                    variant: "destructive",
                    description: err.message
                })

                return;
            }

            toast({
                title: 'Ops',
                variant: "destructive",
                description: "Algo não saiu como planejado"
            })

        }
    }

    const setItemsF = (novoItem: ItensOrdem) => {
        setItems(i => [...i, novoItem]);
        let curItems = items;

        curItems.push(novoItem);
        var valorTotal = curItems.reduce((acc, item) => acc + item.valorTotal, 0);

        form.setValue("valorTotal", valorTotal);
    }

    const removeItem = (id: number) => {
        var currentItems = items.filter(i => i.id !== id);
        setItems(currentItems);

        var valorTotal = currentItems.reduce((acc, item) => acc + item.valorTotal, 0);

        form.setValue("valorTotal", valorTotal);

    }

    // Set dados do cliente selecionado;
    const setCliente = (cliente: ComboClientes) => {
        form.setValue('telefoneOrdem', cliente.telefone);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleNovaOrdem, (errors) => {
                console.log(errors);
            })}>
                <div className="flex justify-evenly gap-10 p-5">
                    <FormField
                        control={form.control}
                        name="clienteOrdem"
                        render={({ field }) => (
                            <FormItem className="mt-[10px] flex-1 flex flex-col">
                                <FormLabel htmlFor="clienteOrcamento">Cliente existente
                                </FormLabel>
                                <ComboClientes field={field} setCliente={setCliente} />
                                {/* <FormControl>
                                    <Input id="descricaoServico" type="number" placeholder="Josefino ferramentas" {...field} />
                                </FormControl> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="telefoneOrdem"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input id="telefoneCliente" placeholder="(48) 99999-9999" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="valorTotal"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel htmlFor="valorTotalDoOrcamento">Valor total</FormLabel>
                                <FormControl>
                                    <Input id="valorTotalDoOrcamento" placeholder="57,90" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <fieldset className="border-primary-300 border-4 rounded-lg justify-evenly gap-10 p-5">
                    <OrdensItemForm codigoOrdem={form.getValues().id} items={items} setItems={setItemsF} removeItem={removeItem} />
                </fieldset>

                <div className="w-full flex justify-end my-4 mr-8">
                    <Button type="submit" size="lg" className="w-40 tracking-widest">SALVAR</Button>
                </div>
            </form>
        </Form>
    )
}