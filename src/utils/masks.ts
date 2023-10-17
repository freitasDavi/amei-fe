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

function maskCnpj(cnpj: string) {
    return cnpj
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1 $2 $3/$4-$5");
}

function removeCnpjMask(cnpj: String) {
    return cnpj.
        replace('.', "")
        .replace('/', "")
        .replace(' ', "")
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