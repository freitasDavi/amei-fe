import { Servicos } from "@/@types/Servicos";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const servicoSchema = z.object({
    id: z.number().optional(),
    descricaoServico: z.string().min(5, 'Descrição deve possuir no mínimo 5 caractéres'),
    valorServico: z.coerce.number().optional(),
    codigoCNAE: z.string().min(7, 'Código CNAE deve possuir 7 dígitos').max(7, 'Código CNAE deve possuir 7 dígitos').optional().or(z.literal(''))
});

type servicoSc = z.infer<typeof servicoSchema>;

type Props = {
    pesquisar: () => void;
    open: boolean;
    setOpen: (opt: boolean) => void;
    data: Servicos | undefined
}

export function CadastroServico({ pesquisar, open, setOpen, data }: Props) {
    const userData = useAuthStore(state => state.userData);
    const [_, setSearchParams] = useSearchParams();
    const { toast } = useToast();
    const form = useForm<servicoSc>({
        resolver: zodResolver(servicoSchema),
        defaultValues: {
            codigoCNAE: "",
            descricaoServico: "",
            valorServico: 0,
        }
    })

    async function handleServicoSubmit(data: servicoSc) {
        try {

            if (data.id) {
                await baseApi.put(`/servicos/${data.id}`, {
                    ...data,
                });
            } else {
                await baseApi.post("/servicos", {
                    ...data,
                    servicoUsuario: userData?.id
                });
            }


            toast({
                variant: "success",
                title: "Sucesso",
                description: "Serviço salvo com sucesso",
                duration: 5000
            })

            setSearchParams("");
            pesquisar();
            setOpen(false);

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
            form.setValue("codigoCNAE", data.codigoCNAE);
            form.setValue("descricaoServico", data.descricaoServico);
            form.setValue("valorServico", data.valorServico);
            form.setValue("id", data.id);
        }
    }, [data]);

    function validarNumeros(input: React.ChangeEvent<HTMLInputElement>) {
        // Remove caracteres não numéricos usando uma expressão regular
        input.target.value = input.target.value.replace(/[^0-9]/g, '');
        form.setValue('codigoCNAE', input.target.value);
    }

    return (
        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button type="button" variant="default">Novo</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {data ? 'Edição do serviço' : 'Novo serviço'}
                    </DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleServicoSubmit)} className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="descricaoServico"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="descricaoServico">Descrição</FormLabel>
                                            <FormControl>
                                                <Input id="descricaoServico" placeholder="Descrição do serviço" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="valorServico"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="valorServico">Valor</FormLabel>
                                            <FormControl>
                                                <Input id="valorServico" type="text" placeholder="77,77" {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="codigoCNAE"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="codigoCNAE">Código CNAE</FormLabel>
                                            <FormControl>
                                                <Input id="codigoCNAE" maxLength={7} placeholder="000.000-0" {...field} onChange={(e) => validarNumeros(e)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" variant="default">Salvar</Button>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}