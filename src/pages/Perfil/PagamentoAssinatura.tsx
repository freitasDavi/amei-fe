import { AssinaturaForm } from "@/components/Forms/Pagamentos/AssinaturaForm";
import { baseApi } from "@/lib/api";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function PagamentoAssinatura() {
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState("");

    useEffect(() => {
        async function getCheckoutSession() {
            const response = await baseApi.get("/pagamentos/novaAssinatura")

            setKey(response.data.client_secret);
            setIsLoading(false);
        }

        getCheckoutSession();
    }, []);


    return (
        <div className="w-11/12">
            <h3 className="text-xl text-blue-500">Plano MEI</h3>
            <h5 className="text-md text-blue-300">R$10,00 / Mês</h5>
            {!isLoading && key && (
                <AssinaturaForm
                    clientSecret={key}
                    stripePromise={stripePromise}
                />
            )}
        </div>
    )
}