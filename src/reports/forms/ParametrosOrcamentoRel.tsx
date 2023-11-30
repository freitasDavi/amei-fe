import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { baseApi } from "@/lib/api";
import { useState } from "react";
import { AgendamentosPDF, DadosRel } from "../Agendamentos";
import useAuthStore from "@/store/AuthStore";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ComboTipoRelatorio } from "@/components/Comboboxes/ComboTipoRelatorio";
import { useToast } from "@/components/ui/use-toast";
import { exportCSV, exportCSVComPeriodo } from "@/api/Orcamento";
import { PaginationType } from "@/@types/Pagination";
import { OrcamentosTable } from "@/@types/Orcamentos";
import { OrcamentoPDF } from "../orcamento/OrcamentoPDF";


export function ParametrosOrcamentoRel() {
    const { toast } = useToast();
    const user = useAuthStore(state => state.userData);
    const [open, setOpen] = useState(false);
    const [utilizaPeriodo, setUtilizaPeriodo] = useState(false);
    const [dataInicio, setDataInicio] = useState<Date>();
    const [dataFim, setDataFim] = useState<Date>();
    const [tipoRel, setTipoRel] = useState("pdf");


    async function preparaDadosRel() {
        if (tipoRel === "csv") {

            if (utilizaPeriodo) {
                return await exportCSVComPeriodo({ dataInicio: dataInicio!, dataFim: dataFim! });
            }

            return await exportCSV();
        }

        var response;

        if (utilizaPeriodo) {
            // TODO: Filtrar pelo periodo
            response = await baseApi.get<PaginationType<OrcamentosTable>>('/orcamentos');
        } else {
            response = await baseApi.get<PaginationType<OrcamentosTable>>('/orcamentos');
        }

        if (response.data.content.length === 0) {
            toast({
                variant: "default",
                title: "Opa",
                description: "Não foram encontrados dados para o perídodo selecionado",
                duration: 5000
            })
            return;
        }

        OrcamentoPDF({
            data: response.data.content, filtro: utilizaPeriodo ? {
                periodo: `De ${format(dataInicio!, 'dd/MM/yyyy', { locale: ptBR })} até ${format(dataFim!, 'dd/MM/yyyy', { locale: ptBR })}`
            } : {}
        });
    }

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button type="button" variant="default">Emissão de relatórios</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Relatório de orçamento</DialogHeader>
                <Label>Formato de exportação</Label>
                <ComboTipoRelatorio value={tipoRel} setValue={setTipoRel} />
                <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" checked={utilizaPeriodo} onCheckedChange={() => setUtilizaPeriodo(!utilizaPeriodo)} />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Filtrar por data
                        </label>
                    </div>
                </div>
                {utilizaPeriodo && (
                    <div className="flex gap-2">
                        <div className="flex-1 flex flex-col gap-2 mt-1">
                            <Label>Início</Label>
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
                                            <div className="flex gap-2 items-end">
                                                <CalendarIcon className="ml-auto h-6 w-6 opacity-50" />
                                                Data de início
                                            </div>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        locale={ptBR}
                                        selected={dataInicio}
                                        onSelect={setDataInicio}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex-1 flex flex-col gap-2 mt-1">
                            <Label>Fim</Label>
                            <Popover modal>
                                <PopoverTrigger asChild>
                                    <Button size="default" variant="outline" className={cn(
                                        "pl-3 text-left font-normal justify-start text-gray-900 dark:text-white",
                                        !dataFim && "text-muted-foreground"
                                    )}>
                                        {dataFim ? (
                                            <>
                                                <CalendarIcon className="h-4 w-4 opacity-50 mr-2" />
                                                {format(dataFim, "PPP", { locale: ptBR })}
                                            </>
                                        ) : (
                                            <div className="flex gap-2 items-end">
                                                <CalendarIcon className="ml-auto h-6 w-6 opacity-50" />
                                                Data final
                                            </div>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        locale={ptBR}
                                        selected={dataFim}
                                        onSelect={setDataFim}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )}
                <Button variant="default" type="button" onClick={() => preparaDadosRel()}>Emitir</Button>
            </DialogContent>
        </Dialog>
    )
}