export type FormattedDate = {
  /** 表示用（例: 2026/10/08） */
  text: string
  /** <time dateTime> 用（例: 2026-10-08） */
  iso: string
}

// 閲覧者の端末の時刻設定にかかわらず、日本時間の日付で表示する
const formatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** 日付の文字列を表示用に整える。日付として読めない場合は null */
export function formatDate(value: string): FormattedDate | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  const parts = formatter.formatToParts(date)
  const pick = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ''
  const [year, month, day] = [pick('year'), pick('month'), pick('day')]
  return { text: `${year}/${month}/${day}`, iso: `${year}-${month}-${day}` }
}
