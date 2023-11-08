

export type Agendamentos = {
    id: number;
    nomeAgendamento: string,
    dataAgendamento: Date,
    enderecoAgendamento: string,
    responsavelAgendamento: string,
    telefoneAgendamento: string,
    telefoneSecundario: string,
    clienteAgendamento: {
        id: number,
        nomeCliente: string
    },
    agendamentoCidade: {
        id: number,
        nomeCidade: string
    },
    agendamentoBairro: {
        id: number,
        nomeBairro: string
    }
}