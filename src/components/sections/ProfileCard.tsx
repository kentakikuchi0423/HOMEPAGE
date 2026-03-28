import Image from 'next/image'
import { siteConfig } from '@/content/site'

export default function ProfileCard() {
  const { name, nameKana, title, bio, photo } = siteConfig.profile

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
      {/* Photo */}
      <div className="shrink-0">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            width={192}
            height={192}
            className="h-48 w-48 rounded-full object-cover shadow-lg shadow-pink-300/40 ring-4 ring-pink-200"
          />
        ) : (
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-pink-50 shadow-lg shadow-pink-300/40 ring-4 ring-pink-200">
            <span className="text-5xl font-bold text-pink-400">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3 text-center md:text-left">
        <div>
          <p className="text-3xl font-bold tracking-tight text-gray-900">{name}</p>
          <p className="mt-1 text-xs font-medium tracking-widest text-pink-400 uppercase">{nameKana}</p>
        </div>
        <span className="mx-auto inline-block rounded-full bg-pink-50 px-4 py-1.5 text-sm font-medium text-pink-700 md:mx-0">
          {title}
        </span>
        <ul className="mt-2 space-y-2 text-sm text-gray-600 text-left leading-relaxed">
          {bio.map((line, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-pink-400" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
