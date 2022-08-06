


export function dateFromString(dateStr:string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString();
}