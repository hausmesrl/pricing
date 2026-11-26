const integerEuro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  // In it-IT i numeri a 4 cifre non vengono raggruppati di default (2388 €):
  // "always" forza il separatore delle migliaia (2.388 €).
  useGrouping: "always",
});

const decimalEuro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: "always",
});

/** Formatta un importo in euro all'italiana. Niente decimali per gli importi interi. */
export function formatEuro(value: number): string {
  return (Number.isInteger(value) ? integerEuro : decimalEuro).format(value);
}
