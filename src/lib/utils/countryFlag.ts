/**
 * Convierte el código de país usado por OpenF1 a emoji de bandera.
 * Incluye los países de todos los pilotos actuales de F1.
 */
const FLAGS: Record<string, string> = {
  // 3-letter ISO (OpenF1 typical format)
  NED: '🇳🇱', GBR: '🇬🇧', MON: '🇲🇨', AUS: '🇦🇺', ESP: '🇪🇸',
  MEX: '🇲🇽', FIN: '🇫🇮', FRA: '🇫🇷', CAN: '🇨🇦', GER: '🇩🇪',
  CHN: '🇨🇳', DEN: '🇩🇰', THA: '🇹🇭', JPN: '🇯🇵', ITA: '🇮🇹',
  ARG: '🇦🇷', BRA: '🇧🇷', USA: '🇺🇸', NZL: '🇳🇿', POR: '🇵🇹',
  BEL: '🇧🇪', POL: '🇵🇱', AUT: '🇦🇹', SUI: '🇨🇭',
  // 2-letter ISO fallback (por si la API devuelve otro formato)
  NL: '🇳🇱', GB: '🇬🇧', MC: '🇲🇨', AU: '🇦🇺', ES: '🇪🇸',
  MX: '🇲🇽', FI: '🇫🇮', FR: '🇫🇷', CA: '🇨🇦', DE: '🇩🇪',
  CN: '🇨🇳', DK: '🇩🇰', TH: '🇹🇭', JP: '🇯🇵', IT: '🇮🇹',
};

export function countryFlag(code: string): string {
  const upper = code?.toUpperCase() ?? '';
  return FLAGS[upper] ?? code;
}
