"use client";
import { siteConfig } from "@/content/site";
import { useInView } from "@/hooks/useInView";
import SectionHeading from "@/components/ui/SectionHeading";

const revealDelay = [
  "reveal-delay-1",
  "reveal-delay-2",
  "reveal-delay-3",
  "reveal-delay-4",
  "reveal-delay-5",
];

export default function PolicySection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="policy"
      className={`bg-white px-4 py-20 reveal ${inView ? "is-visible" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading en="POLICY">政策</SectionHeading>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {siteConfig.policies.map((policy, i) => {
            // 上段2枚は half幅、下段3枚は third幅
            const colSpan = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            const isTop = i < 2;

            return (
              <li
                key={policy.title}
                className={`${colSpan} reveal ${inView ? "is-visible" : ""} ${revealDelay[Math.min(i, 4)]}`}
              >
                <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-blue-100 border-t-4 border-t-blue-500 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200/40 hover:bg-blue-50/50 hover:border-blue-200">
                  {/* Ghost number watermark */}
                  <span
                    className="pointer-events-none absolute -bottom-2 right-3 select-none text-8xl font-black leading-none text-blue-100/60 transition-colors duration-300 group-hover:text-blue-200/80"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Number badge */}
                  <span className="relative text-xs font-bold tracking-widest text-blue-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3
                    className={`relative font-bold leading-tight text-blue-950 text-base ${isTop ? "lg:text-lg" : ""}`}
                  >
                    {policy.title}
                  </h3>

                  {/* Gradient divider */}
                  <div className="relative h-0.5 w-8 bg-linear-to-r from-blue-400 to-blue-200 transition-all duration-300 group-hover:w-14" />

                  {/* Description */}
                  <p className="relative text-sm leading-relaxed text-gray-600">
                    {policy.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
