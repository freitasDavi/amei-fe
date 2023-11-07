import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ComboCidade } from "@/components/Comboboxes/ComboCidade";
import { Anchor } from "@radix-ui/react-popover"
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { baseApi } from "@/lib/api";
import { Cursos } from "@/@types/Cursos";
import { useSearchParams } from "react-router-dom";

const cursoSchema = z.object({
    id: z.number().optional(),
    nome: z.string().min(5),
    url: z.string().min(10),
    descricao: z.string().min(5),
    data: z.date(),
    codigoCidade: z.coerce.number()
});

type cursoSc = z.infer<typeof cursoSchema>;

type CadastroCursoProps = {
    pesquisar: () => void;
    open: boolean;
    setOpen: (opt: boolean) => void;
    data: Cursos | undefined
}


export function CadastroCurso({ pesquisar, open, setOpen, data }: CadastroCursoProps) {
    const { toast } = useToast();
    const [_, setSearchParams] = useSearchParams();
    const form = useForm<cursoSc>({
        resolver: zodResolver(cursoSchema),
        defaultValues: {
            codigoCidade: 0,
            data: new Date(),
            descricao: "",
            nome: "",
            url: ""
        }
    });

    async function handleCadastroCurso(data: cursoSc) {
        try {

            if (data.id) {
                await baseApi.put(`/cursos/${data.id}`, {
                    ...data
                });

                setSearchParams("");
            } else {
                await baseApi.post("/cursos", {
                    ...data
                });
            }

            toast({
                variant: "success",
                title: "Sucesso",
                description: "Serviço cadastrado com sucesso",
                duration: 5000
            })

            form.reset();
            setOpen(false);
            pesquisar();

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
            form.setValue("codigoCidade", data.codigoCidade)
            form.setValue("data", new Date(data.data))
            form.setValue("descricao", data.descricao)
            form.setValue("id", data.id)
            form.setValue("nome", data.nome)
            form.setValue("url", data.url);
        }
    }, [data])

    return (
        <Dialog modal={true} open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button type="button" variant="default">Novo</Button>
            </DialogTrigger>
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Novo curso</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleCadastroCurso)} className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="nome"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="nome">Nome</FormLabel>
                                            <FormControl>
                                                <Input id="nome" placeholder="Curso de administração" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="url">Link</FormLabel>
                                            <FormControl>
                                                <Input id="url" placeholder="https://www.curso.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="descricao"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="descricao">Descrição</FormLabel>
                                            <FormControl>
                                                <Input id="descricao" placeholder="Curso de administração" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="data"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 flex flex-col gap-2 mt-1">
                                            <FormLabel htmlFor="dataValidadeOrcamento">Data do curso</FormLabel>
                                            <Popover modal>
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
                                                <Anchor />
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
                                    name="codigoCidade"
                                    render={({ field }) => (
                                        <FormItem className="mt-[10px] flex flex-1 flex-col">
                                            <FormLabel htmlFor="cidade">Cidade evento</FormLabel>
                                            <ComboCidade field={field} />
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