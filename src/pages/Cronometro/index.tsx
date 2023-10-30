import { CadastroCronometro } from "@/components/Forms/Cronometro/Cadastro";



export function CronometroPage() {
    return (
        <div className="w-full h-full px-10">
            <h1 className="font-medium text-3xl text-primary-logo">Cronômetros realizados</h1>
            <div className="w-full flex my-10 gap-4" id="list-bar" aria-label="Navegação da lista">
                <CadastroCronometro />
            </div>
        </div>
    )
}