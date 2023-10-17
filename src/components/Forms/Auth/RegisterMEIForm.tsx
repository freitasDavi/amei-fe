import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form"
import { registerSc } from "./RegisterForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { maskCnpj, maskPhone } from "@/utils/masks";

type Props = {
    changeStep: (newStep: number) => void;
}

export function RegisterMEIForm({ changeStep }: Props) {
    const { control, formState, setValue, watch } = useFormContext<registerSc>();
    const phone = watch('telefoneUsuario');
    const cnpj = watch('cnpj');
    const onClickAdvance = () => {
        console.log("avançando...");
        changeStep(2);
    }

    useEffect(() => {
        setValue('telefoneUsuario', maskPhone(phone))
        setValue('cnpj', maskCnpj(cnpj))
    }, [phone, cnpj])

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-6">
                <FormField
                    control={control}
                    name="razaoSocial"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="razaoSocialUsuario">Razão social</FormLabel>
                            <FormControl>
                                <Input id="razaoSocialUsuario" placeholder="Empresa ltda." {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.razaoSocial && formState.errors.razaoSocial.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="telefoneUsuario"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="telefoneUsuario">Telefone</FormLabel>
                            <FormControl>
                                <Input id="telefoneUsuario" placeholder="(48) 99999-9999" pattern="/\(\d\d\)\d\d\d\d\d-\d\d\d\d/i" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.telefoneUsuario && formState.errors.telefoneUsuario.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
            </div>

            <div className="w-full flex gap-6">
                <FormField
                    control={control}
                    name="cnpj"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="cnpjUsuario">CNPJ</FormLabel>
                            <FormControl>
                                <Input id="cnpjUsuario" placeholder="00 000 000/0000-00" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.cnpj && formState.errors.cnpj.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="inscricaoMunicipal"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="inscricaoMunicipalUsuario">Inscrição municipal</FormLabel>
                            <FormControl>
                                <Input id="inscricaoMunicipalUsuario" placeholder="000000.000.00" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.inscricaoMunicipal && formState.errors.inscricaoMunicipal.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />

            </div>


            <span className="w-full flex justify-end mt-6">
                <Button type="button" onClick={onClickAdvance}>Próxima etapa</Button>
            </span>
        </div>
    )
}