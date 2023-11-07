import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { baseApi } from "@/lib/api";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { PaginationType } from "@/@types/Pagination";


type Props = {
    field: any;
    setCliente: (cliente: ComboClientes) => void
}

export type ComboClientes = {
    nome: string;
    id: number;
    email: string;
    telefone: string;
}

export function ComboClientes({ field, setCliente }: Props) {
    const [clienteSelecionado, setClienteSelecionado] = useState<ComboClientes>();
    const [data, setData] = useState<ComboClientes[]>([]);

    // TODO: Remove useEffect to fetch data from API

    useEffect(() => {
        async function getClients() {
            try {
                const response = await baseApi.get<PaginationType<ComboClientes>>("/clientes/combo");

                setData(response.data.content);
            } catch (error) {
                console.warn("Erro ao recuperar clientes" + error);
            }
        }

        getClients();
    }, []);

    useEffect(() => {
        if (clienteSelecionado !== undefined)
            setCliente(clienteSelecionado);

    }, [field.value]);

    if (data.length === 0) {
        return null;
    }

    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                            ? data.find((cliente) => cliente.id === Number(field.value))?.nome
                            : "Selecione um cliente"
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder="Selecione um cliente..." />
                    <CommandEmpty>Cliente não encontrado</CommandEmpty>
                    <CommandGroup>
                        {data.map((cliente) => (
                            <CommandItem
                                value={cliente.nome}
                                key={cliente.id}
                                onSelect={() => {
                                    field.onChange(cliente.id);
                                    setClienteSelecionado(cliente);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        cliente.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {cliente.nome}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}