import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useFormContext } from "react-hook-form"
import { registerSc } from "./RegisterForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


type Props = {
    changeStep: (newStep: number) => void;
}

export function RegisterMEIForm({ changeStep }: Props) {
    const { control } = useFormContext<registerSc>();

    const onClickAdvance = () => {
        console.log("avançando...");
        changeStep(2);
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <FormField
                control={control}
                name="razaoSocialUsuario"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="razaoSocialUsuario">Razão social</FormLabel>
                        <FormControl>
                            <Input id="razaoSocialUsuario" placeholder="Empresa ltda." {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="cnpjUsuario"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="cnpjUsuario">CNPJ</FormLabel>
                        <FormControl>
                            <Input id="cnpjUsuario" placeholder="000.000.000-00" {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="inscricaoMunicipalUsuario"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="inscricaoMunicipalUsuario">Inscrição municipal</FormLabel>
                        <FormControl>
                            <Input id="inscricaoMunicipalUsuario" placeholder="000000.000.00" {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />

            <span className="w-full flex justify-end mt-6">
                <Button onClick={onClickAdvance}>Próxima etapa</Button>
            </span>
        </div>
    )
}