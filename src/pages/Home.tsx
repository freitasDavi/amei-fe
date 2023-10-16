import { Link } from "react-router-dom";
import { BellSimpleRinging } from "@phosphor-icons/react"
import { CardSlider } from "@/components/Slider/CardSlider";

export default function Home() {

    return (
        <div className="w-full px-14">
            <section id="notifications" className="my-8 h-12 flex justify-end items-center">
                <div className="bg-white p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition-all ease-in
                text-[#FACC15] hover:text-[#81d8f3]">
                    <BellSimpleRinging weight="light" size={28} />
                </div>
            </section>
            <h1 className="text-[4rem] font-logo text-primary-logo font-bold mb-8">Bem vindo</h1>
            <section id="cards" className="w-full flex gap-8">
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
                    icon="Calendar"
                    path="/agendamento"
                    title="Agendamento"
                />
                <CardSlider
                    icon="Users"
                    path="/clientes"
                    title="Clientes"
                />
                <CardSlider
                    icon="FlagBanner"
                    path="/servicos"
                    title="Serviços"
                />
            </section>
        </div>
    )
}