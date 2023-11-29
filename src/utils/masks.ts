function maskPhone(phone: string) {
    return phone
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d)(\d{4})$/, "$1-$2");
}

function removePhoneMask(phone: string) {
    return phone
        .replace('(', "")
        .replace(')', "")
        .replace(' ', "")
        .replace('-', "");
}

function maskCnpj(cpfCnpj: string) {
    // Remove todos os caracteres não numéricos
    const numeros = cpfCnpj.replace(/\D/g, '');

    // Verifica se é CPF (11 caracteres) ou CNPJ (14 caracteres)
    const isCNPJ = numeros.length === 14;

    // Verifica se a quantidade de dígitos é válida
    if ((isCNPJ && numeros.length !== 14) || (!isCNPJ && numeros.length !== 11)) {
        // Retorna a string original se não for uma quantidade válida de dígitos
        return cpfCnpj;
    }

    // Aplica o formato correspondente
    const documentoFormatado = isCNPJ
        ? numeros.replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1 $2 $3/$4-$5")
        : numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return documentoFormatado;
}

function removeCnpjMask(cnpj: String) {
    return cnpj.
        replace('.', "")
        .replace('/', "")
        .replace(' ', "")
        .replace(' ', "")
        .replace('-', "")
        .replace('-', "")
        .replace('-', "");
}

function maskCep(cep: string) {
    return cep
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2');
}

function removeCepMask(cep: string) {
    return cep
        .replace('-', "");
}


export {
    maskPhone, maskCnpj, maskCep,
    removePhoneMask, removeCnpjMask, removeCepMask
};