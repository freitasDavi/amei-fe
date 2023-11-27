import { PaginationType } from "@/@types/Pagination";
import { Servicos } from "@/@types/Servicos";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";


async function fetchServicosUsuario(codigoUsuario?: number) {
    if (!codigoUsuario) return {} as PaginationType<Servicos>;

    const response = await baseApi.get<PaginationType<Servicos>>(`/servicos/?codigoUsuario=${codigoUsuario}`);

    return response.data;
}

type Props = {
    field: any;
    setServico: (servico: Servicos) => void
}

export function ComboServico({ field, setServico }: Props) {
    const user = useAuthStore(state => state.userData);
    const [servicoSelecionado, setServicoSelecionado] = useState<Servicos>();
    const { data, isFetching } = useQuery({
        queryKey: ["ComboServicos"],
        queryFn: () => fetchServicosUsuario(user?.id),
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (setServico && servicoSelecionado !== undefined)
            setServico(servicoSelecionado);

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
                            "justify-between text-gray-900 dark:text-white",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                            ? data?.content.find((servico) => servico.id === Number(field.value))?.descricaoServico
                            : "Selecione um serviço"
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="max-h-[200px] overflow-auto">
                <Command className="z-10">
                    <CommandInput placeholder="Selecione uma cidade..." />
                    <CommandEmpty>Cidade não encontrado</CommandEmpty>
                    <CommandGroup>
                        {data?.content.map((servico) => (
                            <CommandItem
                                className="z-10"
                                value={servico.descricaoServico}
                                key={servico.id}
                                onSelect={() => {
                                    field.onChange(servico.id);
                                    setServicoSelecionado(servico);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        servico.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {servico.descricaoServico}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}