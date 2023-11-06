import { baseApi } from "@/lib/api";
import useAuthStore from "@/store/AuthStore"

export function PerfilPage() {
    const user = useAuthStore(state => state.userData);

    const navigateToCustomerPortal = async () => {
        if (!user) return;

        const response = await baseApi.get(`/pagamentos/customerPortal/${user.id}`);

        if (response.data) {
            window.open(response.data.portal_url, '_blank')?.focus();
        }

    }

    return (
        <div className="w-full h-full px-10">
            <div className="flex gap-2 items-baseline">
                <h1 className="font-medium text-3xl text-primary-logo">Meu perfil</h1>
                <button type="button" onClick={navigateToCustomerPortal}>Painel de assinatura</button>
            </div>
        </div>
    )
}