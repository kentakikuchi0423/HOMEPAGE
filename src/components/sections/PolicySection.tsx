"use client";
import { siteConfig } from "@/content/site";
import { useInView } from "@/hooks/useInView";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PolicySection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="policy"
      className={`bg-paper px-5 py-16 sm:py-24 reveal ${inView ? "is-visible" : ""}`}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="POLICY">政策</SectionHeading>

        <ol className="border-t border-ink/20">
          {siteConfig.policies.map((policy, i) => (
            <li
              key={policy.title}
              className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 border-b border-ink/20 py-7 md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1.25fr)] md:gap-x-8 md:py-9"
            >
              <span
                className="font-display text-3xl font-black leading-none text-brand md:text-5xl"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-bold leading-snug text-ink md:text-2xl">
                {policy.title}
              </h3>
              <p className="col-start-2 leading-relaxed text-ink/80 md:col-start-3">
                {policy.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
