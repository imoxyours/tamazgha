const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"];
type Unit = { one: string; two: string; few: string; many: string };
const MINUTE: Unit = { one: "دقيقة", two: "دقيقتين", few: "دقائق", many: "دقيقة" };
const HOUR: Unit = { one: "ساعة", two: "ساعتين", few: "ساعات", many: "ساعة" };
const DAY: Unit = { one: "يوم", two: "يومين", few: "أيام", many: "يوما" };
const WEEK: Unit = { one: "أسبوع", two: "أسبوعين", few: "أسابيع", many: "أسبوعا" };
function plural(n: number, u: Unit): string {
  if (n === 1) return u.one;
  if (n === 2) return u.two;
  if (n <= 10) return `${n} ${u.few}`;
  return `${n} ${u.many}`;
}
export function relativeTime(published: string | number | Date, now: number = Date.now()): string {
  const time = new Date(published).getTime();
  if (Number.isNaN(time)) return "";
  const diff = Math.max(0, now - time);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `قبل ${plural(Math.max(1, minutes), MINUTE)}`;
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `قبل ${plural(hours, HOUR)}`;
  const days = Math.floor(diff / 86400000);
  if (days < 7) return `قبل ${plural(days, DAY)}`;
  if (days < 30) return `قبل ${plural(Math.floor(days / 7), WEEK)}`;
  const d = new Date(time);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
export function publishedLabel(published: string | number | Date, now: number = Date.now()): string {
  const r = relativeTime(published, now);
  if (!r) return "";
  return r.startsWith("قبل") ? `نُشر ${r}` : `نُشر في ${r}`;
}
export function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}
export function readingTime(words: number): string {
  const raw = words / 200;
  if (raw < 1) return "أقل من دقيقة";
  const m = Math.ceil(raw);
  if (m === 1) return "دقيقة واحدة";
  if (m === 2) return "دقيقتان";
  return m <= 10 ? `${m} دقائق` : `${m} دقيقة`;
}