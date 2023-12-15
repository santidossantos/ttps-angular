export function PutInSpanish(strategyName: string): string {
    switch(strategyName){
        case "EqualAmounts":
            return "Partes iguales"
        case "EqualAmountsPercent":
            return "Partes iguales (porcentaje)"
        case "FixedAmounts":
            return "Cantidad fija"
        case "FixedAmountsPercent":
            return "Cantidad fija (porcentaje)"
    }
    return "";
}