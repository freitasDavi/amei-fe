import { useFormContext } from "react-hook-form";
import { registerSc } from "./RegisterForm";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { maskCep } from "@/utils/masks";
import { ComboCidade } from "@/components/Comboboxes/ComboCidade";
import { ComboBairro } from "@/components/Comboboxes/ComboBairro";
import { baseApi } from "@/lib/api";

type Props = {
    changeStep: (newStep: number) => void;
}

export function RegisterEnderecoForm({ changeStep }: Props) {
    const { control, formState, watch, setValue } = useFormContext<registerSc>();
    const cep = watch("cepUsuario");
    const codigoCidade = watch("usuarioCidade");

    useEffect(() => {
        setValue("cepUsuario", maskCep(cep))
    }, [cep])

    const onClickHandleStep = (passo: number) => {
        changeStep(passo);
    }

    const onBlurHandleCep = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const cep = e.target.value.replace("-", "");

        if (cep.length === 8) {
            const resp = await baseApi.get('/cidade/getByCEP/' + cep);
            if (resp.data) {
                setValue("usuarioCidade", resp.data.codigoCidade);
                setValue("usuarioBairro", resp.data.codigoBairro);
                setValue("complementoUsuario", resp.data.complemento);
                setValue("logradouroUsuario", resp.data.rua);
            }
        }
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-6">
                <FormField
                    control={control}
                    name="cepUsuario"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="cepUsuario">CEP</FormLabel>
                            <FormControl>
                                <Input onChange={(e) => field.onChange(e)} value={field.value} onBlur={(e) => onBlurHandleCep(e)} id="cepUsuario" placeholder="00000-000" maxLength={9} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.cepUsuario && formState.errors.cepUsuario.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="usuarioCidade"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col mt-[10px]">
                            <FormLabel htmlFor="usuarioCidade">Cidade</FormLabel>
                            <ComboCidade field={field} />
                            <FormMessage>
                                {formState.errors.usuarioCidade && formState.errors.usuarioCidade.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
            </div>

            <div className="w-full flex gap-6">
                <FormField
                    control={control}
                    name="logradouroUsuario"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="enderecoUsuario">Endereço</FormLabel>
                            <FormControl>
                                <Input id="enderecoUsuario" placeholder="Rua Brasil" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.logradouroUsuario && formState.errors.logradouroUsuario.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="usuarioBairro"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col mt-[10px]">
                            <FormLabel htmlFor="usuarioBairro">Bairro</FormLabel>
                            <ComboBairro field={field} codigoCidade={Number(codigoCidade)} />
                            <FormMessage>
                                {formState.errors.usuarioBairro && formState.errors.usuarioBairro.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
            </div>

            <div className="w-full flex gap-6">
                <FormField
                    control={control}
                    name="numeroUsuario"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="numeroUsuario">Número</FormLabel>
                            <FormControl>
                                <Input id="numeroUsuario" placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.numeroUsuario && formState.errors.numeroUsuario.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="complementoUsuario"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="complementoUsuario">Complemento</FormLabel>
                            <FormControl>
                                <Input id="complementoUsuario" placeholder="Próximo a..." {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.complementoUsuario && formState.errors.complementoUsuario.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
            </div>


            <span className="w-full flex justify-between mt-6">
                <Button type="button" onClick={() => onClickHandleStep(1)}>Etapa anterior</Button>
                <Button type="button" onClick={() => onClickHandleStep(3)}>Próxima etapa</Button>
            </span>
        </div>
    )
}