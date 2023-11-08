import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/layouts/perfil";
import { baseApi } from "@/lib/api";
import { maskCnpj, maskPhone, removeCnpjMask, removePhoneMask } from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const updateUserSchema = z.object({
    id: z.coerce.number(),
    username: z.string().max(20, "Seu usuário pode conter no máximo 20 caracteres"),
    email: z.string().email("Seu email deve conter um formato válido"),
    razaoSocialUsuario: z.string(),
    cnpjUsuario: z.string(),
    inscricaoMunicipalUsuario: z.string().optional(),
    telefoneUsuario: z.string().max(17, 'Seu telefone deve conter no máximo 17 caracteres'),
});

type updateUserS = z.infer<typeof updateUserSchema>;



async function putUser(data: updateUserS) {
    return await baseApi.put(`/users/geral/${data.id}`, {
        ...data,
        cnpjUsuario: removeCnpjMask(data.cnpjUsuario),
        telefoneUsuario: removePhoneMask(data.telefoneUsuario)
    });
}


export function UserGeralForm() {
    const { user } = useUser();
    const { toast } = useToast();
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["usuario"],
        mutationFn: () => putUser(form.getValues())
    });


    const form = useForm<updateUserS>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            cnpjUsuario: user?.cnpjUsuario,
            email: user?.email,
            id: user?.id,
            inscricaoMunicipalUsuario: user?.inscricaoMunicipalUsuario,
            razaoSocialUsuario: user?.razaoSocialUsuario,
            telefoneUsuario: user?.telefoneUsuario,
            username: user?.username
        }
    });

    const handleSubmitUpdateGeral = async (data: updateUserS) => {
        await mutateAsync();


        toast({
            variant: "success",
            title: "Sucesso",
            description: "Dados atualizados com sucesso"
        })
    }

    const phone = form.watch('telefoneUsuario')
    const cnpj = form.watch('cnpjUsuario')

    useEffect(() => {
        if (phone)
            form.setValue('telefoneUsuario', maskPhone(phone))


        if (cnpj)
            form.setValue('cnpjUsuario', maskCnpj(cnpj))
    }, [phone, cnpj])

    return (
        <TabsContent value="geral">
            <Card>
                <CardHeader>Informações gerais</CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitUpdateGeral)}>
                        <CardContent className="space-y-2">

                            <div className="w-full flex flex-col gap-4">

                                <div className="w-full flex gap-6 space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel htmlFor="username">Nome de usuário</FormLabel>
                                                <FormControl>
                                                    <Input disabled id="username" placeholder="Joao123" {...field} />
                                                </FormControl>
                                                <FormMessage>
                                                    {/* {formState.errors.username && formState.errors.username.message} */}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <FormControl>
                                                    <Input disabled id="email" placeholder="email@mail.com" {...field} />
                                                </FormControl>
                                                <FormMessage>
                                                    {/* {formState.errors.email && formState.errors.email.message} */}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="w-full flex gap-6 space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="razaoSocialUsuario"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel htmlFor="razaoSocialUsuario">Razão social</FormLabel>
                                                <FormControl>
                                                    <Input id="razaoSocialUsuario" placeholder="Empresa ltda." {...field} />
                                                </FormControl>
                                                <FormMessage>
                                                    {/* {formState.errors.razaoSocial && formState.errors.razaoSocial.message} */}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="telefoneUsuario"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel htmlFor="telefoneUsuario">Telefone</FormLabel>
                                                <FormControl>
                                                    <Input id="telefoneUsuario" placeholder="(48) 99999-9999" {...field} />
                                                </FormControl>
                                                <FormMessage>
                                                    {/* {formState.errors.telefoneUsuario && formState.errors.telefoneUsuario.message} */}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="w-full flex gap-6 space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="cnpjUsuario"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel htmlFor="cnpjUsuario">CNPJ</FormLabel>
                                                <FormControl>
                                                    <Input id="cnpjUsuario" placeholder="00 000 000/0000-00" {...field} />
                                                </FormControl>
                                                <FormMessage>
                                                    {/* {formState.errors.cnpj && formState.errors.cnpj.message} */}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="inscricaoMunicipalUsuario"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel htmlFor="inscricaoMunicipalUsuario">Inscrição municipal</FormLabel>
                                                <FormControl>
                                                    <Input id="inscricaoMunicipalUsuario" placeholder="000000.000.00" {...field} />
                                                </FormControl>
                                                <FormMessage>
                                                    {/* {formState.errors.inscricaoMunicipal && formState.errors.inscricaoMunicipal.message} */}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </div>


                        </CardContent>
                        <CardFooter>
                            <Button disabled={isPending} type="submit">Salvar</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </TabsContent >
    )
}