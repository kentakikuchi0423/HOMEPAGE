import { siteConfig } from '@/content/site'

export default function QualificationsCard() {
  const { qualifications, qualificationsIcon } = siteConfig.profile

  if (!qualifications || qualifications.length === 0) return null

  return (
    <div className="rounded-2xl bg-blue-50/60 p-6 transition-shadow duration-300 hover:shadow-md">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-blue-800">
        {qualificationsIcon ? (
          <img src={qualificationsIcon} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
        ) : (
          <span aria-hidden="true">🎓</span>
        )}
        資格・試験
      </h3>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
        {qualifications.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-7 text-gray-700">
            <span className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true">›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
