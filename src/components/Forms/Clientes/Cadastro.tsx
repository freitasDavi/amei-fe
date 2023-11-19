import { Clientes } from "@/@types/Clients";
import { ComboBairro } from "@/components/Comboboxes/ComboBairro";
import { ComboCidade } from "@/components/Comboboxes/ComboCidade";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { maskCep, maskCnpj, maskPhone, removeCepMask, removeCnpjMask, removePhoneMask } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const clienteSchema = z.object({
    id: z.coerce.number().optional(),
    nomeCliente: z.string(),
    emailCliente: z.string().email(),
    telefoneCliente: z.string(),
    cepCliente: z.string(),
    enderecoCliente: z.string(),
    numeroCliente: z.string(),
    complementoCliente: z.string(),
    cnpjCliente: z.string(),
    inscricaoMunicipal: z.string(),
    usuarioCliente: z.coerce.number().optional(),
    clienteCidade: z.coerce.number(),
    clienteBairro: z.coerce.number()
})

type clienteSc = z.infer<typeof clienteSchema>;

type CadastroClienteProps = {
    pesquisar: () => void;
    open: boolean;
    setOpen: (opt: boolean) => void;
    data: Clientes | undefined
}

export function CadastroCliente({ pesquisar, open, setOpen, data }: CadastroClienteProps) {
    const [_, setSearchParams] = useSearchParams();
    const user = useAuthStore(state => state.userData);
    const form = useForm<clienteSc>({
        resolver: zodResolver(clienteSchema),
        defaultValues: {
            cepCliente: "",
            clienteBairro: 0,
            clienteCidade: 0,
            cnpjCliente: "",
            complementoCliente: "",
            emailCliente: "",
            enderecoCliente: "",
            inscricaoMunicipal: "",
            nomeCliente: "",
            numeroCliente: "",
            telefoneCliente: "",
            usuarioCliente: 0,
        }
    });
    const { toast } = useToast();

    const cep = form.watch('cepCliente');
    const cnpj = form.watch('cnpjCliente');
    const telefone = form.watch('telefoneCliente');

    useEffect(() => {
        if (cnpj)
            form.setValue("cnpjCliente", maskCnpj(cnpj))
    }, [cnpj])

    useEffect(() => {
        if (cep)
            form.setValue("cepCliente", maskCep(cep))
    }, [cep])

    useEffect(() => {
        if (telefone)
            form.setValue("telefoneCliente", maskPhone(telefone))
    }, [telefone])

    useEffect(() => {
        if (data) {
            form.setValue("cepCliente", data.cepCliente);
            form.setValue("clienteBairro", data.clienteBairro.id);
            form.setValue("clienteCidade", data.clienteCidade);
            form.setValue("cnpjCliente", data.cnpjCliente);
            form.setValue("complementoCliente", data.complementoCliente);
            form.setValue("emailCliente", data.emailCliente);
            form.setValue("enderecoCliente", data.enderecoCliente);
            form.setValue("inscricaoMunicipal", data.inscricaoMunicipal);
            form.setValue("nomeCliente", data.nomeCliente);
            form.setValue("numeroCliente", data.numeroCliente);
            form.setValue("telefoneCliente", data.telefoneCliente);
            form.setValue("usuarioCliente", data.usuarioCliente);
            form.setValue("id", data.id);
        }
    }, [data]);

    async function handleCadastroCliente(data: clienteSc) {
        try {
            if (!user) throw new Error("!!!!!!!!!!!");

            if (data.id) {
                await baseApi.put(`clientes/${data.id}`, {
                    ...data,
                    cnpjCliente: data.cnpjCliente ? removeCnpjMask(data.cnpjCliente) : "",
                    telefoneCliente: data.telefoneCliente ? removePhoneMask(data.telefoneCliente) : "",
                    cepCliente: data.cepCliente ? removeCepMask(data.cepCliente) : "",
                    usuarioCliente: data.usuarioCliente
                });

                setSearchParams("")
            } else {
                await baseApi.post('clientes', {
                    ...data,
                    cnpjCliente: data.cnpjCliente ? removeCnpjMask(data.cnpjCliente) : "",
                    telefoneCliente: data.telefoneCliente ? removePhoneMask(data.telefoneCliente) : "",
                    cepCliente: data.cepCliente ? removeCepMask(data.cepCliente) : "",
                    usuarioCliente: user.id
                });
            }


            toast({
                title: "Sucesso",
                variant: "success",
                description: "Cliente salvo com sucesso"
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
            // TODO: Em bancos ja criados, create-drop pra ajustar tamanho do CNPJ
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
            <DialogTrigger className="">
                <Button type="button" variant="default">Novo</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[800px] max-h-[550px] overflow-auto">
                <DialogHeader>Novo Cliente</DialogHeader>
                <DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCadastroCliente)} className="flex flex-col gap-4">
                            <div className="flex gap-10 items-end">
                                <FormField
                                    control={form.control}
                                    name="nomeCliente"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="nomeCliente">Nome</FormLabel>
                                            <FormControl>
                                                <Input id="nomeCliente" placeholder="Jose Ferramentas" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cnpjCliente"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 flex flex-col gap-2 mt-1">
                                            <FormLabel htmlFor="cnpjCliente">CPF/CNPJ</FormLabel>
                                            <FormControl>
                                                <Input id="cnpjCliente" maxLength={18} placeholder="000.00.00-0/00" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-10 items-end">
                                <FormField
                                    control={form.control}
                                    name="telefoneCliente"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="telefoneCliente">Telefone</FormLabel>
                                            <FormControl>
                                                <Input id="telefoneCliente" maxLength={15} placeholder="(48) 99999-9999" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="emailCliente"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 flex flex-col gap-2 mt-1">
                                            <FormLabel htmlFor="emailCliente">Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" id="emailCliente" placeholder="jose@ferramentas.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <h3 className="font-semibold">Endereço</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                                <FormField
                                    control={form.control}
                                    name="cepCliente"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 mt-1">
                                            <FormLabel htmlFor="cepCliente">CEP</FormLabel>
                                            <FormControl>
                                                <Input id="cepCliente" maxLength={9} placeholder="888888-000" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="clienteCidade"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 flex flex-col mt-[10px]">
                                            <FormLabel htmlFor="cidade">Cidade</FormLabel>
                                            <ComboCidade field={field} />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="clienteBairro"
                                    render={({ field }) => (
                                        <FormItem className="mt-[10px] flex-1 flex flex-col">
                                            <FormLabel htmlFor="bairro">Bairro</FormLabel>
                                            <ComboBairro field={field} codigoCidade={1} />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="enderecoCliente"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 mt-1">
                                            <FormLabel htmlFor="enderecoCliente">Endereço</FormLabel>
                                            <FormControl>
                                                <Input id="enderecoCliente" placeholder="Rua das palmeiras" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="numeroCliente"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 flex flex-col gap-2 mt-1">
                                            <FormLabel htmlFor="numeroCliente">Número</FormLabel>
                                            <FormControl>
                                                <Input id="numeroCliente" placeholder="197" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="inscricaoMunicipal"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 flex flex-col gap-2 mt-1">
                                            <FormLabel htmlFor="inscricaoMunicipal">Inscrição municipal</FormLabel>
                                            <FormControl>
                                                <Input id="inscricaoMunicipal" placeholder="12345678" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="complementoCliente"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 col-span-2">
                                            <FormLabel htmlFor="complementoCliente">Complemento</FormLabel>
                                            <FormControl>
                                                <Input id="complementoCliente" placeholder="Perto do supermercado" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="col-span-2 flex justify-end">
                                    <Button type="submit" size="default">Salvar</Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}