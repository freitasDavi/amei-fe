import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form"
import { registerSc } from "./RegisterForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


type Props = {
    changeStep: (newStep: number) => void;
}

export function RegisterMEIForm({ changeStep }: Props) {
    const { control, formState } = useFormContext<registerSc>();

    const onClickAdvance = () => {
        console.log("avançando...");
        changeStep(2);
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-6">
                <FormField
                    control={control}
                    name="razaoSocialUsuario"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="razaoSocialUsuario">Razão social</FormLabel>
                            <FormControl>
                                <Input id="razaoSocialUsuario" placeholder="Empresa ltda." {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.razaoSocialUsuario && formState.errors.razaoSocialUsuario.message}
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
                                <Input id="telefoneUsuario" placeholder="048 99999-9999" {...field} />
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
                    name="cnpjUsuario"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="cnpjUsuario">CNPJ</FormLabel>
                            <FormControl>
                                <Input id="cnpjUsuario" placeholder="000.000.000-00" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.cnpjUsuario && formState.errors.cnpjUsuario.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="inscricaoMunicipalUsuario"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="inscricaoMunicipalUsuario">Inscrição municipal</FormLabel>
                            <FormControl>
                                <Input id="inscricaoMunicipalUsuario" placeholder="000000.000.00" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.inscricaoMunicipalUsuario && formState.errors.inscricaoMunicipalUsuario.message}
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