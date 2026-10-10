// Chiffres latins dans toutes les langues (usage courant en Libye) pour éviter les écarts serveur/client.
export function priceAmount(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

export function formatPrice(value: number): string {
  return priceAmount(value) + " DL";
}
