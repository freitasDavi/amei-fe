import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterMEIForm } from "./RegisterMEIForm";
import { RegisterEnderecoForm } from "./RegisterEnderecoForm";
import { RegisterLoginForm } from "./RegisterLoginForm";
import { baseApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/store/AuthStore";
import { useNavigate } from "react-router-dom";
import { removeCepMask, removeCnpjMask, removePhoneMask } from "@/utils/masks";
import { useState } from "react";
import { AxiosError } from "axios";

const registerSchema = z.object({
    username: z.string().max(20, "Seu usuário pode conter no máximo 20 caracteres"),
    email: z.string().email("Seu email deve conter um formato válido"),
    password: z.string().min(5, "Sua senha deve ter no mínimo 5 caracteres"),
    passwordConfirmation: z.string().min(5, "Sua senha deve ter no mínimo 5 caracteres"),
    razaoSocial: z.string(),
    cnpj: z.string(),
    inscricaoMunicipal: z.string().optional(),
    telefoneUsuario: z.string().max(17, 'Seu telefone deve conter no máximo 17 caracteres'),
    cepUsuario: z.string(),
    logradouroUsuario: z.string(),
    numeroUsuario: z.string(),
    complementoUsuario: z.string(),
    usuarioCidade: z.coerce.number(),
    usuarioBairro: z.coerce.number()
}).refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "A senhas devem ser iguais"
});

export type registerSc = z.infer<typeof registerSchema>;

type RegisterFormProps = {
    changeStep: (newStep: number) => void;
    currentStep: number;
    setIsLoading: (value: boolean) => void;
}

export function RegisterForm({ changeStep, currentStep, setIsLoading }: RegisterFormProps) {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { signIn } = useAuthStore((state) => ({
        signIn: state.setLoginInfo
    }));
    const form = useForm<registerSc>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            razaoSocial: "",
            cnpj: "",
            inscricaoMunicipal: "",
            telefoneUsuario: "",
            cepUsuario: "",
            logradouroUsuario: "",
            numeroUsuario: "",
            complementoUsuario: "",
            usuarioBairro: 0,
            usuarioCidade: 0,
        }
    })

    const handleSubmitRegisterForm = async (data: registerSc) => {

        try {
            setIsLoading(true);

            const response = await baseApi.post("/auth/register", {
                ...data,
                telefoneUsuario: removePhoneMask(data.telefoneUsuario),
                cnpj: removeCnpjMask(data.cnpj),
                cepUsuario: removeCepMask(data.cepUsuario),
                bairroUsuario: Number(data.usuarioBairro),
                cidadeUsuario: Number(data.usuarioCidade)
            });

            if (response.status === 200 || response.status === 201) {
                toast({
                    variant: "success",
                    title: "Sucesso",
                    description: "Cadastro efetuado com sucesso"
                })

                signIn(response.data.accessToken, response.data.refreshToken, {
                    email: response.data.email,
                    id: response.data.id,
                    username: response.data.username,
                    razaoSocial: response.data.razaoSocial,
                    roles: response.data.roles,
                });

                setTimeout(() => {
                    navigate("/home");
                }, 1000);

                return;
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.data?.message) {
                    toast({
                        variant: "destructive",
                        title: "Erro",
                        description: err.response.data.message,
                        // duration: 10000,
                    })
                    return;
                }
            }

            console.warn(err);

            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao realizar cadastro de usuário",
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitRegisterForm, (fields) => console.log("Faltam campos", fields))}>
                {/* Infos CNPJ */}
                {currentStep == 1 && <RegisterMEIForm changeStep={changeStep} />}
                {/* Infos Endereco */}
                {currentStep == 2 && <RegisterEnderecoForm changeStep={changeStep} />}
                {/* Infos Login */}
                {currentStep == 3 && <RegisterLoginForm changeStep={changeStep} />}

                {Object.keys(form.formState.errors).length > 0 && (
                    <div className="bg-red-200 rounded-lg border-2 border-red-400 p-4 my-4 flex flex-col gap-2">
                        <h2 className="text-xl text-red-600 font-semibold">Atenção: </h2>
                        {Object.entries(form.formState.errors).map(([key, value]) => (
                            <p className="text-slate-700" key={key}>{value.message}</p>
                        ))}
                    </div>
                )}
            </form>
        </FormProvider>

    )
}