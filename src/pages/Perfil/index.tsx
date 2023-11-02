import { baseApi } from "@/lib/api";
import { useEffect } from "react"



export function PerfilPage() {

    useEffect(() => {
        async function getPaymentIntent() {
            const response = await baseApi.get("/pagamentos/novoPagamento")

            console.log(response.data);
        }

        getPaymentIntent();
    }, []);

    return (
        <div className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <h1 className="font-medium text-3xl text-primary-logo">Meu perfil</h1>
            </div>
        </div>
    )
}