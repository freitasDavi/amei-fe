import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuthStore from "@/store/AuthStore";

export function UnAuthNavbar() {
    const navigate = useNavigate();
    const setLogout = useAuthStore((state) => state.setLogout);

    function handleLogout() {
        setLogout();

        setTimeout(() => {
            navigate("/login");
        }, 500);
    }

    return (
        <nav className="bg-primary-logo fixed w-full z-20 top-0 left-0 border-b border-slate-100">
            <div className="max-w-screen-xl flex flex-wrap items-baseline justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="text-white font-logo text-5xl font-semibold ">
                    a-mei
                </a>
                <div className="flex md:order-2">
                    {/* TODO: Aqui que vai o Avatar */}
                    <button
                        onClick={() => handleLogout()}
                        type="button" className="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 text-white bg-pink-600 hover:bg-pink-700 focus:ring-pink-800">
                        Login
                    </button>
                    {/* <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button> */}
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    {/* <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-rose-900 border-gray-700">
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 md:text-gray-900" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/clients" className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-gray-900 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Clientes</Link>
                        </li>
                        <li>
                            <Link to="/protected" className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-gray-900 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Protected</Link>
                        </li>
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-gray-900 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Contact</Link>
                        </li>
                    </ul> */}
                </div>
            </div>
        </nav>
    )
}