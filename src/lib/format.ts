export function formatPrice(value: number): string {
  return (
    value.toLocaleString("fr-FR", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }) + " DL"
  );
}
