import { CardSlider } from "@/components/Slider/CardSlider";
import useAuthStore from "@/store/AuthStore";

export default function Home() {
    const userData = useAuthStore(state => state.userData);
    // TODO: Verificar se o usuário é ADM e ocultar a aba de cursos, ou trocar o link!

    return (
        <div className="w-full px-10 overflow-x-hidden">
            <h1 className="text-[4rem] font-logo text-primary-logo font-bold mb-8">Bem-vindo {userData?.username}</h1>
            <section id="cards" className="w-full flex gap-8">
                <CardSlider
                    icon="Calendar"
                    path="/agendamentos"
                    title="Agendamentos"
                />
                <CardSlider
                    icon="Users"
                    path="/clientes"
                    title="Clientes"
                />
                <CardSlider
                    icon="GraduationCap"
                    path="/cursos"
                    title="Cursos"
                />
                <CardSlider
                    icon="Money"
                    path="/orcamentos"
                    title="Orçamento"
                />
                <CardSlider
                    icon="Package"
                    path="/ordens"
                    title="Ordem de Serviço"
                />
                <CardSlider
                    icon="FlagBanner"
                    path="/servicos"
                    title="Serviços"
                />
                <CardSlider
                    icon="Alarm"
                    path="/timer"
                    title="Timer"
                />
            </section>
        </div>
    )
}