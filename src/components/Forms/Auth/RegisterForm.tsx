import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterMEIForm } from "./RegisterMEIForm";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
    username: z.string().max(20, "Seu usuário pode conter no máximo 20 caracteres"),
    email: z.string().email("Seu email deve conter um formato válido"),
    password: z.string().min(5, "Sua senha deve ter no mínimo 5 caracteres"),
    razaoSocialUsuario: z.string(),
    cnpjUsuario: z.string(),
    inscricaoMunicipalUsuario: z.string().optional(),
    telefoneUsuario: z.string(),
    cepUsuario: z.string(),
    enderecoUsuario: z.string(),
    numeroUsuario: z.string(),
    complementoUsuario: z.string(),
    usuarioCidade: z.number(),
    usuarioBairro: z.number()
});

export type registerSc = z.infer<typeof registerSchema>;

type RegisterFormProps = {
    changeStep: (newStep: number) => void;
}

export function RegisterForm({ changeStep }: RegisterFormProps) {
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
            usuarioBairro: 0,
            usuarioCidade: 0,
        }
    })

    const handleSubmitRegisterForm = (data: registerSc) => {
        console.log('Iha' + data);
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitRegisterForm, () => console.log("Faltam campos"))}>
                {/* Infos CNPJ */}
                <RegisterMEIForm changeStep={changeStep} />
                {/* Infos Endereco */}
                {/* <RegisterEnderecoForm /> */}
                {/* Infos Login */}
                {/* <RegisterLoginForm /> */}


                <input type="submit" value="Submit" />
            </form>
        </FormProvider>
    )
}