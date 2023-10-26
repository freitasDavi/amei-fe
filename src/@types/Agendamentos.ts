

export type Agendamentos = {
    id: number;
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
    }
}