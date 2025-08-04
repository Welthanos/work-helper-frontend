export function maskCpf(value: string): string {
    const cleanedValue = value.replace(/\D/g, '');
    const trimmedValue = cleanedValue.slice(0, 11);

    return trimmedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}

export const unmaskCpf = (cpf: string | undefined): string => {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '');
}