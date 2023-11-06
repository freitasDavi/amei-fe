import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/layouts/perfil";
import { baseApi } from "@/lib/api";
import { maskCep, removeCepMask } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const updateUserEnderecoSchema = z.object({
    id: z.coerce.number(),
    cepUsuario: z.string(),
    enderecoUsuario: z.string(),
    numeroUsuario: z.string(),
    complementoUsuario: z.string(),
    // usuarioCidade: z.string(),
    bairro: z.coerce.number()
})

type updateUserS = z.infer<typeof updateUserEnderecoSchema>;

async function updateUserEndereco(data: updateUserS) {
    return await baseApi.put(`/users/endereco/${data.id}`, {
        ...data,
        bairro: Number(data.bairro),
        // cidade: Number(data.cidade),
        cepUsuario: removeCepMask(data.cepUsuario)
    })
}

export function UserEndereco() {
    const { user } = useUser();
    const { toast } = useToast();
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['usuario'],
        mutationFn: () => updateUserEndereco(form.getValues())
    });

    const form = useForm<updateUserS>({
        resolver: zodResolver(updateUserEnderecoSchema),
        defaultValues: {
            bairro: user?.bairro.id,
            cepUsuario: user?.cepUsuario,
            complementoUsuario: user?.complementoUsuario,
            enderecoUsuario: user?.enderecoUsuario,
            numeroUsuario: user?.numeroUsuario,
            id: user?.id
        }
    })

    const handleSubmitUpdateEndereco = async () => {
        await mutateAsync();

        toast({
            variant: "success",
            title: "Sucesso",
            description: "Dados atualizados com sucesso"
        })
    }

    const cep = form.watch('cepUsuario');

    useEffect(() => {
        if (cep) form.setValue('cepUsuario', maskCep(cep));
    }, [cep]);

    return (
        <TabsContent value="endereco">
            <Card>
                <CardHeader>Endereço</CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitUpdateEndereco)}>
                        <CardContent className="space-y-2">
                            <div className="w-full flex gap-6">
                                <FormField
                                    control={form.control}
                                    name="cepUsuario"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="cepUsuario">CEP</FormLabel>
                                            <FormControl>
                                                <Input id="cepUsuario" placeholder="00000-000   " {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {/* {formState.errors.cepUsuario && formState.errors.cepUsuario.message} */}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                {/* <FormField
                                    control={form.control}
                                    name="usuarioCidade"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="usuarioCidade">Cidade</FormLabel>
                                            <FormControl>
                                                <Input id="usuarioCidade" placeholder="Içara" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {formState.errors.usuarioCidade && formState.errors.usuarioCidade.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                /> */}
                            </div>

                            <div className="w-full flex gap-6">
                                <FormField
                                    control={form.control}
                                    name="enderecoUsuario"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="enderecoUsuario">Endereço</FormLabel>
                                            <FormControl>
                                                <Input id="enderecoUsuario" placeholder="Rua Brasil" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {/* {formState.errors.logradouroUsuario && formState.errors.logradouroUsuario.message} */}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bairro"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="usuarioBairro">Bairro</FormLabel>
                                            <FormControl>
                                                <Input id="usuarioBairro" placeholder="Centro" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {/* {formState.errors.usuarioBairro && formState.errors.usuarioBairro.message} */}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="w-full flex gap-6">
                                <FormField
                                    control={form.control}
                                    name="numeroUsuario"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="numeroUsuario">Número</FormLabel>
                                            <FormControl>
                                                <Input id="numeroUsuario" placeholder="123" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {/* {formState.errors.numeroUsuario && formState.errors.numeroUsuario.message} */}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="complementoUsuario"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel htmlFor="complementoUsuario">Complemento</FormLabel>
                                            <FormControl>
                                                <Input id="complementoUsuario" placeholder="Próximo a..." {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {/* {formState.errors.complementoUsuario && formState.errors.complementoUsuario.message} */}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Atualizar endereço</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </TabsContent>
    )
}