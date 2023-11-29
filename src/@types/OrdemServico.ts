import { ClienteEmissaoRelDTO, ClienteResponseDTO } from "./Clients";
import { UserDTO } from "./UserResponse";

export type OrdemServico = {
    id?: number;
    statusOrdemServico: number;
    telefoneOrdem: string;
    valorTotal: number;
    dataEmissaoOrdemServico?: Date;
    usuarioOrdem: number;
    clienteOrdem: ClienteResponseDTO;
    itensOrdemServicos?: ItensOrdem[];
};

export type OrdemServicoCad = {
    id?: number;
    statusOrdemServico: number;
    telefoneOrdem: string;
    valorTotal: number;
    dataEmissaoOrdemServico?: Date;
    usuarioOrdem: number;
    clienteOrdem: ClienteResponseDTO;
    itensOrdemServicos?: ItensOrdem[];
};

export type EmissaoOrdem = {
    id: number;
    statusOrdemServico: number;
    telefoneOrdem: string;
    valorTotal: number;
    dataEmissaoOrdemServico: Date;
    usuarioOrdem: UserDTO;
    clienteOrdem: ClienteEmissaoRelDTO
    itensOrdemServicos: ItensOrdem[];
}



export type ItensOrdem = {
    id?: number;
    valorUnitario: number;
    valorTotal: number;
    descricaoItemOrdem: string;
    quantidade: number;
    OrdemDeServico?: number;
};