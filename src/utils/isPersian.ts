export function isPersian(text:string): boolean {
    const persianCharPattern = /[\u0600-\u06FF]/;
    return persianCharPattern.test(text);
}
