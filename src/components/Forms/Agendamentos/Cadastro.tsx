import { ComboBairro } from "@/components/Comboboxes/ComboBairro";
import { ComboCidade } from "@/components/Comboboxes/ComboCidade";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import useAuthStore from "@/store/AuthStore";
import { maskPhone, removePhoneMask } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Agendamentos } from "@/@types/Agendamentos";
import { ComboClientes } from "@/components/Comboboxes/ComboClientes";
import { useSearchParams } from "react-router-dom";

const agendamentoSchema = z.object({
    id: z.coerce.number().optional(),
    codigoUsuario: z.coerce.number().optional(),
    nomeAgendamento: z.string(),
    dataAgendamento: z.date(),
    enderecoAgendamento: z.string(),
    responsavelAgendamento: z.string().optional(),
    telefoneAgendamento: z.string().max(15, 'O telefone deve conter no máximo 11 caracteres').optional(),
    telefoneSecundario: z.string().max(15, 'O telefone deve conter no máximo 11 caracteres').optional(),
    codigoCliente: z.coerce.number().optional(),
    codigoCidade: z.coerce.number().optional(),
    codigoBairro: z.coerce.number().optional(),
})

type agendamentoSc = z.infer<typeof agendamentoSchema>;

type Props = {
    pesquisar: () => void,
    data?: Agendamentos,
    open: boolean,
    setOpen: (newValue: boolean) => void
}

