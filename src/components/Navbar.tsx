import { Link, useNavigate } from "react-router-dom";
import { NewspaperClipping, Calendar, MathOperations, Users, GearSix, SignOut } from "@phosphor-icons/react"
import useAuthStore from "@/store/AuthStore";
import { ModeToggle } from "./DarkMode/mode-toggle";

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
        <div className="flex h-screen w-16 flex-col justify-between border-e bg-white dark:bg-slate-800">
            <div>
                <div className="inline-flex h-16 w-16 items-center justify-center">
                    <Link to="/home"
                        className="h-10 w-10 rounded-md flex items-center justify-center font-logo text-primary-logo font-bold text-3xl
                        hover:bg-primary-logo hover:text-white transition ease-in">
                        a
                    </Link>
                </div>


            </div>

            <nav className="flex-1 flex justify-center">
                <div className="px-2 h-full">
                    <ul className="space-y-1 border-t border-gray-100 dark:border-gray-500 pt-4 h-2/3 flex flex-col items-center justify-evenly">
                        <li>
                            <Link
                                to="/orcamentos"
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
                            <div

                                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            >
                                <Link to="/agendamentos">
                                    <Calendar size={28} className="opacity-75" />
                                </Link>
                                <span
                                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                >
                                    Agendamentos
                                </span>
                            </div>
                        </li>

                        <li>
                            <Link
                                to="/clientes"
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
                                to="/ordens"
                                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            >
                                <NewspaperClipping size={28} className="opacity-75" />
                                <span
                                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                >
                                    Ordens
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>



            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-gray-500 bg-white dark:bg-slate-800 p-2">
                <div className="px-1">
                    <ModeToggle />
                </div>

                <div className="py-4">

                    <Link
                        to="/meuPerfil"
                        className="t group relative flex justify-center rounded bg-blue-50 dark:bg-slate-900 dark:hover:bg-slate-950 px-2 py-1.5 text-blue-700 dark:hover:text-white"
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