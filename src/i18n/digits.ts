const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** Replaces ASCII digits with Persian digits, leaving everything else untouched. */
export function toPersianDigits(s: string): string {
  return s.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}
