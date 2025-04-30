export function LocalDataTimeFormat(data: Date) {
    const date = new Date(data);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };
    return date.toLocaleDateString("pt-BR", options);
}