export function LocalDataFormat(data: Date) {
    const date = new Date(data);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    return date.toLocaleDateString("pt-BR", options);
}