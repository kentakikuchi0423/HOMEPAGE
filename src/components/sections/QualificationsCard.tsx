import { siteConfig } from '@/content/site'

export default function QualificationsCard() {
  const { qualifications } = siteConfig.profile

  if (!qualifications || qualifications.length === 0) return null

  return (
    <div className="rounded-2xl bg-blue-50/60 p-6 transition-shadow duration-300 hover:shadow-md">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-blue-800">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 text-blue-600 shrink-0" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6"/>
            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
          </svg>
        </span>
        資格・試験
      </h3>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
        {qualifications.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-5 text-gray-700">
            <span className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true">›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
