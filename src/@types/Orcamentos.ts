

export type Orcamentos = {
    id?: number;
    nomeCliente: string;
    telefoneCliente: string;
    dataEmissaoOrcamento?: Date;
    dataValidadeOrcamento: Date;
    valorTotalDoOrcamento: number;
    observacoesOrcamento: string;
    usuarioOrcamento: number;
    clienteOrcamento: {
        id: number;
    };
    //orcamentoOrdemServico?: number;
    itensOrcamentos?: ItensOrcamento[];
};

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
    itensOrcamento?: ItensOrcamento[];
};



export type ItensOrcamento = {
    id?: number;
    valorUnitario: number;
    valorTotal: number;
    descricao: string;
    codigoOrcamento?: number;
    quantidade: number;
};