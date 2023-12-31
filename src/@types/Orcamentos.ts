import { ClienteEmissaoRelDTO } from "./Clients";
import { UserDTO } from "./UserResponse";


export type Orcamentos = {
    id?: number;
    nomeCliente: string;
    telefoneCliente: string;
    dataEmissaoOrcamento?: Date;
    dataValidadeOrcamento: Date;
    valorTotalDoOrcamento: number;
    observacoesOrcamento: string;
    usuarioOrcamento: {
        id: number;
    },
    clienteOrcamento: {
        id: number;
    };
    //orcamentoOrdemServico?: number;
    itensOrcamentos?: ItensOrcamento[];
};

export type EmissaoOrc = {
    id?: number;
    nomeCliente: string;
    telefoneCliente: string;
    dataEmissaoOrcamento?: Date;
    dataValidadeOrcamento: Date;
    valorTotalDoOrcamento: number;
    observacoesOrcamento: string;
    usuario: UserDTO;
    cliente: ClienteEmissaoRelDTO
    itensOrcamentos: ItensOrcamento[];
}

export type OrcamentosTable = {
    id?: number;
    telefoneCliente: string;
    dataEmissaoOrcamento?: Date;
    dataValidadeOrcamento: Date;
    valorTotalDoOrcamento: number;
    observacoesOrcamento: string;
    usuarioOrcamento: number;
    //clienteOrcamento: number;
    //orcamentoOrdemServico?: number;
    itensOrcamentos: ItensOrcamento[];
};



export type ItensOrcamento = {
    id?: number;
    valorUnitario: number;
    valorTotal: number;
    descricao: string;
    orcamento?: number;
    quantidade: number;
};