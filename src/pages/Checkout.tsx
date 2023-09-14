import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";


export function Checkout() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            <h1>Checkout page!</h1>

            {/* {isLoading && <p>Carregando...</p>} */}
            <form>
                <PaymentElement />

                <Button type="submit" >Teste</Button>
            </form>

        </div>
    )
}