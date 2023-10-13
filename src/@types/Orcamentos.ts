

export type Orcamentos = {
    id?: number;
    telefoneClienteOrcamento: string;
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
};