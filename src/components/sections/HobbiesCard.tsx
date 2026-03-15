import { siteConfig } from '@/content/site'

export default function HobbiesCard() {
  const { hobbies } = siteConfig.profile

  if (!hobbies || hobbies.length === 0) return null

  return (
    <div className="rounded-2xl bg-blue-50/60 p-6 transition-shadow duration-300 hover:shadow-md">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-blue-800">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 text-blue-600 shrink-0" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M16.24 7.76l2.12-2.12M5.64 18.36l2.12-2.12"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </span>
        趣味・特技
      </h3>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
        {hobbies.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-5 text-gray-700">
            <span className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true">›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
