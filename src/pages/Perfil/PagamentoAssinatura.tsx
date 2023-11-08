import { AssinaturaForm } from "@/components/Forms/Pagamentos/AssinaturaForm";
import { PriceCard } from "@/components/Home/PriceCard";
import { baseApi } from "@/lib/api";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function PagamentoAssinatura() {
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState("");
    const [planoSelecionado, setPlanoSelecionado] = useState(0);

    useEffect(() => {
        async function getCheckoutSession() {
            const response = await baseApi.get(`/pagamentos/novaAssinatura/${planoSelecionado}`)

            setKey(response.data.client_secret);
            setIsLoading(false);
        }

        if (planoSelecionado !== 0)
            getCheckoutSession();
    }, [planoSelecionado]);

    const setPlano = (value: number) => {
        if (value == 10)
            return setPlanoSelecionado(1);

        setPlanoSelecionado(2);
    }


    return (
        <div className="w-11/12 flex gap-4">
            {planoSelecionado == 0 && (
                <>
                    <PriceCard
                        title="MEI"
                        price={10}
                        description="Relevant for multiple users, extended & premium support."
                        setPlano={setPlano}
                        key="MEI"
                    />
                    <PriceCard
                        title="Empreendedor"
                        price={20}
                        description="Best for large scale uses and extended redistribution rights."
                        setPlano={setPlano}
                        key="ME"
                    />
                </>
            )}
            {!isLoading && key && planoSelecionado !== 0 && (
                <div className="flex-1">
                    <AssinaturaForm
                        clientSecret={key}
                        stripePromise={stripePromise}
                    />
                </div>
            )}
        </div>
    )
}