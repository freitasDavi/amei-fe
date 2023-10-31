


export function Footer() {
    return (
        <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <img src="/assets/LOGO-COMPLETA-AZUL.png" className="mr-3 h-6 sm:h-9" alt="Logo amei" />
                </a>
                <p className="my-6 text-gray-500 dark:text-gray-400">Open-source library of over 400+ web components and interactive elements built for better web.</p>
                <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                    <li>
                        <a href="#home" className="mr-4 hover:underline md:mr-6 ">Home</a>
                    </li>
                    <li>
                        <a href="#us" className="mr-4 hover:underline md:mr-6">Nós</a>
                    </li>
                    <li>
                        <a href="#functions" className="mr-4 hover:underline md:mr-6 ">Produto</a>
                    </li>
                    <li>
                        <a href="#pricing" className="mr-4 hover:underline md:mr-6">Planos</a>
                    </li>
                    <li>
                        <a href="#contact" className="mr-4 hover:underline md:mr-6">Contato</a>
                    </li>
                    {/* 
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">FAQs</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Contact</a>
                    </li> */}
                </ul>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">a-mei™ - tkn™</a>. Todos direitos reservados.</span>
            </div>
        </footer>
    )
}