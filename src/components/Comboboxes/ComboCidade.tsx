import { PaginationType } from "@/@types/Pagination";
import { baseApi } from "@/lib/api";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";

type Props = {
    field: any;
    setCidade?: (cliente: ComboCidade) => void
}

export type ComboCidade = {
    id: number;
    nomeCidade: string;
}

export function ComboCidade({ field, setCidade }: Props) {
    const [cidadeSelecionada, setCidadeSelecionada] = useState<ComboCidade>();
    const [data, setData] = useState<ComboCidade[]>([]);

    // TODO: Remove useEffect to fetch data from API

    useEffect(() => {
        async function getClients() {
            try {
                const response = await baseApi.get<PaginationType<ComboCidade>>("/cidade");

                setData(response.data.content);
            } catch (error) {
                console.warn("Erro ao recuperar cidades" + error);
            }
        }

        getClients();
    }, []);

    useEffect(() => {
        if (setCidade && cidadeSelecionada !== undefined)
            setCidade(cidadeSelecionada);

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
                            ? data.find((cidade) => cidade.id === Number(field.value))?.nomeCidade
                            : "Selecione uma cidade"
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent>
                <Command className="z-10">
                    <CommandInput placeholder="Selecione uma cidade..." />
                    <CommandEmpty>Cidade não encontrado</CommandEmpty>
                    <CommandGroup>
                        {data.map((cidade) => (
                            <CommandItem
                                className="z-10"
                                value={cidade.nomeCidade}
                                key={cidade.id}
                                onSelect={() => {
                                    field.onChange(cidade.id);
                                    setCidadeSelecionada(cidade);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        cidade.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {cidade.nomeCidade}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}