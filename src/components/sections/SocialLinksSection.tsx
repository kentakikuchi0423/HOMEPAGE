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
    iconBg: "bg-blue-100",
    iconText: "text-blue-700",
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
  選挙ドットコム: {
    label: "選挙ドットコム",
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
    icon: "選",
  },
};

export default function SocialLinksSection() {
  const sorted = [...siteConfig.sns].sort((a, b) => a.order - b.order);
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="social"
      className={`bg-slate-50 px-4 py-20 reveal ${inView ? "is-visible" : ""}`}
    >
      <div className="mx-auto max-w-2xl">
        <SectionHeading en="CONNECT">SNS・リンク</SectionHeading>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
                className={`reveal ${inView ? "is-visible" : ""} reveal-delay-${Math.min(i + 1, 4)}`}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3.5 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${config.iconBg} ${config.iconText}`}
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
