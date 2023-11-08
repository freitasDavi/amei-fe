import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserGeralForm } from "./UserGeral";
import { UserEndereco } from "./UserEndereco";


export function UserForm() {
    return (
        <Tabs defaultValue="geral" className="w-2/3">
            <TabsList>
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="endereco">Endereço</TabsTrigger>
            </TabsList>
            <UserGeralForm />
            <UserEndereco />
        </Tabs>
    )
}