import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const servicoSchema = z.object({
    id: z.number().optional(),
    descricaoServico: z.string().min(5, 'Descrição deve possuir no mínimo 5 caractéres'),
    valorServico: z.coerce.number().optional(),
    codigoCNAE: z.string().min(7, 'Código CNAE deve possuir 7 dígitos').max(7, 'Código CNAE deve possuir 7 dígitos').optional(),
});

type servicoSc = z.infer<typeof servicoSchema>;

export function CadastroServico() {
    const [open, setOpen] = useState(false);
    const userData = useAuthStore(state => state.userData);
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
            const response = await baseApi.post("/servicos", {
                ...data,
                servicoUsuario: 1
            });

            if (response.status == 200) {
                toast({
                    variant: "success",
                    title: "Sucesso",
                    description: "Serviço cadastrado com sucesso",
                    duration: 5000
                })
            }

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

    return (
        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button type="button" variant="default">Novo</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Novo serviço</DialogTitle>
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
                                                <Input id="descricaoServico" placeholder="Trocar rebimboca da parafuseta" {...field} />
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
                                                <Input id="valorServico" type="number" placeholder="77,77" {...field} />
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
                                                <Input id="codigoCNAE" placeholder="000.000-0" {...field} />
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