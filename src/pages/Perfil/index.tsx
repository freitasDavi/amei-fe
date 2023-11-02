import { FormPagamento } from "@/components/Forms/Pagamentos/FormPagamento";
import { baseApi } from "@/lib/api";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function PerfilPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState("");

    useEffect(() => {
        async function getPaymentIntent() {
            const response = await baseApi.get("/pagamentos/novoPagamento")

            setKey(response.data.client_secret);
            setIsLoading(false);
        }

        getPaymentIntent();
    }, []);

    return (
        <div className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <h1 className="font-medium text-3xl text-primary-logo">Meu perfil</h1>
                {!isLoading && key && (
                    <FormPagamento secretKey={key} stripePromise={stripePromise} />
                )}
            </div>
        </div>
    )
}