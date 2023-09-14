import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import { customization, initialization } from "@/lib/payment";
import { Payment } from "@mercadopago/sdk-react";
import { useState } from "react";


export function Checkout() {
    const [isLoading, setIsLoading] = useState(true);

    const onReadyBricks = async () => {
        setIsLoading(false);
    }

    const onError = async (error) => {
        // callback chamado para todos os casos de erro do Brick
        console.log(error);
        console.warn("Erro ao carregar gerenciador de pagamento...");
        console.warn("Atualize a página")
    };

    const onSubmitPayment = async ({
        selectedPaymentMethod, formData
    }) => {
        return new Promise(async (resolve, reject) => {

            try {
                const response = await baseApi.post("/pagamentos/process_payment", formData);

                console.log(response.data)

                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    return (
        <div>
            <h1>Checkout page!</h1>

            {isLoading && <p>Carregando...</p>}

            <Payment
                locale="pt-BR"
                initialization={initialization}
                customization={{
                    paymentMethods: {
                        creditCard: "all",
                        debitCard: "all",
                        ticket: "all",
                    }
                }}
                onSubmit={onSubmitPayment}
                onError={onError}
                onReady={onReadyBricks}
            />
            {/* <Button onClick={test}>Teste</Button> */}
        </div>
    )
}