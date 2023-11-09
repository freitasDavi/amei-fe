import { PaginationType } from "@/@types/Pagination";
import { baseApi } from "@/lib/api";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

type Props = {
    field: any;
    setCidade?: (cliente: ComboCidade) => void
}

export type ComboCidade = {
    id: number;
    nomeCidade: string;
}

async function fetchCidades() {
    const response = await baseApi.get<PaginationType<ComboCidade>>("/cidade");

    return response.data;
}

export function ComboCidade({ field, setCidade }: Props) {
    const [cidadeSelecionada, setCidadeSelecionada] = useState<ComboCidade>();
    const { data, isFetching } = useQuery({
        queryKey: ["cidades"],
        queryFn: fetchCidades,
    })


    useEffect(() => {
        if (setCidade && cidadeSelecionada !== undefined)
            setCidade(cidadeSelecionada);

    }, [field.value]);

    if (data?.content.length === 0 || isFetching) {
        return <Skeleton className="w-full h-10" />;
    }

    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "justify-between text-gray-900",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                            ? data?.content.find((cidade) => cidade.id === Number(field.value))?.nomeCidade
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
                        {data?.content.map((cidade) => (
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