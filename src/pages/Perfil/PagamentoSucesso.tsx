import { useParams, useSearchParams } from "react-router-dom"



export function PagamentoSucesso() {
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('session_id'));

    return (
        <div className="px-6 py-2 bg-green-300 border border-green-500 rounded-lg">
            <h1 className="text-xl text-green-500">Pagamento realizado com sucesso!</h1>
        </div>
    )
}