import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { baseApi } from "@/lib/api";
import { useState } from "react";
import { AgendamentosPDF, DadosRel } from "../Agendamentos";
import useAuthStore from "@/store/AuthStore";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";


export function ParametrosAgendamentoRel() {
    const user = useAuthStore(state => state.userData);
    const [open, setOpen] = useState(false);
    const [utilizaPeriodo, setUtilizaPeriodo] = useState(false);
    const [dataInicio, setDataInicio] = useState<Date>();
    const [dataFim, setDataFim] = useState<Date | null>(null);


    async function preparaDadosRel() {
        const response = await baseApi.get<DadosRel[]>(`/agendamentos/emitirRel/${user?.id}`);

        AgendamentosPDF({ data: response.data, filtro: { teste: 'UEEUE' } });
    }

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button type="button" variant="default">Emissão de relatórios</Button>
            </DialogTrigger>
            <DialogContent>
                <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" checked={utilizaPeriodo} onCheckedChange={() => setUtilizaPeriodo(!utilizaPeriodo)} />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Filtrar por data?
                        </label>
                    </div>
                </div>
                {utilizaPeriodo && (
                    <div className="flex gap-2">
                        Validade do orçamento
                        <Popover modal>
                            <PopoverTrigger asChild>
                                <Button size="default" variant="outline" className={cn(
                                    "pl-3 text-left font-normal justify-start text-gray-900 dark:text-white",
                                    !dataInicio && "text-muted-foreground"
                                )}>
                                    {dataInicio ? (
                                        <>
                                            <CalendarIcon className="h-4 w-4 opacity-50 mr-2" />
                                            {format(dataInicio, "PPP", { locale: ptBR })}
                                        </>
                                    ) : (
                                        <CalendarIcon className="ml-auto h-6 w-6 opacity-50" />
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    locale={ptBR}
                                    selected={dataInicio}
                                    onSelect={setDataInicio}
                                    // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
                <Button variant="default" type="button" onClick={() => preparaDadosRel()}>Extrato</Button>
            </DialogContent>
        </Dialog>
    )
}