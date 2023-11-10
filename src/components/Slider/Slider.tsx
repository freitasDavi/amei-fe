import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react";
import { CardSlider } from "./CardSlider";
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

export function Slider() {
    return (
        <div className="w-full p-5 relative">
            <button
                className="review-swipper-button-prev 
                rounded-full p-1 z-10 absolute top-[40%] -left-5
                bg-blue-200 hover:bg-blue-400 cursor-pointer text-primary-logo hover:text-white transition">
                <ArrowLeft size={25} />
            </button>
            <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={6}
                navigation={{
                    nextEl: '.review-swipper-button-next',
                    prevEl: '.review-swipper-button-prev'
                }}
            >
                <SwiperSlide>
                    <CardSlider
                        icon="Calendar"
                        path="/agendamentos"
                        title="Agendamentos"
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <CardSlider
                        icon="Users"
                        path="/clientes"
                        title="Clientes"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardSlider
                        icon="GraduationCap"
                        path="/cursos"
                        title="Cursos"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardSlider
                        icon="Money"
                        path="/orcamentos"
                        title="Orçamento"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardSlider
                        icon="Package"
                        path="/ordens"
                        title="Ordem de Serviço"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardSlider
                        icon="FlagBanner"
                        path="/servicos"
                        title="Serviços"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CardSlider
                        icon="Alarm"
                        path="/timer"
                        title="Timer"
                    />
                </SwiperSlide>
            </Swiper>
            <button
                className="review-swipper-button-next rounded-full p-1 z-10 absolute top-[40%] right-10
                bg-blue-200 hover:bg-blue-400 cursor-pointer text-primary-logo hover:text-white transition">
                <ArrowRight size={25} />
            </button>
        </div>
    )
}