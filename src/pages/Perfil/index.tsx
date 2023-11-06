import { UserForm } from "@/components/Forms/User/UserForm";
import { useUser } from "@/layouts/perfil";

export function PerfilPage() {
    const { user } = useUser();

    return (
        <div className="w-full h-full px-10">
            <div className="flex flex-col gap-2 items-baseline">
                {/* <h1 className="font-medium text-3xl text-primary-logo">Meu perfil</h1> */}
                <UserForm />
            </div>
        </div>
    )
}