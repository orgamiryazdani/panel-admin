export function toLocalDateString(data: string ) {
    return new Date(data).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}

export function toLocalDateStringShort(data: string) {
    return new Date(data).toLocaleDateString("fa-IR")
}