import { Elements } from "@stripe/react-stripe-js"
import { Stripe } from "@stripe/stripe-js"
import { CheckoutForm } from "./CheckoutForm"

type Props = {
    secretKey: string,
    stripePromise: Promise<Stripe | null>
}

export function FormPagamento({ secretKey, stripePromise }: Props) {
    const options = {
        clientSecret: secretKey
    }

    return (
        <div>
            <h1 className="text-2xl text-primary-logo font-semibold">Pague o que deve seu barriga</h1>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}