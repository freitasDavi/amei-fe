import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";

import useAuthStore from "@/store/AuthStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";

const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(2)
});

type loginSc = z.infer<typeof loginSchema>;


export function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { toast } = useToast();
    const { signIn } = useAuthStore((state) => ({
        signIn: state.setToken,
        isLogged: state.isLogged
    }));
    const form = useForm<loginSc>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            password: "",
            username: ""
        }
    })

    async function onSubmit({ username, password }: loginSc) {

        try {
            const res = await baseApi.post("/auth/signin", {
                username: username,
                password: password
            });

            if (res.status === 200) {
                if (res.data.accessToken && typeof res.data.accessToken == "string") {
                    signIn(res.data.accessToken, res.data.refreshToken);

                    toast({
                        variant: "success",
                        title: "Sucesso",
                        description: "Login efetuado com sucesso, redirecionando..."
                    })

                    setTimeout(() => {
                        navigate('/home', { replace: true });
                    }, 1000);

                    return;
                }
            }
        } catch (err) {
            // TODO: Notify failed login
            console.log('Error');
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Login ou senha incorreta",
            })
        }
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="username">Usuário</FormLabel>
                                <FormControl>
                                    <Input id="username" placeholder="usuario@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="password">Senha</FormLabel>
                                <FormControl>
                                    <Input id="password" type="password" placeholder="●●●●●●●●" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row-reverse justify-between items-baseline">
                        <Button className="bg-primary-logo hover:bg-primary-logo-dark" type="submit">Entrar</Button>


                        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                            Não tem uma conta?
                            <Link to="/register" className="ml-2 text-primary-logo-dark hover:underline">Cadastre-se</Link>.
                        </p>
                    </div>
                </form>
            </Form>
        </section>
    )
}