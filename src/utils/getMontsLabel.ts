import { MONTHS } from '../constants/months'

export function getMonthLabel(month: number): string {
  const found = MONTHS.find((m) => m.value === month)
  return found ? found.label : ''
}
