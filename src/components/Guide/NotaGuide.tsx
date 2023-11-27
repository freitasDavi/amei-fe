import { useEffect, useState } from "react";
import { Steps } from 'intro.js-react';
import '../../assets/css/introjs.css';
import { useQuery } from "@tanstack/react-query";
import { OrdemServicoCad } from "@/@types/OrdemServico";
import { baseApi } from "@/lib/api";
import { useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { maskCnpj } from "@/utils/masks";

async function fetchOrdem(id: number): Promise<undefined | OrdemServicoCad> {
    if (!id) return undefined;

    var response = await baseApi.get<OrdemServicoCad>(`/ordemServico/${id}`);

    return response.data;
}


const steps = [
    {
        element: '.firstStep',
        intro: 'Acesse o emissor e faça seu login: ',
        tooltipClass: 'text-primary-logo',
    },
    {
        element: '.secondStep',
        intro: 'Selecione "Emissão simplificada"',
        tooltipClass: 'text-primary-logo',
    },
    {
        element: '.thirdStep',
        intro: 'Preencha os dados fornecidos a baixo e emita sua nota fiscal',
        tooltipClass: 'text-primary-logo',
    }
];

export function NotaGuide() {
    let { id } = useParams();
    const { data, isFetching } = useQuery({
        queryKey: ['OrdemServico', Number(id)],
        queryFn: () => fetchOrdem(Number(id)),
        refetchOnWindowFocus: false,
    })
    const [stepsEnabled, setStepsEnabled] = useState(true);

    const [cnpj, setCnpj] = useState("");

    useEffect(() => {
        if (data) {
            setCnpj(maskCnpj(data?.clienteOrdem.cnpjCliente!))
        }
    }, [data]);

    const closeWindowAndSetStatusEmitida = async () => {
        await baseApi.put(`/ordemServico/emitir/${data?.id}`);

        setStepsEnabled(false);
    }

    return (
        <main className="w-full h-full px-10">
            <h1 className="font-medium text-3xl text-primary-logo">Auxílio a emissão de NF-e</h1>
            <Steps
                enabled={stepsEnabled}
                steps={steps}
                initialStep={0}
                onExit={closeWindowAndSetStatusEmitida}
                options={{
                    nextLabel: 'Próximo',
                    prevLabel: 'Anterior',
                }
                }
            />
            <div className="w-full flex justify-center text-xl">
                <div className="w-3/5 rounded-xl p-10 my-10 flex flex-col gap-4 bg-white text-slate-800 dark:bg-slate-900 dark:text-white">
                    <div className="firstStep ">
                        <span className="font-bold">1. </span>
                        Acesse o
                        <a target="_blank" className="underline" href="https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional"> Portal de emissão</a>
                    </div>
                    <div className="secondStep h-80 flex-1">
                        <span className="font-bold">2. </span>
                        Selecionar emissão simplificada
                        <div className="w-full flex justify-center">
                            <img src="/assets/emissaoNF/emissaoSimplificada.png" className="mt-2 h-96 rounded-lg" alt="Logo amei" />
                        </div>
                    </div>
                    <div className="thirdStep grid grid-cols-2 gap-4">
                        <div className="col-span-2 ">
                            <span className="font-bold">3. </span>Preencha os dados
                        </div>

                        <div className="col-span-1">
                            <Label>CPF/CNPJ do cliente</Label>
                            <Input type="text" value={cnpj} disabled />

                        </div>
                        <div className="col-span-1">
                            <Label>Nome/Razão social do cliente</Label>
                            <Input type="text" value={data?.clienteOrdem.nome} disabled />

                        </div>
                        <div className="col-span-2">
                            <Label>Serviço prestado</Label>
                            <Input type="text" value={data?.itensOrdemServicos ? data?.itensOrdemServicos[0].descricaoItemOrdem : ""} disabled />
                        </div>
                        <div className="col-span-2">
                            <Label>Valor (R$)</Label>
                            <Input type="number" value={data?.valorTotal} disabled />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}