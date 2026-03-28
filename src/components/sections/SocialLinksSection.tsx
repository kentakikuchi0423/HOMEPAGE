"use client";
import { useState } from "react";
import { siteConfig } from "@/content/site";
import { useInView } from "@/hooks/useInView";
import SectionHeading from "@/components/ui/SectionHeading";

function PlatformIcon({
  iconImage,
  platform,
  fallback,
}: {
  iconImage?: string;
  platform: string;
  fallback: string;
}) {
  const [error, setError] = useState(false);
  if (iconImage && !error) {
    return (
      <img
        src={iconImage}
        alt={platform}
        className="h-5 w-5 object-contain"
        onError={() => setError(true)}
      />
    );
  }
  return <>{fallback}</>;
}

const platformConfig: Record<
  string,
  { label: string; iconBg: string; iconText: string; icon: string }
> = {
  X: {
    label: "X (Twitter)",
    iconBg: "bg-gray-100",
    iconText: "text-gray-700",
    icon: "𝕏",
  },
  Facebook: {
    label: "Facebook",
    iconBg: "bg-pink-100",
    iconText: "text-pink-700",
    icon: "f",
  },
  Instagram: {
    label: "Instagram",
    iconBg: "bg-pink-50",
    iconText: "text-pink-500",
    icon: "I",
  },
  YouTube: {
    label: "YouTube",
    iconBg: "bg-red-50",
    iconText: "text-red-500",
    icon: "▶",
  },
  LINE: {
    label: "LINE",
    iconBg: "bg-green-50",
    iconText: "text-green-600",
    icon: "L",
  },
  選挙ドットコム: {
    label: "選挙ドットコム",
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
      className={`bg-pink-50/30 px-4 py-20 reveal ${inView ? "is-visible" : ""}`}
    >
      <div className="mx-auto max-w-2xl">
        <SectionHeading en="CONNECT">SNS・リンク</SectionHeading>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
          {sorted.map(({ platform, url, iconImage }, i) => {
            const config = platformConfig[platform] ?? {
              label: platform,
              iconBg: "bg-gray-100",
              iconText: "text-gray-600",
              icon: "●",
            };
            return (
              <li
                key={platform}
                className={`h-full reveal ${inView ? "is-visible" : ""} ${revealDelay[Math.min(i, 3)]}`}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full items-center gap-1.5 rounded-2xl border border-pink-100 bg-white px-1.5 py-3.5 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 hover:shadow-md sm:gap-3 sm:px-4"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 ${config.iconBg} ${config.iconText}`}
                  >
                    <PlatformIcon
                      iconImage={iconImage}
                      platform={platform}
                      fallback={config.icon}
                    />
                  </span>
                  {config.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
