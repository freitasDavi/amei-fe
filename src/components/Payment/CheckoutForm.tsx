import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "../ui/button";


export function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string>();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            }
        });

        if (error) {
            setMessage(error.message);
        }



        setIsProcessing(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            {message && <p>{message}</p>}
            <PaymentElement />
            <Button disabled={isProcessing} type="submit">{isProcessing ? "Processando..." : "Pague o aluguel"}</Button>
        </form>
    )
}