import { Servicos } from "@/@types/Servicos";
import { ComboServico } from "@/components/Comboboxes/ComboServico";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const cronometroSchema = z.object({
    nome: z.string().min(5, 'Descrição deve possuir no mínimo 5 caractéres'),
    inicio: z.date(),
    fim: z.date(),
    completo: z.boolean(),
    usuario: z.number(),
    valorHora: z.coerce.number(),
    servico: z.coerce.number().optional(),
});

type cronometroSc = z.infer<typeof cronometroSchema>;


export function CadastroCronometro() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const userData = useAuthStore(state => state.userData);
    const { toast } = useToast();
    const form = useForm<cronometroSc>({
        resolver: zodResolver(cronometroSchema),
        defaultValues: {
            nome: "",
            inicio: new Date(),
            fim: new Date(),
            completo: false,
            usuario: userData?.id,
            valorHora: 0,
            servico: 0,
        }
    });

    async function handleSubmitCronometro(data: cronometroSc) {
        try {

            if (!userData) throw new Error("!!!!!!!!!!!!!!!!");

            await baseApi.post("/cronometro", {
                ...data
            });

            queryClient.invalidateQueries({ queryKey: ['CronometrosAtivos'] });

            toast({
                variant: "success",
                title: "Sucesso",
                description: "Novo relógio cadastrado com sucesso",
                duration: 5000
            })

            setTimeout(() => {
                form.reset();
                setOpen(false);
            }, 1500);

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
                description: "Erro ao cadastrar novo relógio",
                duration: 10000
            })
        }
    }

    const setServico = (servico: Servicos) => {
        form.setValue('nome', servico.descricaoServico)
        form.setValue('valorHora', servico.valorServico);
    }

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button type="button" variant="default">Novo</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Novo cronômetro</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitCronometro)}>

                        <FormField
                            control={form.control}
                            name="servico"
                            render={({ field }) => (
                                <FormItem className="my-3 flex-1 flex flex-col">
                                    <FormLabel htmlFor="servico">Serviço existente
                                    </FormLabel>
                                    <ComboServico field={field} setServico={setServico} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className="my-3">
                                    <FormLabel htmlFor="nome">Descrição</FormLabel>
                                    <FormControl>
                                        <Input id="nome" placeholder="Serviço" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="valorHora"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="valorHora">Valor/hora</FormLabel>
                                    <FormControl>
                                        <Input id="valorHora" placeholder="R$ 15,00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-4 flex-1 flex justify-end">
                            <Button type="submit" variant="default">Salvar</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}