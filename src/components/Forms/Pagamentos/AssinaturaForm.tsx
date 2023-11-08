import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { Stripe } from "@stripe/stripe-js"



export function AssinaturaForm({ clientSecret, stripePromise }:
    {
        clientSecret: string,
        stripePromise: Promise<Stripe | null>
    }) {
    const options = { clientSecret }

    return <
        EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
    >
        <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
}