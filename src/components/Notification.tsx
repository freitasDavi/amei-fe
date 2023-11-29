import { Cronometro } from "@/@types/Cronometro";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { Alarm, BellSimpleRinging, BellSlash } from "@phosphor-icons/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

async function fetchActiveCronometros(codigoUsuario: number) {
    var response = await baseApi.get<Cronometro>(`/cronometro/ultimoAtivo/${codigoUsuario}`);

    return response.data;
}

export function Notification() {
    const queryClient = useQueryClient();
    const [openDialog, setOpenDialog] = useState(false);
    const userData = useAuthStore(state => state.userData);
    const [ultimoCronometroAtivo, setUltimoCronometroAtivo] = useState<number | null>(null);
    const navigate = useNavigate();

    if (!userData) {
        return <Bell />
    }

    const { data: cronometroAtivo, } = useQuery({
        queryKey: ['CronometrosAtivos'],
        queryFn: () => fetchActiveCronometros(userData.id)
    });

    const onClickStopCronometro = async (codigoCronometro: number) => {
        try {
            await baseApi.put(`/cronometro/pararCronometro/${codigoCronometro}`);

            queryClient.invalidateQueries({ queryKey: ['CronometrosAtivos'] });

            setUltimoCronometroAtivo(codigoCronometro);
            setOpenDialog(true);
        } catch (err) {
            console.error(err);
        }
    }

    const onClickGerarOrdemAPartirDoRelogio = async () => {
        try {
            const response = await baseApi.post<number>(`/cronometro/gerarOrdem/${ultimoCronometroAtivo}`);

            navigate(`/ordens/edit/${response.data}`);

        } catch (err) {
            console.error(err);
        }
    }

    if (!cronometroAtivo)
        return (
            <section id="notifications" className="absolute right-32 mt-10 mx-10 h-12 flex justify-end items-center">
                <Popover>
                    <PopoverTrigger><div className="bg-white dark:bg-slate-800 dark:hover:bg-slate-950 p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition-all ease-in
                text-[#FACC15] hover:text-[#81d8f3]">
                        <BellSimpleRinging weight="light" size={28} />
                    </div></PopoverTrigger>
                    <PopoverContent>
                        <p className="text-sm text-slate-400">Você não possúi notificações!</p>
                    </PopoverContent>
                </Popover>

                <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Atenção</AlertDialogTitle>
                            <AlertDialogDescription>
                                Relógio finalizado com sucesso, deseja gerar uma ordem a partir do serviço realizado? <br />
                                Você pode gerar a ordem posteriormente
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={onClickGerarOrdemAPartirDoRelogio}>Gerar ordem</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>
        )

    return (
        <section id="notifications" className="absolute right-32 mt-10 mx-10 h-12 flex justify-end items-center gap-4">
            <Popover>
                <PopoverTrigger><div className="bg-white dark:bg-slate-800 dark:hover:bg-slate-950 p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition-all ease-in
                text-[#FACC15] hover:text-[#81d8f3]">
                    <BellSimpleRinging weight="light" size={28} />
                </div></PopoverTrigger>
                <PopoverContent>
                    <p className="text-sm text-slate-400">Você não possúi notificações!</p>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger>
                    <div className="bg-white dark:bg-slate-800 dark:hover:bg-slate-950 p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition-all ease-in text-[#81d8f3] hover:text-[#1C9AEA]">
                        <Alarm weight="fill" size={28} className="relative" />
                        <p className="absolute -top-2 -right-2 py-1 px-2 bg-red-500 rounded-lg text-xs text-white">1</p>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p className="text-sm text-primary-logo">{cronometroAtivo?.nome}</p>
                            <time className="text-xs text-gray-400">{format(new Date(cronometroAtivo?.inicio!), "iii - H:m", { locale: ptBR })}</time>
                        </div>
                        <button
                            onClick={() => onClickStopCronometro(cronometroAtivo.id)}
                            aria-label="Parar cronometro"
                            className="bg-destructive p-2 rounded-lg cursor-pointer hover:bg-destructive-dark">
                            <BellSlash weight="light" size={20} color="white" />
                        </button>
                    </div>

                </PopoverContent>
            </Popover>



        </section>
    )
}

const Bell = () => {
    return (
        <section id="notifications" className="absolute right-32 mt-10 mx-10 h-12 flex justify-end items-center">
            <Popover>
                <PopoverTrigger><div className="bg-white dark:bg-slate-800 dark:hover:bg-slate-950 p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition-all ease-in
                text-[#FACC15] hover:text-[#81d8f3]">
                    <BellSimpleRinging weight="light" size={28} />
                </div></PopoverTrigger>
                <PopoverContent>
                    <p className="text-sm text-slate-400">Você não possúi notificações!</p>
                </PopoverContent>
            </Popover>
        </section>
    )
}