import { ComboBairro } from "@/components/Comboboxes/ComboBairro"

export type User = {
    id: number,
    username: string,
    email: string,
    roles: string[],
    razaoSocialUsuario: string,
    cnpjUsuario: string,
    inscricaoMunicipalUsuario: string,
    telefoneUsuario: string,
    cepUsuario: string,
    enderecoUsuario: string,
    numeroUsuario: string,
    complementoUsuario: string,
    plano: string,
    bairro: ComboBairro
}