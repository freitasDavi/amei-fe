import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSc } from "./RegisterForm";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

type Props = {
    changeStep: (newStep: number) => void;
}

export function RegisterLoginForm({ changeStep }: Props) {
    const { control, formState } = useFormContext<registerSc>();

    const onClickHandleStep = (passo: number) => {
        changeStep(passo);
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-6">
                <FormField
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="username">Nome de usuário</FormLabel>
                            <FormControl>
                                <Input id="username" placeholder="Joao123" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.username && formState.errors.username.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input id="email" placeholder="email@mail.com" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.email && formState.errors.email.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />
            </div>

            <div className="w-full flex gap-6">
                <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="password">Senha</FormLabel>
                            <FormControl>
                                <Input id="password" placeholder="•••••••••" {...field} />
                            </FormControl>
                            <FormMessage>
                                {formState.errors.password && formState.errors.password.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="passwordConfirmation"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel htmlFor="passwordConfirmation">Confirme sua senha</FormLabel>
                            <FormControl>
                                <Input id="passwordConfirmation" placeholder="••••••••" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            <span className="w-full flex justify-between mt-6">
                <Button type="button" onClick={() => onClickHandleStep(2)}>Etapa anterior</Button>
                <Button type="submit">Salvar</Button>
            </span>
        </div>
    )
}