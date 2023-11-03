import { Elements } from "@stripe/react-stripe-js"
import { Stripe, StripeElementsOptions } from "@stripe/stripe-js"
import { CheckoutForm } from "./CheckoutForm"

type Props = {
    secretKey: string,
    stripePromise: Promise<Stripe | null>
}

export function FormPagamento({ secretKey, stripePromise }: Props) {
    const options: StripeElementsOptions = {
        clientSecret: secretKey,
        loader: "auto"
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