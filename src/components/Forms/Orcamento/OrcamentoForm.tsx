import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaOrcamento = z.object({
    id: z.number().optional(),
    telefoneClienteOrcamento: z.string().max(11, 'O telefone deve ter no máximo 11 caractéres'),
    dataEmissaoOrcamento: z.date().optional(),
    dataValidadeOrcamento: z.date(),
    valorTotalDoOrcamento: z.coerce.number(),
    observacoesOrcamento: z.string(),
    usuarioOrcamento: z.number(),
    clienteOrcamento: z.number().optional(),
    orcamentoOrdemServico: z.number().optional(),
})


type orcamentoSc = z.infer<typeof schemaOrcamento>;

export function OrcamentoForm() {
    const form = useForm<orcamentoSc>({
        resolver: zodResolver(schemaOrcamento),
        defaultValues: {
            clienteOrcamento: 0,
            dataValidadeOrcamento: new Date(),
            observacoesOrcamento: "",
            telefoneClienteOrcamento: "",
            valorTotalDoOrcamento: 0
        }
    });

    async function handleNovoOrcamento(data: orcamentoSc) {

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleNovoOrcamento)} className="flex flex-col gap-4 m-5">
                <div className="flex bg-red-300 justify-evenly gap-10 p-5">
                    <FormField
                        control={form.control}
                        name="clienteOrcamento"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Cliente</FormLabel>
                                <FormControl>
                                    <Input id="descricaoServico" placeholder="Trocar rebimboca da parafuseta" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="clienteOrcamento"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Cliente</FormLabel>
                                <FormControl>
                                    <Input id="descricaoServico" placeholder="Trocar rebimboca da parafuseta" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="clienteOrcamento"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Cliente</FormLabel>
                                <FormControl>
                                    <Input id="descricaoServico" placeholder="Trocar rebimboca da parafuseta" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

            </form>
        </Form>
    )
}