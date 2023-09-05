import { Button } from "@/components/ui/button";
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
        return new Promise((resolve, reject) => {
            fetch("http://localhost:8080/api/pagamentos/process_payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((response) => {
                    // receber o resultado do pagamento
                    resolve();
                })
                .catch((error) => {
                    // lidar com a resposta de erro ao tentar criar o pagamento
                    reject();
                });
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