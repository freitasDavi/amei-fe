import { ComboBairro } from "@/components/Comboboxes/ComboBairro";

export type Clientes = {
    id: number;
    nomeCliente: string;
    emailCliente: string;
    telefoneCliente: string;
    cepCliente: string;
    enderecoCliente: string;
    numeroCliente: string;
    complementoCliente: string;
    cnpjCliente: string;
    inscricaoMunicipal: string;
    usuarioCliente: number;
    clienteCidade: number;
    clienteBairro: ComboBairro
}

export type ClienteResponseDTO = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cnpjCliente: string;
}