import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { baseApi } from "@/lib/api";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { orcamentoSc } from "../Forms/Orcamento/OrcamentoForm";


type Props = {
    field: any;
}

type Clientes = {
    Nome: string;
    Id: number;
}

export function ComboClientes({ field }: Props) {
    const [data, setData] = useState<Clientes[]>([]);

    useEffect(() => {
        async function getClients() {
            try {
                const response = await baseApi.get<Clientes[]>("/clientes");

                setData(response.data);
            } catch (error) {
                console.warn("Erro ao recuperar clientes" + error);
            }
        }

        getClients();
    }, [])

    if (data.length === 0) {
        return null;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                            ? data.find((cliente) => cliente.Id === Number(field.value))?.Nome
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
                                value={cliente.Nome}
                                key={cliente.Id}
                                onSelect={() => {
                                    field.onChange(cliente.Id)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        cliente.Id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {cliente.Nome}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}