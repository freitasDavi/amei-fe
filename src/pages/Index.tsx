import { ContatoContainer } from "@/components/Home/Contato"
import { CtaContainer } from "@/components/Home/CtaContainer"
import { Footer } from "@/components/Home/Footer"
import { FuncionalidadesContainer } from "@/components/Home/FuncionalidadesContainer"
import { Header } from "@/components/Home/Header"
import { HeroContainer } from "@/components/Home/HeroContainer"
import { PriceContainer } from "@/components/Home/PriceContainer"

export function IndexPage() {
    return (
        <div className="flex flex-col gap-4">
            <Header />

            <HeroContainer />

            <CtaContainer />

            <FuncionalidadesContainer />

            <PriceContainer />

            {/* <ContatoContainer /> */}

            <Footer />
        </div>
    )
}