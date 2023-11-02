import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { error } from "console";
import { FormEvent, useState } from "react";



export function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string | null>();

    const handleSubmitPayment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe ainda não carregou.
            return;
        }

        // TODO: Change screen after paymentIntent

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/pagamento/sucesso/"
            }
        });

        if (error) {
            setErrorMessage("Erro" + error.message);
        }

    }

    return (
        <form onSubmit={handleSubmitPayment}>
            <PaymentElement />
            <button type="submit">Finalizar</button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
    )
}