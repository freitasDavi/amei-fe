import { User } from "@/@types/UserResponse";
import { Loading } from "@/components/Loading";
import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";

async function fetchUserData(codigoUsuario: number) {
    const response = await baseApi.get<User>(`/users/${codigoUsuario}`);

    return response.data;
}

type ContextType = { user: User | undefined }

export function Perfil() {
    const user = useAuthStore(state => state.userData);

    if (!user) return <div>Loading...</div>;

    const { data, isFetching } = useQuery({
        queryKey: ["usuario"],
        queryFn: () => fetchUserData(user.id),
        refetchOnWindowFocus: false
    });

    const navigateToCustomerPortal = async () => {
        if (!user) return;

        const response = await baseApi.get(`/pagamentos/customerPortal/${user.id}`);

        if (response.data) {
            window.open(response.data.portal_url, '_blank')?.focus();
        }

    };


    return (
        <div className="w-full h-full px-10">
            <h1 className="font-medium text-3xl text-primary-logo">Meu Perfil</h1>
            <div className="flex mt-10 gap-10">
                <div className="bg-blue-400 py-4 px-10 rounded-lg text-white shadow-md max-h-[90px]" id="submenu">
                    <ul>
                        <li>
                            <NavLink to="/meuPerfil/" className={({ isActive }) =>
                                isActive ? "text-blue-800 cursor-default" : "hover:text-blue-800 drop-shadow-md hover:drop-shadow-none"}  >
                                Meu perfil
                            </NavLink>
                        </li>
                        <li>
                            {data?.plano == "FREE"
                                ? (
                                    <NavLink to="/meuPerfil/assinatura" className={({ isActive }) =>
                                        isActive ? "text-blue-800 cursor-default" : "hover:text-blue-800 drop-shadow-md hover:drop-shadow-none"
                                    } >
                                        Assinatura
                                    </NavLink>
                                )
                                : (
                                    <button
                                        className="hover:text-blue-800 drop-shadow-md hover:drop-shadow-none"
                                        type="button"
                                        onClick={navigateToCustomerPortal}>
                                        Painel de assinatura
                                    </button>
                                )}

                        </li>
                    </ul>
                </div>
                <div className="flex-1">
                    {isFetching ? (
                        <Loading />
                    ) : (
                        <Outlet context={{ user: data } satisfies ContextType} />
                    )}
                </div>
            </div>
        </div>
    )
}

export function useUser() {
    return useOutletContext<ContextType>();
}