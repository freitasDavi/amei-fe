import { Cronometro } from "@/@types/Cronometro";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { BellSimpleRinging, BellSlash } from "@phosphor-icons/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

async function fetchActiveCronometros(codigoUsuario: number) {
    var response = await baseApi.get<Cronometro>(`/cronometro/ultimoAtivo/${codigoUsuario}`);

    return response.data;
}

export function Notification() {
    const queryClient = useQueryClient();
    const userData = useAuthStore(state => state.userData);

    if (!userData) {
        return <Bell />
    }

    const { data: cronometroAtivo, } = useQuery({
        queryKey: ['CronometrosAtivos'],
        queryFn: () => fetchActiveCronometros(userData.id)
    });

    if (!cronometroAtivo) return <Bell />;

    const onClickStopCronometro = async (codigoCronometro: number) => {
        try {
            await baseApi.put(`/cronometro/pararCronometro/${codigoCronometro}`);

            queryClient.invalidateQueries({ queryKey: ['CronometrosAtivos'] });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section id="notifications" className="absolute right-32 mt-10 mx-10 h-12 flex justify-end items-center">
            <Popover>
                <PopoverTrigger>
                    <div className="bg-white p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition-all ease-in text-[#FACC15] hover:text-[#facc15b6]">
                        <BellSimpleRinging weight="fill" size={28} className="relative" />
                        <p className="absolute -top-2 -right-2 py-1 px-2 bg-red-500 rounded-lg text-xs">1</p>
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
                <PopoverTrigger><div className="bg-white p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition-all ease-in
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