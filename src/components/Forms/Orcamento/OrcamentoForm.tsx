import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { OrcamentoItemForm } from "./OrcamentoItemForm";
import { useEffect, useState } from "react";
import { ItensOrcamento } from "@/@types/Orcamentos";
import useAuthStore from "@/store/AuthStore";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const schemaOrcamento = z.object({
    id: z.coerce.number().optional(),
    nomeCliente: z.string(),
    telefoneCliente: z.string().max(11, 'O telefone deve ter no máximo 11 caractéres'),
    dataEmissaoOrcamento: z.date().optional(),
    dataValidadeOrcamento: z.date(),
    valorTotalDoOrcamento: z.coerce.number(),
    observacoesOrcamento: z.string(),
    usuarioOrcamento: z.coerce.number(),
    clienteOrcamento: z.coerce.number().optional(),
    orcamentoOrdemServico: z.number().optional(),
})


type orcamentoSc = z.infer<typeof schemaOrcamento>;

export function OrcamentoForm() {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.userData);
    const { toast } = useToast();
    const [items, setItems] = useState<ItensOrcamento[]>([]);
    const form = useForm<orcamentoSc>({
        resolver: zodResolver(schemaOrcamento),
        defaultValues: {
            clienteOrcamento: 0,
            dataValidadeOrcamento: new Date(),
            observacoesOrcamento: "",
            nomeCliente: "",
            telefoneCliente: "",
            valorTotalDoOrcamento: 0,
        }
    });

    useEffect(() => {
        if (user) {
            form.setValue("usuarioOrcamento", user.id);
        }
    }, [user]);

    async function handleNovoOrcamento(data: orcamentoSc) {
        try {

            await baseApi.post("/orcamentos", {
                ...data,
                itensOrcamentos: items
            });

            toast({
                title: "Sucesso",
                variant: "success",
                description: "Orçamento realizado com sucesso",
            })

            setTimeout(() => {
                navigate("/orcamentos");
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

    const setItemsF = (novoItem: ItensOrcamento) => {
        setItems(i => [...i, novoItem]);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleNovoOrcamento, (fields) => console.log("nana: ", fields))} className="flex flex-col gap-4 mt-2">
                <div className="flex justify-evenly gap-10 p-5">
                    <FormField
                        control={form.control}
                        name="clienteOrcamento"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel htmlFor="clienteOrcamento">Cliente existente
                                </FormLabel>
                                <FormControl>
                                    <Input id="descricaoServico" type="number" placeholder="Josefino ferramentas" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nomeCliente"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel htmlFor="nomeCliente">Cliente</FormLabel>
                                <FormControl>
                                    <Input id="nomeCliente" placeholder="Josefino ferramentas" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="telefoneCliente"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input id="telefoneCliente" placeholder="48991308073" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <fieldset className="border-primary-300 border-4 rounded-lg justify-evenly gap-10 p-5">
                    <OrcamentoItemForm codigoOrcamento={form.getValues().id} items={items} setItems={setItemsF} />
                </fieldset>

                <div className="flex justify-evenly gap-10 p-5">
                    <FormField
                        control={form.control}
                        name="dataValidadeOrcamento"
                        render={({ field }) => (
                            <FormItem className="flex-1 flex flex-col gap-2 mt-1">
                                <FormLabel htmlFor="dataValidadeOrcamento">Validade do orçamento</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl >
                                            <Button size="sm" variant="outline" className={cn(
                                                "pl-3 text-left font-normal justify-start",
                                                !field.value && "text-muted-foreground"
                                            )}>
                                                {field.value ? (
                                                    <>
                                                        <CalendarIcon className="h-4 w-4 opacity-50 mr-2" />
                                                        {format(field.value, "PPP", { locale: ptBR })}
                                                    </>
                                                ) : (
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            locale={ptBR}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="observacoesOrcamento"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel htmlFor="observacoesOrcamento">Observações</FormLabel>
                                <FormControl>
                                    <Input id="observacoesOrcamento" placeholder="Desculpe a demora..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="valorTotalDoOrcamento"
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
                <div className="w-full flex justify-end">
                    <Button type="submit" size="lg" className="w-40 tracking-widest">SALVAR</Button>
                </div>
            </form>
        </Form>
    )
}