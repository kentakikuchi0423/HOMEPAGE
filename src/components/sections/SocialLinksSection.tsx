"use client";
import { useState } from "react";
import { siteConfig } from "@/content/site";
import { useInView } from "@/hooks/useInView";
import SectionHeading from "@/components/ui/SectionHeading";

function PlatformIcon({
  iconImage,
  fallback,
}: {
  iconImage?: string;
  fallback: string;
}) {
  const [error, setError] = useState(false);
  if (iconImage && !error) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- 静的書き出しのため画像最適化は使わない
      <img
        src={iconImage}
        alt=""
        className="h-5 w-5 object-contain"
        loading="lazy"
        decoding="async"
        onError={() => setError(true)}
      />
    );
  }
  return <>{fallback}</>;
}

const platformConfig: Record<
  string,
  { iconBg: string; iconText: string; icon: string }
> = {
  X: {
    iconBg: "bg-gray-100",
    iconText: "text-gray-700",
    icon: "𝕏",
  },
  Facebook: {
    iconBg: "bg-blue-100",
    iconText: "text-blue-700",
    icon: "f",
  },
  Instagram: {
    iconBg: "bg-pink-50",
    iconText: "text-pink-500",
    icon: "I",
  },
  YouTube: {
    iconBg: "bg-red-50",
    iconText: "text-red-500",
    icon: "▶",
  },
  LINE: {
    iconBg: "bg-green-50",
    iconText: "text-green-600",
    icon: "L",
  },
  選挙ドットコム: {
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
    icon: "選",
  },
};

const revealDelay = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4']

export default function SocialLinksSection() {
  const sorted = [...siteConfig.sns].sort((a, b) => a.order - b.order);
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="social"
      className={`bg-white px-6 py-16 md:py-20 reveal ${inView ? "is-visible" : ""}`}
    >
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en={siteConfig.headings.social.label}>
          {siteConfig.headings.social.title}
        </SectionHeading>

        <ul className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-3">
          {sorted.map(({ platform, label, url, iconImage }, i) => {
            const config = platformConfig[platform] ?? {
              iconBg: "bg-gray-100",
              iconText: "text-gray-600",
              icon: "●",
            };
            return (
              <li
                key={platform}
                className={`h-full min-w-0 reveal ${inView ? "is-visible" : ""} ${revealDelay[Math.min(i, 3)]}`}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full min-w-0 items-center gap-1.5 whitespace-nowrap min-[400px]:gap-2 border-b border-r border-line bg-white px-1.5 py-5 text-[clamp(13px,3.6vw,0.9375rem)] tracking-normal min-[400px]:px-3 min-[400px]:tracking-[0.03em] leading-snug text-ink transition-colors hover:bg-paper sm:gap-3 sm:px-5"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 ${config.iconBg} ${config.iconText}`}
                  >
                    <PlatformIcon
                      iconImage={iconImage}
                      fallback={config.icon}
                    />
                  </span>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
