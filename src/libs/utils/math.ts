// Round a number to one decimal place
export function roundOneDecimal(n?: number | string | null): number {
    if (!n) return 0;
    return Number(parseFloat(Number(n).toFixed(1)));
}

// Round a number to two decimal places
export function roundTwoDecimals(n?: number | string | null): number {
    if (!n) return 0;
    return Number(parseFloat(Number(n).toFixed(2)));
}
