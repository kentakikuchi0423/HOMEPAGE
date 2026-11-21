'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  youtubeVideoId: string
  title?: string
  /** 再生ボタン・プレーヤーの読み上げ用の名前 */
  label: string
  playLabel: string
  placeholder: string
}

/**
 * YouTube 動画 1 本ぶんの枠。
 * 最初はサムネイルだけを表示し、押された時点でプレーヤーを読み込む（初期表示を軽くし、押すまで YouTube と通信しない）。
 */
export default function VideoCard({ youtubeVideoId, title, label, playLabel, placeholder }: Props) {
  const [playing, setPlaying] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)

  // ボタンがプレーヤーに置き換わるので、キーボード操作の位置を見失わないようプレーヤーへ移す
  useEffect(() => {
    if (playing) frameRef.current?.focus()
  }, [playing])

  return (
    <div>
      <div className="relative aspect-video overflow-hidden bg-ink">
        {!youtubeVideoId ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-sm text-white/80">{placeholder}</p>
          </div>
        ) : playing ? (
          <iframe
            ref={frameRef}
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeVideoId)}?autoplay=1`}
            title={label}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${playLabel}: ${label}`}
            className="focus-inset group absolute inset-0 h-full w-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- 外部（YouTube）の画像のため最適化の対象外 */}
            <img
              src={`https://i.ytimg.com/vi/${encodeURIComponent(youtubeVideoId)}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
            />
            {/* YouTube と同様の、赤い角丸長方形に白い三角の再生ボタン（配色ルールの例外。CLAUDE.md 参照） */}
            <svg
              viewBox="0 0 68 48"
              className="absolute left-1/2 top-1/2 h-12 w-[4.25rem] -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              <rect
                width="68"
                height="48"
                rx="12"
                className="fill-[#f00] transition-opacity duration-300 group-hover:opacity-85"
              />
              <path d="M27 14v20l18-10z" fill="#fff" />
            </svg>
          </button>
        )}
      </div>
      {title && <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">{title}</p>}
    </div>
  )
}
