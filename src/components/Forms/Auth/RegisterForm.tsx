import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterMEIForm } from "./RegisterMEIForm";
import { Button } from "@/components/ui/button";
import { RegisterEnderecoForm } from "./RegisterEnderecoForm";
import { RegisterLoginForm } from "./RegisterLoginForm";

const registerSchema = z.object({
    username: z.string().max(20, "Seu usuário pode conter no máximo 20 caracteres"),
    email: z.string().email("Seu email deve conter um formato válido"),
    password: z.string().min(5, "Sua senha deve ter no mínimo 5 caracteres"),
    passwordConfirmation: z.string().min(5, "Sua senha deve ter no mínimo 5 caracteres"),
    razaoSocialUsuario: z.string(),
    cnpjUsuario: z.string(),
    inscricaoMunicipalUsuario: z.string().optional(),
    telefoneUsuario: z.string(),
    cepUsuario: z.string(),
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
    const form = useForm<registerSc>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            razaoSocialUsuario: "",
            cnpjUsuario: "",
            inscricaoMunicipalUsuario: "",
            telefoneUsuario: "",
            cepUsuario: "",
            enderecoUsuario: "",
            numeroUsuario: "",
            complementoUsuario: "",
            usuarioBairro: "",
            usuarioCidade: "",
        }
    })

    const handleSubmitRegisterForm = (data: registerSc) => {
        console.log('Iha' + data);
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitRegisterForm, () => console.log("Faltam campos"))}>
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