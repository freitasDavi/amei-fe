import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";
import { baseApi } from "@/lib/api";
import { PaginationType } from "@/@types/Pagination";
import { useQuery } from "@tanstack/react-query";

type Props = {
    codigoCidade?: number;
    field: any
}

export type ComboBairro = {
    id: number;
    nomeBairro: string;
}

async function fetchBairros(codigoCidade?: number) {
    codigoCidade && console.log(codigoCidade)
    const response = await baseApi.get<PaginationType<ComboBairro>>("bairros");

    return response.data.content;
}

export function ComboBairro({ codigoCidade, field }: Props) {
    // const [data, setData] = useState<ComboBairro[]>([]);
    const { data } = useQuery({
        queryKey: ['ComboBairro'],
        queryFn: () => fetchBairros(codigoCidade)
    })

    if (!codigoCidade || !data) return null;

    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline" className="text-gray-900">
                        {field.value
                            ? data.find((bairro) => bairro.id === Number(field.value))?.nomeBairro
                            : "Selecione um bairro"
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent>
                <Command className="z-10">
                    <CommandInput placeholder="Selecione um bairro..." />
                    <CommandEmpty>Bairro não encontrado</CommandEmpty>
                    <CommandGroup>
                        {data.map((bairro) => (
                            <CommandItem
                                className="z-10"
                                value={bairro.nomeBairro}
                                key={bairro.id}
                                onSelect={() => {
                                    field.onChange(bairro.id);
                                    // setCidadeSelecionada(cidade);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        bairro.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {bairro.nomeBairro}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}