import { ClienteResponseDTO } from "./Clients";

export type OrdemServico = {
    id?: number;
    statusOrdemServico: number;
    telefoneOrdem: string;
    valorTotal: number;
    clienteOrdem: ClienteResponseDTO;
    usuarioOrdem: number;
    itensOrdemServicos?: ItensOrdem[];
};


export type ItensOrdem = {
    id?: number;
    valorUnitario: number;
    valorTotal: number;
    descricaoItemOrdem: string;
    // codigoOrcamento?: number;
};