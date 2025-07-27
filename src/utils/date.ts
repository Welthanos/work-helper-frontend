export const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}

export const maskDate = (value: string) => {
    return value
        .replace(/\D/g, '')
        .slice(0, 8)
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
}

export const formatApiDateToMask = (dateString: string) => {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
}

export const unmaskDate = (date: string | undefined): string => {
    if (!date) return '';

    const parts = date.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        if (day.length === 2 && month.length === 2 && year.length === 4) return `${year}-${month}-${day}`;
    }

    return date;
}