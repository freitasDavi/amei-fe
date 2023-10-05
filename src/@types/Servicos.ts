
export type Servicos = {
    id: number;
    descricaoServico: string;
    valorServico: number;
    codigoCNAE: string;
    itensServico?: number;
    itensOrcamento?: number;
    servicoUsuario?: number;
}