import { GraficoHome } from "@/components/Graficos/GraficoHome";
import { Slider } from "@/components/Slider/Slider";
import { UltimosAgendamentos } from "@/components/Tables/Agendamentos/UltimosAgendamentos";
import useAuthStore from "@/store/AuthStore";

export default function Home() {
    const userData = useAuthStore(state => state.userData);
    // TODO: Verificar se o usuário é ADM e ocultar a aba de cursos, ou trocar o link!

    return (
        <div className="w-[96%] px-10 overflow-x-hidden">
            <h1 className="text-[4rem] font-logo text-primary-logo font-bold mb-8">Bem-vindo {userData?.username}</h1>
            <section id="cards" className="">
                <Slider />
            </section>
            <section className="mt-10 grid grid-cols-1 md:grid-cols-2">
                <GraficoHome />
                <UltimosAgendamentos />
            </section>
        </div>
    )
}