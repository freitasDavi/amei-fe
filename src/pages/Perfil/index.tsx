import { UserForm } from "@/components/Forms/User/UserForm";

export function PerfilPage() {
    return (
        <div className="w-full h-full px-10">
            <div className="flex flex-col gap-2 items-baseline">
                <UserForm />
            </div>
        </div>
    )
}