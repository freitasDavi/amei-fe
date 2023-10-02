import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterMEIForm } from "./RegisterMEIForm";
import { RegisterEnderecoForm } from "./RegisterEnderecoForm";
import { RegisterLoginForm } from "./RegisterLoginForm";
import { baseApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const registerSchema = z.object({
    username: z.string().max(20, "Seu usuário pode conter no máximo 20 caracteres"),
    email: z.string().email("Seu email deve conter um formato válido"),
    password: z.string().min(5, "Sua senha deve ter no mínimo 5 caracteres"),
    passwordConfirmation: z.string().min(5, "Sua senha deve ter no mínimo 5 caracteres"),
    razaoSocial: z.string(),
    cnpj: z.string(),
    inscricaoMunicipal: z.string().optional(),
    telefone: z.string(),
    cep: z.string(),
    enderecoUsuario: z.string(),
    numeroUsuario: z.string(),
    complementoUsuario: z.string(),
    usuarioCidade: z.string(),
    usuarioBairro: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "A senhas devem ser iguais"
});

export type registerSc = z.infer<typeof registerSchema>;

type RegisterFormProps = {
    changeStep: (newStep: number) => void;
    currentStep: number;
}

export function RegisterForm({ changeStep, currentStep }: RegisterFormProps) {
    const { toast } = useToast();
    const form = useForm<registerSc>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            razaoSocial: "",
            cnpj: "",
            inscricaoMunicipal: "",
            telefone: "",
            cep: "",
            enderecoUsuario: "",
            numeroUsuario: "",
            complementoUsuario: "",
            usuarioBairro: "",
            usuarioCidade: "",
        }
    })

    const handleSubmitRegisterForm = async (data: registerSc) => {

        try {
            const response = await baseApi.post("/auth/register", {
                ...data,
                usuarioBairro: Number(data.usuarioBairro),
                usuarioCidade: Number(data.usuarioCidade)
            });

            if (response.status === 200) {
                toast({
                    variant: "success",
                    title: "Sucesso",
                    description: "Cadastro efetuado com sucesso"
                })
            }
        } catch (err) {
            console.log('Error');
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao realizar cadastro de usuário",
            })
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
            </form>
        </FormProvider>
    )
}