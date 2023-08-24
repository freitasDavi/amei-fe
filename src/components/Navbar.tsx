import { Link, useNavigate } from "react-router-dom";
import { NewspaperClipping, Calendar, MathOperations, Users, GearSix, SignOut } from "@phosphor-icons/react"
import useAuthStore from "@/store/AuthStore";

export function Navbar() {
    const navigate = useNavigate();
    const setLogout = useAuthStore((state) => state.setLogout);

    function handleLogout() {
        setLogout();

        setTimeout(() => {
            navigate("/login");
        }, 500);
    }

    return (
        <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
            <div>
                <div className="inline-flex h-16 w-16 items-center justify-center">
                    <Link to="/home"
                        className="h-10 w-10 rounded-md flex items-center justify-center font-logo text-primary-logo font-bold text-3xl
                        hover:bg-primary-logo hover:text-white transition ease-in">
                        a
                    </Link>
                    {/* <span
                        className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
                    >
                        L
                    </span> */}
                </div>


            </div>

            <nav className="border-t border-gray-100 flex-1 flex justify-center">
                <div className="px-2 h-full">
                    <ul className="space-y-1 border-t border-gray-100 pt-4 h-2/3 flex flex-col items-center justify-evenly">
                        <li>
                            <Link
                                to="/clients"
                                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            >
                                <MathOperations weight="fill" size={28} className="opacity-75" />
                                <span
                                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                >
                                    Orçamento
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/"
                                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            >
                                <Calendar size={28} className="opacity-75" />

                                <span
                                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                >
                                    Agendamentos
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/"
                                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            >
                                <Users size={28} className="opacity-75" />
                                <span
                                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                >
                                    Clientes
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/"
                                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            >
                                <NewspaperClipping size={28} className="opacity-75" />
                                <span
                                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                >
                                    Relatórios
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                <div className="py-4">
                    <Link
                        to="/"
                        className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                    >
                        <GearSix size={28} className="opacity-75" />


                        <span
                            className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                        >
                            Configurações
                        </span>
                    </Link>
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                    <SignOut size={28} className="opacity-75" />

                    <span
                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                    >
                        Logout
                    </span>
                </button>
            </div>
        </div>
    )
}


// <nav className="bg-rose-900 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
        //     <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        //         <a href="https://flowbite.com/" className="flex items-center">
        //             <img src={logo} className="h-16 mr-3" alt="Flowbite Logo" />
        //             <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Flowbite</span>
        //         </a>
        //         <div className="flex md:order-2">
        //             {/* TODO: Aqui que vai o Avatar */}
        //             <button
        //                 onClick={() => handleLogout()}
        //                 type="button" className="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-pink-600 hover:bg-pink-700 focus:ring-pink-800">
        //                 Logout
        //             </button>
        //             <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        //                 <span className="sr-only">Open main menu</span>
        //                 <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        //                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
        //                 </svg>
        //             </button>
        //         </div>
        //         <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        //             <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-rose-900 border-gray-700">
        //                 <li>
        //                     <Link to="/" className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 md:text-gray-900" aria-current="page">Home</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/clients" className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-gray-900 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Clientes</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/protected" className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-gray-900 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Protected</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/" className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-gray-900 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Contact</Link>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>