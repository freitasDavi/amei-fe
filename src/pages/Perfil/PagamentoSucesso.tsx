import { Button } from "@/components/ui/button";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

async function getUpdatedData(codigoUsuario?: number) {
    return baseApi.get(`/users/${codigoUsuario}`);
}

export function PagamentoSucesso() {
    const user = useAuthStore((state) => state.userData);

    const { mutateAsync } = useMutation({
        mutationKey: ["usuario"],
        mutationFn: () => getUpdatedData(user?.id),
    });

    useEffect(() => {
        async function fetchUpdate() {
            mutateAsync();
        }

        if (user?.id) {
            fetchUpdate();
        }
    }, [])

    return (
        <div className="w-full h-full p-10">
            <div className="mt-4 bg-white p-6 rounded-lg md:mx-auto">
                <svg viewBox="0 0 24 24" className="text-green-500 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Pagamento realizado com sucesso!</h3>
                    <p className="text-gray-600 my-2">Obrigado por confiar em nós, vamos juntos deixar o a gestão de MEI mais simples.</p>
                    <p className="text-gray-600 my-2">Seus benefícios já estão ativos.</p>
                    <div className="py-10 text-center">
                        <Link to="/home" >
                            <Button type="button" size="lg">
                                Voltar

                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}