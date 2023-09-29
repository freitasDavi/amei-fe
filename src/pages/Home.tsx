import { Link } from "react-router-dom";
import { useEffect } from "react";
import { baseApi } from "@/lib/api";
import { PaymentIntentResponse } from "@/lib/responses/PaymentIntentResponse";
import { usePaymentStore } from "@/store/PaymentStore";

export default function Home() {
    const setClientSecret = usePaymentStore(state => state.setClientSecret);


    useEffect(() => {
        const getClientSecret = async () => {
            const response = await baseApi.get<PaymentIntentResponse>("/pagamentos/getPaymentIntent");

            setClientSecret(response.data.client_secret);
        }

        getClientSecret();
    }, []);

    return (
        <div className="flex flex-row">
            <div>
                <h1 className="text-3xl font-bold">Hello from home!</h1>
                <Link to="/checkout">
                    <ShoppingCart size={40} color="#dbce40" weight="fill" />
                </Link>
                <Link to="/login" className="underline text-blue-500 hover:text-blue-700">Login</Link>
            </div>
            <div>
                <Link to="/checkout">
                    <Star size={40} color="#dbce40" weight="fill" />
                </Link>
            </div>
        </div>
    )
}