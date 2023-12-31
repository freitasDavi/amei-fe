import { Link } from "react-router-dom"

type Props = {
    title: string
    price: number
    description: string
    buttonText?: string,
    setPlano?: (value: number) => void,
}


export function PriceCard({ title, price, description, setPlano }: Props) {
    return (
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{description}</p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">R${price}</span>
                <span className="text-gray-500 dark:text-gray-400">/mês</span>
            </div>
            {/* <!-- List --> */}
            <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                    {/* <!-- Icon --> */}
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Configuração Individual</span>
                </li>
                <li className="flex items-center space-x-3">
                    {/* <!-- Icon --> */}
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Cartela de Clientes</span>
                </li>
                <li className="flex items-center space-x-3">
                    {/* <!-- Icon --> */}
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Emissão de Orçamentos</span>
                </li>

                <li className="flex items-center space-x-3">
                    {/* <!-- Icon --> */}
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span>Emissão de notas com {description}</span>
                </li>
            </ul>
            {setPlano ? (
                <button onClick={() => setPlano(price)} className="text-white bg-primary-logo hover:bg-primary-logo-dark focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">
                    Começar
                </button>
            ) : (
                <Link to="/register" className="text-white bg-primary-logo hover:bg-primary-logo-dark focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">
                    Começar
                </Link>
            )}
        </div>
    )
}