export function CadastroAgendamento({ pesquisar, open, setOpen, data }: Props) {
    const [_, setSearchParams] = useSearchParams();
    const user = useAuthStore(state => state.userData);
    const form = useForm<agendamentoSc>({
        resolver: zodResolver(agendamentoSchema),
        defaultValues: {
            codigoBairro: 0,
            codigoCidade: 0,
            codigoCliente: 0,
            dataAgendamento: new Date(),
            enderecoAgendamento: "",
            responsavelAgendamento: "",
            telefoneAgendamento: "",
            telefoneSecundario: "",
            nomeAgendamento: ""
        }
    });
    const { toast } = useToast();

    const fone = form.watch('telefoneAgendamento');
    const foneSecundario = form.watch('telefoneSecundario');

    async function handleSubmitCadastro(data: agendamentoSc) {
        try {
            if (!user) throw new Error("!!!!!!!!!!!");
            var dataCorreta = data.dataAgendamento;

            dataCorreta.setDate(dataCorreta.getDate() + 1);

            if (data.id) {

                await baseApi.put(`agendamentos/${data.id}`, {
                    ...data,
                    dataAgendamento: dataCorreta,
                    telefoneAgendamento: data.telefoneAgendamento ? removePhoneMask(data.telefoneAgendamento) : "",
                    telefoneSecundario: data.telefoneSecundario ? removePhoneMask(data.telefoneSecundario) : "",
                    codigoUsuario: user?.id
                });

                setSearchParams("");
            } else {
                await baseApi.post('agendamentos', {
                    ...data,
                    dataAgendamento: dataCorreta,
                    telefoneAgendamento: data.telefoneAgendamento ? removePhoneMask(data.telefoneAgendamento) : "",
                    telefoneSecundario: data.telefoneSecundario ? removePhoneMask(data.telefoneSecundario) : "",
                    codigoUsuario: user?.id
                });
            }

            toast({
                variant: "success",
                title: "Sucesso",
                description: "Agendamento salvo com sucesso",
                duration: 5000
            })

            pesquisar();
            setTimeout(() => {
                form.reset();
                setOpen(false);
            }, 500);

        } catch (err) {
            if (err instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: err.message,
                    duration: 10000
                })
                return;
            }

            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao cadastrar novo serviço",
                duration: 10000
            })
        }
    }

    useEffect(() => {
        if (data) {
            form.setValue('codigoBairro', data.agendamentoBairro.id);
            form.setValue('codigoCidade', data.agendamentoCidade.id);
            form.setValue('codigoCliente', data.clienteAgendamento?.id);
            form.setValue('codigoUsuario', user?.id);
            form.setValue('dataAgendamento', new Date(data.dataAgendamento));
            form.setValue('enderecoAgendamento', data.enderecoAgendamento);
            form.setValue('id', data.id);
            form.setValue('nomeAgendamento', data.nomeAgendamento);
            form.setValue('responsavelAgendamento', data.responsavelAgendamento);
            form.setValue('telefoneAgendamento', data.telefoneAgendamento);
            form.setValue('telefoneSecundario', data.telefoneSecundario);
        }
    }, [data]);

    // Máscara nos telefones
    useEffect(() => {
        if (fone)
            form.setValue("telefoneAgendamento", maskPhone(fone));
    }, [fone])

    useEffect(() => {
        if (foneSecundario)
            form.setValue("telefoneSecundario", maskPhone(foneSecundario));
    }, [foneSecundario])

    const setCliente = (cliente: ComboClientes) => {
        console.log(cliente.nome);
    }

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button type="button" variant="default">Novo</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[800px]">
                <DialogHeader>
                    {data ? 'Edição de agendamento' : 'Novo agendamento'}
                </DialogHeader>
                <DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitCadastro)} className="flex flex-col gap-4">
                            <div className="flex gap-3 items-end">
                                <FormField
                                    control={form.control}
                                    name="nomeAgendamento"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="nomeAgendamento">Descrição</FormLabel>
                                            <FormControl>
                                                <Input id="nomeAgendamento" placeholder="Descrição do serviço" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dataAgendamento"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 flex flex-col gap-2 mt-1">
                                            <FormLabel htmlFor="dataValidadeOrcamento">Data do agendamento</FormLabel>
                                            <Popover modal>
                                                <PopoverTrigger asChild>
                                                    <FormControl >
                                                        <Button size="default" variant="outline" className={cn(
                                                            "pl-3 text-left font-normal justify-start text-gray-900 dark:text-white",
                                                            !field.value && "text-muted-foreground"
                                                        )}>
                                                            {field.value ? (
                                                                <>
                                                                    <CalendarIcon className="h-4 w-4 opacity-50 mr-2" />
                                                                    {format(field.value, "PPP", { locale: ptBR })}
                                                                </>
                                                            ) : (
                                                                <CalendarIcon className="ml-auto h-6 w-6 opacity-50" />
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
                            </div>

                            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <FormField
                                    control={form.control}
                                    name="codigoCliente"
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
                                    name="responsavelAgendamento"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 mt-1">
                                            <FormLabel htmlFor="responsavelAgendamento">Responsável</FormLabel>
                                            <FormControl>
                                                <Input id="responsavelAgendamento" placeholder="João da Silva" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="codigoCidade"
                                    render={({ field }) => (
                                        <FormItem className="mt-[10px] flex-1 flex flex-col">
                                            <FormLabel htmlFor="cidadeAgendamento">Cidade</FormLabel>
                                            <ComboCidade field={field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="codigoBairro"
                                    render={({ field }) => (
                                        <FormItem className="mt-[10px] flex-1 flex flex-col">
                                            <FormLabel htmlFor="cidadeAgendamento">Bairro</FormLabel>
                                            <ComboBairro field={field} codigoCidade={1} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="enderecoAgendamento"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 mt-1">
                                            <FormLabel htmlFor="enderecoAgendamento">Endereço</FormLabel>
                                            <FormControl>
                                                <Input id="enderecoAgendamento" placeholder="Rua Brasil 97" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="telefoneAgendamento"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="telefoneAgendamento">Telefone</FormLabel>
                                            <FormControl>
                                                <Input id="telefoneAgendamento" placeholder="(48) 99999-9999" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="telefoneSecundario"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="telefoneSecundario">Telefone secundário</FormLabel>
                                            <FormControl>
                                                <Input id="telefoneSecundario" placeholder="(48) 99999-9999" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </fieldset>
                            <Button type="submit" variant="default">Salvar</Button>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}