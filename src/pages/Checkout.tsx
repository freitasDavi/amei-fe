import { stripePromise } from "@/App";
import { CheckoutForm } from "@/components/Payment/CheckoutForm";
import { usePaymentStore } from "@/store/PaymentStore"
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function Checkout() {
    const navigate = useNavigate();
    const clientSecret = usePaymentStore(state => state.clientSecret);

    useEffect(() => {
        if (!clientSecret) {
            navigate("/home");
        }
    }, []);

    return (
        <div>
            <h1>Checkout page!</h1>
            <Elements stripe={stripePromise} options={{
                clientSecret: clientSecret
            }} >
                <CheckoutForm />
            </Elements>
        </div>
    )
}