


export function ENUM_STATUS_EMISSAO(status: number) {
    switch (status) {
        case 1: return 'Aguardando emissão'
        case 2: return 'Emitida'
        default: return 'Erro'
    }
}