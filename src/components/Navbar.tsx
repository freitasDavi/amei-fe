import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
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
                    <span className="h-10 w-10 flex items-center justify-center font-logo text-primary-logo text-3xl">
                        a
                    </span>
                    {/* <span
                        className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
                    >
                        L
                    </span> */}
                </div>

                <div className="border-t border-gray-100">
                    <div className="px-2">
                        <div className="py-4">
                            <a
                                href=""
                                className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <span
                                    className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                >
                                    General
                                </span>
                            </a>
                        </div>

                        <ul className="space-y-1 border-t border-gray-100 pt-4">
                            <li>
                                <a
                                    href=""
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-75"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>

                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Teams
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href=""
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-75"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>

                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Billing
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href=""
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-75"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                    </svg>

                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Invoices
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href=""
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-75"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>

                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Account
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>

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