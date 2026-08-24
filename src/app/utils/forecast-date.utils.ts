const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export function formatIsoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function getSundayToSaturdayRange(date = new Date()): { startDate: string; endDate: string } {
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const sunday = new Date(localDate);
  sunday.setDate(localDate.getDate() - localDate.getDay());
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  return { startDate: formatIsoDate(sunday), endDate: formatIsoDate(saturday) };
}

export function isIsoDate(value: unknown): value is string { return typeof value === 'string' && isoDatePattern.test(value); }